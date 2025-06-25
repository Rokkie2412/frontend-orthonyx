import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import type { DatePickerFieldProps } from './dateInput.types';

const DatePickerField = ({
  id,
  label,
  selectedDate,
  onChange,
  placeholder,
  errorText,
  dateFormat = 'yyyy-MM-dd',
  disabled = false,
}: DatePickerFieldProps): React.ReactElement => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <DatePicker
        disabled={disabled}
        id={id}
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat={dateFormat}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-black"
      />
      {errorText && (
        <p className="text-sm text-red-500 mt-1">{errorText}</p>
      )}
    </div>
  );
};

export default DatePickerField;
