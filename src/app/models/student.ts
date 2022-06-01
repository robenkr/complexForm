import {Skill} from "./skill";

export interface Student {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  skills: Skill[]
}
