import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CurrencyItem, formatCurrencyPrice } from "@/data/currencies";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency?: CurrencyItem): string {
  if (currency) {
    return formatCurrencyPrice(price, currency);
  }
  return `Rs. ${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
