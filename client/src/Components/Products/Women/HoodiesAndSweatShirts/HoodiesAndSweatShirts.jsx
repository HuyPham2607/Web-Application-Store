import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../../layout/Navbar/Navbar.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faChevronCircleDown, faXmark } from '@fortawesome/free-solid-svg-icons';

function HoodiesAndSweatShirts() {
    const [onfilter, setOnfilter] = useState(true);
    const [products, setProducst] = useState([]);
    const [sortby, setSortBy] = useState('');
    console.log(products);
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

    const routeClubTopandTshirt = (_id) => {
        let path = `/TopAndTShirts`;
        navigate(path);
    };
    const routeShort = (_id) => {
        let path = `/shortmen`;
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
        setOnfilter(!onfilter);
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

    const handleOpenSortby = () => {
        const sortby = document.getElementById('sortby');
        sortby.classList.toggle('sortby-open');
    };

    const handleOpenFilter = () => {
        const tablet = document.getElementById('filter-tablet');
        tablet.classList.add('open-sidebar-tablet');
        tablet.classList.remove('close-sidebar-tablet');
    };
    const HandleCloseFilter = () => {
        const tablet = document.getElementById('filter-tablet');
        tablet.classList.remove('open-sidebar-tablet');
        tablet.classList.add('close-sidebar-tablet');
    };

    const handleSortBy = (e) => {
        setSortBy(e.target.value);
    };
    useEffect(() => {
        setProdFilter(
            products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value))),
        );
    }, [products, filters]);

    const ShowSortBy = () => {
        if (sortby === 'hight-low') {
            return <div>Price: Hight-Low</div>;
        } else if (sortby === 'low-hight') {
            return <div>Price: Low-Hight</div>;
        }
    };

    const identifiedProduct = prodFilter.filter((p) => p.identified === 'Hoodies&Sweatshirts');
    console.log(identifiedProduct);

    let showProducts;
    if (sortby === '') {
        showProducts = identifiedProduct.map((product, index) => {
            return (
                <div
                    onClick={() => routeProduct(product._id)}
                    className="d-flex col-md-4 col-sm-6 col-12  py-3 justify-content-center"
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
    } else if (sortby === 'low-hight') {
        showProducts = identifiedProduct
            .sort((a, b) => (a.price > b.price ? 1 : -1))
            .map((product, index) => {
                return (
                    <div
                        onClick={() => routeProduct(product._id)}
                        className="d-flex col-md-4 col-sm-6 col-12 py-3 justify-content-center"
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
    } else {
        showProducts = identifiedProduct
            .sort((a, b) => (a.price < b.price ? 1 : -1))
            .map((product, index) => {
                return (
                    <div
                        onClick={() => routeProduct(product._id)}
                        className="d-flex col-md-4 col-sm-6 col-12  py-3 justify-content-center"
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
    }

    return (
        <div>
            <Navbar />
            <div className=" py-5 wrapper-item">
                <div className="d-flex filter-action justify-content-between">
                    <div className="">
                        <h5>Men Shoes</h5>
                    </div>
                    <div className="filter-item-right">
                        <div className="d-flex filter-left justify-content-end">
                            <span className="mx-3" data-menu-icon-btn onClick={toggleText}>
                                <div>{onfilter ? 'Hide' : 'Show'}</div>
                            </span>
                            <span className=" sort-left d-flex">
                                <span onClick={handleOpenSortby}>
                                    <span className="w-100">
                                        Sort By
                                        <FontAwesomeIcon icon={faChevronCircleDown} />
                                    </span>
                                    {ShowSortBy()}
                                    <div className="sortby sortby-close" id="sortby">
                                        <button onClick={(e) => handleSortBy(e)} className="btn-sort" value="hight-low">
                                            Price: Hight-Low
                                        </button>
                                        <br />
                                        <button onClick={(e) => handleSortBy(e)} className="btn-sort" value="low-hight">
                                            Price: Low-Hight
                                        </button>
                                    </div>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="header-filter ">
                    <div className="d-flex ">
                        <span onClick={routeClubTopandTshirt}>
                            <span className="headline-page-route">Top And TShirts</span>
                        </span>
                        <span>
                            <span className="headline-page-route">Hoodies & SweatShirts</span>
                        </span>
                        <span onClick={routeShort}>
                            <span className="headline-page-route">Short</span>
                        </span>
                    </div>
                    <div className="d-flex justify-content-between ">
                        <span className="headline-page-route">Result {products.length}</span>
                        <button className="btn-filter" onClick={handleOpenFilter}>
                            Filter
                        </button>
                    </div>
                </div>
                <div className="containers">
                    <aside className="sidebar open" data-sidebar id="idSidebar">
                        <div className="top-sidebar" onClick={routeClubTopandTshirt}>
                            <ul>Top And TShirts</ul>
                        </div>
                        <div className="top-sidebar" onClick={routeShort}>
                            <ul>Hoodies & SweatShirts</ul>
                        </div>
                        <div className="top-sidebar">
                            <ul>Short</ul>
                        </div>
                        <div className="middle-sidebar">
                            <div className="py-2  px-4">
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
                                        value="S"
                                    >
                                        S
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value="M"
                                    >
                                        M
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value="L"
                                    >
                                        L
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value="XL"
                                    >
                                        XL
                                    </button>
                                    <button
                                        className="mx-1 btn-size my-2"
                                        name="size"
                                        onClick={(e) => {
                                            handleFilters(e);
                                            Choose(e);
                                        }}
                                        value="XXL"
                                    >
                                        XXL
                                    </button>
                                </div>
                            </div>
                            <div className="px-4">
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
                            </div>
                        </div>
                    </aside>
                    <main className="content row">{showProducts}</main>
                </div>
                <div className="sidebar-talet close-sidebar-tablet" id="filter-tablet">
                    <div className="px-3 py-3 d-flex justify-content-between">
                        <span className="headline">Filter</span>
                        <span onClick={HandleCloseFilter}>
                            <FontAwesomeIcon icon={faXmark} className="btn-close-filter" />
                        </span>
                    </div>
                    <div className="px-3">
                        <div className="headline">Sort By</div>
                        <form action="submit" onChange={(e) => handleSortBy(e)} className="py-3">
                            <input type="radio" id="hight-low" name="sortby" value="hight-low" /> 
                            <label htmlFor="hight-low" className="btn-input-sort">
                                Price: Hight-Low
                            </label>
                            <br />
                            <input type="radio" id="low-hight" name="sortby" value="low-hight" /> 
                            <label className="btn-input-sort" htmlFor="low-hight">
                                Price: Low-Hight
                            </label>
                        </form>
                    </div>
                    <div className="middle-sidebar">
                        <div className="py-2 px-3">
                            <div onClick={Size} className="d-flex justify-content-between btn-list-size">
                                <span className="headline">Size {filters.size}</span>
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
                        </div>
                        <div className="px-3">
                            <div className="btn-list-color headline">Color {filters.color}</div>
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
                        </div>
                    </div>
                    <div className="mx-5 sidebar-bottom-filter">
                        <button className="btn-bottom-apply">1</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HoodiesAndSweatShirts;
