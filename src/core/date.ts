import { format } from "date-fns";

export function formatDate(date) {
    return format(new Date(date), "dd/MM/yyyy");
}

export function formatStringToDate(date) {
    const [day, month, year] = date.split("/");

    return new Date(year, month - 1, day);
}