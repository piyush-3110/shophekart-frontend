import React from "react";

export interface ShippingIconProps extends React.HTMLAttributes<SVGElement> {
  /**
   * The color of the shipping icon.
   * @default #1C274C
   */
  color?: string;

  /**
   * The size of the shipping icon.
   * @default 22
   */
  size?: number;

  /**
   * The stroke width of the shipping icon.
   * @default 1.5
   */
  strokeWidth?: number;
}

const ShippingIcon: React.FC<ShippingIconProps> = ({
  color = "#1C274C",
  size = 22,
  strokeWidth = 1.5,
  ...props
}) => {
  const viewBox = `0 0 ${size} ${size}`;

  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.2792 3.10006L16.1126 4.06214C18.0849 5.09719 19.0711 5.61472 19.6187 6.54468C20.1663 7.47465 20.1663 8.63187 20.1663 10.9463V11.0535C20.1663 13.368 20.1663 14.5252 19.6187 15.4552C19.0711 16.3851 18.0849 16.9026 16.1126 17.9377L14.2792 18.8998C12.6699 19.7443 11.8653 20.1666 10.9997 20.1666C10.1341 20.1666 9.32943 19.7443 7.72011 18.8998L5.88678 17.9377C3.91442 16.9026 2.92824 16.3851 2.38062 15.4552C1.83301 14.5252 1.83301 13.368 1.83301 11.0535V10.9463C1.83301 8.63187 1.83301 7.47465 2.38062 6.54468C2.92824 5.61472 3.91442 5.09719 5.88678 4.06214L7.72011 3.10005C9.32943 2.25552 10.1341 1.83325 10.9997 1.83325C11.8653 1.83325 12.6699 2.25552 14.2792 3.10006Z"
        stroke={color}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
      />
      <path
        d="M19.25 6.875L15.5833 8.70833M11 11L2.75 6.875M11 11V19.7083M11 11C11 11 13.5141 9.74296 15.125 8.9375C15.304 8.848 15.5833 8.70833 15.5833 8.70833M15.5833 8.70833V11.9167M15.5833 8.70833L6.875 4.125"
        stroke={color}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
      />
    </svg>
  );
};

export default ShippingIcon;