import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine class names
 * - clsx handles conditional class building
 * - twMerge resolves Tailwind conflicts (e.g., multiple paddings/colors)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
