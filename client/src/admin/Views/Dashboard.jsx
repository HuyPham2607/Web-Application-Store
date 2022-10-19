import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faWallet, faArrowUp, faArrowDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import NavbarAdmin from '../Components/layout/NabvarAdmin/NavbarAdmin';
import SidbarAdmin from '../Components/layout/SidbarAdmin/SidbarAdmin';
import { useDispatch } from 'react-redux';
import { GetUsers } from '../../redux/apiCall';
import axios from 'axios';
import './style.css';

function HomeAdmin() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);
    const [total, setTotal] = useState('');
    const [lead, setLead] = useState([]);
    let InComeTotal = [];
    let LeadTotal = [];
    let sum = 0;
    let sumLead;
    let navigate = useNavigate();

    const routeChangeOrder = () => {
        let path = `/admin/order`;
        navigate(path);
    };
    const routeChangeUser = () => {
        let path = `/admin/users`;
        navigate(path);
    };

    useEffect(() => {
        const getIncome = async () => {
            axios
                .get('http://localhost:5000/api/Order/income', {
                    headers: {
                        token: `Bearer ${
                            user
                                ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser
                                      ?.accessToken
                                : ''
                        }`,
                    },
                })
                .then((res) => {
                    if (res.data.length > 1) {
                        res.data[1]._id > res.data[0]._id
                            ? setPerc((res.data[1].total * 100) / res.data[0].total - 100)
                            : setPerc((res.data[0].total * 100) / res.data[1].total - 100);
                        res.data[1]._id > res.data[0]._id ? setTotal(res.data[1].total) : setTotal(res.data[0].total);
                        setIncome(res.data);
                    } else {
                        setIncome(res.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getIncome();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            axios
                .get('http://localhost:5000/api/users/', {
                    headers: {
                        token: `Bearer ${
                            user
                                ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser
                                      ?.accessToken
                                : ''
                        }`,
                    },
                })
                .then((res) => {
                    const data = res.data;
                    GetUsers(dispatch, data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getUser();
    }, []);
    //// get Lead
    useEffect(() => {
        const getLead = async () => {
            axios
                .get('http://localhost:5000/api/Order/', {
                    headers: {
                        token: `Bearer ${
                            user
                                ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser
                                      ?.accessToken
                                : ''
                        }`,
                    },
                })
                .then((res) => {
                    setLead(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getLead();
    }, []);

    const GetLead = () => {
        lead.map((e) => {
            LeadTotal.push(e.userId);
        });
    };
    GetLead();

    let newArr;
    function foronearr(arr) {
        var formArr = arr.sort();
        newArr = [formArr[0]];
        for (let i = 1; i < formArr.length; i++) {
            if (formArr[i] === formArr[i - 1]) {
                newArr.push(formArr[i]);
            }
        }
        return newArr;
    }
    foronearr(LeadTotal);

    function fortwoarr(arr) {
        var formArr = arr.sort();
        sumLead = [formArr[0]];
        for (let i = 1; i < formArr.length; i++) {
            if (formArr[i] !== formArr[i - 1]) {
                sumLead.push(formArr[i]);
            }
        }
        return sumLead;
    }
    fortwoarr(newArr);

    ///get sum income total
    const SumIncome = () => {
        income.map((e) => {
            InComeTotal.push(e.total);
        });
        function sumArray(InComeTotal) {
            for (let i = 0; i < InComeTotal.length; i++) {
                sum += InComeTotal[i];
            }
            return sum;
        }
        sumArray(InComeTotal);
    };
    SumIncome();

    return (
        <div>
            <NavbarAdmin />
            <div className="col-12 page-chart py-5">
                <div className="row">
                    <div className="nav-admin-dashboard">
                        <SidbarAdmin />
                    </div>
                    <div className="display-admin-dashboard padding-0">
                        <div className=" d-flex home-route">
                            <span className="px-3">
                                <FontAwesomeIcon icon={faHouse} />
                            </span>
                            <div className="px-2">/ Dashboard</div>
                        </div>
                        <div>
                            <h1 className="px-3">Dashboard</h1>
                            <div className="wrapper-dashboard-admin">
                                <div className="col-12 ">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div
                                                className="statistics px-3 my-3"
                                                style={
                                                    sum
                                                        ? { backgroundColor: '#00A7CE' }
                                                        : { backgroundColor: '#AFB1A9' }
                                                }
                                            >
                                                <div className="income-admin-dashboard d-flex justify-content-between align-items-center">
                                                    <div>
                                                        Income
                                                        <div>{sum > 0 ? sum.toLocaleString() : sum} đ</div>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faWallet} size="3x" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div
                                                className="statistics px-3 my-3"
                                                style={
                                                    Math.floor(perc) >= 0
                                                        ? { backgroundColor: '#5AA8F2' }
                                                        : { backgroundColor: '#FF4040' }
                                                }
                                            >
                                                <div className="income-admin-dashboard d-flex justify-content-between align-items-center">
                                                    <div>
                                                        Revenue
                                                        <div>{total > 0 ? total.toLocaleString() : total} đ</div>
                                                    </div>
                                                    <div className="d-flex">
                                                        {Math.floor(perc) > 0 ? (
                                                            <div>
                                                                <span className="mx-3">
                                                                    <FontAwesomeIcon icon={faArrowUp} size="2x" />
                                                                </span>
                                                                <span>{Math.floor(perc)} %</span>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <span className="mx-3">
                                                                    <FontAwesomeIcon icon={faArrowDown} size="2x" />
                                                                </span>
                                                                <span>{Math.floor(perc)} %</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="compared">(compared with the previous month)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div
                                                className="statistics px-3 my-3"
                                                onClick={routeChangeOrder}
                                                style={
                                                    lead
                                                        ? { backgroundColor: '#13B3AC' }
                                                        : { backgroundColor: '#AFB1A9' }
                                                }
                                            >
                                                <div className="income-admin-dashboard d-flex justify-content-between align-items-center">
                                                    <div>
                                                        Order
                                                        <div>{lead.length}</div>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faCartShopping} size="3x" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div
                                                className="statistics px-3 my-3"
                                                onClick={routeChangeUser}
                                                style={
                                                    sumLead
                                                        ? { backgroundColor: '#F5D1C8' }
                                                        : { backgroundColor: '#AFB1A9' }
                                                }
                                            >
                                                <div className="income-admin-dashboard d-flex justify-content-between align-items-center">
                                                    <div>
                                                        Lead
                                                        <div>{sumLead.length}</div>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faUser} size="3x" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
