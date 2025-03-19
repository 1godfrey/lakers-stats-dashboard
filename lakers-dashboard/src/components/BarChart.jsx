import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import lakersData from "../data/lakers_stats.json";

const BarChart = ({ selectedStat }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous drawings

        const width = 400, height = 300;
        const margin = { top: 30, right: 20, bottom: 50, left: 60 };

        const xScale = d3.scaleBand()
            .domain(lakersData.map(d => d["Player Name"]))
            .range([margin.left, width - margin.right])
            .padding(0.4);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(lakersData, d => d[selectedStat])])
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "rotate(-30)")
            .style("text-anchor", "end");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        svg.selectAll(".bar")
            .data(lakersData)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d["Player Name"]))
            .attr("y", d => yScale(d[selectedStat]))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - margin.bottom - yScale(d[selectedStat]))
            .attr("fill", "steelblue")
            .on("mouseover", function () { d3.select(this).attr("fill", "orange"); })
            .on("mouseout", function () { d3.select(this).attr("fill", "steelblue"); });

    }, [selectedStat]);

    return <svg ref={svgRef} width={400} height={300}></svg>;
};

export default BarChart;
