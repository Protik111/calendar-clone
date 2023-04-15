import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from "date-fns";
import Cell from "./Cells";

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
    setCurrentDate?: ( currentDate: Date ) => void;
}

const Calendar: React.FC<Props> = ({ currentDate = new Date(), setCurrentDate }) => {
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const totalDays = differenceInDays(endDate,startDate) + 1;

    const prefixDays =  startDate.getDay();
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
                
                {
                    Array.from({ length: totalDays }).map((item, i) => {
                         const date = i+1;
                         const isCurrentDate = date === currentDate.getDate();
                         return <Cell isActive={isCurrentDate} onClick={() => handleDate(date)} key={i}>{date}</Cell>
                    })
                }

                {
                    Array.from({ length: suffixDays }).map((item, i) => <Cell key={i}></Cell>)
                }
            </div>
        </div>
    );
};

export default Calendar;