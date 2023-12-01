import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return Math.floor(Math.random() * 10000);
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatDate(str) {
  const date = new Date(str);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
export function getMostRecentItemId(items, option = "createdat") {
  if (!items || items.length === 0) {
    return null;
  }

  const sortByDate = (a, b) => new Date(b[option]) - new Date(a[option]);
  const sortedItems = [...items].sort(sortByDate);

  return sortedItems[0].id;
}

export function groupItemsByType(items, targetType) {
  return items.filter((item) => item.type === targetType);
}
