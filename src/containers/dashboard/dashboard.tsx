import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useUser } from '../../context'
import { ErrorView, LabMatrixCard, LoadingModal } from '../../components';
import type { CustomTooltipProps, LabData, TooltipEntry, UserProfile, UserProfilesData } from '../../Types';
import { getLabDataByUserId, getUserProfile } from '../../utils/apiCall';
import { useParams } from 'react-router-dom';

const getDob = (dob: string) => {
  return new Date(dob).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const _renderHeader = (
  user: UserProfile
): React.ReactElement => {
  const fields = [
    { label: 'First Name', value: capitalize(user.firstName || '') },
    { label: 'Last Name', value: capitalize(user.lastName || '') },
    { label: 'Date of Birth', value: getDob(user.dob as string) },
    { label: 'Gender', value: capitalize(user.gender || '') },
    { label: 'Phone Number', value: user.phone || '' },
    { label: 'Email', value: user.email || '' },
  ];

  return (
    <div className="w-full bg-white p-6 md:p-8 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">
        Patient Information
      </h2>

      <div className="flex flex-col flex-wrap md:flex-row gap-y-6 gap-x-6 text-sm md:text-base text-gray-700">
        {fields.map(({ label, value }) => (
          <div key={label} className="flex flex-1/3 flex-col">
            <p className="font-semibold text-gray-500">{label}</p>
            <p className="text-gray-900 break-words">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};




const _renderMatrixCard = (data: LabData) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
    <LabMatrixCard
      title="Blood Pressure"
      value={
        data?.results?.bloodPressure
          ? `${data?.results?.bloodPressure?.systolic} / ${data?.results?.bloodPressure?.diastolic}`
          : 'N/A'
      }
      unit="mmHg"
      gradientFrom="from-blue-300"
      gradientTo="to-blue-400"
    />
    <LabMatrixCard
      title="Cholesterol"
      value={data?.results?.cholesterol?.total || 'N/A'}
      unit="mg/dL"
      gradientFrom="from-yellow-300"
      gradientTo="to-orange-400"
    />
    <LabMatrixCard
      title="Blood Sugar"
      value={data?.results?.glucose || 'N/A'}
      unit="mg/dL"
      gradientFrom="from-pink-300"
      gradientTo="to-rose-400"
    />
  </div>
)

const _renderMatrixDashboard = (data: LabData): React.ReactElement => {
  return (
    <div className="mt-10">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
        Patient Last Checkup: 
        <span className="text-blue-500 font-black">
          {data?.date && format(new Date(data?.date), ' dd MMM yyyy')}
        </span>
      </h2>
      {_renderMatrixCard(data)}
    </div>
  );
};


const getUnitByKey = (key: string): string => {
  switch (key) {
    case 'glucose':
      return 'mg/dL';
    case 'cholesterol':
      return 'mg/dL';
    case 'systolic':
    case 'diastolic':
      return 'mmHg';
    default:
      return '';
  }
};

const CustomTooltip = (props: CustomTooltipProps) => {
  if (props.active && props.payload && props.payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{`Date: ${props.label}`}</p>
        {props.payload.map((entry: TooltipEntry, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.name}: ${entry.value} ${getUnitByKey(entry.dataKey)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LabMetricsChart = ({ data }: { data: LabData[] }) => {
  const chartData = data.map(item => ({
    date: format(new Date(item.date), 'd MMM yyyy'),
    glucose: item.results.glucose,
    cholesterol: item.results.cholesterol.total,
    systolic: item.results.bloodPressure.systolic,
    diastolic: item.results.bloodPressure.diastolic,
  }));

  return (
    <div className="mt-12 bg-white p-6 rounded-xl shadow-md hover:scale-102 transition duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        {data.length > 0 ? `Lab Metrics Last ${data.length} Tests` : 'No Data Available Please Add Data in Lab Data'}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            stroke="#666"
          />
          <YAxis
            tick={{ fontSize: 11 }}
            stroke="#666"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12' }}
          />

          {/* Blood Sugar Line */}
          <Line
            type="monotone"
            dataKey="glucose"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2 }}
            name="Blood Sugar"
          />

          {/* Cholesterol Line */}
          <Line
            type="monotone"
            dataKey="cholesterol"
            stroke="#facc15"
            strokeWidth={3}
            dot={{ fill: '#facc15', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#facc15', strokeWidth: 2 }}
            name="Cholesterol"
          />

          {/* Systolic BP Line */}
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="#60a5fa"
            strokeWidth={3}
            dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2 }}
            name="Systolic BP"
          />

          {/* Diastolic BP Line */}
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            name="Diastolic BP"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Dashboard = () => {
  const { patientid } = useParams<{ patientid: string }>();
  const { user, setUser } = useUser()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [labData, setLabData] = useState<LabData[]>([]);
  const [isError, setIsError] = useState<string>('')

  const fetchUserProfiles = async () => {
    setIsLoading(true)

    try {
      const userProfiles = user ? user : await getUserProfile(patientid || '')
      const LabData = await getLabDataByUserId(patientid || '', 10)
      if (!user) {
        setUser((userProfiles as UserProfilesData).user);
      }

      setLabData(LabData?.labResults || [])
    } catch (error: unknown) {
      setIsError((error as Error)?.message || 'Failed to get user data')
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchUserProfiles()
  }, [])

  return (
    <div className="flex justify-center items-center mb-16 sm:mb-12">
      <div className="w-full sm:w-11/12 align-center justify-center items-center bg-gray-50 min-h-screen px-6 sm:px-10 py-10 mt-8">
        {isLoading && <LoadingModal isOpen={isLoading} message="Loading Data..." />}
        {user && _renderHeader(user)}
        {!isError && _renderMatrixDashboard(labData[0])}
        {!isError && <LabMetricsChart data={labData} />}
        {isError && <ErrorView error={isError} />}
      </div>
    </div>
  );
};

export default Dashboard;