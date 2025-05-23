import { Staff } from './staff.interface';

export interface GymClass {
  id: string;
  name: string;
  description: string;
  day: string;
  color: string;
  capacity: number;
  startTime: string;
  image: string;
  endTime: string;
  instructors: Staff[];
  created_at: Date;
  updated_at: Date;
}
