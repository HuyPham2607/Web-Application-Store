import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { adminRequest } from '../../requestMethods';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import NavbarAdmin from '../Components/layout/NabvarAdmin/NavbarAdmin';
import SidbarAdmin from '../Components/layout/SidbarAdmin/SidbarAdmin';
import ChartCpm from '../Components/ChartCmp/ChartCpm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/apiCall';

function DetailProductsAdmin() {
    const dispatch = useDispatch();
    let id = useParams();
    const MONTHS = useMemo(
        () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
        [],
    );
    const products = useSelector((state) => state.products.products);
    const detailproduct = products.filter((item) => item._id === id._id);
    const [incomePro, setIncomePro] = useState([]);

    const [updateProduct, setUpdateProduct] = useState({
        ProductId: id._id,
        name: detailproduct[0].name,
        price: detailproduct[0].price,
        color: detailproduct[0].color,
        size: parseFloat(detailproduct[0].size),
    });

    const onChangeUpdateForm = (event) =>
        setUpdateProduct({ ...updateProduct, [event.target.name]: event.target.value });
    const handleUpdate = () => {
        const lengthColor = updateProduct.color.length;
        const lengthSize = updateProduct.size.length;

        if (updateProduct.color[lengthColor - 1] === ',') {
            alert('khong dc');
        } else if (updateProduct.size[lengthSize - 1] === ',') {
            alert('khong dc');
        } else {
            const updateOrder = async () => {
                adminRequest
                    .put(`/products/${id._id}`, updateProduct)
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((err) => console.log(err));
            };

            updateOrder();
            getProducts(dispatch);
        }
    };

    useEffect(() => {
        const getIncomeProduct = async () => {
            try {
                const res = await adminRequest.get('Order/income?pid=' + id._id);
                res.data.map((e) => {
                    setIncomePro((prev) => [...prev, { name: MONTHS[e._id - 1], Sales: e.total }]);
                });
            } catch (error) {
                console.log(error);
            }
        };
        getIncomeProduct();
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
                            <span>
                                <FontAwesomeIcon icon={faListCheck} />
                            </span>
                            <div className="px-2">/ Products</div>
                        </div>
                        <div>
                            <h1>Products</h1>
                        </div>
                        <div className="wrapper-order-admin">
                            <div className="col-md-12 padding-0">
                                <div className="row py-3 px-3 nav-order-admin">
                                    <div className="col-md-6 col-md-12">
                                        <ChartCpm title="Active Product" data={incomePro} gird dataKey="Sales" />
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="card">
                                            <div className="card-top">
                                                <div className="d-flex  mx-3 my-3">
                                                    <img
                                                        className="image-small"
                                                        src={detailproduct[0].imageUrl}
                                                        alt=""
                                                    />
                                                    <div className=" py-3">{detailproduct[0].name}</div>
                                                </div>
                                            </div>
                                            <div className="card-bottom">
                                                <div className="mx-3 py-2">id: {detailproduct[0]._id}</div>
                                                <div className="mx-3 py-2">Price: {detailproduct[0].price} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-3 px-3 nav-order-admin ">
                                    <div className="d-flex py-3 px-3 justify-content-between">
                                        <div>
                                            <div>
                                                <label htmlFor="name">Product Name</label>
                                                <br />
                                                <input
                                                    onChange={onChangeUpdateForm}
                                                    type="text"
                                                    defaultValue={detailproduct[0].name}
                                                    name="name"
                                                    id=""
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="price">Price</label>
                                                <br />
                                                <input
                                                    onChange={onChangeUpdateForm}
                                                    type="text"
                                                    defaultValue={detailproduct[0].price}
                                                    name="price"
                                                    id=""
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="color">Color</label>
                                                <br />
                                                <input
                                                    onChange={onChangeUpdateForm}
                                                    type="text"
                                                    defaultValue={detailproduct[0].color}
                                                    name="color"
                                                    id=""
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="size">Size</label>
                                                <br />
                                                <input
                                                    onChange={onChangeUpdateForm}
                                                    type="text"
                                                    defaultValue={detailproduct[0].size}
                                                    name="size"
                                                    id=""
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <img className="iamge-large" src={detailproduct[0].imageUrl} alt="" />
                                            <div className="d-flex justify-content-center my-4">
                                                <button onClick={handleUpdate}>Update</button>
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

export default DetailProductsAdmin;
