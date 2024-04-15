import React from 'react'

const DashboardWidget = ({ device_name, device_data }) => {
  return (
    <div className='dashboardGridWidget'>
        <p>{device_name}</p>
        <p>{device_data}</p>
    </div>
  )
}

export default DashboardWidget