import type { LabData } from "../../../shared/types";

export type DetailDataModalProps = {
  isOpen: boolean;
  onCloseFn: () => void;
  selectedItem: LabData | null;
}