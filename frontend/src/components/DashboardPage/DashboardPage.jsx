import Navbar from "../Navbar/Navbar"
import useDevicesData from "../../hooks/useDevicesData";
import DashboardWidget from "../DashboardWidget/DashboardWidget";
import LineChart from "../charts/LineChart";
import "./dashboard_page.css";

function DashboardPage({ widgets }) {

	const { data } = useDevicesData()

	return (
		<>
			<Navbar />
			<section className="dashboardPage__section">
				<h1>Monitor devices</h1>
				{/* <section className="dashboardPage__widgetContainer">
					{data && Object.entries(data).map(([device_name, device_data], index) => (
						<>
							<DashboardWidget key={index} device_name={device_name} device_data={device_data}/>
						</>
					))}
				</section> */}
				<LineChart />
			</section>
		</>
	);
}

export default DashboardPage;
