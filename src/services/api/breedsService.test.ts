import {
  getAllBreeds,
  getByBreed,
  getSubBreeds,
  getBySubBreed,
} from './breedsService';

/**
 * Unit tests for breedsService
 */
describe('breedsService', () => {
  /**
   * Test suite for getAllBreeds
   */
  describe('getAllBreeds', () => {
    it('should call api.get with the correct endpoint', async () => {
      const response = await getAllBreeds();
      expect(response.config.url).toBe('/breeds/list/all');
    });
  });

  /**
   * Test suite for getByBreed
   */
  describe('getByBreed', () => {
    it('should call api.get with the correct endpoint', async () => {
      const response = await getByBreed('australian');
      expect(response.config.url).toBe('/breed/australian/images');
    });
  });

  /**
   * Test suite for getSubBreeds
   */
  describe('getSubBreeds', () => {
    it('should call api.get with the correct endpoint', async () => {
      const response = await getSubBreeds('bulldog');
      expect(response.config.url).toBe('/breed/bulldog/list');
    });
  });

  /**
   * Test suite for getBySubBreed
   */
  describe('getBySubBreed', () => {
    it('should call api.get with the correct endpoint', async () => {
      const response = await getBySubBreed('bulldog', 'english');
      expect(response.config.url).toBe('/breed/bulldog/english/images');
    });
  });
});
