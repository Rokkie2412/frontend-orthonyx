import React from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';

type LogoProps = {
  navigatePath: string;
};

const Logo = ({ navigatePath }: LogoProps): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const handleClick = () => {
    navigate(navigatePath);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center space-x-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-cyan-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M4.93 4.93l1.41 1.41M19.07 19.07l1.41-1.41M4.93 19.07l1.41-1.41M19.07 4.93l1.41 1.41"
        />
      </svg>
      <div className="text-3xl font-extrabold tracking-tight flex items-center space-x-1">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400">
          MEDIC
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
          are
        </span>
      </div>
    </div>
  );
};

export default Logo;
