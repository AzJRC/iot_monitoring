import React, { forwardRef, useEffect, useState } from 'react';
import SidebarOptions from './../SidebarOptions/SidebarOptions';
import "./sidebar.css";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { MdOutlineChangeHistory } from "react-icons/md";

// Sidebar options
const options = [
    [<IoMdAddCircleOutline />, "Add device"],
    [<IoMdRemoveCircleOutline />, "Remove device"],
    [<MdOutlineChangeHistory />, "Edit device"]
];

const Sidebar = forwardRef(
    ({ isSidebarVisible }, ref) => {

        return (
            <nav ref={ref} className={`dashboard__sidebar ${isSidebarVisible ? 'sidebar__opened' : 'sidebar__hidden'}`}>
                <h1 className='sidebar__title'>MQTT Monitor</h1>
                {options.map((option, index) => (
                    <SidebarOptions key={index} reactIcon={option[0]} optionTitle={option[1]} />
                ))}
            </nav>
        );
    }
);

export default Sidebar;