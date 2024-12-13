export enum PACKAGETYPES {
  GOLD = 'Gold',
  SILVER = 'Silver',
  PLATINUM = 'Platinum',
}

export interface Member {
  id: string;
  fullname: string;
  email: string;
  address: string;
  city: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  service: Array<Service>;
  package: PackageInterface;
  workout: WorkoutPlanInterface;
  created_at: Date;
  updated_at: Date;
}

export interface PackageInterface {
  id: string;
  type: PACKAGETYPES;
  duration: string;
  fees: string;
  members: Array<Member>;
  created_at: Date;
  updated_at: Date;
}

export interface WorkoutPlanInterface {}

export interface Branch{
  id:string;
  city:string;
  country:string;
  street:string;
  district:string;
  house_no:string;
  road:string;
  created_at: Date;
  updated_at: Date;
}

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
  service: Service;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  avatar: string;
  username: string;
  email:string;
  password: string;
  role: Array<string>;
  created_at: Date;
  updated_at: Date;
}

export interface RoleInterface {
  id: string;
  name: string;
  permissions: Array<string>;
  created_at: Date;
  updated_at: Date;
}
export interface Service {
  id: string;
  name: string;
  description: string;
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

export interface Class {
  id: string;
  name: string;
  category: string;
  scheduled: string;
  instractor: Staff;
  max_participants: number;
  member: Member;
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


