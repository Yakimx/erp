export const sortDateUp = (a, b) => {
  a = new Date(a.completionDateDesired).getTime();
  b = new Date(b.completionDateDesired).getTime();

  if (a > b) return 1; // если первое значение больше второго
  if (a == b) return 0; // если равны
  if (a < b) return -1; // если первое значение меньше второго}
};

export const sortDateDown = (a, b) => {
  a = new Date(a.completionDateDesired).getTime();
  b = new Date(b.completionDateDesired).getTime();

  if (a > b) return -1; // если первое значение больше второго
  if (a == b) return 0; // если равны
  if (a < b) return 1; // если первое значение меньше второго}
};
