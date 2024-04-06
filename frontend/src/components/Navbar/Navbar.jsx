import React from 'react';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./navbar.css";

const TopNavbar = ({ dashboard_dynamic_title = "Monitor Aplication", extraChildren = null }) => {

    const location = useLocation()

    const dashboardLinkRef = useRef(null);
    const configurationLinkRef = useRef(null);
    const signoutLinkRef = useRef(null);


    useEffect(() => {
        const dashboardLink = dashboardLinkRef.current;
        const configurationLink = configurationLinkRef.current;
        const signoutLink = signoutLinkRef.current;

        if (dashboardLink && dashboardLink.pathname === location.pathname) {
            dashboardLink.classList.add('active');
        } else {
            dashboardLink.classList.remove('active');
        }

        if (configurationLink && configurationLink.pathname === location.pathname) {
            configurationLink.classList.add('active');
        } else {
            configurationLink.classList.remove('active');
        }

        if (signoutLink && signoutLink.pathname === location.pathname) {
            signoutLink.classList.add('active');
        } else {
            signoutLink.classList.remove('active');
        }
    }, [location.pathname]);

    return (
        <section className='dashboard__section'>
            <nav className='dashboard__section__navbar'>
                <Link className='dashboard__section__navbar__link' to="/dashboard" ref={dashboardLinkRef} >Dashboard</Link>
                <Link className='dashboard__section__navbar__link' to="/configuration" ref={configurationLinkRef} >Configuration</Link>
                <Link className='dashboard__section__navbar__link' to="/signout" ref={signoutLinkRef} >Signout</Link>
            </nav>
            <div className='dashboard__section__right'>
                { extraChildren }
                <h1 className='dashboard__section__title'>{dashboard_dynamic_title}</h1>
            </div>
        </section>
    )
}

export default TopNavbar
