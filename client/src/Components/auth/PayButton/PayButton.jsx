import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateLicensed } from '../../../redux/Cartredux';
const PayButton = ({ cartItem }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
    const length = cart.products.length;
    const handleCheckout = () => {
        axios
            .post('http://localhost:5000/api/stripe/create-checkout-session', {
                cartItem,
                userId: user.user._id,
            })
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch((err) => console.log(err.message));

        dispatch(updateLicensed());
    };

    const Disanable = () => {
        if (cart.products[0] && user.user.address !== '') {
            return (
                <button
                    style={{ background: '#000', color: '#fff' }}
                    className="btn-member-checkout my-2"
                    onClick={() => {
                        handleCheckout();
                    }}
                >
                    Check Out
                </button>
            );
        } else {
            return (
                <button
                    disabled
                    className="btn-member-checkout my-2"
                    onClick={() => {
                        handleCheckout();
                    }}
                >
                    Check Out
                </button>
            );
        }
    };

    return <>{Disanable()}</>;
};

export default PayButton;
