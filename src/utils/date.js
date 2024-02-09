export const convertUTCToDateInputString = (utcTimestamp) => {
  const date = new Date(utcTimestamp);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const convertDateInputToUTC = (dateInput) => {
  const [year, month, day] = dateInput.split("-");
  const val = Date.UTC(year, month - 1, day); // Month is zero-indexed
  return val;
};
