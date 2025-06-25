import { Modal } from "../../../components";
import { format } from "date-fns";
import type { DetailDataModalProps } from "./detailDataModal.types";

const DetailDataModal = ({
  isOpen,
  onCloseFn,
  selectedItem
}: DetailDataModalProps): React.ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={onCloseFn} title="Lab Result Preview">
      {selectedItem && (
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>🗓️ Date:</strong>{" "}
            {format(new Date(selectedItem.date), "dd MMM yyyy")}
          </p>

          <p>
            <strong>🩸 Glucose:</strong> {selectedItem.results.glucose} mg/dL
          </p>

          <div>
            <p className="font-semibold">🫀 Blood Pressure:</p>
            <ul className="ml-4 list-disc">
              {Object.entries(selectedItem.results.bloodPressure).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value} mmHg
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="font-semibold">🧬 Cholesterol:</p>
            <ul className="ml-4 list-disc">
              {Object.entries(selectedItem.results.cholesterol).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value} mg/dL
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailDataModal;
