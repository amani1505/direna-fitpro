import { Profile } from './user';

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  district: string;
  type: string;
  is_default: boolean;
  user: Profile;
  created_at: Date;
  updated_at: Date;
}
