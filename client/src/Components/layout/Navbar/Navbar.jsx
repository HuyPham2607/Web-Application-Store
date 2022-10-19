import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../redux/apiCall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleRight,
    faAngleLeft,
    faBars,
    faXmark,
    faCaretDown,
    faCaretUp,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
function Navbars() {
    const dispatch = useDispatch();
    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);
    const [inputsearch, setInputSearch] = useState('');
    const [sidebaruser, setsidebaruser] = useState(false);
    const products = useSelector((state) => state.products.products);
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    };
    const routeChangeregister = () => {
        let path = `/register`;
        navigate(path);
    };
    const routeChangeShoes = () => {
        let path = `/shoes`;
        navigate(path);
    };
    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
    };

    const routeChangeDashBoard = () => {
        let path = `/admin/dashboard`;
        navigate(path);
    };

    const routeChangeCart = () => {
        let path = `/cart`;
        navigate(path);
    };
    const routeChangeShoesRunning = () => {
        let path = `/shoes-runing`;
        navigate(path);
    };
    const routeChangeJordan = () => {
        let path = `/jordan`;
        navigate(path);
    };
    const routeChangeGymandTraining = () => {
        let path = `/gymandtraining`;
        navigate(path);
    };
    const routeChangeBackToBasics = () => {
        let path = `/bacsicseseentinails`;
        navigate(path);
    };
    const routeChangeTopsAndTShirts = () => {
        let path = `/TopAndTShirts`;
        navigate(path);
    };
    const routeChangeHoodiesAndSweatshirts = () => {
        let path = `/hoodiesandsweatshirts`;
        navigate(path);
    };

    const routeChangeShortMen = () => {
        let path = `/shortmen`;
        navigate(path);
    };

    const routeChangeMen = () => {
        let path = `/men`;
        navigate(path);
    };
    const routeChangeClubFootBall = () => {
        let path = `/clubfootball`;
        navigate(path);
    };
    const routeChangeAllClothing = () => {
        let path = `/allclothingmen`;
        navigate(path);
    };
    const routeChangeProfile = () => {
        let path = `/profile`;
        navigate(path);
    };
    const routeProduct = (_id) => {
        const s = document.getElementById('pre-scrim');
        const x = document.getElementById('list-search');
        const u = document.getElementById('nav-search');
        u.classList.remove('nav-search');
        x.classList.remove('nav-list-display-block');
        s.classList.remove('is-open');
        let path = `/products/${_id}`;
        navigate(path);
    };

    ///Logou
    const handleDeleteLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('persist:root');
        routeChangeHome();
        window.location.reload();
    };

    const handleFocus = () => {
        const s = document.getElementById('pre-scrim');
        const x = document.getElementById('list-search');
        const u = document.getElementById('nav-search');
        u.classList.add('nav-search');
        x.classList.add('nav-list-display-block');
        s.classList.add('is-open');
    };
    const handleUnFocus = () => {
        const s = document.getElementById('pre-scrim');
        const x = document.getElementById('list-search');
        const u = document.getElementById('nav-search');
        u.classList.remove('nav-search');
        x.classList.remove('nav-list-display-block');
        s.classList.remove('is-open');
    };

    let SearchProduct;
    if (products) {
        SearchProduct = products.filter((e) => {
            if (inputsearch === '') {
                return e;
            } else {
                return e.name.includes(inputsearch);
            }
        });
    }
    const handleSearch = (e) => {
        var lowerCase = e.target.value;
        setInputSearch(lowerCase);
    };

    const proPerPage = 4;
    const pagesVistied = proPerPage;
    const displayUser = SearchProduct.slice(pagesVistied, pagesVistied + proPerPage).map((item, i) => {
        return (
            <div key={i}>
                <div className="py-2 d-flex" onClick={() => routeProduct(item._id)}>
                    <img className="image-small" src={item.imageUrl} alt="" />
                    <div className="name-small mx-3">{item.name}</div>
                </div>
            </div>
        );
    });

    const handleMenu = () => {
        const m = document.getElementById('nav-sidebar');
        const s = document.getElementById('pre-scrim');
        s.classList.add('is-open');
        m.classList.add('active-menu');
        m.classList.remove('unactive-menu');
    };

    const handleCloseMenu = () => {
        const s = document.getElementById('pre-scrim');
        const m = document.getElementById('nav-sidebar');
        const men = document.getElementById('nav-men');
        const women = document.getElementById('nav-women');
        const kids = document.getElementById('nav-kids');
        s.classList.remove('is-open');
        m.classList.add('unactive-menu');
        m.classList.remove('active-menu');
        men.classList.remove('nav-men-open');
        men.classList.add('nav-men-unopen');
        women.classList.remove('nav-women-open');
        women.classList.add('nav-women-unopen');
        kids.classList.remove('nav-kids-open');
        kids.classList.add('nav-kids-unopen');

        ////
        const mennew = document.getElementById('nav-men-new');
        mennew.classList.remove('nav-men-new-open');
        mennew.classList.add('nav-men-new-unopen');
        const womennew = document.getElementById('nav-women-new');
        womennew.classList.remove('nav-women-new-open');
        womennew.classList.add('nav-women-new-unopen');
        const kidsnew = document.getElementById('nav-kids-new');
        kidsnew.classList.remove('nav-kids-new-open');
        kidsnew.classList.add('nav-kids-new-unopen');
        /////
        const shoesmen = document.getElementById('nav-men-shoes');
        shoesmen.classList.remove('nav-men-shoes-open');
        shoesmen.classList.add('nav-men-shoes-unopen');
        const shoeswomen = document.getElementById('nav-women-shoes');
        shoeswomen.classList.remove('nav-women-shoes-open');
        shoeswomen.classList.add('nav-women-shoes-unopen');
        const shoes = document.getElementById('nav-kids-shoes');
        shoes.classList.remove('nav-kids-shoes-open');
        shoes.classList.add('nav-kids-shoes-unopen');
        ////
        const clothingmen = document.getElementById('nav-men-clothing');
        clothingmen.classList.remove('nav-men-clothing-open');
        clothingmen.classList.add('nav-men-clothing-unopen');
        const clothingwomen = document.getElementById('nav-women-clothing');
        clothingwomen.classList.remove('nav-women-clothing-open');
        clothingwomen.classList.add('nav-women-clothing-unopen');
        const clothingkids = document.getElementById('nav-kids-clothing');
        clothingkids.classList.remove('nav-kids-clothing-open');
        clothingkids.classList.add('nav-kids-clothing-unopen');
    };

    const handleCloseAll = () => {
        handleUnFocus();
        handleCloseMenu();
    };

    const hanldeClickNavMen = () => {
        const men = document.getElementById('nav-men');
        men.classList.add('nav-men-open');
        men.classList.remove('nav-men-unopen');
    };

    const hanldeClickNavWomen = () => {
        const women = document.getElementById('nav-women');
        women.classList.add('nav-women-open');
        women.classList.remove('nav-women-unopen');
    };

    const hanldeClickNavKids = () => {
        const kids = document.getElementById('nav-kids');
        kids.classList.add('nav-kids-open');
        kids.classList.remove('nav-kids-unopen');
    };

    const handleCloseNaVMen = () => {
        const men = document.getElementById('nav-men');
        men.classList.remove('nav-men-open');
        men.classList.add('nav-men-unopen');
    };

    const handleCloseNaVWomen = () => {
        const women = document.getElementById('nav-women');
        women.classList.remove('nav-women-open');
        women.classList.add('nav-women-unopen');
    };

    const handleCloseNaVKids = () => {
        const kids = document.getElementById('nav-kids');
        kids.classList.remove('nav-kids-open');
        kids.classList.add('nav-kids-unopen');
    };

    const handleNavMenNewOpen = () => {
        const mennew = document.getElementById('nav-men-new');
        mennew.classList.add('nav-men-new-open');
        mennew.classList.remove('nav-men-new-unopen');
    };

    const handleNavWomenNewOpen = () => {
        const womennew = document.getElementById('nav-women-new');
        womennew.classList.add('nav-women-new-open');
        womennew.classList.remove('nav-women-new-unopen');
    };

    const handleNavKidsNewOpen = () => {
        const kidsnew = document.getElementById('nav-kids-new');
        kidsnew.classList.add('nav-kids-new-open');
        kidsnew.classList.remove('nav-kids-new-unopen');
    };

    const handleBackNavMen = () => {
        const backmen = document.getElementById('nav-men-new');
        const shoesbackmen = document.getElementById('nav-men-shoes');
        const clthingbackmen = document.getElementById('nav-men-clothing');
        shoesbackmen.classList.remove('nav-men-shoes-open');
        shoesbackmen.classList.add('nav-men-shoes-unopen');
        backmen.classList.remove('nav-men-new-open');
        backmen.classList.add('nav-men-new-unopen');
        clthingbackmen.classList.remove('nav-men-clothing-open');
        clthingbackmen.classList.add('nav-men-clothing-unopen');
    };

    const handleBackNavWomen = () => {
        const backwomen = document.getElementById('nav-women-new');
        const shoesbackwomen = document.getElementById('nav-women-shoes');
        const clthingbackwomen = document.getElementById('nav-women-clothing');
        shoesbackwomen.classList.remove('nav-women-shoes-open');
        shoesbackwomen.classList.add('nav-women-shoes-unopen');
        backwomen.classList.remove('nav-women-new-open');
        backwomen.classList.add('nav-women-new-unopen');
        clthingbackwomen.classList.remove('nav-women-clothing-open');
        clthingbackwomen.classList.add('nav-women-clothing-unopen');
    };

    const handleBackNavKids = () => {
        const backkids = document.getElementById('nav-kids-new');
        const shoesbackkids = document.getElementById('nav-kids-shoes');
        const clthingbackkids = document.getElementById('nav-kids-clothing');
        shoesbackkids.classList.remove('nav-kids-shoes-open');
        shoesbackkids.classList.add('nav-kids-shoes-unopen');
        backkids.classList.remove('nav-kids-new-open');
        backkids.classList.add('nav-kids-new-unopen');
        clthingbackkids.classList.remove('nav-kids-clothing-open');
        clthingbackkids.classList.add('nav-kids-clothing-unopen');
    };

    const handleOpenShoes = () => {
        const shoes = document.getElementById('nav-men-shoes');
        shoes.classList.add('nav-men-shoes-open');
        shoes.classList.remove('nav-men-shoes-unopen');
    };

    const handleOpenShoesWomen = () => {
        const shoes = document.getElementById('nav-women-shoes');
        shoes.classList.add('nav-women-shoes-open');
        shoes.classList.remove('nav-women-shoes-unopen');
    };
    const handleOpenShoesKids = () => {
        const shoes = document.getElementById('nav-kids-shoes');
        shoes.classList.add('nav-kids-shoes-open');
        shoes.classList.remove('nav-kids-shoes-unopen');
    };

    const handleOpenClothing = () => {
        const clothingmen = document.getElementById('nav-men-clothing');
        clothingmen.classList.add('nav-men-clothing-open');
        clothingmen.classList.remove('nav-men-clothing-unopen');
    };
    const handleOpenClothingWomen = () => {
        const clothingwomen = document.getElementById('nav-women-clothing');
        clothingwomen.classList.add('nav-women-clothing-open');
        clothingwomen.classList.remove('nav-women-clothing-unopen');
    };

    const handleOpenClothingKids = () => {
        const clothing = document.getElementById('nav-kids-clothing');
        clothing.classList.add('nav-kids-clothing-open');
        clothing.classList.remove('nav-kids-clothing-unopen');
    };

    const handleUsernameMenuSidebar = () => {
        const username = document.getElementById('username-menusidebar');
        username.classList.toggle('open-sidebar');
        setsidebaruser(!sidebaruser);
    };
    ///cart selector
    const quantity = useSelector((state) => state.cart.quantity);
    let user = useSelector((state) => state.user.currentUser);
    const username = () => {
        if (user != null) {
            return (
                <div className="dropdown">
                    <button
                        className="btn btn-info-user-navbar dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Hi, {user.user.name}
                        <FontAwesomeIcon className="ml-2" icon={faUser} />
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item" onClick={routeChangeProfile}>
                            Profile
                        </div>
                        {user.user.isadmin ? (
                            <div className="dropdown-item" onClick={routeChangeDashBoard}>
                                Dashboard
                            </div>
                        ) : (
                            <div className="dropdown-item">Another action</div>
                        )}
                        <div className="dropdown-item" onClick={handleDeleteLocalStorage}>
                            Logout
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="d-flex ">
                    <Button variant="outline border-none btn-auth-home" onClick={routeChangeregister}>
                        Join Us
                    </Button>
                    <div className="separate"></div>
                    <Button variant="outline border-none btn-auth-home" onClick={routeChange}>
                        Sign in
                    </Button>
                </div>
            );
        }
    };
    const UserNameSidebar = () => {
        if (user != null) {
            return (
                <div>
                    <div
                        onClick={handleUsernameMenuSidebar}
                        className="px-4 d-flex justify-content-between py-3 wrapper-username-sidebar"
                    >
                        <div className="d-flex username-sidebar">
                            Wellcome
                            <div className="px-2">{user.user.name}</div>
                        </div>
                        <div>
                            {sidebaruser === false ? (
                                <FontAwesomeIcon icon={faCaretDown} size="2x" />
                            ) : (
                                <FontAwesomeIcon icon={faCaretUp} size="2x" />
                            )}
                        </div>
                    </div>
                    <div className="dropdown-username-menusidebar" id="username-menusidebar">
                        <div className="dropdown-item" onClick={routeChangeProfile}>
                            Profile
                        </div>
                        {user ? (
                            <div onClick={routeChangeDashBoard} className="dropdown-item">
                                Dash Board
                            </div>
                        ) : (
                            <div className="dropdown-item">Another action</div>
                        )}
                        <div className="dropdown-item" onClick={handleDeleteLocalStorage}>
                            Logout
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="text-center my-3">
                    <button onClick={routeChangeregister} className="btn-action-joinus-sidebar-menu">
                        Join Us
                    </button>
                    <button onClick={routeChange} className="btn-action-joinin-sidebar-menu  mx-2">
                        Sign In
                    </button>
                </div>
            );
        }
    };

    const [CheckNav, setCheckNav] = useState('');
    const pathname = window.location.pathname;
    useEffect(() => {
        if (pathname === '/login' || pathname === '/register') {
            setCheckNav('none');
        }
    }, [pathname]);

    let body = (
        <>
            <Navbar style={{ display: CheckNav }} bg="light" expand="lg" className="nav-1 px-5 ">
                <Navbar.Brand>
                    <svg height="24px" width="24px" fill="#111" viewBox="0 0 26 32">
                        <path d="M14.4 5.52v-.08q0-.56.36-1t.92-.44 1 .36.48.96-.36 1-.96.4l-.24.08.08.12-.08.44-.16 1.28q.08.08.08.16l-.16.8q-.08.16-.16.24l-.08.32q-.16.64-.28 1.04t-.2.64V12q-.08.4-.12.64t-.28.8q-.16.32 0 1.04l.08.08q0 .24.2.56t.2.56q.08 1.6-.24 2.72l.16.48q.96.48.56 1.04l.4.16q.96.48 1.36.84t.8.76q.32.08.48.24l.24.08q1.68 1.12 3.36 2.72l.32.24v.08l-.08.16.24.16h.08q.24.16.32.16h.08q.08 0 .16-.08l.16-.08q.16-.16.32-.24h.32q.08 0 0 .08l-.32.16-.4.48h.56l.56.08q.24-.08.4-.16l.4-.24q.24-.08.48.16h.08q.08.08-.08.24l-.96.88q-.4.32-.72.4l-1.04.72q-.08.08-.16 0l-.24-.32-.16-.32-.2-.28-.24-.32-.2-.24-.16-.2-.32-.24q-.16 0-.32-.08l-1.04-.8q-.24 0-.56-.24-1.2-1.04-1.6-1.28l-.48-.32-.96-.16q-.48-.08-1.28-.48l-.64-.32q-.64-.32-.88-.32l-.32-.16q-.32-.08-.48-.16l-.16-.16q-.16 0-.32.08l-1.6.8-2 .88q-.8.64-1.52 1.04l-.88.4-1.36.96q-.16.16-.32 0l-.16.16q-.24.08-.32.08l-.32.16v.16h-.16l-.16.24q-.16.32-.32.36t-.2.12-.08.12l-.16.16-.24.16-.36-.04-.48.08-.32.08q-.4.08-.64-.12t-.4-.6q-.16-.24.16-.4l.08-.08q.08-.08.24-.08h.48L1.6 26l.32-.08q0-.16.08-.24.08-.08.24-.08v-.08q-.08-.16-.08-.32-.08-.16-.04-.24t.08-.08h.04l.08.24q.08.4.24.24l.08-.16q.08-.16.24-.16l.16.16.16-.16-.08-.08q0-.08.08-.08l.32-.32q.4-.48.96-.88 1.12-.88 2.4-1.36.4-.4.88-.4.32-.56.96-1.2.56-.4.8-.56.16-.32.4-.32H10l.16-.16q.16-.08.24-.16v-.4q0-.4.08-.64t.4-.24l.32-.32q-.16-.32-.16-.72h-.08q-.16-.24-.16-.48-.24-.4-.32-.64h-.24q-.08.24-.4.32l-.08.16q-.32.56-.56.84t-.88.68q-.4.4-.56.88-.08.24 0 .48l-.08.16h.08q0 .16.08.16h.08q.16.08.16.2t-.24.08-.36-.16-.2-.12l-.24.24q-.16.24-.32.2t-.08-.12l.08-.08q.08-.16 0-.16l-.64.16q-.08.08-.2 0t.04-.16l.4-.16q0-.08-.08-.08-.32.16-.64.08l-.4-.08-.08-.08q0-.08.08-.08.32.08.8-.08l.56-.24.64-.72.08-.16q.32-.64.68-1.16t.76-.84l.08-.32q.16-.32.32-.56t.4-.64l.24-.32q.32-.48.72-.48l.24-.24q.08-.08.08-.24l.16-.16-.08-.08q-.48-.4-.48-.72-.08-.56.36-.96t.88-.36.68.28l.16.16q.08 0 .08.08l.32.16v.24q.16.16.16.24.16-.24.48-.56l.4-1.28q0-.32.16-.64l.16-.24v-.16l.24-.96h.16l.24-.96q.08-.24 0-.56l-.32-.8z" />
                    </svg>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                    <Form className="d-flex justify-content-between">{username()}</Form>
                </Navbar.Collapse>
            </Navbar>
            <Navbar className="navbar-2">
                <Navbar.Brand onClick={routeChangeHome} className="nav-bar">
                    <svg className="pre-logo-svg" height="60px" width="60px" fill="#111" viewBox="0 0 69 32">
                        <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-1.2 5.12 2.16 7.52Q11.2 18 14 18q2.24 0 5.04-.72z"></path>
                    </svg>
                </Navbar.Brand>
                <div className="nav-header nav-center">
                    <ul className="menu-main">
                        <li className="px-3">
                            <span onClick={routeChangeMen}>Men</span>
                            <div className="menu-sub" id="menu-sub">
                                <div className="d-flex justify-content-center">
                                    <div className="list">
                                        <h5 className="text-center">New & featured</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeBackToBasics}>
                                                <span>Basics Essentinals</span>
                                            </li>
                                            <li onClick={routeChangeClubFootBall}>
                                                <span>Club Football</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <h5 className="text-center">Shoes</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeShoes}>
                                                <span>All Shoes</span>
                                            </li>
                                            <li onClick={routeChangeShoesRunning}>
                                                <span>Running</span>
                                            </li>
                                            <li onClick={routeChangeJordan}>
                                                <span>Jordan</span>
                                            </li>
                                            <li onClick={routeChangeGymandTraining}>
                                                <span>Gym and Training</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <h5 className="text-center">Clothing</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeAllClothing}>
                                                <span>All Clothing</span>
                                            </li>
                                            <li onClick={routeChangeTopsAndTShirts}>
                                                <span>Tops and T-Shirts</span>
                                            </li>
                                            <li onClick={routeChangeHoodiesAndSweatshirts}>
                                                <span>Hoodies & Sweatshirts</span>
                                            </li>
                                            <li onClick={routeChangeShortMen}>
                                                <span>Shorts</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span onClick={routeChangeMen}>Women</span>
                            <div className="menu-sub">
                                <div className="d-flex justify-content-center">
                                    <div className="list">
                                        <h5 className="text-center">New & featured</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeBackToBasics}>
                                                <span>Performance Essentinals</span>
                                            </li>
                                            <li onClick={routeChangeClubFootBall}>
                                                <span>Sustainable Material</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <h5 className="text-center">Shoes</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeShoes}>
                                                <span>All Shoes</span>
                                            </li>
                                            <li onClick={routeChangeShoesRunning}>
                                                <span>Running</span>
                                            </li>
                                            <li onClick={routeChangeJordan}>
                                                <span>Tennis</span>
                                            </li>
                                            <li onClick={routeChangeGymandTraining}>
                                                <span>Gym and Training</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <h5 className="text-center">Clothing</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeAllClothing}>
                                                <span>All Clothing</span>
                                            </li>
                                            <li onClick={routeChangeTopsAndTShirts}>
                                                <span>Tops and T-Shirts</span>
                                            </li>
                                            <li>
                                                <span>Hoodies & Sweatshirts</span>
                                            </li>
                                            <li>
                                                <span>Pants and Leggings</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="px-3">
                            <span>Kids</span>
                            <div className="menu-sub">
                                <div className="d-flex justify-content-center">
                                    <div className="list">
                                        <h5 className="text-center">New & featured</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeBackToBasics}>
                                                <span>Bags & Backpacks</span>
                                            </li>
                                            <li onClick={routeChangeClubFootBall}>
                                                <span>Club Football</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <h5 className="text-center">Shoes</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeShoes}>
                                                <span>All Shoes</span>
                                            </li>
                                            <li onClick={routeChangeShoesRunning}>
                                                <span>Sandals & Slides</span>
                                            </li>
                                            <li onClick={routeChangeJordan}>
                                                <span>Jordan</span>
                                            </li>
                                            <li onClick={routeChangeGymandTraining}>
                                                <span>Lifestyle</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <h5 className="text-center">Clothing</h5>
                                        <ul className="text-center">
                                            <li onClick={routeChangeAllClothing}>
                                                <span>All Clothing</span>
                                            </li>
                                            <li onClick={routeChangeTopsAndTShirts}>
                                                <span>Tops and T-Shirts</span>
                                            </li>
                                            <li>
                                                <span>Hoodies & Sweatshirts</span>
                                            </li>
                                            <li>
                                                <span>Shorts</span>
                                            </li>
                                            <li>
                                                <span>Pants and Leggings</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="nav-bottom">
                    <Form.Control
                        className="input-search"
                        onFocus={handleFocus}
                        onChange={(e) => handleSearch(e)}
                        type="search"
                        id="nav-search"
                        placeholder="Search"
                        aria-label="Search"
                    />

                    <Button variant="outline border-none">
                        <svg width="24px" height="24px" fill="#111" viewBox="0 0 24 24">
                            <path d="M21.11 4a6.6 6.6 0 0 0-4.79-1.92A6.27 6.27 0 0 0 12 3.84 6.57 6.57 0 0 0 2.89 4c-2.8 2.68-2.45 7.3.88 10.76l6.84 6.63A2 2 0 0 0 12 22a2 2 0 0 0 1.37-.54l.2-.19.61-.57c.6-.57 1.42-1.37 2.49-2.41l2.44-2.39 1.09-1.07c3.38-3.55 3.8-8.1.91-10.83zm-2.35 9.4l-.25.24-.8.79-2.44 2.39c-1 1-1.84 1.79-2.44 2.36L12 20l-6.83-6.68c-2.56-2.66-2.86-6-.88-7.92a4.52 4.52 0 0 1 6.4 0l.09.08a2.12 2.12 0 0 1 .32.3l.9.94.9-.94.28-.27.11-.09a4.52 4.52 0 0 1 6.43 0c1.97 1.9 1.67 5.25-.96 7.98z"></path>
                        </svg>
                    </Button>
                    <Button onClick={routeChangeCart} variant="outline border-none" className="button-cart">
                        <svg width="24px" height="24px" fill="#111" viewBox="0 0 24 24">
                            <path d="M16 7a1 1 0 0 1-1-1V3H9v3a1 1 0 0 1-2 0V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1z"></path>
                            <path d="M20 5H4a2 2 0 0 0-2 2v13a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a2 2 0 0 0-2-2zm0 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7h16z"></path>
                        </svg>
                        <Badge>{quantity}</Badge>
                    </Button>
                    <div>
                        <div className="menu-navbar pt-1 px-2">
                            <div onClick={handleMenu}>
                                <FontAwesomeIcon icon={faBars} size="2x" />
                            </div>
                        </div>
                    </div>
                    <nav className="nav-sidebar unactive-menu" id="nav-sidebar">
                        <div onClick={handleCloseMenu} className="close-sidebar-menu">
                            <span className="px-4">
                                <FontAwesomeIcon icon={faXmark} size="2x" />
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={hanldeClickNavMen}
                                className="d-flex justify-content-between btn-sidebar-menu"
                            >
                                <span>Men</span>
                                <span>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </button>
                            <nav className="nav-men nav-men-unopen" id="nav-men">
                                <div className="nav-back-all">
                                    <h3 className="text-center">Men</h3>
                                    <button
                                        onClick={handleCloseNaVMen}
                                        className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                    >
                                        <span>
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </span>
                                        <span>ALL</span>
                                    </button>
                                    <div>
                                        <button
                                            onClick={handleNavMenNewOpen}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">New & Featured</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav className="nav-men-new nav-men-new-unopen" id="nav-men-new">
                                            <div>
                                                <button
                                                    onClick={handleBackNavMen}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Men</span>
                                                </button>
                                                <button
                                                    onClick={routeChangeBackToBasics}
                                                    className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                                >
                                                    <div className="pt-1">Bacsic Eseentinals</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={routeChangeClubFootBall}
                                                    className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                                >
                                                    <div className="pt-1">Club Football</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                        <button
                                            onClick={handleOpenShoes}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">Shoes</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav className="nav-men-shoes nav-men-shoes-unopen" id="nav-men-shoes">
                                            <div>
                                                <button
                                                    onClick={handleBackNavMen}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Men</span>
                                                </button>
                                                <button
                                                    onClick={routeChangeShoes}
                                                    className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                                >
                                                    <div className="pt-1">All Shoes</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Running</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Jordan</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Gym and Training</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                        <button
                                            onClick={handleOpenClothing}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">Clothing</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav className="nav-men-clothing nav-men-clothing-unopen" id="nav-men-clothing">
                                            <div>
                                                <button
                                                    onClick={handleBackNavMen}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Men</span>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">All Clothing</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Tops And T'Shirts</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Hoodies & Sweatshirts</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Short</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </nav>
                            <button
                                onClick={hanldeClickNavWomen}
                                className="d-flex justify-content-between btn-sidebar-menu"
                            >
                                <span>Women</span>
                                <span>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </button>
                            <nav className="nav-women nav-women-unopen" id="nav-women">
                                <div className="nav-back-all">
                                    <h3 className="text-center">Women</h3>
                                    <button
                                        onClick={handleCloseNaVWomen}
                                        className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                    >
                                        <span>
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </span>
                                        <span>ALL</span>
                                    </button>
                                    <div>
                                        <button
                                            onClick={handleNavWomenNewOpen}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">New & Featured</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav className="nav-women-new nav-women-new-unopen" id="nav-women-new">
                                            <div>
                                                <button
                                                    onClick={handleBackNavWomen}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Women</span>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3 ">
                                                    <div className="pt-1">Bacsic Eseentinals</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Club Football</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                        <button
                                            onClick={handleOpenShoesWomen}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">Shoes</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav className="nav-women-shoes nav-women-shoes-unopen" id="nav-women-shoes">
                                            <div>
                                                <button
                                                    onClick={handleBackNavWomen}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Women</span>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">All Shoes</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Running</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Jordan</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Gym and Training</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                        <button
                                            onClick={handleOpenClothingWomen}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">Clothing</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav
                                            className="nav-women-clothing nav-women-clothing-unopen"
                                            id="nav-women-clothing"
                                        >
                                            <div>
                                                <button
                                                    onClick={handleBackNavWomen}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Women</span>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">All Clothing</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Tops And T'Shirts</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Hoodies & Sweatshirts</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Short</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </nav>
                            <button
                                onClick={hanldeClickNavKids}
                                className="d-flex justify-content-between btn-sidebar-menu"
                            >
                                <span>Kids</span>
                                <span>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </button>
                            <nav className="nav-kids nav-kids-unopen" id="nav-kids">
                                <div className="nav-back-all">
                                    <h3 className="text-center">Kids</h3>

                                    <button
                                        onClick={handleCloseNaVKids}
                                        className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                    >
                                        <span>
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </span>
                                        <span>ALL</span>
                                    </button>
                                    <div>
                                        <button
                                            onClick={handleNavKidsNewOpen}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">New & Featured</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav className="nav-kids-new nav-kids-new-unopen" id="nav-kids-new">
                                            <div>
                                                <button
                                                    onClick={handleBackNavKids}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Kids</span>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Bacsic Eseentinals</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Club Football</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                        <button
                                            onClick={handleOpenShoesKids}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">Shoes</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav className="nav-kids-shoes nav-kids-shoes-unopen" id="nav-kids-shoes">
                                            <div>
                                                <button
                                                    onClick={handleBackNavKids}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Kids</span>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">All Shoes</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Running</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Jordan</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Gym and Training</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                        <button
                                            onClick={handleOpenClothingKids}
                                            className="w-100 btn-small-nav d-flex justify-content-between px-3"
                                        >
                                            <div className="pt-1">Clothing</div>
                                            <div className="pt-1">
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </button>
                                        <nav
                                            className="nav-kids-clothing nav-kids-clothing-unopen"
                                            id="nav-kids-clothing"
                                        >
                                            <div>
                                                <button
                                                    onClick={handleBackNavKids}
                                                    className="d-flex w-100 justify-content-between btn-sidebar-menu"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faAngleLeft} />
                                                    </span>
                                                    <span>Kids</span>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">All Clothing</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Tops And T'Shirts</div>{' '}
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Hoodies & Sweatshirts</div>
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                                <button className="w-100 btn-small-nav d-flex justify-content-between px-3">
                                                    <div className="pt-1">Short</div>{' '}
                                                    <div className="pt-1">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </div>
                                                </button>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div>
                            <span className="description-sidebar-menu px-4">
                                Become a Nike Member for the best products, inspiration and stories in sport. Learn more
                            </span>
                        </div>

                        {UserNameSidebar()}
                        <div>
                            <span>
                                <Button onClick={routeChangeCart} variant="outline border-none" className="button-cart">
                                    <svg width="24px" height="24px" fill="#111" viewBox="0 0 24 24">
                                        <path d="M16 7a1 1 0 0 1-1-1V3H9v3a1 1 0 0 1-2 0V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1z"></path>
                                        <path d="M20 5H4a2 2 0 0 0-2 2v13a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a2 2 0 0 0-2-2zm0 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7h16z"></path>
                                    </svg>
                                    <Badge>{quantity}</Badge>
                                </Button>
                                Bag
                            </span>
                        </div>
                    </nav>
                </div>
            </Navbar>
            <div onClick={handleCloseAll} className="pre-scrim " id="pre-scrim" data-pre="Scrim"></div>
            <div className="form-list-search" id="list-search">
                <div className="d-flex justify-content-center">
                    <div className="list-item">
                        <p>Popular Search Terms</p>
                        <ul className="padding-0">{displayUser}</ul>
                    </div>
                </div>
            </div>
        </>
    );

    return body;
}

export default Navbars;
