// src/icons/CartIcon.tsx (1-65)
import React from "react";

interface CartIconProps {
  /**
   * The width of the icon, default is 26.
   */
  width?: number;
  /**
   * The height of the icon, default is 26.
   */
  height?: number;
  /**
   * The fill color of the icon, default is none.
   */
  fillColor?: string;
  /**
   * The stroke color of the icon, default is #110F0F.
   */
  strokeColor?: string;
  /**
   * The stroke width of the icon, default is 1.5.
   */
  strokeWidth?: number;
}

const CartIcon = ({
  width = 26,
  height = 26,
  fillColor = "none",
  strokeColor = "#110F0F",
  strokeWidth = 1.5,
}: CartIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.125 8.30905V7.25822C8.125 4.82072 10.0858 2.42655 12.5233 2.19905C15.4267 1.91739 17.875 4.20322 17.875 7.05239V8.54739"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.74957 23.8334H16.2496C20.6046 23.8334 21.3846 22.0892 21.6121 19.9659L22.4246 13.4659C22.7171 10.8226 21.9587 8.66675 17.3329 8.66675H8.66624C4.0404 8.66675 3.28207 10.8226 3.57457 13.4659L4.38707 19.9659C4.61457 22.0892 5.39457 23.8334 9.74957 23.8334Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth + 0.5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.7867 12.9999H16.7964"
        stroke={strokeColor}
        strokeWidth={strokeWidth + 0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.20271 12.9999H9.21244"
        stroke={strokeColor}
        strokeWidth={strokeWidth + 0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CartIcon;
