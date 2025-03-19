import React, { useState } from "react";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import ScatterPlot from "./components/ScatterPlot";

function App() {
    const [selectedStat, setSelectedStat] = useState("Points Scored");

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial" }}>
            <h1>Lakers Player Stats Dashboard</h1>

            {/* Dropdown to select a stat */}
            <label>Select a stat:</label>
            <select onChange={(e) => setSelectedStat(e.target.value)}>
                <option value="Points Scored">Points Scored</option>
                <option value="Shot Attempts">Shot Attempts</option>
                <option value="Rebounds">Rebounds</option>
                <option value="Assists">Assists</option>
                <option value="Minutes Played">Minutes Played</option>
            </select>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "20px" }}>
                <BarChart selectedStat={selectedStat} />
                <LineChart selectedStat={selectedStat} />
                <ScatterPlot selectedStat={selectedStat} />
            </div>
        </div>
    );
}

export default App;
