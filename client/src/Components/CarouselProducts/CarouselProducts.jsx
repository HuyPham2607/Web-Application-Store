import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarouselProducts.css';

function CarouselProducts() {
    const [products, setProducst] = useState([]);
    let navigate = useNavigate();
    const routeProduct = (_id) => {
        let path = `/products/${_id}`;
        navigate(path);
    };
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

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="slider-carousel-products px-5 py-5">
            <h2 className="headding">For Your Next Dance Battle </h2>
            <Slider {...settings}>
                {products.map((item, i) => (
                    <div key={i} className="card" onClick={() => routeProduct(item._id)}>
                        <div className="card-top px-3 py-3">
                            <img className="img-carousel" src={item.imageUrl} alt="" />
                        </div>
                        <div className="card-bottom px-3 py-3 d-flex justify-content-between">
                            <div>
                                <div>{item.name}</div>
                                <div>{item.title}</div>
                            </div>
                            <div>{item.price?.toLocaleString() + 'đ'}</div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CarouselProducts;
