export const getWorkDay = (startDateStr, endDateStr, weekendDate) => {
  let workDay = 0;
  const startDate = new Date(startDateStr.split(".").reverse().join("."));
  const endDate = new Date(endDateStr.split(".").reverse().join("."));
  const allDay = Math.ceil((+endDate - +startDate) / (1000 * 60 * 60 * 24));
  let weekendDay = weekendDate.map((date)=>new Date(date.split(".").reverse().join(".")))
  

  for(let i = +startDate; i <= +endDate; i = i + 1000 * 60 * 60 * 24)  
{
  let day = new Date(i).getDay()
  if(day != 0 && day != 6 && weekendDay.find(day => day.toLocaleDateString() == new Date(i).toLocaleDateString())===undefined) workDay++;  

}
  // let j = startDate.getDay();
  // for (let i = 0; i <= allDay; i++) {
  //   if (j > 6) j = 0;
  //   if (j != 0 && j != 6) workDay++;
   
  //   j++;
  // }


  return workDay;
};
