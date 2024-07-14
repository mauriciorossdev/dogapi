import React from 'react';
import Select, { MultiValue } from 'react-select';
import { SelectBreedsProps } from '../../types/selectBreeds';


/**
 * SelectBreeds component
 *
 * @param options List of options to display
 * @param placeholder Placeholder text for the select
 * @param onChange Function to call when an option is selected
 */
const SelectBreeds: React.FC<SelectBreedsProps> = ({
  options,
  placeholder,
  value,
  onChange,
}) => {
  const handleOnChange = (
    selectedOption: MultiValue<{
      label: string;
      value: string;
    }>
  ) => {
    onChange(selectedOption);
  };

  return (
    <Select
      options={options.length > 0 ? options : []}
      isMulti
      onChange={(selectedOption) => handleOnChange(selectedOption || [])}
      className="w-full min-w-[100%]"
      aria-label={placeholder || 'Select Breeds'}
      placeholder={placeholder || 'Select Breeds'}
      value={value}
    />
  );
};

export default SelectBreeds;
