import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter >
				<Routes>
					<Route path="/*" element={<App />}></Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);
