import { Address } from './address';
import { Image } from './image';

export class Company{
    companyId!: number;
    companyName!: string;
    companySize!: string;
    description!: string;
    websiteUrl!: string;
    email!: string;
    telephone!: string;
    founderDate!: Date; 
    objAddress: Address = new Address();
    objImage: Image = new Image();
}