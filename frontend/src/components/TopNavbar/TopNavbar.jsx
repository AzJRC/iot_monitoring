import React from 'react';
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import "./topnavbar.css";

const TopNavbar = ({
    isSidebarVisible,
    toggleSidebarVisibility,
    dashboard_dynamic_title = "Monitor Aplication"
}) => {

    return (
        <nav className='dashboard__top-navbar'>
            <span className='top-navbar__span__manu-icon'>
                <GiHamburgerMenu className='top-navbar__menu-icon' onClick={toggleSidebarVisibility} />
            </span>
            <h1 className='top-navbar__title'>{dashboard_dynamic_title}</h1>
            <HiPencilAlt className='top-navbar__edit-icon' onClick={() => { }} />
        </nav>
    )
}

export default TopNavbar
