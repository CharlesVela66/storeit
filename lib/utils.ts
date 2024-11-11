import { FormType } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (formType: FormType) => {
  return z.object({
    fullName:
      formType === 'sign-up'
        ? z.string().min(2).max(50)
        : z.string().optional(),
    email: z.string().email(),
  });
};

export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
};
