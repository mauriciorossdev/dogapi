// hooks/useBreeds.ts
import { useEffect, useState } from 'react';
import {
  getAllBreeds,
  getSubBreeds,
  getBySubBreed,
  getByBreed,
} from '../services/api/breedsService';
import { MultiValue } from 'react-select';

export function useBreeds() {
  const [ListBreeds, setListBreeds] = useState<
    { label: string; value: string }[]
  >([]);
  const [SelectedBreeds, setSelectedBreeds] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);
  const [ListSubBreeds, setListSubBreeds] = useState<
    { label: string; value: string }[]
  >([]);
  const [SelectedSubBreeds, setSelectedSubBreeds] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);
  const [images, setImages] = useState<string[]>([]);
  const [HasError, setHasError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState({ message: '', status: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllBreeds();
      const data = response.data.message;
      const breeds = Object.keys(data).map((breed) => ({
        label: breed,
        value: breed,
      }));
      setListBreeds(breeds);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubBreeds = async () => {
      const promises = SelectedBreeds.map((breed) => getSubBreeds(breed.value));
      const responses = await Promise.all(promises);

      let allSubBreeds: { label: string; value: string }[] = [];
      responses.forEach((response, index) => {
        const data = response.data.message;
        const subBreeds = data.map((subbreed: string) => ({
          label: `${SelectedBreeds[index].value} - ${subbreed}`,
          value: subbreed as string,
        }));
        allSubBreeds = [...allSubBreeds, ...subBreeds];
      });
      setListSubBreeds(allSubBreeds);
    };

    if (SelectedBreeds.length > 0) {
      fetchSubBreeds();
      const filteredSubBreeds = SelectedSubBreeds.filter((subBreed) => {
        const [breed] = subBreed.label.split(' - ');
        return SelectedBreeds.find(
          (selectedBreed) => selectedBreed.value === breed
        );
      });
      setSelectedSubBreeds(filteredSubBreeds);
    } else {
      setSelectedSubBreeds([]);
      setListSubBreeds([]);
      setImages([]);
    }
  }, [SelectedBreeds]);

  const getImages = async () => {
    if (SelectedBreeds.length === 0) {
      setHasError(true);
      setErrorMessage({ message: 'No breeds selected', status: 400 });
      return;
    }
    setHasError(false);
    setErrorMessage({ message: '', status: 0 });
    setImages([]);

    if (SelectedSubBreeds.length === 0) {
      const promises = SelectedBreeds.map((breed) => getByBreed(breed.value));
      const responses = await Promise.all(promises);

      const allImages: string[] = [];
      responses.forEach((response) => {
        allImages.push(...response.data.message);
      });

      setImages(allImages);
      return;
    }

    const promises = SelectedSubBreeds.map((subBreed) => {
      const [breed, sub] = subBreed.label.split(' - ');
      return getBySubBreed(breed, sub);
    });

    // if there are breeds selected that don't have subbreeds then we need to fetch them
    const tempPromises = SelectedBreeds.filter(
      (breed) =>
        !SelectedSubBreeds.find((subBreed) =>
          subBreed.label.includes(breed.value)
        )
    ).map((breed) => getByBreed(breed.value));
    // merge the promises of subbreeds with breeds
    const allPromises = [...promises, ...tempPromises];

    const responses = await Promise.all(allPromises);

    const allImages: string[] = [];
    responses.forEach((response) => {
      allImages.push(...response.data.message);
    });

    setImages(allImages);
  };

  return {
    ListBreeds,
    SelectedBreeds,
    setSelectedBreeds,
    ListSubBreeds,
    SelectedSubBreeds,
    setSelectedSubBreeds,
    images,
    HasError,
    ErrorMessage,
    getImages,
  };
}
