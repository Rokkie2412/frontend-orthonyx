import type { LabData } from '../../../Types';

export type DetailDataModalProps = {
  isOpen: boolean;
  onCloseFn: () => void;
  selectedItem: LabData | null;
}