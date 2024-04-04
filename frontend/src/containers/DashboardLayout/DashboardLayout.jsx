import React, { useState, useRef, useEffect } from 'react';
import PanelWindow from "../../components/PanelWindow/PanelWindow";
import DevicesWindow from '../../components/DevicesWindow/DevicesWindow';
import Sidebar from "../../components/Sidebar/Sidebar";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import "./dashboard_layout.css"

function DashboardLayout() {
	/* Sidebar logic */
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const SidebarRef = useRef(null);

	const toggleSidebarVisibility = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	/* Refactor this with Refs */
	useEffect(() => {
		const Sidebar = document.querySelector('.dashboard__sidebar');
		const lastParent = document.querySelector('.dashboard-layout');
		const HambBtnSection = document.querySelector('.top-navbar__span__manu-icon');

		const detectDOMElementClicked = (e) => {
			const clickedElementProgressiveParents = [e.target];
			let parent = e.target.parentNode;

			while (parent !== lastParent && parent !== null) {
				clickedElementProgressiveParents.push(parent);
				parent = parent.parentNode;
			}

			if (clickedElementProgressiveParents.indexOf(Sidebar) === -1) {
				if (e.target.className === 'dashboard__sidebar') {
					return;
				}
				if (clickedElementProgressiveParents.indexOf(HambBtnSection) === -1) setIsSidebarVisible(false);
			}
		};

		document.addEventListener('click', detectDOMElementClicked);

		return () => {
			document.removeEventListener('click', detectDOMElementClicked);
		};
	}, []);


	/* Selected option logic */
	const [selectedOption, setSelectedOption] = useState("panel");
	const handleOptionClick = (data) => {
		setSelectedOption(data);
	};


	const displayWindow = () => {
		switch (selectedOption) {
			case 'panel':
				return (
					<PanelWindow />
				)
				
			case 'devices':
				return (
					<DevicesWindow />
				)

		}
	}


	return (
		<>
			<aside>
				<Sidebar ref={SidebarRef} isSidebarVisible={isSidebarVisible} selectedOption={selectedOption} onOptionClick={handleOptionClick} />
			</aside>
			<section className={`dashboard-layout`}>
				<TopNavbar toggleSidebarVisibility={toggleSidebarVisibility} isSidebarVisible={isSidebarVisible} />
				{displayWindow()}
			</section>
		</>
	)
}

export default DashboardLayout;
