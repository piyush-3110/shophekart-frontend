import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ItemImageProps {
    mainImage: string;
    images: string[];
    altText?: string;
}

const ItemImage: React.FC<ItemImageProps> = ({ mainImage, images, altText }) => {
    const [activeImage, setActiveImage] = useState<string>(mainImage);

    useEffect(() => {
        setActiveImage(mainImage);
    }, [mainImage]);

    return (
        <div className="bg-[#F4F6FA] shadow-sm p-2 rounded-lg w-full lg:w-[30vw]">

            <div className="flex items-center justify-center h-60">
                <Image
                    className="h-full w-full object-cover rounded-md"
                    src={activeImage}
                    height={524}
                    width={524}
                    alt={altText || "Main Item"}
                />
            </div>
            {/* Thumbnail Images */}
            <div className="flex justify-center mt-2">
                <div className="grid grid-cols-4 gap-1">
                    {images.map((thumbnail, index) => (
                        <Image
                            key={index}
                            height={70}
                            width={70}
                            className="w-16 h-16 bg-white object-contain rounded-md cursor-pointer"
                            src={thumbnail}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => setActiveImage(thumbnail)}
                            style={{
                                border: activeImage === thumbnail ? '2px solid #4A90E2' : 'none',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemImage;
