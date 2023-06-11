export function organizeRawData(dbData) {
  console.log("dbData: ", dbData);

  const dates = Object.keys(dbData);
  const entr = Object.values(dbData);
  const weightArr = [];

  console.log("entr: ", entr);
  for (const item of entr) {
    weightArr.push(parseFloat(item[Object.keys(item)[0]].weight));
    console.log("item: ", item[Object.keys(item)[0]]);
  }

  console.log("weightArr: ", weightArr);
  return weightArr;
}

export function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}
