export const sortDateUp = (a, b) => {
  
  a = Date.parse(a.completionDateDesired.split(".").reverse().join(".")) + a.shift*1000*60*60*24;
  b = Date.parse(b.completionDateDesired.split(".").reverse().join(".")) + b.shift*1000*60*60*24;

  if (a > b) return 1; // если первое значение больше второго
  if (a == b) return 0; // если равны
  if (a < b) return -1; // если первое значение меньше второго}
};

export const sortDateDown = (a, b) => {
  a = Date.parse(a.completionDateDesired.split(".").reverse().join(".")) + a.shift;
  b = Date.parse(b.completionDateDesired.split(".").reverse().join(".")) + b.shift;

  if (a > b) return -1; // если первое значение больше второго
  if (a == b) return 0; // если равны
  if (a < b) return 1; // если первое значение меньше второго}
};
