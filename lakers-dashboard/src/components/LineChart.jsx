import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import lakersData from "../data/lakers_stats.json";

const LineChart = ({ selectedStat }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 400, height = 300;
        const margin = { top: 30, right: 20, bottom: 50, left: 60 };

        const xScale = d3.scalePoint()
            .domain(lakersData.map(d => d["Player Name"]))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(lakersData, d => d[selectedStat])])
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        const line = d3.line()
            .x(d => xScale(d["Player Name"]))
            .y(d => yScale(d[selectedStat]));

        svg.append("path")
            .datum(lakersData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);
    }, [selectedStat]);

    return <svg ref={svgRef} width={400} height={300}></svg>;
};

export default LineChart;
