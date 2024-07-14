import { useBreeds } from './hooks/useBreeds';
import SelectBreeds from './components/SelectBreeds/SelectBreeds';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { Suspense } from 'react';

function App() {
  const {
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
  } = useBreeds();

  const Loading = () => <p>Loading...</p>;


  return (
    <>
      <header className="w-100 h-12 bg-indigo-800 text-white text-center content-center">
        <h1>Dog API challenge</h1>
      </header>
      <main className="my-8">
        <div className="flex md:flex-row flex-col justify-center gap-4 my-4 md:my-16 mx-4">
          <div className="flex flex-col gap-4 my-2 md:w-1/2">
            <SelectBreeds
              options={ListBreeds}
              placeholder="Select Breeds"
              onChange={setSelectedBreeds}
              value={SelectedBreeds}
            />
            {ListSubBreeds.length > 0 && SelectedSubBreeds && (
              <SelectBreeds
                placeholder="Select Sub Breeds"
                options={ListSubBreeds}
                onChange={setSelectedSubBreeds}
                value={SelectedSubBreeds}
              />
            )}
            <div>
              {HasError && (
                <p className="text-red-500">{ErrorMessage.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-4 my-2'>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md md:rounded md:w-[100px] h-[38px] "
              onClick={getImages}
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-[80vw] my-0 mx-auto">
          {
            images.length > 0 && <p className="text-center text-2xl py-4">{images.length} images found</p>
          }
          <Suspense fallback={<Loading />}>
            <ImageGallery images={images} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

export default App;
