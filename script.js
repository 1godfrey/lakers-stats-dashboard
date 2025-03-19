// Set up dimensions
const margin = { top: 40, right: 30, bottom: 50, left: 100 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create an SVG container
const svg = d3.select("svg")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create tooltip
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

// Load the data
d3.json("lakers_stats.json").then(data => {
    // Initial stat to display
    let selectedStat = "Points Scored";

    // Function to update the chart
    function updateChart(stat) {
        // Scale setup
        const xScale = d3.scaleBand()
            .domain(data.map(d => d["Player Name"]))
            .range([0, width])
            .padding(0.2);
        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[stat])])
            .range([height, 0]);

        // Remove old axes
        svg.selectAll(".axis").remove();

        // Create X axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        // Create Y axis
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale));

        // Bind data
        const bars = svg.selectAll(".bar")
            .data(data);

        // Update bars
        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .merge(bars)
            .transition()
            .duration(750)
            .attr("x", d => xScale(d["Player Name"]))
            .attr("y", d => yScale(d[stat]))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d[stat]));

        // Tooltip interactions
        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .on("mouseover", (event, d) => {
                tooltip.style("visibility", "visible")
                    .text(`${d["Player Name"]}: ${d[stat]}`)
                    .style("left", event.pageX + "px")
                    .style("top", event.pageY - 30 + "px");
            })
            .on("mousemove", (event) => {
                tooltip.style("left", event.pageX + "px")
                    .style("top", event.pageY - 30 + "px");
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
            });

        bars.exit().remove();
    }

    // Initialize chart
    updateChart(selectedStat);

    // Dropdown event listener
    d3.select("#stat-select").on("change", function() {
        selectedStat = this.value;
        updateChart(selectedStat);
    });
});
