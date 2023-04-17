import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from "date-fns";
import Cell from "./Cells";
import { findMonthState } from "../utils/findMonthState";
import { useEffect, useState } from "react";

const daysOfWeek = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
];

interface Props {
    currentDate?: Date;
    setCurrentDate?: (currentDate: Date) => void;
}

const Calendar: React.FC<Props> = ({ currentDate = new Date(), setCurrentDate }) => {
    // const [preveMonthState, setPrevMonthState] = useState<any | null>(null);
    // const [nextMonthState, setNextMonthState] = useState<any | null>(null);
    // useEffect(() => {
    //     const preveMonth = findMonthState(currentDate, false);
    //     setPrevMonthState(preveMonth);
    //     const nextMonth = findMonthState(currentDate, true);
    //     setNextMonthState(nextMonth);
    // }, [currentDate])

    // console.log('preveMonthState, nextMonthState', preveMonthState, nextMonthState);

    // console.log('prevMonthState, nextMonthState', prevMonthState, nextMonthState);
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const totalDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonth = () => setCurrentDate && setCurrentDate(sub(currentDate, { months: 1 }));
    const nextMonth = () => setCurrentDate && setCurrentDate(add(currentDate, { months: 1 }));

    const prevYear = () => setCurrentDate && setCurrentDate(sub(currentDate, { years: 1 }));
    const nextYear = () => setCurrentDate && setCurrentDate(add(currentDate, { years: 1 }));

    const handleDate = (index: number) => {
        const dateObj = setDate(currentDate, index);
        setCurrentDate && setCurrentDate(dateObj);
    }

    return (
        <div className="w-[400px] border-t border-l">
            <div className="grid grid-cols-7 items-center justify-center text-center">
                <Cell onClick={prevYear}>{"<<"}</Cell>
                <Cell onClick={prevMonth}>{"<"}</Cell>
                <Cell className="col-span-3">{format(currentDate, "LLLL yyyy")}</Cell>
                <Cell onClick={nextMonth}>{">"}</Cell>
                <Cell onClick={nextYear}>{">>"}</Cell>

                {
                    daysOfWeek?.map((item, i) => <Cell key={i}>
                        {item}
                    </Cell>)
                }

                {/* giving empty box depending on which day start at the very beginning of the month */}
                {
                    Array.from({ length: prefixDays }).map((item, i) => <Cell key={i}></Cell>)
                }

                {/* {
                    Array.from({ length: preveMonthState }).map((item, i) => {
                        const date = i + 1;
                        return <Cell key={i}>{date}</Cell>
                    }).reverse().splice(0, prefixDays).reverse()
                } */}


                {
                    Array.from({ length: totalDays }).map((item, i) => {
                        const date = i + 1;
                        const isCurrentDate = date === currentDate.getDate();
                        return <Cell isActive={isCurrentDate} onClick={() => handleDate(date)} key={i}>{date}</Cell>
                    })
                }

                {
                    Array.from({ length: suffixDays }).map((item, i) => <Cell key={i}></Cell>)
                }

                {/* {
                    Array.from({ length: nextMonthState }).map((item, i) => {
                        const date = i + 1;
                        return <Cell key={i}>{date}</Cell>
                    }).splice(0, suffixDays)
                } */}
            </div>
        </div>
    );
};

export default Calendar;