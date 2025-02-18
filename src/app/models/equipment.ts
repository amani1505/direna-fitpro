import { Files } from "./files";

export interface EquipmentCategory {
  id: string;
  category_name: string;
  equipmemnts: Equipment[];
  created_at: Date;
  updated_at: Date;
}



export interface Equipment {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  model: string;
  serial_number: string;
  used_for: string;
  short_description:string
  status: string;
  purchase_date: Date;
  price: number;
  quantity: number;
 files: Files[];
  categories: EquipmentCategory[];
  created_at: Date;
  updated_at: Date;
}
