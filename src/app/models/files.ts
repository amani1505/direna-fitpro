import { Equipment } from "./equipment";

export interface Files {
  id: string;
  file_name: string;
  file_path: string;
  equipment: Equipment;
  created_at: Date;
  updated_at: Date;
}
