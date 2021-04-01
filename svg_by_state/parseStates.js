const svgParser = require('svg-path-parser');
var fs = require('fs');
const all_states = require('./all_states_raw');
const usMap = require('./usmap.js');



const parseToFile = ({name, abb, data}, idx) => {
  const fileName = './svg_by_state/all_states.js'

  if (idx === 0) {
    fs.writeFile(fileName, `const ${name} = { abb: '${abb}', data: ${JSON.stringify(svgParser(data), null, 2)}}`, "utf8", function (error, data) {
      if (error) console.log(error);
    });
  } else {
    fs.appendFile(fileName, `\n\nconst ${name} = { abb: '${abb}', data: ${JSON.stringify(svgParser(data), null, 2)}}`, "utf8", function (error, data) {
      if (error) console.log(error);
    });
  }

}

// console.log(Object.keys(usMap))

let all_states1 = (Object.keys(usMap.paths).map(abb => {
  return { name: usMap.names[abb].replace(/ /g, "_"), abb, data: usMap.paths[abb]}
}))

// console.log(all_states1)


// format is for state is {name, data} ------------------ //
all_states1.forEach((state, idx) => {
  parseToFile(state, idx)
});



