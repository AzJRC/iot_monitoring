import React, { forwardRef, useEffect, useState } from 'react';
import SidebarOptions from './../SidebarOptions/SidebarOptions';
import "./sidebar.css";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { MdOutlineChangeHistory } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";

// Sidebar options
const options = [
    { icon: <MdSpaceDashboard />, title: "Dashboard", data: "dashb" },
    { icon: <IoMdAddCircleOutline />, title: "Add device", data: "add" },
    { icon: <IoMdRemoveCircleOutline />, title: "Remove device", data: "rmv" },
    { icon: <MdOutlineChangeHistory />, title: "Edit device", data: "edit" }
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