import { Branch } from './branch.interface';
import { Services } from './services.interface';

export enum PACKAGETYPES {
  GOLD = 'Gold',
  SILVER = 'Silver',
  PLATINUM = 'Platinum',
}

export interface Member {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  city: string;
  age: number;
  weight: string;
  height: string;
  goal: string;
  services: Array<Services>;
  branch: Branch;
  isActive: boolean;
  // package: PackageInterface;
  // workout: WorkoutPlanInterface;
  created_at: Date;
  updated_at: Date;
}

export interface PackageInterface {
  id: string;
  type?: PACKAGETYPES;
  duration: string;
  fees: string;
  members: Array<Member>;
  created_at: Date;
  updated_at: Date;
}

export interface WorkoutPlanInterface {}

export interface AttendanceInterface {
  id: string;
  member: Member;
  date: Date;
  status: string;
}

export interface Staff {
  id: string;
  fullname: string;
  email: string;
  age: number;
  service: Services;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  avatar: string;
  username: string;
  email: string;
  password: string;
  role: Array<string>;
  created_at: Date;
  updated_at: Date;
}

export interface Equipmemnt {
  id: string;
  name: string;
  description: string;
  image: Array<Media>;
}

export interface Media {
  id: string;
  name: string;
  path: string;
  created_at: Date;
  updated_at: Date;
}

export interface Expenses {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  date: Date;
  amount: number;
  created_at: Date;
  updated_at: Date;
}
