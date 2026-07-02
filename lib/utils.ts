import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const FREE_MONTHLY_CREDITS = 35;
export const PRO_MONTHLY_CREDITS = 100;
export const MIN_GENERATION_COST = 10;
export const MAX_GENERATION_COST = 15;