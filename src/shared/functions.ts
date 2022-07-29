/**
 * Formats a date in the yyyy-MM-dd format.
 */
export function formatEuropeanDate(date: Date): string{
    return dateFormat(date, "yyyy-MM-dd");
}

/**
 * Formats a date in the given format.
 */
export function dateFormat(date: Date, format:string): string {
    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2,"0"));

    //replace the year
    if (format.indexOf("yyyy") > -1)
        format = format.replace("yyyy", year.toString());

    else if (format.indexOf("yy") > -1)
        format = format.replace("yy", year.toString().substr(2,2));

    //replace the day
    format = format.replace("dd", day.toString().padStart(2,"0"));

    return format;
}