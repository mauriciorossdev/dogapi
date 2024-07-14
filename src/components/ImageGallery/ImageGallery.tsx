import React from 'react';
import { ImageGalleryProps } from '../../types/imageGallery';


const stylesTw =
  'masonry sm:masonry-sm md:masonry-md mb-4 rounded-md hover:brightness-125 hover:cursor-pointer transition duration-300 min-w-full';

/**
 * ImageGallery component
 *
 * @param images List of image URLs to display
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="masonry sm:masonry-sm md:masonry-md">
      {images.map((image, index) => (
        <div key={index} className="mb-4">
          <img src={image} alt={`dog image`} className={stylesTw} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
