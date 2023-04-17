import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from "date-fns";


export function findMonthState(currentDate: Date, toBePlus: boolean) {
    //month state for previous and next month
    let monthState = currentDate;
    monthState.setDate(1);

    if (toBePlus) {
        monthState.setMonth(monthState.getMonth() + 1);
    } else {
        monthState.setMonth(monthState.getMonth() - 1);
    }

    const startDateForMonth = startOfMonth(monthState);
    const endDateForPrevMonth = endOfMonth(monthState);
    const totalDaysForMonth = differenceInDays(endDateForPrevMonth, startDateForMonth) + 1;

    return totalDaysForMonth;
}
