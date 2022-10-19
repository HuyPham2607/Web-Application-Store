import Navbars from '../layout/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { DeleteProduct } from '../../redux/Cartredux';
import { useDispatch } from 'react-redux';
import PayButton from '../auth/PayButton/PayButton.jsx';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';
import AlertMessage from '../layout/AlertMessage/AlertMessage';
import { useState, useEffect } from 'react';
function Cart() {
    const [addresuser, setAddressuser] = useState('none');
    const user = useSelector((state) => state.user.currentUser);
    useEffect(() => {
        if (user.user.address === '') {
            setAddressuser('block');
        }
    }, [user.user.address]);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handledelete = (id) => {
        dispatch(DeleteProduct({ id }));
    };

    const showdata = cart.products.map((e, i) => {
        return (
            <div key={i}>
                <div className="row my-3">
                    <div className="col-sm-3">
                        <div>
                            <img className="imgurl" src={e.imageUrl} alt="" />
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="headline-name-cart">{e.name}</div>
                        <div className="headline-title-cart">{e.title}</div>
                        <div className="headline-price-cart">{e.price.toLocaleString() + ' đ'}</div>
                        <div className="headline-size-cart">Size {e.size}</div>
                        <div className="d-flex ">
                            <div className="headline-color-cart">Color</div>{' '}
                            <div style={{ backgroundColor: `${e.color}` }} className="cart-color-product"></div>
                        </div>

                        <span onClick={() => handledelete(e)}>
                            <FontAwesomeIcon className="headline-trash-cart" icon={faTrash} />
                        </span>
                    </div>
                </div>
            </div>
        );
    });
    const CheckCartLength = () => {
        if (cart.products.length === 0) {
            return <div className="headline-title-cart">There are no items in your bag.</div>;
        } else {
            return (
                <div>
                    <div className="bag-item">
                        {cart.quantity} item | {cart.total.toLocaleString() + ' ' + 'đ'}
                    </div>
                </div>
            );
        }
    };
    let amount = cart.quantity;
    let Estimated = amount * 20000;
    const totalEstimated = () => {
        if (amount > 3) {
            Estimated = 60000;
        }
        return (
            <div className=" d-flex justify-content-end">
                <FontAwesomeIcon icon={faDollar} className="mx-2 py-1 headline-price-cart" />
                {Estimated.toLocaleString() + '' + 'đ'}
            </div>
        );
    };

    const checkTotal = () => {
        const totalproduct = cart.total;
        const total = totalproduct + Estimated;
        return (
            <div className=" d-flex justify-content-end">
                <FontAwesomeIcon icon={faDollar} className="mx-2 py-1 headline-price-cart" />
                {total.toLocaleString() + ' ' + 'đ'}
            </div>
        );
    };

    return (
        <div>
            <Navbars />
            <div className="container py-5">
                <AlertMessage
                    open={addresuser}
                    variant="warning"
                    info="Please enter the address click here"
                    navigateRoute="profile"
                />
                <div className="row">
                    <div className="col-xl-8 ">
                        <div className="bag">
                            <h2>Bag</h2>
                            <div>{CheckCartLength()}</div>
                        </div>
                        <div>{showdata}</div>
                    </div>
                    <div className="col-xl-4">
                        <div className="cart">
                            <h2>Summary</h2>
                            <div className=" my-4 d-flex justify-content-between">
                                <div className=" headline-1">Estimated Delivery & Handling</div>
                                <div className="headline-price">{totalEstimated()}</div>
                            </div>
                            <div className="d-flex justify-content-between my-4">
                                <div className="headline-2">Total</div>
                                <div className="headline-price">{checkTotal()}</div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row btn-checkout mt-3">
                                        <PayButton className="btn-member-checkout my-2" cartItem={cart} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 mt-3 headline-name-cart">Favourites</div>
                    <div className="col-sm-12 headline-title-cart">Want to view your favourites? </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
