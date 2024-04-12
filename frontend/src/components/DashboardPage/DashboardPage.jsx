import Navbar from "../Navbar/Navbar"
import MonitorWindow from "../MonitorWindow/MonitorWindow";
import "./dashboard_page.css";

function DashboardPage() {
	return (
		<>
			<Navbar />
			<section className="dashboard-page__section">
				<h1>Monitor devices</h1>
				<MonitorWindow />
			</section>
		</>
	);
}

export default DashboardPage;
