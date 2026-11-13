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
  services: Services[];
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
  members: Member[];
  created_at: Date;
  updated_at: Date;
}

// Placeholder until workout plans have a defined shape.
export type WorkoutPlanInterface = Record<string, unknown>;

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
  role: string[];
  created_at: Date;
  updated_at: Date;
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
