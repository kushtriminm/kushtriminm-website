// The Christmas messages show only between these dates (month-day).
// To test them out of season, change CHRISTMAS_FROM to "11-01" for a moment.
export const CHRISTMAS_FROM = "11-25";
export const CHRISTMAS_TO = "01-06";

export function isChristmasSeason(today: string) {
  if (!today) return false;
  const md = today.slice(5);
  return md >= CHRISTMAS_FROM || md <= CHRISTMAS_TO;
}

// The holiday trips we show: departures from 20 Dec to 3 Jan of the current season.
export function holidayRange(today: string) {
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));
  const startYear = month === 1 ? year - 1 : year;
  return { from: `${startYear}-12-20`, to: `${startYear + 1}-01-03` };
}