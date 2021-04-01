
let body = d3.select('#root')
    .style('display', 'flex')
    // .style('flex-drection', 'row')


let navBarDiv = body
    .append('div')
    .attr('class', 'nav-bar-div')
    .style('width', `95vw`)
    .style('height', '10vh')
    // .style('border', '1px solid red')


let statsMapOptions = body
    .append('div')
    .attr('class', 'map-stats-options-div')
    .style('width', `95vw`)
    .style('height', '82vh')
    // .style('border', '1px solid red')
    .style('display', 'flex')


let stats = statsMapOptions
    .append('div')
    .attr('class', 'stats')
    .style('width', '20%')
    .style('height', '100%')
    // .style('border', '1px solid red')








let mapDiv = statsMapOptions
    .append('div')
    .attr('class', 'map-animation')
    .style('width', `70%`)
    .style('height', '100%')
    // .style('border', '1px solid red')

let graphDiv = mapDiv
    .append('div')
    .attr('id', 'my_dataviz')


let options = statsMapOptions
    .append('div')
    .attr('class', 'option')
    .style('width', `10%`)
    .style('height', '100%')
    // .style('border', '1px solid red')