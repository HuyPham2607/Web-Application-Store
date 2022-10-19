import { useMemo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import NavbarAdmin from '../Components/layout/NabvarAdmin/NavbarAdmin';
import SidbarAdmin from '../Components/layout/SidbarAdmin/SidbarAdmin';
import ChartCmp from '../Components/ChartCmp/ChartCpm.jsx';
import { adminRequest } from '../../requestMethods';
import './style.css';
function Chart() {
    const [userStats, setUserStats] = useState([]);
    const MONTHS = useMemo(
        () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
        [],
    );

    useEffect(() => {
        const getStatsUser = async () => {
            try {
                const res = await adminRequest.get('users/stats');
                res.data.map((e) => {
                    setUserStats((prev) => [...prev, { name: MONTHS[e._id - 1], 'Active User': e.total }]);
                });
            } catch (error) {
                console.log(error);
            }
        };
        getStatsUser();
    }, [MONTHS]);

    return (
        <div>
            <NavbarAdmin />
            <div className="col-12 page-chart py-5">
                <div className="row">
                    <div className="nav-admin-dashboard">
                        <SidbarAdmin />
                    </div>
                    <div className="display-admin-dashboard padding-0">
                        <div className="d-flex home-route">
                            <span className="px-3">
                                <FontAwesomeIcon icon={faHouse} />
                            </span>
                            <div className="px-2">/ Chart</div>
                        </div>
                        <div>
                            <ChartCmp title="Active User" data={userStats} gird dataKey="Active User" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chart;
