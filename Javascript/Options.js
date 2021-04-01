class OptionsColumn {
    constructor() {
        this.dataKeys = ["Active", "Confirmed", "Deaths", "Recovered"]
        this.optionsColumn = this.grabOptionsColumn();
        this.createElements();

    }


    grabOptionsColumn() {
        return d3.select('.option')
    }

    createElements() {
        let optionsList = this.optionsColumn
            .append('div')
            .attr('class', 'selectable-options-list')

        this.dataKeys.forEach(dataKey => {
            this.addButton(optionsList, dataKey).on('click', () => {
                let activeEl = document.querySelector('.chosen-data')
                activeEl.classList.remove('chosen-data')
                activeEl.classList.add('button')

                let element = d3.event.toElement.classList
                element.remove('button')
                element.add('chosen-data')
                dataShown = dataKey

                if (currentView === 'Map') {
                    if (!organizedData) organizedData = johnHopkinsAPI.grabStatesDataHistory()
                    map.visualizeAllStates(dataShown);
                } else {
                    graph.graphUpdater(dataShown)
                }


            })
        })


        let viewsListDiv = this.optionsColumn
            .append('div')
            .attr('class', 'selectable-views-list')

            

        let viewsList = ['Map', 'Graph']

        viewsList.forEach(view => {
            this.addViewButton(viewsListDiv, view).on('click', () => {

                let activeEl = document.querySelector('.chosen-view')
                // debugger
                activeEl.classList.remove('chosen-view')
                activeEl.classList.add('button')

                let element = d3.event.toElement.classList
                element.remove('button')
                element.add('chosen-view')


                currentView = view
                if (view === viewsList[1]) {
                    map.hide();
                    graph.graphUpdater(dataShown);
                } else {
                    graph.hide();
                    map.show();
                }

            })
        })



    }


    addButton(htmlEl, buttonVal) {
        return htmlEl
            .append("p")
            .html(buttonVal)
            .attr('class', (buttonVal === dataShown) ? (`chosen-data`) : ('button'))
            .attr('id', `${buttonVal}-view`)
    }

    addViewButton(htmlEl, buttonVal) {
        return htmlEl
            .append("p")
            .html(buttonVal)
            .attr('class', (buttonVal === currentView) ? (`chosen-view`) : ('button'))
            .attr('id', `${buttonVal}-view`)
    }
}