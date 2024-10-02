import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { ShippingIcon } from "@/icons";

interface ProductItemProps {
  productImage: string;
  productName: string;
  shippingType: string;
  category: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSize?: { width: number; height: number };
  imageAspect?: string;
  imageObjectFit?: string;
  badgeClassName?: string;
  productNameClassName?: string;
  shippingIconClassName?: string;
  shippingTextClassName?: string;
  children?: ReactNode;
  actionButton?: ReactNode;
  onActionButtonClick?: () => void;
}

function ProductItem({
  productImage,
  productName,
  shippingType,
  category,
  className = "",
  imageWidth = 80,
  imageHeight = 80,
  imageSize,
  imageAspect = "aspect-square",
  imageObjectFit = "object-contain",
  badgeClassName,
  productNameClassName,
  shippingIconClassName,
  shippingTextClassName,
  children,
  actionButton,
  onActionButtonClick,
}: ProductItemProps) {
  return (
    <div className={cn(`flex gap-4 `, className)}>
      <div className="p-4 flex items-center justify-center bg-[#F4F6FA] rounded-sm w-20 aspect-square">
        <Image
          src={productImage}
          alt={productName}
          width={imageSize?.width || imageWidth}
          height={imageSize?.height || imageHeight}
          className={cn(
            imageAspect,
            imageObjectFit,
            "w-40",
            "aspect-square",
            `w-${imageWidth}`
          )}
        />
      </div>
      <div className="flex flex-col justify-between">
        <Badge
          className={cn(
            "bg-[#022BFF] hover:bg-[#022BFF]/90 cursor-default font-normal  px-2 py-1 rounded-full w-fit text-nowrap",
            badgeClassName
          )}
        >
          {category}
        </Badge>
        <p className={cn(productNameClassName || "font-bold")}>{productName}</p>
        <p
          className={cn(
            shippingTextClassName || "text-[#6B6F93] flex items-center gap-2"
          )}
        >
          <ShippingIcon
            className={cn(shippingIconClassName)}
            color={"#6B6F93"}
          />
          <span>{shippingType}</span>
        </p>
        {children && <div>{children}</div>}
        {actionButton && (
          <button
            type="button"
            onClick={onActionButtonClick}
            className="bg-[#022BFF] rounded-full"
          >
            {actionButton}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
