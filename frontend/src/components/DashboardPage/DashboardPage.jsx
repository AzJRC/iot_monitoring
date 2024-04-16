import Navbar from "../Navbar/Navbar"
import useDevicesData from "../../hooks/useDevicesData";
import DashboardWidget from "../DashboardWidget/DashboardWidget";
import "./dashboard_page.css";

function DashboardPage({ }) {

	const { devices } = useDevicesData()

	return (
		<>
			<Navbar />
			<section className="dashboardPage__section">
				<h1>Monitor devices</h1>
				<section className="dashboardPage__widgetContainer">
					{devices && devices.map( (device_name, index) => (
						<DashboardWidget key={index} device_name={device_name}/>
					))}
				</section>
			</section>
		</>
	);
}

export default DashboardPage;
