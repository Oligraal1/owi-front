import { Listing } from "./listing.model";

export interface Project
{
  Id? : number;

  Name : string;

  Description : string;

  CreatedAt? : Date;

  UpdatedAt? : Date;

  Deadline? : Date;

  Listings : Listing[];
}
