import React from 'react';

import type { InputFieldProps } from './inputField.types.ts'

const _inputMode = (type: string): React.HTMLAttributes<HTMLInputElement>['inputMode'] => {
  if (type === 'number' || type === 'tel') {
    return 'numeric';
  }

  return 'text';
}

const InputField = ({
  id,
  label,
  errorText,
  onChange,
  value,
  placeholder,
  type = 'text',
  disabled = false,
}: InputFieldProps): React.ReactElement => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        disabled={disabled}
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        min={0}
        inputMode={_inputMode(type)}
        placeholder={placeholder}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-black"
      />
      {errorText && (
        <p className="text-sm text-red-500 mt-1">{errorText}</p>
      )}
    </div>
  );
};

export default InputField;
