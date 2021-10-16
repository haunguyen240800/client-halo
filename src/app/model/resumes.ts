import { Address } from "./address";

export class Resumes{
    id?: number;
    fullname?: string;
    email?: string;
    telephone?: string;
    gender?: String;
    dateOfBirth?: Date;
    experience?: string;
    currentSalary?: string;
    expectedSalary?: string;
    educationLevel?: string;
    objAdd: Address={};
    targetDescription?: string;
    accId?: string;
}