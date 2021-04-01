class CreateMap {
  constructor() {
    this.statesDiv = this.createStatesDiv();
    this.drawStates();
    this.colorInt = this.colorInterpolate();
  }

  hide() {
    d3.selectAll('#map-container').remove()
    playBar.playBar.remove();
  }

  show() {
    this.hide()
    this.statesDiv = this.createStatesDiv();
    this.drawStates();
    this.colorInt = this.colorInterpolate();
    playBar = new PlayBar();
  }

  createStatesDiv() {
    return d3.select(".map-animation")
      .append('div')
      .attr('id', 'map-container')
      .style('min-height', '600px')
      // .style("border", "1px solid blue")
      .append("svg")
      .attr("class", "states")
      .style("width", "100%")
      .style('height', '100%')
      .style("min-height", "600px")
      // .style("border", "1px solid blue")
  }

  drawStates() {
    stateNames.forEach(stateName => {
      this.statesDiv.append("path")
        .attr("id", stateName)
        .attr("class", "state")
        .attr("d", states[stateName])
        .on('mouseover', () => statsColumn.updateStateStats(stateName))
        // .on('mouseleave', this.hideTooltip)
      
    })
  }



  colorInterpolate() {
    return {
      Active: d3.interpolateRgb("#fff0ef", "#c11000"),
      Recovered: d3.interpolateRgb("#08f26e", "#059142"),
      Deaths: d3.interpolateRgb("#fff0ef", "#c11000"),
      Confirmed: d3.interpolateRgb("#fff0ef", "#c11000")
    }
  }


  visualizeState(stateName = 'Wisconsin', dataType = 'Confirmed', adjuster = .8) {
    let data = organizedData.stateDataHistory[stateName][dataType][playBar.getSliderVal()]
    if (!data) { data = organizedData.stateDataHistory[stateName][dataType][playBar.getSliderVal() - 1] }

    let scaledData = data / (organizedData.maxData[dataType] * adjuster)
    let rgbColor = this.colorInt[dataType](scaledData)
    d3.select(`#${stateName}`)
      .transition().duration(10)
      .style("fill", rgbColor)
  }


  visualizeAllStates(dataKey) {
    stateNames.forEach(stateName => {
      this.visualizeState(stateName, dataKey)
    })
  }


}