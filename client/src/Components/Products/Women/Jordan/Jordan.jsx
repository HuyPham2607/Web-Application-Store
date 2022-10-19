import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../../layout/Navbar/Navbar.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

function Jordan() {
    const [products, setProducst] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/products/')
            .then(function (response) {
                setProducst(response.data);
            })
            .catch(function (error) {})
            .then(function () {
                // always executed
            });
    }, []);

    let navigate = useNavigate();
    const routeProduct = (_id) => {
        let path = `/products/${_id}`;
        navigate(path);
    };
    const routeJordan = (_id) => {
        let path = `/jordan`;
        navigate(path);
    };
    const routeRunning = (_id) => {
        let path = `/shoes-runing`;
        navigate(path);
    };
    const routeGymandTraining = (_id) => {
        let path = `/gymandtraining`;
        navigate(path);
    };

    const [prodFilter, setProdFilter] = useState([]);
    const [filters, setFilters] = useState({});

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    function toggleText() {
        var x = document.getElementById('idSidebar');
        x.classList.toggle('open');
    }

    const Choose = (e) => {
        const btn = e.target;
        btn.classList.add('choose');
    };

    function Size() {
        var u = document.getElementById('up');
        var x = document.getElementById('size');
        var d = document.getElementById('down');
        x.classList.toggle('open');
        u.classList.toggle('drop-down');
        d.classList.toggle('drop-up');
    }
    useEffect(() => {
        setProdFilter(
            products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value))),
        );
    }, [products, filters]);
    const identifiedProduct = prodFilter.filter((p) => p.identified === 'Jordan');
    const showProducts = identifiedProduct.map((product, index) => {
        return (
            <div
                onClick={() => routeProduct(product._id)}
                className="d-flex col-4 py-3 justify-content-center"
                key={index}
            >
                <div className="card">
                    <div className="card-header">
                        <img className="imageUrl" src={product.imageUrl} alt="" />
                    </div>
                    <div className="card-body">
                        <div>{product.name}</div>
                        <div>{product.title}</div>
                        <div>{product.price.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <Navbar />
            <div className=" py-5 ">
                <div className="d-flex px-5">
                    <div className="col-9">
                        <h5>Men Shoes</h5>
                    </div>
                    <div className="col-3">
                        <div className="d-flex justify-content-end">
                            <span className="mx-3" data-menu-icon-btn onClick={toggleText}>
                                <div>Hide</div>
                            </span>
                            <span className="mx-3">Sort By</span>
                        </div>
                    </div>
                </div>
                <div className="containers">
                    <aside className="sidebar open" data-sidebar id="idSidebar">
                        <div className="top-sidebar" onClick={routeJordan}>
                            <ul>Jordan</ul>
                        </div>
                        <div className="top-sidebar " onClick={routeRunning}>
                            <ul>Running</ul>
                        </div>
                        <div className="top-sidebar" onClick={routeGymandTraining}>
                            <ul>Gym and Training</ul>
                        </div>

                        <div className="middle-sidebar">
                            {/* <ul className="py-2">
                                <div onClick={Gender}> Gender</div>
                                <div className="gender open" id="gender">
                                    <div className="d-flex">
                                        <input type="checkbox" id="men" value="Men" />
                                        <label htmlFor="men" className="text-justify">
                                            Men
                                        </label>
                                    </div>
                                    <div className="d-flex">
                                        <input type="checkbox" id="women" value="Men" />
                                        <label htmlFor="women" className="text-justify">
                                            Women
                                        </label>
                                    </div>
                                </div>
                            </ul> */}
                            <ul className="py-2">
                                <div onClick={Size} className="d-flex justify-content-between btn-list-size">
                                    <span>Size {filters.size}</span>
                                    <span id="up">
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                    <span className="drop-up" id="down">
                                        <FontAwesomeIcon icon={faCaretUp} />
                                    </span>
                                </div>

                                <div className=" flex-wrap size open" id="size">
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={36}
                                    >
                                        36
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={36.5}
                                    >
                                        36.5
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={37}
                                    >
                                        37
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={37.5}
                                    >
                                        37.5
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={38}
                                    >
                                        38
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={38.5}
                                    >
                                        38.5
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={39}
                                    >
                                        39
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={39.5}
                                    >
                                        39.5
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={40}
                                    >
                                        40
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={40.5}
                                    >
                                        40.5
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={41}
                                    >
                                        41
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value={41.5}
                                    >
                                        41.5
                                    </button>
                                </div>
                            </ul>
                            <ul>
                                <div className="btn-list-color">Color {filters.color}</div>
                                <div className=" flex-wrap " id="size">
                                    <button
                                        style={{ backgroundColor: 'red' }}
                                        className="mx-1 btn-color my-2"
                                        name="color"
                                        onClick={(e) => handleFilters(e)}
                                        value={'red'}
                                    ></button>
                                    <button
                                        style={{ backgroundColor: 'black' }}
                                        className="mx-1 btn-color my-2"
                                        name="color"
                                        onClick={(e) => handleFilters(e)}
                                        value={'black'}
                                    ></button>
                                    <button
                                        style={{ backgroundColor: 'blue' }}
                                        className="mx-1 btn-color my-2"
                                        name="color"
                                        onClick={(e) => handleFilters(e)}
                                        value={'blue'}
                                    ></button>
                                </div>
                            </ul>
                        </div>
                    </aside>
                    <main className=" content d-flex">{showProducts}</main>
                </div>
            </div>
        </div>
    );
}

export default Jordan;
