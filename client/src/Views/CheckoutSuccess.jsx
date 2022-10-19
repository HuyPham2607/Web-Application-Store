import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { updateLicensedfalse } from '../redux/Cartredux';
import { Complete } from '../redux/Cartredux';
import { useDispatch } from 'react-redux';
import './style.css';
function CheckoutSuccess() {
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    const user = useSelector((state) => state.user.currentUser);
    console.log(cart.products);
    useEffect(() => {
        const CreateOrder = async () => {
            const Order = {
                userId: user.user._id,
                username: user.user.name,
                products: cart.products,
                amount: cart.total,
                address: user.user.address,
            };
            axios
                .post('http://localhost:5000/api/Order/createOrder', Order)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => console.log(err.message));
        };
        CreateOrder();
    }, [user.user._id, cart.products, cart.quantity, user.user.address]);

    const Products = cart.products.map((e, i) => {
        return (
            <div key={i} className="d-flex justify-content-between">
                <div className="d-flex py-2">
                    <div className="img-checkout">
                        <img className="img-checkout" src={e.imageUrl} alt="" />
                    </div>
                    <div className="mx-3">
                        <div>{e.name}</div>
                        <div>{e.price.toLocaleString()}</div>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon className="icon-checkout" icon={faCircleCheck} size="2x" />
                </div>
            </div>
        );
    });

    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
        dispatch(updateLicensedfalse());
        dispatch(Complete());
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="checkout-success ">
                <span className="d-flex justify-content-center py-5">
                    <FontAwesomeIcon icon={faCartShopping} size="3x" />
                </span>
                <h2 className="text-center">THANK YOU FOR YOUR PURCHASE</h2>
                <div className="py-5 px-5">{Products}</div>
                <div className="d-flex justify-content-center py-5">
                    <button className="button-85" onClick={routeChangeHome}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutSuccess;
