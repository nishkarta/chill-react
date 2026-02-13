import type { ClassValue } from "./utils.types";

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (typeof input === 'string') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      classes.push(cn(...input)); // Recursive call for nested arrays
    } else if (typeof input === 'object' && input !== null) {
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key) && input[key]) {
          classes.push(key);
        }
      }
    }
  }

  // Filter out empty strings, join with space, and normalize whitespace
  return classes.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}