import { Listing } from "./listing.model";

export interface Project
{
  id? : number;

  name : string;

  description : string;

  createdAt? : Date;

  updatedAt? : Date;

  deadline? : Date;

  listings : Listing[];
}
