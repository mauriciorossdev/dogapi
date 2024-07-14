import React from 'react';
import { render } from '@testing-library/react';
import ImageGallery from './ImageGallery';

/**
 * Test suite for the ImageGallery component
 */
describe('ImageGallery', () => {
  /**
   * Validate that the component renders without crashing
   */
  it('renders the correct number of images', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const { getAllByAltText } = render(<ImageGallery images={images} />);
    const imageElements = getAllByAltText('dog image');
    expect(imageElements.length).toBe(images.length);
  });

  /**
   * Validate that the correct image sources are rendered
   */
  it('renders the correct image sources', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const { getAllByAltText } = render(<ImageGallery images={images} />);
    const imageElements = getAllByAltText('dog image');
    imageElements.forEach((element, index) => {
      expect(element.getAttribute('src')).toBe(images[index]);
    });
  });
});
