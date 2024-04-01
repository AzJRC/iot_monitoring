import React from 'react';
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import "./topnavbar.css";

const TopNavbar = ({
    isLeftNavbarVisible,
    toggleLeftNavbarVisibility,
    dashboard_dynamic_title = "MQTT Monitor"
}) => {

    return (
        <nav className='dashboard__top-navbar'>
            <span className='top-navbar__span__manu-icon'>
                <GiHamburgerMenu className='top-navbar__menu-icon' onClick={toggleLeftNavbarVisibility} />
            </span>
            {
                !isLeftNavbarVisible && (<h1 className='top-navbar__title'>{dashboard_dynamic_title}</h1>)
            }

        </nav>
    )
}

export default TopNavbar
