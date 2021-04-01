class JohnHopkinsAPI {
    constructor() {
        this.data = this.fetchJohnHopkinsData();
        this.dataKeys = ["Active", "Confirmed", "Deaths", "Recovered"];
        this.populationData = this.grabStatePopulation();
    }
    // John Hopkins Data API and manipulation
    fetchJohnHopkinsData() {
        const dailyCaseURL = (dateString) => `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/${dateString}.csv`
        let allJHUData = {};
        let dates = getDates();

        dates.forEach(date => {
            fetch(dailyCaseURL(date))
                .then(data => data.text())
                .then(newdata => {
                    csvJSON(newdata).forEach(specificDateData => {
                        let { Province_State, Active, Confirmed, Deaths, Recovered, Testing_Rate, Total_Test_Results, Last_Update } = specificDateData
                        let name = Province_State.replace(/ /g, "_")
                        if (stateNames.includes(name)) {

                            let year = Last_Update.slice(0, 4)
                            let month = Last_Update.slice(5, 7)
                            let day = Last_Update.slice(8, 10)
                            let date = year + month + day;

                            if (!Object.keys(allJHUData).includes(name)) allJHUData[name] = {}
                            allJHUData[name][date] = { Active, Confirmed, Deaths, Recovered, Testing_Rate, Total_Test_Results, date }
                        }
                    })



                })
        })
        return allJHUData;
    }



    grabStateData(stateName, dataKey) {
        let stateData = this.data[stateName]
        return (Object.keys(stateData).map(specificStateData => stateData[specificStateData][dataKey]))
    }


    grabStatesDataHistory() {
        let maxData = {};
        let historyDays;
        let stateDataHistory = {};
        let perCapitaStateHistory = {};
        let indexToDate = {};
        let lastSevenDayStats = {}; // avgNewCases, avgRecovered
        let aggregateHistory = [];
        let aggregateAvgNewCases = 0;
        let aggregateAvgRecovered = 0;


        this.grabStateData(stateNames[0], 'date').forEach((date, idx) => {
            indexToDate[idx] = date
        })

        stateNames.forEach((stateName, idx) => {
            stateDataHistory[stateName] = {};
            perCapitaStateHistory[stateName] = {};
            lastSevenDayStats[stateName] = {}



            this.dataKeys.forEach(dataKey => {
                let stateInfo = this.grabStateData(stateName, dataKey)
                stateDataHistory[stateName][dataKey] = stateInfo
                perCapitaStateHistory[stateName][dataKey] = stateInfo.map(el => 100 * parseInt(el) / this.populationData[stateName])
                
                
                if (!aggregateHistory[dataKey]) {
                    aggregateHistory[dataKey] = stateInfo
                } else {
                    aggregateHistory[dataKey] = addTwoArrays(aggregateHistory[dataKey], stateInfo)
                }


                if (['Recovered', 'Confirmed'].includes(dataKey)) {
                    if (stateInfo[stateInfo.length - 1] <  stateInfo[stateInfo.length - 8]) {
                        lastSevenDayStats[stateName][dataKey] = (stateInfo[stateInfo.length - 2] - stateInfo[stateInfo.length - 9]) / 7
                    } else {
                        lastSevenDayStats[stateName][dataKey] = (stateInfo[stateInfo.length - 1] - stateInfo[stateInfo.length - 8]) / 7
                    }

                    // debugger
                    if (dataKey === 'Recovered') {
                        // debugger
                        aggregateAvgRecovered += lastSevenDayStats[stateName][dataKey]
                    } else {
                        aggregateAvgNewCases += lastSevenDayStats[stateName][dataKey]
                    }

                    // debugger
                }



                if (idx === 0) {
                    maxData[dataKey] = 0
                    historyDays = stateDataHistory[stateName][dataKey].length
                } else {
                    maxData[dataKey] = Math.max(maxData[dataKey], Math.max(...stateDataHistory[stateName][dataKey]))
                }

                if (stateDataHistory[stateName][dataKey].length < historyDays) {
                    historyDays = stateDataHistory[stateName][dataKey].length
                }
            })
        })






        return { stateDataHistory, perCapitaStateHistory, maxData, historyDays, indexToDate, lastSevenDayStats, aggregateHistory, aggregateAvgNewCases, aggregateAvgRecovered }
    }


    grabStatePopulation() {
        return ({
            Alabama: "4903185",
            Alaska: "731545",
            Arizona: "7278717",
            Arkansas: "3017804",
            California: "39512223",
            Colorado: "5758736",
            Connecticut: "3565287",
            Delaware: "973764",
            District_of_Columbia: "705749",
            Florida: "21477737",
            Georgia: "10617423",
            Hawaii: "1415872",
            Idaho: "1787065",
            Illinois: "12671821",
            Indiana: "6732219",
            Iowa: "3155070",
            Kansas: "2913314",
            Kentucky: "4467673",
            Louisiana: "4648794",
            Maine: "1344212",
            Maryland: "6045680",
            Massachusetts: "6892503",
            Michigan: "9986857",
            Minnesota: "5639632",
            Mississippi: "2976149",
            Missouri: "6137428",
            Montana: "1068778",
            Nebraska: "1934408",
            Nevada: "3080156",
            New_Hampshire: "1359711",
            New_Jersey: "8882190",
            New_Mexico: "2096829",
            New_York: "19453561",
            North_Carolina: "10488084",
            North_Dakota: "762062",
            Ohio: "11689100",
            Oklahoma: "3956971",
            Oregon: "4217737",
            Pennsylvania: "12801989",
            Puerto_Rico: "3193694",
            Rhode_Island: "1059361",
            South_Carolina: "5148714",
            South_Dakota: "884659",
            Tennessee: "6829174",
            Texas: "28995881",
            Utah: "3205958",
            Vermont: "623989",
            Virginia: "8535519",
            Washington: "7614893",
            West_Virginia: "1792147",
            Wisconsin: "5822434",
            Wyoming: "578759",
        })
    }

}



