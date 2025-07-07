export type DatePickerFieldProps =  {
  id: string;
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  errorText?: string;
  dateFormat?: string;
  disabled?: boolean;
}
