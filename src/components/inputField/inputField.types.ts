export type InputFieldProps = {
  id: string;
  label: string;
  errorText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string,
  placeholder?: string;
  type?: string;
  disabled?: boolean;
};