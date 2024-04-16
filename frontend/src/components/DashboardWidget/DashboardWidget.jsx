import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

const DashboardWidget = ({ device_name, device_data }) => {
  return (
    <div className='dashboardGridWidget'>
      <div className='dashboardGridWidget_header'>
        <p className='dashboardGridWidget_header_title'>{device_name}</p>
        <GiHamburgerMenu className='dashbaordGridWidget_header_hambgIcon'/>
      </div>
      <div className='dashboardGridWidget_chartContainer'>
        <p className=''>{device_data}</p>
      </div>
    </div>
  )
}

export default DashboardWidget