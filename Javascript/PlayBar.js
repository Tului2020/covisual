class PlayBar {
  constructor() {
    this.timer;
    this.organizedData;
    this.stepTimeInterval;
    this.timeInterval = 10;
    this.playBar = this.createPlayBar();
    this.dataKeys = ["Active", "Confirmed", "Deaths", "Recovered"]
    this.createElements();
  }


  createElements() {

    const sliderDiv = this.playBar
      .append('div')
      .attr('class', 'play-bar-slider-div')
      .style("width", "100%")
    // .style("height", "50%")
    // .style("border", "1px solid yellow")


    const playButtons = sliderDiv
      .append('div')
      .attr('class', 'play-pause-reset-buttons')


    this.addButton(playButtons, "Play", "play-slider").on('click', () => this.playSlider(this.timeInterval))
    this.addButton(playButtons, "Stop", "stop-slider").on('click', this.stopSlider)
    this.addButton(playButtons, "Reset", "reset-slider").on('click', this.resetSlider)

    this.addSlider(sliderDiv)




    this.playBar
      .append('div')
      .attr('class', 'year-month-indicator')
      .style("width", "100%")
      .style("height", "50%")



    this.renderDateIndicator();







  }


  renderDateIndicator() {
    d3.select('.year-month-indicator')
      .html((!organizedData) ? ('Apr 2020') : (this.getSliderDisplayVal()))

  }



  createPlayBar() {
    return d3.select('.map-animation')
      .append("div")
      .attr("class", "nav")
      .style("width", "100%")
      .style("height", "100px")
    // .style("border", "1px solid yellow")
  }



  playSlider() {
    if (!organizedData) organizedData = johnHopkinsAPI.grabStatesDataHistory()
    let slider = document.getElementById('nav-slider');
    slider.max = organizedData.historyDays
    this.stepTimeInterval = 1000 * this.timeInterval / (organizedData.historyDays) // milliseconds
    let initialStepValue = slider.value;
    let stepValue = initialStepValue;

    this.timer = setInterval(() => {
      if ((stepValue > initialStepValue) && (stepValue >= slider.max || (parseInt(slider.value) !== stepValue))) {
        clearInterval(this.timer)
        return
      }
      slider.value = ++stepValue;
      this.renderDateIndicator();
      map.visualizeAllStates(dataShown)

    }, this.stepTimeInterval);
  }


  resetSlider = () => {
    if (!organizedData) organizedData = johnHopkinsAPI.grabStatesDataHistory()
    document.getElementById('nav-slider').value = 0
    this.renderDateIndicator();
  }


  stopSlider = () => {
    clearInterval(this.timer)
  }

  addButton(htmlEl, buttonVal, idName) {
    return htmlEl
      .append("button")
      .html(buttonVal)
      .attr("id", idName)
  }

  addSlider(htmlEl, maxValue = 100, width = 500, initialVal = 0) {
    let idName = `nav-slider`
    let sliderDiv = htmlEl
      .append('div')
      .attr('id', 'slider-div')

    sliderDiv
      .append('input')
      .attr('type', 'range')
      .attr('id', idName)
      .attr('min', '0')
      .attr('max', maxValue)
      .style('width', `${width}px`)
      .on('change', () => {
        let slider = document.getElementById('nav-slider')
        if (!organizedData) {
          organizedData = grabStatesDataHistory(johnHopkinsData)
          slider.max = organizedData.historyDays
          slider.value = parseInt(this.getSliderVal() * slider.max / 100)
        }
        this.renderDateIndicator();
        map.visualizeAllStates(dataShown)
      })


    document.getElementById(idName).value = initialVal;
  }

  getSliderVal = () => parseInt(document.getElementById('nav-slider').value)

  getSliderDisplayVal = () => {
    let dateString = organizedData.indexToDate[this.getSliderVal()]
    let year = dateString.slice(0, 4)
    let monthDisp = numToMonth[parseInt(dateString.slice(4, 6))]
    return `${monthDisp} ${year}`
  }

}

















