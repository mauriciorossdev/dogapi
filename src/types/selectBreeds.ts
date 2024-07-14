import { MultiValue } from "react-select";

/**
 * Interface for the SelectBreeds component props
 *
 */
export interface SelectBreedsProps {
    options: { label: string; value: string }[];
    placeholder?: string;
    value?: MultiValue<{ label: string; value: string }>;
    onChange: (
      selectedOption: MultiValue<{
        label: string;
        value: string;
      }>
    ) => void;
  }