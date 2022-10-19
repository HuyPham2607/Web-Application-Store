import axios from 'axios';
import { useEffect } from 'react';
import React from 'react';
import Navbars from '../layout/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertMessage from '../layout/AlertMessage/AlertMessage';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addProduct } from '../../redux/Cartredux';
import { useDispatch } from 'react-redux';
import './DetailProducts.css';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
function DetailProduct() {
    let id = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [block, setBlock] = useState('none');
    const [blockcolor, setBlockcolor] = useState('none');
    const [checkcart, setCheckCart] = useState('none');

    const [selectSize, setSelectSize] = useState('');
    const [selectColor, setSelectColor] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${id._id}`)
            .then(function (response) {
                setProduct(response.data);
            })
            .catch(function (error) {})
            .then(function () {});
    }, [id._id]);

    const HandleClickProduct = () => {
        if (size === '') {
            setBlock('block');
            setTimeout(() => {
                setBlock('none');
            }, 3000);
        } else if (color === '') {
            setBlockcolor('block');
            setTimeout(() => {
                setBlockcolor('none');
            }, 3000);
        } else {
            setCheckCart('block');

            setTimeout(() => {
                setCheckCart('none');
            }, 3000);
            setBlock('none');
            setBlockcolor('none');
            dispatch(addProduct({ ...product, quantity, size, color }));
        }
    };

    const handleSelect = (e, i) => {
        setSelectSize(i);
        setSize(e);
    };
    const handleSelectColor = (e, i) => {
        setSelectColor(i);
        setColor(e);
    };

    return (
        <div>
            <Navbars />
            <div className="mx-5 my-5">
                <div className="row wrapper-detail-product">
                    <div className="col-lg-8 ">
                        <div className="d-flex detail-product justify-content-center" id="wrapper-detail-product">
                            <img className="imageUrl" src={product.imageUrl} alt="" />
                            <img className="image-small-detail " id="img-thumbnail" src={product.imageUrl} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div>
                            <div className="headline-name" id="headline-name">
                                {product.name}
                            </div>
                            <div className="headline-title my-2">{product.identified}</div>
                            <div className="headline-price my-2">
                                <FontAwesomeIcon icon={faDollar} /> {product.price?.toLocaleString() + 'đ'}
                            </div>
                        </div>
                        <h5>Size</h5>
                        <AlertMessage open={block} variant="danger" info="Please chose a size" />
                        <form className="gird-size  size-detaiproduct">
                            {product.size?.map((e, i) => (
                                <div
                                    style={
                                        selectSize === i
                                            ? { backgroundColor: '#000', color: '#fff' }
                                            : { backgroundColor: '#fff' } && selectSize !== i
                                            ? { backgroundColor: '#fff' }
                                            : { backgroundColor: 'none' }
                                    }
                                    className="chose-size mx-2 my-2"
                                    id="btn-detail-size"
                                    key={i}
                                    onClick={() => handleSelect(e, i)}
                                >
                                    {e}
                                </div>
                            ))}
                        </form>
                        <h5>Color</h5>
                        <AlertMessage open={blockcolor} variant="danger" info="Please chose a color" />
                        <form className="gird-size ">
                            {product.color?.map((c, i) => (
                                <div
                                    className="chose-color mx-2 my-2"
                                    key={i}
                                    onClick={() => handleSelectColor(c, i)}
                                    style={
                                        selectColor === i
                                            ? { border: '3px solid red', backgroundColor: `${c}` }
                                            : { border: '1px solid #000', backgroundColor: `${c}` } && selectColor !== i
                                            ? { border: '1px solid #000', backgroundColor: `${c}` }
                                            : { border: '3px solid red', backgroundColor: `${c}` }
                                    }
                                >
                                    <div className="item-color"></div>
                                </div>
                            ))}
                        </form>
                        <AlertMessage open={checkcart} variant="success" info="Please Check your Cart" />
                        <div className="d-flex justify-content-center">
                            <button className="btn-detail-addproduct" onClick={HandleClickProduct}>
                                Add To Bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
