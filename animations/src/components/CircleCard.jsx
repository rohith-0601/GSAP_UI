import React from "react";

export default function CircleCard() {
  return (
    <>
      <div className="circle-wrapper">
        <div className="circle">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <style>
        {`
        .circle-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #fff;
        }

        .circle {
          position: relative;
          width: 200px;
          height: 200px;
          border: 2px solid #e74c3c;  /* outer static circle */
          border-radius: 50%;
        }

        .circle span {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid #e74c3c;
          border-radius: 50%;
          top: 0;
          left: 0;
          animation: rotateLine 10s linear infinite;
        }

        /* Different tilts for longitude lines */
        .circle span:nth-child(1) {
          transform: rotateY(30deg);
          animation-delay: 0s;
        }
        .circle span:nth-child(2) {
          transform: rotateY(60deg);
          animation-delay: 0.2s;
        }
        .circle span:nth-child(3) {
          transform: rotateY(90deg);
          animation-delay: 0.4s;
        }
        .circle span:nth-child(4) {
          transform: rotateY(120deg);
          animation-delay: 0.6s;
        }
        .circle span:nth-child(5) {
          transform: rotateY(150deg);
          animation-delay: 0.8s;
        }
          .circle span:nth-child(6) {
          transform: rotateY(150deg);
          animation-delay: 1.0s;
        }.circle span:nth-child(7) {
          transform: rotateY(150deg);
          animation-delay: 1.2s;
        }.circle span:nth-child(8) {
          transform: rotateY(150deg);
          animation-delay: 1.4s;
        }.circle span:nth-child(9) {
          transform: rotateY(150deg);
          animation-delay: 1.6s;
        }.circle span:nth-child(10) {
          transform: rotateY(150deg);
          animation-delay: 1.8s;
        }.circle span:nth-child(11) {
          transform: rotateY(150deg);
          animation-delay: 2.0s;
        }.circle span:nth-child(12) {
          transform: rotateY(150deg);
          animation-delay: 2.0s;
        }

        @keyframes rotateLine {
          0% {
            transform: rotateY(var(--angle, 0deg)) rotateX(0deg);
          }
          100% {
            transform: rotateY(var(--angle, 0deg)) rotateX(360deg);
          }
        }
        `}
      </style>
    </>
  );
}
