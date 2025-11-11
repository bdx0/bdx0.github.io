import React from "react";

interface LogoProps {
  color1: string;
  color2: string;
  height: string;
}

const Logo: React.FC<LogoProps> = ({ color1, color2, height }) => {
  const gradientId = "theme-logo-gradient";
  return (
    <svg
      width="100"
      height="70"
      viewBox="0 0 242.7 70"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: height, verticalAlign: "middle" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: color1, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color2, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        fontSize="9pt"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.25mm"
        fill={`url(#${gradientId})`}
      >
        <path
          d="M 139.7 70 L 120.8 70 L 134.4 40.5 L 121.8 14 L 140.5 14 L 148 34.5 L 153.4 34.5 L 160.9 14 L 179.6 14 L 167 40.5 L 180.6 70 L 161.7 70 L 154.1 48.5 L 147.3 48.5 L 139.7 70 Z M 97.6 0 L 114.4 0 L 114.4 70 L 73.8 70 L 61.2 57.4 L 61.2 26.6 L 73.8 14 L 97.6 14 L 97.6 0 Z M 40.6 70 L 0 70 L 0 0 L 16.8 0 L 16.8 14 L 40.6 14 L 53.2 26.6 L 53.2 57.4 L 40.6 70 Z M 198.9 70 L 186.7 57.8 L 186.7 12.2 L 198.9 0 L 230.5 0 L 242.7 12.2 L 242.7 57.8 L 230.5 70 L 198.9 70 Z M 225.9 15.2 L 203.5 15.2 L 203.5 54.8 L 225.9 54.8 L 225.9 15.2 Z M 78 28 L 78 56 L 97.6 56 L 97.6 28 L 78 28 Z M 16.8 28 L 16.8 56 L 36.4 56 L 36.4 28 L 16.8 28 Z"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
};

export default Logo;
