import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProducts, getProducts } from '../../redux/apiCall';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faListCheck,
    faBackwardStep,
    faForwardStep,
    faPenToSquare,
    faTrash,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import NavbarAdmin from '../Components/layout/NabvarAdmin/NavbarAdmin';
import SidbarAdmin from '../Components/layout/SidbarAdmin/SidbarAdmin';
function ProductsAdmin() {
    const dispatch = useDispatch();
    const [inputsearch, setInputSearch] = useState('');
    const products = useSelector((state) => state.products.products);
    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    let navigate = useNavigate();
    const routeProduct = (_id) => {
        let path = `/admin/detailproduct/${_id}`;
        navigate(path);
    };
    const routeNewProduct = () => {
        let path = `/admin/newproduct`;
        navigate(path);
    };

    const handleDelete = (id) => {
        DeleteProducts(id._id, dispatch);
    };

    let SearchProduct;
    if (products) {
        SearchProduct = products.filter((e) => {
            if (inputsearch == '') {
                return e;
            } else {
                return (
                    e._id.includes(inputsearch) ||
                    e.price.toString().includes(inputsearch) ||
                    e.name.includes(inputsearch)
                );
            }
        });
    }
    const handleSearch = (e) => {
        var lowerCase = e.target.value;
        setInputSearch(lowerCase);
    };
    console.log(SearchProduct);
    const [pageNum, setPageNum] = useState(0);
    const proPerPage = 6;
    const pagesVistied = pageNum * proPerPage;
    const pageCount = Math.ceil(products.length / proPerPage);
    const displayUser = SearchProduct.slice(pagesVistied, pagesVistied + proPerPage).map((item, i) => {
        return (
            <div key={i}>
                <div className="wrapper-admin-product col-12 padding-0">
                    <div className=" py-3 nav-order-admin d-flex justify-content-between">
                        <div className="id-product-admin ">
                            <div className="name-small">#{item._id.slice(4, 19)}</div>
                        </div>
                        <div className="products-product-admin d-flex">
                            <img className="image-small" src={item.imageUrl} alt="" />
                            <div className="name-small mx-3">{item.name}</div>
                        </div>
                        <div className="price-product-admin name-small">{item.price?.toLocaleString() + ' đ'}</div>
                        <div className="action-product-admin">
                            <button className="btn-edit-product-admin mx-2" onClick={() => routeProduct(item._id)}>
                                <span>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </span>
                            </button>
                            <button className="btn-delete-product-admin" onClick={() => handleDelete(item)}>
                                <span>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    const ChangePage = ({ selected }) => {
        setPageNum(selected);
    };

    return (
        <div>
            <NavbarAdmin />
            <div className="col-12   page-chart py-5">
                <div className="row">
                    <div className="nav-admin-dashboard">
                        <SidbarAdmin />
                    </div>
                    <div className=" padding-0 display-admin-dashboard">
                        <div className="d-flex home-route">
                            <span>
                                <FontAwesomeIcon icon={faListCheck} />
                            </span>
                            <div className="px-2">/ Products</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <h1 className="">Products</h1>
                            </div>
                            <div className="search-product-admin">
                                <input
                                    className="input-search-product-admin"
                                    onChange={(e) => handleSearch(e)}
                                    type="search"
                                    placeholder="search... UserId, Name ,Address"
                                />
                            </div>
                            <div className="create-new-product-admin">
                                <button className="btn-create-new-product-admin d-flex" onClick={routeNewProduct}>
                                    <span className="mx-2">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                    <span>Create New Product</span>
                                </button>
                            </div>
                        </div>
                        <div className="search-product-admin-sidebar">
                            <input
                                className="input-search-product-admin"
                                onChange={(e) => handleSearch(e)}
                                type="search"
                                placeholder="search... UserId, Name ,Address"
                            />
                        </div>
                        <div className="wrapper-order-admin">
                            <div className="col-12 padding-0">
                                <div className=" py-3 nav-order-admin d-flex justify-content-between">
                                    <div className="id-product-admin">Product ID</div>
                                    <div className="products-product-admin">Product</div>
                                    <div className="price-product-admin">Price</div>
                                    <div className="action-product-admin">Action</div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsAdmin;
