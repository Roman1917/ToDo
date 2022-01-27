import { format } from "date-fns";
const MonthHourMin = (): string => {
  const date: string = format(new Date(), "MMM.k.mm.a.");
  return date;
};
const Year = (): string => {
  const date = format(new Date(), "yyyy");
  return date;
};
const TimeNow = (): string => {
  const date: string = MonthHourMin() + Year();
  return date;
};

export default TimeNow;
