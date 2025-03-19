import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import lakersData from "../data/lakers_stats.json";

const ScatterPlot = ({ selectedStat }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 400, height = 300;
        const xScale = d3.scaleLinear().domain([0, 1500]).range([50, width - 50]);
        const yScale = d3.scaleLinear().domain([0, 1500]).range([height - 50, 50]);

        svg.selectAll("circle")
            .data(lakersData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[selectedStat]))
            .attr("cy", d => yScale(d["Assists"]))
            .attr("r", 6)
            .attr("fill", "red");

    }, [selectedStat]);

    return <svg ref={svgRef} width={400} height={300}></svg>;
};

export default ScatterPlot;
