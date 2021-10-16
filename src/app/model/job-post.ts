import { Category } from "./category";
import { Company } from "./company";
import { JobType } from "./job-type";
import { Position } from "./position";

export class JobPost{
    id!: number;
    jobTitle!: string;
    jobDescription!: string;
    salary!: number;
    requirement!: string;
    benefit!: string;
    experience!: string;
    education!: string;
    gender!: string;
    quantity!: number;
    status!: string;
    objPosition: Position= new Position();
    objCate: Category = new Category();
    objJobType: JobType = new JobType();
    objCompany: Company = new Company();
    objAcc: any={};
    deadline!: Date;
    createDate!: Date;
    packageCode!: string; 
}