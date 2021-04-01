// Returns an array of dates between a given date, and 04-12-2020
var getDates = (endDate=new Date(), startDate=new Date(2020, 3, 12)) => {
  var dates = [],
    currentDate = startDate,
    addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    
  while (currentDate <= endDate) {
    let month = currentDate.getMonth();
    let year = (1900 + currentDate.getYear()).toString();
    let day = currentDate.getDate();

    month = (month < 9) ? ('0' + (month + 1).toString()) : (month + 1).toString()
    day = day < 10 ? ('0' + day.toString()) : (day.toString())
    dates.push(`${month}-${day}-${year}`);

    currentDate = addDays.call(currentDate, 1);
  }
  dates.pop()
  return dates
};

// Usage
// console.log(getDates(new Date()));

function csvJSON(csv) {
  const lines = csv.split('\n')
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i])
      continue
    const obj = {}
    const currentline = lines[i].split(',')

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return result
}

const arrDiff = (arr1, arr2) => {
  let diffArr = [];
  let diff = {};
  arr1.forEach(el1 => {
    diff[el1] = 1
  })

  arr2.forEach(el2 => {
    if (Object.keys(diff).includes(el2)) {
      diff[el2] -= 1
    } else {
      diff[el2] = -1
    }
  })

  Object.keys(diff).forEach(el => {
    if (diff[el] !== 0) diffArr.push({[el]: diff[el]})
  })

  return diffArr
}


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

let numToMonth = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "June", 7: "July", 8: "Aug", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec"}

const addTwoArrays = (arr1, arr2) => {
  let resultant = []
  for (let i = 0; i < arr1.length; i++) {
    let el1 = parseFloat(arr1[i]) || 0
    let el2 = parseFloat(arr2[i]) || 0
    resultant.push(el1 + el2)
  }
  return resultant
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}