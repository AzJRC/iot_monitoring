import React, { forwardRef, useEffect, useState } from 'react';
import SidebarOptions from './../SidebarOptions/SidebarOptions';
import "./sidebar.css";
import { MdSpaceDashboard } from "react-icons/md";
import { TbDeviceComputerCamera } from "react-icons/tb"

// Sidebar options
const options = [
    { icon: <MdSpaceDashboard />, title: "Panel", data: "panel" },
    { icon: <TbDeviceComputerCamera />, title: "Devices", data: "devices" },
];

const Sidebar = forwardRef(({ isSidebarVisible, selectedOption, onOptionClick }, ref) => {

    return (
        <nav ref={ref} className={`dashboard__sidebar ${isSidebarVisible ? 'sidebar__opened' : 'sidebar__hidden'}`}>
            <h1 className='sidebar__title'>Monitor App</h1>
            {options.map((option, index) => (
                <SidebarOptions
                    key={index}
                    reactIcon={option.icon}
                    optionTitle={option.title}
                    data={option.data}
                    cb={onOptionClick}
                    isSelected={selectedOption === option.data}
                />
            ))}
        </nav>
    );
}
);

export default Sidebar;