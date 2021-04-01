class Graph {
    constructor() {
        this.grapher('Confirmed');
    }


    hide() {
        d3.selectAll('#my_dataviz').remove()
    }

    graphUpdater(dataKey) {
        this.hide();
        mapDiv
            .append('div')
            .attr('id', 'my_dataviz')
        this.grapher(dataKey)
    }


    grapher(dataKey) {
        let margin = { top: 0, right: 100, bottom: 100, left: 100 },
            width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        let graphHeader = d3.select("#my_dataviz")
            .append('div')
            .append('id', 'graph-title')
            .text('Graphical Representation of US Cases')

        let svg = d3.select("#my_dataviz")
            .append('div')
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");




        let graphData = this.getPlottableData(dataKey);


        let x = d3.scaleLinear()
            .domain([0, graphData.maxX])
            .range([0, width]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));



        // // add the y Axis
        var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, graphData.maxY]);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("path")
            .attr("class", "mypath")
            .datum(graphData.history)
            .attr("fill", "#69b3a2")
            .attr("opacity", ".8")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(function (d) { return x(d[0]); })
                .y(function (d) { return y(d[1]); })
            );

        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.bottom * 0.5) + ")")
            .style("text-anchor", "middle")
            .attr("fill", "black")
            .text("Days since Apr 2020");
        
        svg.append("text")
            .attr("transform",
                "translate(" + (-margin.left / 3) + " ," +
                (height / 2) + ")" + ' rotate(270)')
            // .attr('transform', 'rotate(270)')
            .style("text-anchor", "middle")
            .attr("fill", "black")
            .text("Number of People (millions)");
    }







    getPlottableData(dataKey = 'Active', dataGiven = organizedData.aggregateHistory) {
        let maxX = dataGiven[dataKey].length
        let maxY = Math.max(...dataGiven[dataKey]) / 1000000
        let history = [[0, 0]].concat(dataGiven[dataKey].map((y, xindx) => [xindx, y / 1000000]))
        // debugger
        history.push([history[history.length - 1][0] + 1, 0])

        return { maxX, maxY, history }
    }
}