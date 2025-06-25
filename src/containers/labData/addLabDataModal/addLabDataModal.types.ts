export type addLabDataModalProps = {
  isOpen: boolean;
  onCloseFn: () => void;
  onSuccess: () => void;
}

export type FormikPropsData = {
  date: Date,
  glucose: number,
  bloodPreasure: {
    systolic: number,
    diastolic: number
  },
  cholesterol: {
    hdl: number,
    ldl: number
  }
}