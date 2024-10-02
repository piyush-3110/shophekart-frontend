// src/icons/TranslateIcon.tsx
import React from "react";

interface TranslateIconProps {
  /**
   * The width of the icon.
   */
  width?: number | string;
  /**
   * The height of the icon.
   */
  height?: number | string;
  /**
   * The fill color of the icon.
   */
  fill?: string;
  /**
   * The stroke color of the icon.
   */
  stroke?: string;
  /**
   * The stroke width of the icon.
   */
  strokeWidth?: number;
  /**
   * The stroke line cap of the icon.
   */
  strokeLineCap?: "round" | "butt" | "square";
  /**
   * The stroke line join of the icon.
   */
  strokeLineJoin?: "round" | "bevel" | "miter";
  /**
   * The className of the icon.
   */
  className?: string;
}

const TranslateIcon = ({
  width = 24,
  height = 24,
  fill = "none",
  stroke = "#292D32",
  strokeWidth = 1.5,
  strokeLineCap = "round",
  strokeLineJoin = "round",
  className = "",
}: TranslateIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.0603 18.6699L16.9203 14.3999L14.7803 18.6699"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M15.1699 17.9099H18.6899"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M16.9198 22.0001C14.1198 22.0001 11.8398 19.73 11.8398 16.92C11.8398 14.12 14.1098 11.8401 16.9198 11.8401C19.7198 11.8401 21.9998 14.11 21.9998 16.92C21.9998 19.73 19.7298 22.0001 16.9198 22.0001Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M9.01019 5.84985H4.9502"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M6.9707 5.16992V5.84991"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M7.99043 5.83984C7.99043 7.58984 6.62043 9.00983 4.94043 9.00983"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
      <path
        d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
      />
    </svg>
  );
};

export default TranslateIcon;
