import type {UserProfile, LabData} from '../../shared/types' 

export type UserProfilesData = {
  message: string
  user: UserProfile
};

export type LabDataResponse = {
  message: string
  labResults: LabData[]
}

export type TooltipEntry =  {
  name: string;
  value: number | string;
  color: string;
  dataKey: string;
}

export type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}