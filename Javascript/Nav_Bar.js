class NavBar {
  constructor() {
    this.navBar = d3.select('.nav-bar-div')
    this.welcomeMessage()
    this.detailedMessage()
  }

  welcomeMessage() {
    this.navBar
      .append('div')
      .html('Welcome to Covisual')
      .style('font-size', '27px')
  }

  detailedMessage() {
    this.navBar
      .append('div')
      .html('You can visually see how the US has been affected by COVID-19 since April 2020')
      .style('font-size', '15px')
    
    this.navBar
      .append('div')
      .html('Visualization is based on data from John Hopkins University')
      .style('font-size', '15px')
  }

}