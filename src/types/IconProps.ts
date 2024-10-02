interface IconProps extends React.HtmlHTMLAttributes<SVGElement> {
  /**
   * Width of the icon
   */
  width?: number;
  /**
   * Height of the icon
   */
  height?: number;
  /**
   * Fill color of the icon
   */
  fill?: string;
  /**
   * view box of the icon
   */
  viewBox?: string;
}

export default IconProps;
