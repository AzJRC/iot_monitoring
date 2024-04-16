import React, { useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./dashboard_widget.css";
import LineChart from "../charts/LineChart";
import Window from "../Window/Window";

const DashboardWidget = ({ device_name }) => {
	// Declarations
	const [isChartEditorOpen, setIsChartEditorOpen] = useState(false);
	const [lineLabel, setLineLabel] = useState("data");
	const [XAxisLength, setXAxisLength] = useState(10);
	const [YRangeMin, setYRangeMin] = useState(0);
	const [YRangeMax, setYRangeMax] = useState(null);
	const [ChartTitle, setChartTitle] = useState('device_name');

	const editChartBtnRef = useRef(null);

	// Functions
	const openChartEditor = () => {
		setIsChartEditorOpen(true);
		editChartBtnRef.current.disabled = true;
	};

	const closeChartEditor = () => {
		setIsChartEditorOpen(false);
		editChartBtnRef.current.disabled = false;
	};

	const handleChartChanges = (event) => {
		event.preventDefault();
		setLineLabel("data");
		setLineLabel(10);
		setLineLabel(0);
		setLineLabel(null);
		setLineLabel(device_name);
	};

	return (
		<div className="dashboardGridWidget">
			<div className="dashboardGridWidget_header">
				<p className="dashboardGridWidget_header_title">
					Device:{" "}
					<span className="dashboardGridWidget_header_deviceName">
						{device_name}
					</span>
				</p>
				<button
					className="dashboardGridWidget_header_hambgIcon"
					onClick={openChartEditor}
					ref={editChartBtnRef}
				>
					<GiHamburgerMenu />
				</button>
				{isChartEditorOpen && (
					<Window
						isWindowClosed={closeChartEditor}
						children={
							<EditChart
								device={device_name}
								acceptChanges={handleChartChanges}
								inputLineLabel={setLineLabel}
								inputXAxisLength={setXAxisLength}
								inputYRangeMin={setYRangeMin}
								inputYRangeMax={setYRangeMax}
								inputChartTitle={setChartTitle}
							/>
						}
					/>
				)}
			</div>
			<div className="dashboardGridWidget_chartContainer">
				<LineChart
					device={device_name}
					lineLabel={lineLabel}
					maxLength={Math.round(XAxisLength)}
					yRange={[Math.round(YRangeMin), YRangeMax ? Math.round(YRangeMax) : null]}
					chartTitle={ChartTitle}
				/>
			</div>
		</div>
	);
};

const EditChart = ({
	device,
	acceptChanges,
	inputLineLabel,
	inputXAxisLength,
	inputYRangeMin,
	inputYRangeMax,
	inputChartTitle,
}) => {
	return (
		<>
			<h1>Edit Chart of device: {device} </h1>
			<form className="dashboardPage_form">
				<label htmlFor="dashboardPage_input_lineLabel">Line Label</label>
				<input
					type="text"
					id="dashboardPage_input_lineLabel"
					onChange={(e) => inputLineLabel(e.target.value)}
				/>

				<label htmlFor="dashboardPage_input_xAxisLength">
					Max x-Axis Length
				</label>
				<input
					type="number"
					id="dashboardPage_input_xAxisLength"
					min={1}
					onChange={(e) => inputXAxisLength(e.target.value)}
				/>

				<label htmlFor="dashboardPage_input_yRange">y-Axis Range</label>
				<div className="dashboardPage_input_container">
					<input
						type="number"
						id="dashboardPage_input_yRange_min"
						placeholder="min"
						onChange={(e) => inputYRangeMin(e.target.value)}
					/>
					<input
						type="number"
						id="dashboardPage_input_yRange_max"
						placeholder="max"
						onChange={(e) => inputYRangeMax(e.target.value)}
					/>
				</div>

				<label htmlFor="dashboardPage_input_chartTitle">Chart Title</label>
				<input
					type="text"
					id="dashboardPage_input_chartTitle"
					onChange={(e) => inputChartTitle(e.target.value)}
				/>

				<button type="submit" onClick={acceptChanges}>
					Reset
				</button>
			</form>
		</>
	);
};

export default DashboardWidget;
