export const getWorkDay = (date) => {
  let workDay = 0;
  const startDate = new Date();
  const endDate = new Date(date);
  const allDay = Math.ceil((+endDate - +startDate) / (1000 * 60 * 60 * 24));

  let j = startDate.getDay();
  for (let i = 0; i <= allDay; i++) {
    if (j > 6) j = 0;
    if (j != 0 && j != 6) workDay++;
    j++;
  }

  return workDay;
};
