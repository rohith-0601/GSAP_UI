import React from "react";

export default function CircleCard() {
  return (
    <>
      <div className="sphere-wrap">
        <div className="sphere">
          <div className="mask">
            {/* These are the static lines */}
            <div className="lat lat1" />
            <div className="lat lat2" />
            <div className="lat lat3" />
            <div className="lat lat4" />
            <div className="lat lat5" />
          </div>
          <div className="rim" />
        </div>
      </div>

      <style>{`
        :root{
          --D: 220px;
          --stroke: 2px;
          --col: #e74c3c;
        }

        .sphere-wrap{
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background:#fff;
        }

        .sphere{
          position: relative;
          width: var(--D);
          height: var(--D);
        }

        .rim{
          position:absolute;
          inset:0;
          border: var(--stroke) solid var(--col);
          border-radius: 50%;
          pointer-events:none;
        }

        .mask{
          position:absolute;
          inset: calc(var(--stroke) * 0.5);
          border-radius:50%;
          overflow:hidden;
        }

        /* The static latitude lines */
        .lat{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          border: var(--stroke) solid var(--col);
          border-radius: 50% / 50%;
          background: transparent;
        }

        /* The top-most line */
        .lat1 {
          top: 10%;
          width: 86%;
          height: 26%;
        }

        /* The second line from the top */
        .lat2 {
          top: 25%;
          width: 92%;
          height: 30%;
        }

        /* The center line */
        .lat3 {
          top: 45%; /* Slightly offset to be a bit above center */
          width: 98%;
          height: 36%;
        }

        /* The second line from the bottom */
        .lat4 {
          bottom: 25%;
          width: 92%;
          height: 30%;
        }

        /* The bottom-most line */
        .lat5 {
          bottom: 10%;
          width: 86%;
          height: 26%;
        }
      `}</style>
    </>
  );
}