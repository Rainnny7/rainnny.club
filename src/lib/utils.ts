import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function truncateText(
    text: string | undefined,
    maxLength: number
): string | undefined {
    if (!text) {
        return undefined;
    }
    return text.length > maxLength
        ? text.slice(0, maxLength - 3).trim() + "..."
        : text;
}
