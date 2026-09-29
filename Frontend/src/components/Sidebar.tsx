import type { CSSProperties } from "react";

const WORDS = ["MANAGE", "YOUR", "TASKS"];

export default function Sidebar() {
  let index = 0;

  return (
    <>
      <style>
        {`
          .taskpro-inner {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
            padding: 0 8px;
          }

          /* ---------- TASK PRO logo ---------- */
          .taskpro-logo-wrap {
            position: relative;
            margin-top: 35px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .taskpro-logo-wrap::before {
            content: "";
            position: absolute;
            inset: -14px -20px;
            background: linear-gradient(90deg, #c2185b, #d35400, #b8860b, #0b8a5f, #0277a8, #3730a3, #86209f, #c2185b);
            background-size: 300% 100%;
            filter: blur(28px);
            opacity: 0.22;
            border-radius: 999px;
            animation: rainbowFlow 6s linear infinite;
            z-index: 0;
          }

          .taskpro-logo {
            position: relative;
            z-index: 1;
            font-size: 34px;
            font-weight: 900;
            letter-spacing: -0.04em;
            line-height: 1;
            background: linear-gradient(90deg, #c2185b, #d35400, #b8860b, #0b8a5f, #0277a8, #3730a3, #86209f, #c2185b);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: #3730a3;
            animation: rainbowFlow 6s linear infinite, logoFloat 4s ease-in-out infinite;
          }

          .taskpro-bar {
            position: relative;
            z-index: 1;
            margin-top: 12px;
            width: 60px;
            height: 5px;
            border-radius: 999px;
            background: linear-gradient(90deg, #c2185b, #d35400, #b8860b, #0b8a5f, #0277a8, #3730a3, #86209f, #c2185b);
            background-size: 300% 100%;
            animation: rainbowFlow 6s linear infinite, barPulse 3s ease-in-out infinite;
          }

          /* ---------- MANAGE YOUR TASKS ---------- */
          .manage-task-animation {
            margin-top: 34px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .manage-word {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3px;
          }

          .manage-task-animation span {
            display: block;
            font-size: 20px;
            font-weight: 800;
            line-height: 1;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            color: hsl(calc(250 + var(--i) * 6), 80%, 58%);
            text-shadow: 0 4px 16px hsla(calc(250 + var(--i) * 6), 85%, 60%, 0.4);
            opacity: 0;
            transform: translateY(-18px) scale(0.4) rotate(-12deg);
            filter: blur(6px);
            animation: letterOneByOne 9s cubic-bezier(0.22, 1, 0.36, 1) infinite;
            animation-delay: calc(var(--i) * 0.28s);
          }

          @keyframes letterOneByOne {
            0% {
              opacity: 0;
              transform: translateY(-18px) scale(0.4) rotate(-12deg);
              filter: blur(6px);
            }
            5% {
              opacity: 1;
              transform: translateY(2px) scale(1.25) rotate(3deg);
              filter: blur(0);
            }
            8% {
              transform: translateY(0) scale(1) rotate(0deg);
            }
            68% {
              opacity: 1;
              transform: translateY(0) scale(1) rotate(0deg);
              filter: blur(0);
            }
            76% {
              opacity: 0;
              transform: translateY(18px) scale(0.4) rotate(12deg);
              filter: blur(6px);
            }
            100% {
              opacity: 0;
              transform: translateY(18px) scale(0.4) rotate(12deg);
              filter: blur(6px);
            }
          }

          @keyframes rainbowFlow {
            0%   { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
          }

          @keyframes logoFloat {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-3px); }
          }

          @keyframes barPulse {
            0%, 100% { width: 60px; }
            50%      { width: 90px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .manage-task-animation span {
              animation: none;
              opacity: 1;
              transform: none;
              filter: none;
            }
            .taskpro-logo, .taskpro-bar, .taskpro-logo-wrap::before {
              animation: none;
            }
          }
        `}
      </style>

      <aside className="sidebar">
        <div className="taskpro-inner">
          <div className="taskpro-logo-wrap">
            <div className="taskpro-logo">TASK PRO</div>
            <div className="taskpro-bar" />
          </div>

          <div className="manage-task-animation">
            {WORDS.map((word) => (
              <div className="manage-word" key={word}>
                {word.split("").map((letter, i) => (
                  <span
                    key={`${word}-${i}`}
                    style={{ "--i": index++ } as CSSProperties}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}