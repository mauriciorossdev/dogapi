import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectBreeds from './SelectBreeds';

/**
 * Test suite for the SelectBreeds component
 */
describe('SelectBreeds', () => {
  const options = [
    { label: 'Bulldog', value: 'bulldog' },
    { label: 'Labrador', value: 'labrador' },
    { label: 'Poodle', value: 'poodle' },
  ];

  /**
   * Validate that the component renders without crashing
   */
  it('renders without crashing', () => {
    const onChange = jest.fn();

    render(<SelectBreeds options={options} onChange={onChange} />);
  });

  /**
   * Validate that the options are displayed when the dropdown is opened and selected an option
   */
  it('calls onChange when an option is selected', () => {
    const onChange = jest.fn();
    const { getByText, container } = render(
      <SelectBreeds
        options={options}
        onChange={onChange}
        placeholder="test"
        value={[]}
      />
    );

    // Abre el dropdown
    const input = container.querySelector('input') as Element;
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });

    // Select option 'Bulldog'
    const option = getByText('Bulldog');
    fireEvent.click(option);

    // Verify that onChange was called with the selected option
    expect(onChange).toHaveBeenCalledWith([
      { label: 'Bulldog', value: 'bulldog' },
    ]);
  });
});
