import React, { useEffect } from 'react';
import "./dashboard.css";


const Dashboard = ({ selectedOption }) => {

    return (
        <section className='dashboard__main-section'>
            <p>{selectedOption}</p>
        </section>
    );
};

export default Dashboard;