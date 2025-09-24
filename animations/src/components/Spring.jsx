// import React from "react";

// export default function SpringPressAnimation() {
//   return (
//     <>
//       <div className="spring-wrapper">
//         <div className="spring-container">
//           <div className="circle circle-1"></div>
//           <div className="circle circle-2"></div>
//           <div className="circle circle-3"></div>
//           <div className="circle circle-4"></div>
//           <div className="circle circle-5"></div>
//           <div className="circle circle-6"></div>
//         </div>
//       </div>

//       <style>
//         {`
//         .spring-wrapper {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh;
//           background: #fff;
//         }

//         .spring-container {
//           position: relative;
//           width: 250px;
//           height: 120px;
//           transform: rotate(-10deg);
//         }

//         .circle {
//           position: absolute;
//           width: 100px;
//           height: 100px;
//           border: 3px solid #e74c3c;
//           border-radius: 50%;
//           top: 50%;
//           transform: translateY(-50%);
//           animation: springCompress 3s ease-in-out infinite;
//         }

//         .circle-1 { 
//           left: 0px; 
//           animation-delay: 0s;
//         }
//         .circle-2 { 
//           left: 20px; 
//           animation-delay: 0.1s;
//         }
//         .circle-3 { 
//           left: 40px; 
//           animation-delay: 0.2s;
//         }
//         .circle-4 { 
//           left: 60px; 
//           animation-delay: 0.3s;
//         }
//         .circle-5 { 
//           left: 80px; 
//           animation-delay: 0.4s;
//         }
//         .circle-6 { 
//           left: 100px; 
//           animation-delay: 0.5s;
//         }

//         @keyframes springCompress {
//           0%, 100% { 
//             left: var(--original-left);
//           }
//           50% { 
//             left: calc(var(--original-left) * 0.6 + 15px);
//           }
//         }

//         .circle-1 { --original-left: 0px; }
//         .circle-2 { --original-left: 20px; }
//         .circle-3 { --original-left: 40px; }
//         .circle-4 { --original-left: 60px; }
//         .circle-5 { --original-left: 80px; }
//         .circle-6 { --original-left: 100px; }
//         `}
//       </style>
//     </>
//   );
// }
import React from "react";
import { useReducer } from "react";

export default function SpringPressAnimation() {
  return (
    <>
      <div
        className="C4-spring-wrapper"
        style={{
          width: "300px",  // increased
          height: "300px", // increased
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div className="C4-spring-container">
          <div className="C4-circle C4-circle-1"></div>
          <div className="C4-circle C4-circle-2"></div>
          <div className="C4-circle C4-circle-3"></div>
          <div className="C4-circle C4-circle-4"></div>
          <div className="C4-circle C4-circle-5"></div>
          <div className="C4-circle C4-circle-6"></div>
        </div>
      </div>

      <style>
        {`
        .C4-spring-container {
          position: relative;
          width: 220px; /* increased */
          height: 140px; /* increased */
          transform: rotate(-10deg);
        }

        .C4-circle {
          position: absolute;
          width: 70px;  /* increased */
          height: 70px; /* increased */
          border: 3px solid #e74c3c;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          animation: C4-springCompress 3s ease-in-out infinite;
        }

        .C4-circle-1 { left: 0px; animation-delay: 0s; --original-left: 0px; }
        .C4-circle-2 { left: 30px; animation-delay: 0.1s; --original-left: 30px; }
        .C4-circle-3 { left: 60px; animation-delay: 0.2s; --original-left: 60px; }
        .C4-circle-4 { left: 90px; animation-delay: 0.3s; --original-left: 90px; }
        .C4-circle-5 { left: 120px; animation-delay: 0.4s; --original-left: 120px; }
        .C4-circle-6 { left: 150px; animation-delay: 0.5s; --original-left: 150px; }

        @keyframes C4-springCompress {
          0%, 100% { 
            left: var(--original-left);
          }
          50% { 
            left: calc(var(--original-left) * 0.6 + 20px);
          }
        }
        `}
      </style>
    </>
  );
}
