let johnHopkinsAPI = new JohnHopkinsAPI();

organizedData = null;
dataShown = 'Confirmed';
currentView = 'Map';
map = null;
graph = null;
statsColumn = null;
playBar = null;
navBar = null;
dates = getDates();

let grabStats = setInterval(() => {
    if (Object.keys(johnHopkinsAPI.data.Alabama).length > dates.length - 1) {
        organizedData = johnHopkinsAPI.grabStatesDataHistory()
        clearInterval(grabStats)

        // debugger
        navBar = new NavBar();
        map = new CreateMap();
        graph = new Graph();
        graph.hide();
        playBar = new PlayBar();
        new OptionsColumn()
        statsColumn = new Stats();


        // getPlottableData(organizedData.aggregateHistory, 'Active')
    }
}, 100)


