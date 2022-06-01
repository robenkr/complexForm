import {Address} from "./address";
import {Student} from "./student";

export interface School {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  address: Address | null;
  students: Student[]
}
