import { useNavigate } from 'react-router-dom';
import './SidbarAdmin.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faBox,
    faCartShopping,
    faChartSimple,
    faHouse,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

function SidbarAdmin() {
    const user = useSelector((state) => state.user.currentUser);

    let navigate = useNavigate();
    const routeChangeOrder = () => {
        let path = `/admin/order`;
        navigate(path);
    };
    const routeChangeChart = () => {
        let path = `/admin/chart`;
        navigate(path);
    };
    const routeChangeDashboard = () => {
        let path = `/admin/dashboard`;
        navigate(path);
    };
    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
    };
    const routeChangeUser = () => {
        let path = `/admin/users`;
        navigate(path);
    };
    const routeChangeProducts = () => {
        let path = `/admin/products`;
        navigate(path);
    };

    const handleDeleteLocalStorage = () => {
        routeChangeHome();
        localStorage.removeItem('user');
        localStorage.removeItem('persist:root');
        window.location.reload();
    };
    return (
        <div className="wrapper-sidbar-admin">
            <div>
                <div className="py-3">
                    <div className="name-admin">{user?.user.name}</div>
                    <div className="underline"></div>
                </div>
                <div className="navsidebar-admin-dashboard d-flex mt-1 py-2" onClick={routeChangeDashboard}>
                    <span className="mx-2 icon-sidebar-dashboard-admin ">
                        <FontAwesomeIcon icon={faHouse} />
                    </span>
                    <div>Dashboard</div>
                </div>
                <div className="navsidebar-admin-chart d-flex mt-1 py-2" onClick={routeChangeChart}>
                    <span className="mx-2 icon-sidebar-dashboard-admin">
                        <FontAwesomeIcon icon={faChartSimple} />
                    </span>
                    <div>Chart</div>
                </div>
                <div className="navsidebar-admin-order d-flex mt-1 py-2" onClick={routeChangeOrder}>
                    <span className="mx-2 icon-sidebar-dashboard-admin">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                    <div>Order</div>
                </div>
                <div className="navsidebar-admin-products d-flex mt-1 py-2" onClick={routeChangeProducts}>
                    <span className="mx-2 icon-sidebar-dashboard-admin">
                        <FontAwesomeIcon icon={faBox} />
                    </span>
                    <div>Products</div>
                </div>
                <div className="navsidebar-admin-user d-flex mt-1 py-2" onClick={routeChangeUser}>
                    <span className="mx-2 icon-sidebar-dashboard-admin">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <div>User</div>
                </div>
                <div className="navsidebar-admin-logout d-flex mt-1 py-2" onClick={handleDeleteLocalStorage}>
                    <span className="mx-2 icon-sidebar-dashboard-admin">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </span>
                    <div>Logout</div>
                </div>
            </div>
        </div>
    );
}

export default SidbarAdmin;
