import { cn } from "@/lib/utils";
import React from "react";

interface CloseIconProps extends React.HtmlHTMLAttributes<SVGElement> {
  className?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={cn(className)}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="18" height="18" fill="url(#pattern0_1_3357)" />
      <defs>
        <pattern
          id="pattern0_1_3357"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1_3357" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_1_3357"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACAKADAAQAAAABAAACAAAAAAAL+LWFAAAyjUlEQVR4Ae3de9Bc5X0f8Gd1AyQQNyEwF9uxw0VBIaWJTR2wcTpJMxOP3QGLtLk4bi7NHzYZTxzkQLG52FAUxIxnQlL6R6dtQuy4g+y4eNJ0Eie1I6B20iTmomDAJjbmYoQQQqAXJCGdPud9tUh69e777uVcnnPOZ2dW+7675zzneT6/o/f57tmzuyG4ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoBiBXjHNaKVogex97zsuLF16bli06JyQZWti++fE61nxemy8rojXEw/cLou3LgQIEKhDYE/c6K54fSFe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IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBFoq8P8BHb/N/fxn67EAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export default CloseIcon;