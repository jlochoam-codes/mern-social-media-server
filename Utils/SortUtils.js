export const sortDatesDesc = (a, b) => {
  // +new Date() to get milliseconds representation of date
  const date1 = +new Date(a.createdAt);
  const date2 = +new Date(b.createdAt);
  return date2 - date1;
};
