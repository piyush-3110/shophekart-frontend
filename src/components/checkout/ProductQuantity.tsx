"use client";

import { useState } from "react";
import { Input } from "../ui/input";

export interface ProductQuantityProps {
  /**
   * Initial quantity value.
   */
  initialValue?: number;

  /**
   * Minimum quantity value.
   */
  min?: number;

  /**
   * Maximum quantity value.
   */
  max?: number;

  /**
   * Step value for increment/decrement.
   */
  step?: number;

  /**
   * Input field type.
   */
  inputType?: "number" | "tel";

  /**
   * onChange callback event.
   */
  onChange?: (value: number) => void;

  /**
   * Size of the quantity buttons.
   */
  buttonSize?: "sm" | "md" | "lg";

  /**
   * Class name for the container element.
   */
  containerClassName?: string;

  /**
   * Class name for the input field element.
   */
  inputClassName?: string;

  /**
   * Class name for the button elements.
   */
  buttonClassName?: string;
}

function ProductQuantity({
  initialValue = 1,
  min = 1,
  max = 10,
  step = 1,
  inputType = "number",
  onChange,
  buttonSize = "sm",
  containerClassName = "",
  inputClassName = "quantity",
  buttonClassName = "",
}: ProductQuantityProps) {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    if (value < max) {
      setValue(value + step);
      onChange?.(value + step);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      setValue(value - step);
      onChange?.(value - step);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange?.(newValue);
  };

  const sizes = {
    sm: "px-3 aspect-square border border-neutral-300 bg-[#F4F6FA] rounded-sm",
    md: "px-4 aspect-square border border-neutral-300 bg-[#F4F6FA] rounded-md",
    lg: "px-5 aspect-square border border-neutral-300 bg-[#F4F6FA] rounded-lg",
  };

  return (
    <div className={`flex items-center gap-2 ${containerClassName}`}>
      <button
        type="button"
        className={`${sizes[buttonSize]} ${buttonClassName}`}
        onClick={handleDecrement}
      >
        -
      </button>
      <Input
        value={value}
        type={inputType}
        aria-label="Quantity"
        onChange={handleChange}
        className={`w-12 text-center ${inputClassName}`}
      />
      <button
        type="button"
        className={`${sizes[buttonSize]} ${buttonClassName}`}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}

export default ProductQuantity;
