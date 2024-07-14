import api from './api';

export const getAllBreeds = async () => {
  return await api.get('/breeds/list/all');
};

export const getByBreed = async (breed: string) => {
  return await api.get(`/breed/${breed}/images`);
};

export const getSubBreeds = async (breed: string) => {
  return await api.get(`/breed/${breed}/list`);
};

export const getBySubBreed = async (breed: string, subbreed: string) => {
  return await api.get(`/breed/${breed}/${subbreed}/images`);
};
