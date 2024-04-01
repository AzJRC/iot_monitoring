import React, { useState } from 'react';
import "./sidebar_options.css";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const SidebarOptions = ({ reactIcon, optionTitle }) => {

    /* TODO select option and open sub menu */
    const [isSelected, setIsSelected] = useState(null)

    return (
        <button className={`sidebar__option`}>
            {isSelected && (<FaRegArrowAltCircleRight />)}
            {reactIcon}
            <p>{optionTitle}</p>
        </button>
    );
};

export default SidebarOptions;