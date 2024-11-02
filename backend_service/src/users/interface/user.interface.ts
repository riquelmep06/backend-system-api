
import { Role } from "@prisma/client";

export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role?: Role;
 
}