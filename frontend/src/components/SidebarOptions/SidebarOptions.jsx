import React, { useState, useEffect } from 'react';
import "./sidebar_options.css";

const SidebarOptions = ({ reactIcon, optionTitle, data, cb, isSelected }) => {

    const handleButtonClicked = (e) => {
        cb(e.currentTarget.dataset.btnFunc)
    }

    return (
        <button
            className={`sidebar__option ${isSelected ? 'selected' : ''}`}
            data-btn-func={data}
            onClick={handleButtonClicked}
        >
            {reactIcon}
            <p>{optionTitle}</p>
        </button>
    );
};

export default SidebarOptions;