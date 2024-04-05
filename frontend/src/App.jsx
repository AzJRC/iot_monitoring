import "./App.css";
import LoginForm from "./components/LoginForm/Login";
import RequireAuth from "./components/RequireAuth";
import Layout from "./Layout";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/"  element={<Layout />}>
				{/* Public */}
				<Route path="/" element={<LoginForm />} />

				{/* Private */}
				<Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardPage />}/>
        </Route>

				{/* Others */}
			</Route>
		</Routes>
	);
}

export default App;
