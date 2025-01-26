import { Staff } from "./staff.interface";

export interface GymClass {
  id: string;
  name: string;
  description: string;
  day: string;
  color: string;
  capacity: number;
  startTime: string;
  endTime: string;
  instructors: Staff[];
  createdAt: Date;
  updatedAt: Date;
}
