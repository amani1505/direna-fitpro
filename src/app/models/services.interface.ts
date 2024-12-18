import { Member } from "./member.interface";

export interface Services {
  id: string;
  name: string;
  description: string;
  members: Array<Member>;
  created_at: Date;
  updated_at: Date;
}
