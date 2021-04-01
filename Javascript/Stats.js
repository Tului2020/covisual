class Stats {
    constructor() {
        // debugger
        this.usStatsDiv = this.createUSStatsDiv();
        this.stateStatsDiv = this.createStatesStatsDiv();
        this.updateStateStats('California')
    }


    createUSStatsDiv() {
        let usStats = stats.append('div')
            .attr('id', 'us-stats')
            .attr('class', 'status')
            // .style('height', '200px')

        usStats
            .append('div')
            .html('Latest US Stats:')

        usStats
            .append('div')
            .html(`7-Day New Case Average: ${numberWithCommas(parseInt(organizedData.aggregateAvgNewCases))}`)

        usStats
            .append('div')
            .html(`7-Day Recovered Average: ${numberWithCommas(parseInt(organizedData.aggregateAvgRecovered))}`)

        return usStats
    }


    createStatesStatsDiv() {
        let stateStats = stats.append('div')
            .attr('id', 'state-stats')
            .attr('class', 'status')
            // .style('height', '200px')
        
        stateStats
            .append('div')
            .attr('id', 'state-stat-div')
            .append('div')
            .html('Latest State Stats: ')
            .style('padding-right', '5px')

        d3.select('#state-stat-div')
            .append('div')
            .attr('id', 'state-stat-name')
            // .html('California')


        stateStats
            .append('div')
            .attr('id', 'state-stat-new-div')
            .append('div')
            .html(`7-Day New Case Average: `)
            .style('padding-right', '5px')

        d3.select('#state-stat-new-div')
            .append('div')
            .attr('id','state-stat-new-number')
            // .html(numberWithCommas(parseInt(organizedData.aggregateAvgNewCases)))

        stateStats
            .append('div')
            .attr('id', 'state-stat-recovered-div')
            .append('div')
            .html(`7-Day Recovered Average: `)
            .style('padding-right', '5px')

        d3.select('#state-stat-recovered-div')
            .append('div')
            .attr('id','state-stat-recovered-number')
            // .html(numberWithCommas(parseInt(organizedData.aggregateAvgRecovered)))

        
        stateStats
            .append('div')
            .attr('id', 'state-stat-info')
            .html(`NOTE: Hover Over State`)
            .style('padding-right', '5px')
            .style('font-weight', 'bold')

    }

    updateStateStats(stateName) {
        d3.select('#state-stat-name').html(stateName.replace('_', ' '))
        d3.select('#state-stat-new-number').html(numberWithCommas(parseInt(organizedData.lastSevenDayStats[stateName].Confirmed)))
        d3.select('#state-stat-recovered-number').html(numberWithCommas(parseInt(organizedData.lastSevenDayStats[stateName].Recovered)))
    }





}