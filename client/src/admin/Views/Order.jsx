import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../redux/apiCall';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { faListCheck, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import NavbarAdmin from '../Components/layout/NabvarAdmin/NavbarAdmin';
import SidbarAdmin from '../Components/layout/SidbarAdmin/SidbarAdmin';
import ChartCpm from '../Components/ChartCmp/ChartCpm.jsx';
import { adminRequest } from '../../requestMethods';
import { useDispatch, useSelector } from 'react-redux';

function OrderAdmin() {
    const dispatch = useDispatch();
    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);
    const user = useSelector((state) => state.user.currentUser);
    const products = useSelector((state) => state.products.products);
    const [orderStats, setOrderStats] = useState([]);
    const [inputsearch, setInputSearch] = useState('');
    const MONTHS = useMemo(
        () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
        [],
    );

    useEffect(() => {
        const getStatsUser = async () => {
            axios
                .get('http://localhost:5000/api/Order/stats', {
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
                    res.data.map((e) => {
                        setOrderStats((prev) => [...prev, { name: MONTHS[e._id - 1], 'Active Order': e.total }]);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getStatsUser();
    }, [MONTHS]);

    const [data, setData] = useState();
    useEffect(() => {
        const getOder = async () => {
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
                    setData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getOder();
    }, []);
    let SearchOrder;
    if (data) {
        SearchOrder = data.filter((e) => {
            if (inputsearch == '') {
                return e;
            } else {
                return (
                    e._id.includes(inputsearch) ||
                    e.username.includes(inputsearch) ||
                    e.address.includes(inputsearch) ||
                    e.amount.toString().includes(inputsearch) ||
                    e.createAt.includes(inputsearch) ||
                    e.status.includes(inputsearch)
                );
            }
        });
    }
    const handleSearch = (e) => {
        var lowerCase = e.target.value;
        setInputSearch(lowerCase);
    };

    if (SearchOrder) {
        SearchOrder.slice(1, 2);
    }

    const handleSee = (e, i) => {
        const see = document.getElementById(e);
        see.classList.toggle('open-order-admin');
    };

    const [pageNum, setPageNum] = useState(0);
    const proPerPage = 5;
    const pagesVistied = pageNum * proPerPage;
    const pageCount = Math.ceil(products.length / proPerPage);
    let displayUser;
    if (SearchOrder) {
        displayUser = SearchOrder.slice(pagesVistied, pagesVistied + proPerPage).map((e, i) => {
            const showProduct = e.products.map((item, i) => {
                const image = products.filter((image) => image._id === item._id);
                console.log(item);
                return (
                    <div key={i} className="d-flex py-2">
                        <div className="py-1">
                            <img style={{ width: '50px' }} src={image[0]?.imageUrl} alt="" />
                        </div>
                        <div className="mx-3">
                            <div className="">{image[0]?.name}</div>
                            <div>{image[0]?.price} đ</div>
                            <div className="d-flex">
                                color
                                <div
                                    className="color-order-admin mx-2 my-1"
                                    style={
                                        item.color === 'collabs'
                                            ? { backgroundColor: `${item.color}`, border: '1px solid red' }
                                            : { backgroundColor: `${item.color}` }
                                    }
                                ></div>
                            </div>
                            <div>Size {item.size}</div>
                        </div>
                    </div>
                );
            });

            const id = e._id;
            const date = e.createAt.slice(8, 10);
            const month = e.createAt.slice(5, 7);
            const year = e.createAt.slice(0, 4);
            const time = e.createAt.slice(11, 16);
            const handleChangeStatus = (e) => {
                const status = e.target.value;
                const idOrder = id;
                const updateOrder = async () => {
                    axios
                        .put(
                            'http://localhost:5000/api/Order/find/update/order',
                            { idOrder, status },
                            {
                                headers: {
                                    token: `Bearer ${
                                        user
                                            ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
                                                  .currentUser?.accessToken
                                            : ''
                                    }`,
                                },
                            },
                        )
                        .then((res) => {})
                        .catch((error) => {
                            console.log(error);
                        });
                };
                updateOrder();
            };

            const Showstatus = () => {
                if (e.status === 'New Order') {
                    return (
                        <select
                            className="status-select-order-admin"
                            id="status"
                            defaultValue={e.status}
                            onChange={(e) => handleChangeStatus(e)}
                        >
                            <option value={e.status}>{e.status}</option>
                            <option value="Accept Order">Accept Order</option>
                            <option value="Reject Order">Reject Order</option>
                        </select>
                    );
                } else if (e.status === 'Accept Order') {
                    return (
                        <select
                            className="status-select-order-admin"
                            id="status"
                            defaultValue={e.status}
                            onChange={(e) => handleChangeStatus(e)}
                        >
                            <option value="Accept Order">Accept Order</option>
                            <option value="Reject Order">Reject Order</option>
                        </select>
                    );
                } else {
                    return (
                        <select
                            className="status-select-order-admin"
                            id="status"
                            defaultValue={e.status}
                            onChange={(e) => handleChangeStatus(e)}
                        >
                            <option value="Accept Order">Accept Order</option>
                            <option value="Reject Order">Reject Order</option>
                        </select>
                    );
                }
            };

            return (
                <div className="col-12 padding-0" key={i}>
                    <div className="d-flex py-2 nav-order-admin">
                        <div className=" padding-0 id-order-admin">#{e._id.slice(0, 4)}</div>

                        <div className="name-order-admin">{e.username}</div>
                        <div className="address-order-admin">{e.address}</div>
                        <div className="products-order-admin">
                            <div className="product-product-admin">{showProduct}</div>
                        </div>
                        <div className="amount-order-admin">{e.amount.toLocaleString()} đ</div>
                        <div className="status-order-admin text-center">{Showstatus()}</div>
                        <div className="see-detail-order-admin" onClick={() => handleSee(e._id, i)}>
                            Detail
                        </div>
                    </div>
                    <div className=" px-3 py-3 detail-order-admin" key={i} id={e._id}>
                        <div className="">Id: #{e._id}</div>
                        <div className="d-flex">
                            <div>Date: {date}</div>-<div>{month}</div>-<div>{year}</div>
                        </div>
                        <div className="">Customer: {e.username}</div>
                        <div className="">Address: {e.address}</div>
                        <div className="">Amount: {e.amount.toLocaleString()}</div>
                        <div className="">
                            <div className="product-product-admin">Products: {showProduct}</div>
                        </div>
                    </div>
                </div>
            );
        });
    }
    const ChangePage = ({ selected }) => {
        setPageNum(selected);
    };

    return (
        <div>
            <NavbarAdmin />
            <div className="col-12 page-chart pt-5">
                <div className="row">
                    <div className="nav-admin-dashboard">
                        <SidbarAdmin />
                    </div>
                    <div className="display-admin-dashboard padding-0">
                        <div className="d-flex home-route">
                            <span>
                                <FontAwesomeIcon icon={faHouse} />
                            </span>

                            <div className="px-2">/ Order</div>
                        </div>
                        <div className="d-flex justify-content-between row mx-0">
                            <h1 className="col-md-6">Order</h1>
                            <div className="col-md-6">
                                <input
                                    className="search-order-admin"
                                    onChange={(e) => handleSearch(e)}
                                    type="search"
                                    placeholder="search... UserId, Name ,Address"
                                />
                            </div>
                        </div>
                        <div className=" wrapper-order-admin py-5">
                            <div className="col-12 padding-0">
                                <div className="d-flex ">
                                    <div className=" id-order-admin">Order ID</div>
                                    <div className=" name-order-admin">Customer</div>
                                    <div className=" address-order-admin">Address</div>
                                    <div className=" products-order-admin">Product</div>
                                    <div className=" amount-order-admin">Amount</div>
                                    <div className=" status-order-admin text-center">Status Order</div>
                                </div>
                            </div>
                            {displayUser}
                            <ReactPaginate
                                previousLabel={<FontAwesomeIcon icon={faBackwardStep} />}
                                nextLabel={<FontAwesomeIcon icon={faForwardStep} />}
                                pageCount={pageCount}
                                onPageChange={ChangePage}
                                containerClassName={'paginationBttns'}
                                previousLinkClassName={'previousBttns'}
                                nextLinkClassName={'nextBttn'}
                            />
                        </div>
                        {/* <div className="wrapper-chartOrder-admin">
                            <ChartCpm title="Active Order" data={orderStats} gird dataKey="Active Order" />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderAdmin;
