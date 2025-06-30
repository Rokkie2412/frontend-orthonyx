import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { IoAdd, IoDocumentTextOutline } from 'react-icons/io5';

import { LoadingModal, ErrorView } from '../../components';
import type { LabData } from '../../Types';
import { getLabDataByUserId } from '../../utils/apiCall';
import { handleDownloadCSV } from '../../utils/general';
import AddLabDataModal from './addLabDataModal';
import DetailDataModal from './detailDataModal';
import { useParams } from 'react-router-dom';

const _onCloseAddDataModal = (setIsAddModalOpen: React.Dispatch<React.SetStateAction<string>>) => (): void => {
  setIsAddModalOpen('');
}

const _onClickAddDataButton = (setIsAddModalOpen: React.Dispatch<React.SetStateAction<string>>) => (): void => {
  setIsAddModalOpen('ADD_DATA_MODAL');
}

const _onCloseModalDetail = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<string>>,
  setSelectedItem: React.Dispatch<React.SetStateAction<LabData | null>>
) => (): void => {
  setIsModalOpen('');
  setSelectedItem(null);
}

const _onListItemClick = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<string>>,
  setSelectedItem: React.Dispatch<React.SetStateAction<LabData | null>>,
  item: LabData
) => ():void => {
  setIsModalOpen('DETAIL_DATA_MODAL');
  setSelectedItem(item);
}

const _fetchLabData = async (
  setIsModalOpen: React.Dispatch<React.SetStateAction<string>>,
  setLabData: React.Dispatch<React.SetStateAction<LabData[]>>,
  setIsError: React.Dispatch<React.SetStateAction<string>>,
  patientId: string
) => {
  setIsModalOpen("LOADING_MODAL");
  setIsError('');
  try {
    const labResponse = await getLabDataByUserId(patientId);
    setLabData(labResponse?.labResults || []);
  } catch (error: unknown) {
    setIsError((error as Error)?.message || 'Failed to fetch user profiles');
  } finally {
    setIsModalOpen('');
  }
};

const _onSuccessAddData = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<string>>,
  setLabData: React.Dispatch<React.SetStateAction<LabData[]>>,
  setIsError: React.Dispatch<React.SetStateAction<string>>,
  patientId: string
) => (): void => {
  _fetchLabData(setIsModalOpen, setLabData, setIsError, patientId);
}

const _renderEmptyOrErrorState = (error: string): React.ReactElement => {
  if (error) {
    return <ErrorView error={error} />;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-200px)] text-center px-4">
      <p className="text-gray-500 font-semibold text-base sm:text-lg">
        No lab data available. Click “Add New Test Result” to add your first data.
      </p>
    </div>
  );
};


const _renderMappingData = (
  labData: LabData[],
  setIsModalOpen: React.Dispatch<React.SetStateAction<string>>,
  setSelectedItem: React.Dispatch<React.SetStateAction<LabData | null>>
): React.ReactElement => {
  return (
    <div className="space-y-4 mt-4">
      {labData.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
        >
          <div onClick={_onListItemClick(setIsModalOpen, setSelectedItem, item)} className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-base font-medium text-gray-700">
                {format(new Date(item.date), 'dd MMM yyyy')}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Glucose</p>
              <p className="text-base font-semibold text-indigo-600">
                {item.results.glucose} mg/dL
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Blood Pressure</p>
              <p className="text-base font-semibold text-red-600">
                {item.results.bloodPressure.systolic}/{item.results.bloodPressure.diastolic} mmHg
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Cholesterol (Total)</p>
              <p className="text-base font-semibold text-yellow-600">
                {item.results.cholesterol.total} mg/dL
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const _renderLabDataSection = (
  isModalOpen: string,
  labData: LabData[],
  setIsModalOpen: React.Dispatch<React.SetStateAction<string>>,
  setSelectedItem: React.Dispatch<React.SetStateAction<LabData | null>>,
  isError: string
): React.ReactElement => {
  if (isModalOpen === "LOADING_MODAL") {
    return <LoadingModal isOpen={true} message="Loading Data..." />;
  }

  if (labData.length === 0) {
    return _renderEmptyOrErrorState(isError);
  }

  return _renderMappingData(labData, setIsModalOpen, setSelectedItem);
};

const _renderDownloadButtonCsv = (labData: LabData[]) => {
  if (labData.length === 0) {
    return null;
  }

  return (
    <button
      onClick={handleDownloadCSV(labData)}
      className="cursor-pointer font-semibold bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base py-1.5 px-3 sm:py-2 sm:px-4  lg:text-lg rounded-lg shadow-sm transition"
    >
      <span className="flex items-center gap-2">Export Data <IoDocumentTextOutline size={20} /></span>
    </button>
  )
}

const _renderAddDataButton = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<string>>,
  isError: string
): React.ReactElement | null => {
  if (!isError) {
    return (
      <button
        onClick={_onClickAddDataButton(setIsModalOpen)}
        className="cursor-pointer font-semibold bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base py-1.5 px-3 sm:py-2 sm:px-4  lg:text-lg rounded-lg shadow-sm transition"
      >
        <span className="flex items-center gap-2">Add Result<IoAdd size={20} /></span>
      </button>
    )
  }

  return null;
}

const LabResultPreview = (): React.ReactElement => {
  const params = useParams<{ patientid?: string }>();
  const patientId = params.patientid || sessionStorage.getItem('patientid') || '';
  const [isModalOpen, setIsModalOpen] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<LabData | null>(null);
  const [labData, setLabData] = useState<LabData[]>([]);
  const [isError, setIsError] = useState<string>('');

  useEffect(() => {
    _fetchLabData(setIsModalOpen, setLabData, setIsError, patientId);
  }, [patientId]);

  return (
    <div className="max-w-3xl mx-auto p-4 py-10 mt-8 mb-16 sm:mb-12">
      <div className="flex justify-between items-start gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Lab Results</h2>
        {/* Button Group */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-4">
          {_renderDownloadButtonCsv(labData)}
          {_renderAddDataButton(setIsModalOpen, isError)}
        </div>
      </div>

      {_renderLabDataSection(isModalOpen, labData, setIsModalOpen, setSelectedItem, isError)}

      <DetailDataModal
        isOpen={isModalOpen == "DETAIL_DATA_MODAL"}
        onCloseFn={_onCloseModalDetail(setIsModalOpen, setSelectedItem)}
        selectedItem={selectedItem}
      />
      <AddLabDataModal
        isOpen={isModalOpen == "ADD_DATA_MODAL"}
        onCloseFn={_onCloseAddDataModal(setIsModalOpen)}
        onSuccess={_onSuccessAddData(setIsModalOpen, setLabData, setIsError, patientId)}
      />
    </div>
  );
};

export default LabResultPreview;
