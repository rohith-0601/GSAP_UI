import React, { useEffect, useRef, useCallback } from 'react';

const GlobeLatitudesGif = ({
  size = 512,
  radius = 220,
  lines = 6,
  stroke = '#EB4D2E',
  lineWidth = 8,
  fps = 30,
  duration = 2.5, // seconds for one loop
  filename = 'globe_latitudes.gif',
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  // Draw one frame at normalized time t in [0, 1)
  const draw = useCallback(
    (ctx, t) => {
      const W = size;
      const H = size;
      const CX = W / 2;
      const CY = H / 2;
      const R = radius;

      ctx.clearRect(0, 0, W, H);

      // Outer circle
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = stroke;
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.stroke();

      // Latitudes drifting downward and wrapping
      const spacing = 1 / (lines + 1); // normalized spacing
      // Map t to offset equal to exactly one spacing per loop
      const offset = t * (2 * spacing);

      for (let i = 1; i <= lines; i++) {
        let y = -1 + i * 2 * spacing + offset; // in [-1, 1] world coords
        if (y > 1) y -= 2;
        if (y < -1) y += 2;

        const yy = y * R;
        const xr = Math.sqrt(Math.max(0, R * R - yy * yy)); // ellipse x-radius at that y

        ctx.beginPath();
        // Thin the nearer lines a touch for subtle depth
        const lw = lineWidth * (0.62 + 0.38 * (1 - Math.abs(y)));
        ctx.lineWidth = lw;
        ctx.strokeStyle = stroke;
        ctx.ellipse(CX, CY + yy, xr, lw * 0.65, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    },
    [size, radius, lines, stroke, lineWidth]
  );

  // Preview animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let start = performance.now();

    const tick = (now) => {
      const t = ((now - start) / (duration * 1000)) % 1;
      draw(ctx, t);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, duration]);

  // Minimal in-browser GIF encoder (dependency-free)
  function quantizeRGBA(pixels) {
    // Palette: white background, orange stroke, black fallback
    const pal = new Uint8Array([255, 255, 255, 235, 77, 46, 0, 0, 0]);
    const out = new Uint8Array(pixels.length / 4);

    const nearest = (r, g, b) => {
      let idx = 0;
      let best = 1e9;
      for (let i = 0; i < pal.length; i += 3) {
        const dr = pal[i] - r;
        const dg = pal[i + 1] - g;
        const db = pal[i + 2] - b;
        const d = dr * dr + dg * dg + db * db;
        if (d < best) {
          best = d;
          idx = i / 3;
        }
      }
      return idx;
    };

    for (let i = 0, j = 0; i < pixels.length; i += 4, j++) {
      out[j] = nearest(pixels[i], pixels[i + 1], pixels[i + 2]);
    }
    return { index: out, palette: pal };
  }

  function lzwEncode(indices, minCodeSize) {
    const CLEAR = 1 << minCodeSize;
    const END = CLEAR + 1;
    let codeSize = minCodeSize + 1;

    const dict = new Map();
    let next = CLEAR + 2;

    const out = [];
    let buffer = 0;
    let bits = 0;
    const emit = (code) => {
      buffer |= code << bits;
      bits += codeSize;
      while (bits >= 8) {
        out.push(buffer & 255);
        buffer >>= 8;
        bits -= 8;
      }
    };

    const reset = () => {
      dict.clear();
      codeSize = minCodeSize + 1;
      next = CLEAR + 2;
      emit(CLEAR);
    };

    reset();
    let phrase = indices[0];

    for (let i = 1; i < indices.length; i++) {
      const k = indices[i];
      const key = (phrase << 8) | k;
      if (dict.has(key)) {
        phrase = dict.get(key);
      } else {
        emit(phrase);
        dict.set(key, next++);
        phrase = k;
        if (next === 1 << codeSize && codeSize < 12) codeSize++;
      }
    }

    emit(phrase);
    emit(END);
    if (bits > 0) out.push(buffer & 255);
    return out;
  }

  class GifWriter {
    constructor(width, height) {
      this.w = width;
      this.h = height;
      this.buf = [];
      this.header();
    }
    u8(...a) { this.buf.push(...a); }
    u16(v) { this.u8(v & 255, (v >> 8) & 255); }
    header() {
      this.u8(71, 73, 70, 56, 57, 97); // GIF89a
      this.u16(this.w); this.u16(this.h);
      this.u8(0x70, 0, 0); // no global color table
    }
    frame(indexed, palette, delayCS = 3) {
      // GCE
      this.u8(0x21, 0xF9, 4, 0x04, delayCS & 255, (delayCS >> 8) & 255, 0);
      // Image Descriptor
      this.u8(0x2C, 0, 0, 0, 0);
      this.u16(this.w); this.u16(this.h);
      this.u8(0x87); // local color table 256, sorted off
      const lct = new Uint8Array(256 * 3);
      lct.set(palette);
      this.buf.push(...lct);
      // Image data
      const minCodeSize = 8;
      this.u8(minCodeSize);
      const data = lzwEncode(indexed, minCodeSize);
      for (let i = 0; i < data.length; i += 255) {
        const n = Math.min(255, data.length - i);
        this.u8(n); this.buf.push(...data.slice(i, i + n));
      }
      this.u8(0); // end of image data
    }
    end() { this.u8(0x3B); return new Blob([new Uint8Array(this.buf)], { type: 'image/gif' }); }
  }

  const exportGif = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const frames = Math.round(fps * duration);
    const gif = new GifWriter(size, size);

    for (let f = 0; f < frames; f++) {
      const t = f / frames; // [0,1)
      draw(ctx, t);
      const { data } = ctx.getImageData(0, 0, size, size);
      const { index, palette } = quantizeRGBA(data);
      const delayCS = Math.round(100 / fps); // centiseconds per frame
      gif.frame(index, palette, delayCS);
      await new Promise((r) => setTimeout(r, 0)); // yield to keep UI responsive
    }

    const blob = gif.end();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [size, fps, duration, draw, filename]);

  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: 12 }}>
      <canvas ref={canvasRef} width={size} height={size} />
      <button
        onClick={exportGif}
        style={{
          padding: '10px 16px',
          borderRadius: 8,
          border: '1px solid #ddd',
          background: '#fff',
          cursor: 'pointer',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        Export GIF
      </button>
    </div>
  );
};

export default GlobeLatitudesGif;
