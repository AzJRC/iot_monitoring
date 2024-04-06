import React from 'react';
import "./navbar.css";

const TopNavbar = ({dashboard_dynamic_title = "Monitor Aplication"}) => {

    return (
        <section className='dashboard__section'>
            <nav className='dashboard__section__navbar'>
                <a>Link 1</a>
                <a>Link 2</a>
                <a>Link 3</a>
            </nav>
            <h1 className='dashboard__section__title'>{dashboard_dynamic_title}</h1>
        </section>
    )
}

export default TopNavbar
