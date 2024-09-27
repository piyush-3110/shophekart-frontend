// src/components/shared/Button.tsx

import { twMerge } from "tailwind-merge";
import React from "react";

/**
 * Enum of possible button variants.
 * @enum {string}
 */
export enum ButtonVariant {
  /**
   * Primary button variant.
   */
  PRIMARY = "primary",
  /**
   * Secondary button variant.
   */
  SECONDARY = "secondary",
  /**
   * Tertiary button variant.
   */
  TERTIARY = "tertiary",
  /**
   * Transparent button variant.
   */
  TRANSPARENT = "transparent",
}

/**
 * Enum of possible button sizes.
 * @enum {string}
 */
export enum ButtonSize {
  /**
   * Small button size.
   */
  SMALL = "small",
  /**
   * Medium button size.
   */
  MEDIUM = "medium",
  /**
   * Large button size.
   */
  LARGE = "large",
}

/**
 * Enum of possible button shapes.
 * @enum {string}
 */
export enum ButtonShape {
  /**
   * Round button shape.
   */
  ROUND = "round",
  /**
   * Square button shape.
   */
  SQUARE = "square",
}

/**
 * Enum of possible button types.
 * @enum {string}
 */
export enum ButtonType {
  /**
   * button button type.
   */
  BUTTON = "button",
  /**
   * submit button type.
   */
  SUBMIT = "submit",
  /**
   * reset button type.
   */
  RESET = "reset",
}

/**
 * Interface for Button component props.
 * @interface
 */
type ButtonProps = {
  /**
   * The variant of the button (PRIMARY, SECONDARY, TERTIARY).
   * Defaults to PRIMARY.
   * @memberof ButtonProps
   */
  variant?: ButtonVariant;
  /**
   * The type of the button (BUTTON, SUBMIT, RESET).
   * Defaults to BUTTON.
   * @memberof ButtonProps
   */
  type?: ButtonType;
  /**
   * The size of the button (SMALL, MEDIUM, LARGE).
   * Defaults to MEDIUM.
   * @memberof ButtonProps
   */
  size?: ButtonSize;
  /**
   * The shape of the button (ROUND, SQUARE).
   * Defaults to SQUARE.
   * @memberof ButtonProps
   */
  shape?: ButtonShape;
  /**
   * Indicates whether the button is active.
   * @memberof ButtonProps
   */
  active?: boolean;
  /**
   * The children elements of the button.
   * @memberof ButtonProps
   */
  children: React.ReactNode;
  /**
   * Additional class names for the button.
   * @memberof ButtonProps
   */
  className?: string;
  /**
   * Animation settings for the button (optional).
   * @memberof ButtonProps
   */
  animation?: {
    /**
     * Transition settings for the button.
     * @memberof ButtonProps.animation
     */
    transition: {
      /**
       * The duration of the transition in milliseconds.
       * @memberof ButtonProps.animation.transition
       */
      duration: number;
      /**
       * The ease of the transition (e.g. "ease-in", "ease-out", etc.).
       * @memberof ButtonProps.animation.transition
       */
      ease: string;
    };
  };
} & React.HTMLAttributes<HTMLButtonElement>;

/**
 * Mapping of button variants to their corresponding styles.
 * @constant
 */
const useStyles = {
  [ButtonVariant.PRIMARY]:
    "bg-primary-gradient hover:bg-primary-gradient-reverse text-white",
  [ButtonVariant.SECONDARY]:
    "bg-transparent hover:bg-neutral-200 hover:text-neutral-700 text-[#6B6F93]",
  [ButtonVariant.TERTIARY]: "bg-tertiary hover:bg-tertiary-dark text-white",
  [ButtonVariant.TRANSPARENT]: "bg-transparent text-white",
};

/**
 * Mapping of button sizes to their corresponding styles.
 * @constant
 */
const useSizeStyles = {
  [ButtonSize.SMALL]: "px-4 py-2 text-sm",
  [ButtonSize.MEDIUM]: "px-6 py-3 text-md",
  [ButtonSize.LARGE]: "px-8 py-4 text-lg",
};

/**
 * Mapping of button shapes to their corresponding styles.
 * @constant
 */
const useShapeStyles = {
  [ButtonShape.ROUND]: "rounded-lg",
  [ButtonShape.SQUARE]: "rounded-none",
};

/**
 * The Button component.
 * @param {ButtonProps} props The props for the Button component.
 * @returns {JSX.Element} The Button component.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = ButtonType.BUTTON,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  shape = ButtonShape.SQUARE,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      type={type}
      className={twMerge(
        useStyles[variant],
        useSizeStyles[size],
        useShapeStyles[shape],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
