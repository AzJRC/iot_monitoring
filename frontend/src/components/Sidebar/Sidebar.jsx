import React, { forwardRef } from 'react';
import "./sidebar.css"

const Sidebar = forwardRef(
    ({ isSidebarVisible }, ref) => {

        return (
            <nav ref={ref} className={`dashboard__sidebar ${isSidebarVisible ? 'sidebar__opened' : 'sidebar__hidden'}`}>
                <h1>MQTT Monitor</h1>
            </nav>
        );
    }
)

export default Sidebar;
