import { User } from "@/types/user";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function userHasRole(user: User, roleName: string): boolean {
  if (!user.roles) {
    return false;
  }
  return user.roles.some(role => role.name === roleName);
}