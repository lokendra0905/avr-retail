import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWhatsAppUrl(phone: string, message?: string) {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hi, I'm interested in your retail interior design services.");
  return `https://wa.me/${phone}?text=${text}`;
}

export function getPhoneUrl(phone: string) {
  return `tel:${phone}`;
}

export function getEmailUrl(email: string) {
  return `mailto:${email}`;
}
