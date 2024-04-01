import React, { forwardRef } from 'react';
import "./leftnavbar.css"

const LeftNavbar = forwardRef(
    ({ isLeftNavbarVisible }, ref) => {

        return (
            <nav ref={ref} className={`dashboard__left-navbar ${isLeftNavbarVisible ? 'left-navbar__opened' : 'left-navbar__hidden'}`}>
                <h1>MQTT Monitor</h1>
            </nav>
        );
    }
)

export default LeftNavbar;
