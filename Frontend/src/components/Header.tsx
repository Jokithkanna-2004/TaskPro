import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const email = localStorage.getItem("email") || "";
  const storedName = localStorage.getItem("name");

  const rawName = storedName
    ? storedName
    : email
    ? email.split("@")[0]
    : "User";

  const cleanName = rawName.replace(/[0-9]/g, "").trim();

  const name =
    cleanName.charAt(0).toUpperCase() +
    cleanName.slice(1).toLowerCase();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="top-header">
      <style>
        {`
          .greeting-line {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: baseline;
            gap: 8px;
            white-space: nowrap;
          }

          .greeting-wave {
            display: inline-block;
            font-size: 22px;
            animation: waveHand 2.2s ease-in-out infinite;
            transform-origin: 70% 70%;
          }

          .greeting-text {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.01em;
            background: linear-gradient(90deg, #1e1b4b, #4338ca 45%, #7c3aed 75%, #1e1b4b);
            background-size: 250% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: #000000;
            animation: greetingShine 5s linear infinite;
          }

          @keyframes greetingShine {
            0%   { background-position: 0% 50%; }
            100% { background-position: 250% 50%; }
          }

          @keyframes waveHand {
            0%, 100% { transform: rotate(0deg); }
            15%      { transform: rotate(18deg); }
            30%      { transform: rotate(-10deg); }
            45%      { transform: rotate(14deg); }
            60%      { transform: rotate(-6deg); }
            75%      { transform: rotate(0deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .greeting-wave,
            .greeting-text {
              animation: none;
            }
          }
        `}
      </style>

      <div className="header-title">TaskPro</div>

      <div className="greeting-line">
       
        <span className="greeting-text">Hello {name}, have a nice day</span>
      </div>

      <div className="profile">
        <div className="avatar" onClick={() => setOpen(!open)}>
          {name.charAt(0).toUpperCase()}
        </div>

        {open && (
          <div className="profile-menu">
            {/* USER INFO */}
            <div className="profile-info">
              <div className="profile-name">{name}</div>
              <div className="profile-email">{email}</div>
            </div>

            <hr />

            {/* LOGOUT */}
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}