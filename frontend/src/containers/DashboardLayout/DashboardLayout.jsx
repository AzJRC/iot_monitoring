import React, { useState, useRef, useEffect } from 'react';
import Dashboard from "../../components/Dashboard/Dashboard";
import LeftNavbar from "../../components/LeftNavbar/LeftNavbar";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import "./dashboard_layout.css"

function DashboardLayout() {
  const [isLeftNavbarVisible, setIsLeftNavbarVisible] = useState(false);
  const leftNavbarRef = useRef(null);

  const toggleLeftNavbarVisibility = () => {
    setIsLeftNavbarVisible(!isLeftNavbarVisible);
  };

  /* Refactor this with Refs */
  useEffect(() => {
    const leftNavbar = document.querySelector('.dashboard__left-navbar');
    const lastParent = document.querySelector('.dashboard-layout');
    const HambBtnSection = document.querySelector('.top-navbar__span__manu-icon');

    const detectDOMElementClicked = (e) => {
      const clickedElementProgressiveParents = [e.target];
      let parent = e.target.parentNode;

      while (parent !== lastParent && parent !== null) {
        clickedElementProgressiveParents.push(parent);
        parent = parent.parentNode;
      }

      if (clickedElementProgressiveParents.indexOf(leftNavbar) === -1) {
        if (e.target.className === 'dashboard__left-navbar') {
          return;
        }
        if (clickedElementProgressiveParents.indexOf(HambBtnSection) === -1) setIsLeftNavbarVisible(false);
      }
    };

    document.addEventListener('click', detectDOMElementClicked);

    return () => {
      document.removeEventListener('click', detectDOMElementClicked);
    };
  }, []);

  return (
    <main className={`dashboard-layout ${isLeftNavbarVisible ? 'dashboard-layout__two-columns' : 'dashboard-layout__one-columns'}`}>
      <TopNavbar toggleLeftNavbarVisibility={toggleLeftNavbarVisibility} isLeftNavbarVisible={isLeftNavbarVisible} />
      <LeftNavbar ref={leftNavbarRef} isLeftNavbarVisible={isLeftNavbarVisible} />
      <Dashboard />
    </main>
  )
}

export default DashboardLayout;
