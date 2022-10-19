import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faBox,
    faCartShopping,
    faChartSimple,
    faGear,
    faHouse,
    faRightFromBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import './navbaradmin.css';
function NavbarAdmin() {
    let navigate = useNavigate();
    const routeDashboard = () => {
        let path = `/admin/dashboard`;
        navigate(path);
    };
    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
    };
    const routeChart = () => {
        let path = `/admin/chart`;
        navigate(path);
    };
    const routeProducts = () => {
        let path = `/admin/products`;
        navigate(path);
    };
    const routeOrder = () => {
        let path = `/admin/order`;
        navigate(path);
    };
    const routeUser = () => {
        let path = `/admin/users`;
        navigate(path);
    };
    const [idparam, setIdparam] = useState(window.location.pathname.slice(7));
    if (idparam === 'dashboard') {
        const admin = document.getElementById('route-dashboard-admin');
        if (admin) {
            admin.classList.add('is-open-dashboard');
        }
    } else if (idparam === 'chart') {
        const chart = document.getElementById('route-chart-admin');
        if (chart) {
            chart.classList.add('is-open-dashboard');
        }
    } else if (idparam === 'order') {
        const order = document.getElementById('route-order-admin');
        if (order) {
            order.classList.add('is-open-dashboard');
        }
    } else if (idparam === 'products') {
        const products = document.getElementById('route-products-admin');
        if (products) {
            products.classList.add('is-open-dashboard');
        }
    } else if (idparam === 'users') {
        const user = document.getElementById('route-user-admin');
        if (user) {
            user.classList.add('is-open-dashboard');
        }
    }

    const HandleIconAdmin = () => {
        const icon = document.getElementById('icon-sidebar-admin-dashboard');
        icon.classList.toggle('open-sidebar-admin');
    };

    const handleDeleteLocalStorage = () => {
        routeChangeHome();
        localStorage.removeItem('user');
        localStorage.removeItem('persist:root');
        window.location.reload();
    };

    return (
        <div>
            <div className="wrapper-navbar-admin">
                <div className="navbars-admin">
                    <div className=" d-flex align-items-center ">
                        <span className="name-admin-dashboard mx-3">Nike Dashboard</span>
                        <span onClick={HandleIconAdmin} className="px-3 icon-sidebar-admin">
                            <FontAwesomeIcon className="icon-setting" icon={faBars} />
                        </span>
                    </div>

                    <div className=" d-flex  align-items-center px-3">
                        <span className="px-3">
                            <FontAwesomeIcon className="icon-setting" icon={faGear} />
                        </span>
                        <span>profile</span>
                    </div>
                </div>
                <div className="sidebar-admin-dashboard" id="icon-sidebar-admin-dashboard">
                    <div className="route-dashboard-admin" id="route-dashboard-admin" onClick={routeDashboard}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faHouse} />
                        </span>
                        <span className="mx-2">DashBoard</span>
                    </div>
                    <div className="route-chart-admin" id="route-chart-admin" onClick={routeChart}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faChartSimple} />
                        </span>
                        <span className="mx-2">Chart</span>
                    </div>
                    <div className="route-order-admin" id="route-order-admin" onClick={routeOrder}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        <span className="mx-2">Order</span>
                    </div>
                    <div className="route-products-admin" id="route-products-admin" onClick={routeProducts}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faBox} />
                        </span>
                        <span className="mx-2">Products</span>
                    </div>
                    <div className="route-user-admin" id="route-user-admin" onClick={routeUser}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span className="mx-2">User</span>
                    </div>
                    <div className="route-logout-admin" id="route-logout-admin" onClick={handleDeleteLocalStorage}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </span>
                        <span className="mx-2">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarAdmin;
