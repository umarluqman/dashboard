import dayjs from "dayjs";

export function randomDate(start: Date, end: Date) {
  return dayjs(
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
  );
}
