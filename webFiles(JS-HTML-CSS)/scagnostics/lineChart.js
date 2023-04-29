const categories = ['CR','HitPoints', 'ArmorClass', 'StatTotal', 'MaxDamage','Size','LegendaryActions','LegendaryResistances','FeatureQuantity'];
var widths = [];
for (let i = 0; i < categories.length; i++)
    widths.push(i / (categories.length - 1));

function buildSmalls() {
    const columnContainer = document.getElementById("my_dataviz");
    let rowContainer = document.createElement("div");
    rowContainer.setAttribute("class", "flex-column");

    for (let i = 0; i < categories.length; i++) {
        //Create a flex row for each category
        let rowContainer = document.createElement("div");
        rowContainer.setAttribute("class", "flex-column");
        let columnHeadingContainer = document.createElement("div")
        columnHeadingContainer.setAttribute('class','columnLabelContainer')
        let housingContainer = document.createElement("div")
        housingContainer.setAttribute('class','columnHousing')
        let categoryName = document.createElement("h6")
        categoryName.innerHTML = categories[i]
        housingContainer.append(categoryName)
        spacer = document.createElement("div")
        spacer.style.height = (80*i)+"px"
        columnHeadingContainer.append(spacer)
        columnHeadingContainer.append(housingContainer)
        rowContainer.append(columnHeadingContainer)


        rowContainer.append()
        for (let j = i+1; j < categories.length; j++) {
            //Create a container here based on screen size
            //Also add a chart label on the first div, or outside of it
            let visContainer = document.createElement("div");
            containerName = categories[i] + "-" + categories[j]
            visContainer.setAttribute("id", containerName);
            rowContainer.appendChild(visContainer)
        }
        columnContainer.appendChild(rowContainer);
    }
    for (let i = 0; i < categories.length - 1; i++) {
        for (let j = i+1; j < categories.length; j++) {
            lineChart(categories[i],categories[j])
        }
    }
}

function lineChart(category,category2) {

    containerName = "#" + category + "-" + category2

    // append the svg object to the body of the page
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 10, bottom: 20, left: 30},
    width = 115 - margin.left - margin.right,
    height = 80 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(containerName)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //Read the data
    d3.csv("vizOutput.csv").then( function(data) {

        firstLargest = 0
        secondLargest = 0

        for(row in data){
            firstNumber = parseFloat(data[row][category])
            secondNumber = parseFloat(data[row][category2])
            if(firstNumber>firstLargest){
                firstLargest = firstNumber
            }
            if(secondNumber>secondLargest){
                secondLargest = secondNumber
            }
        }

        // Add X axis
        console.log(category,firstLargest,category2,secondLargest)
        const x = d3.scaleLinear()
            .domain([0, firstLargest])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickValues( x.domain().concat(firstLargest/2) ));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, secondLargest])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y).tickValues( y.domain().concat(secondLargest/2) ));
        // console.log("test")

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .join("circle")
                .attr("cx", function (d) { return x(d[category]); } )
                .attr("cy", function (d) { return y(d[category2]); } )
                .attr("r", 1.5)
                .style("fill", "#69b3a2")
    })
}