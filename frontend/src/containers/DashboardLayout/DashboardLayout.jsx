import React, { useState, useRef, useEffect } from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import "./dashboard_layout.css"

function DashboardLayout() {
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

  return (
    <>
      <aside>
        <Sidebar ref={SidebarRef} isSidebarVisible={isSidebarVisible} />
      </aside>
      <section className={`dashboard-layout ${isSidebarVisible ? 'dashboard-layout__two-columns' : 'dashboard-layout__one-columns'}`}>
        <TopNavbar toggleSidebarVisibility={toggleSidebarVisibility} isSidebarVisible={isSidebarVisible} />
        <Dashboard />
      </section>
    </>
  )
}

export default DashboardLayout;
