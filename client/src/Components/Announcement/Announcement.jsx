import React from 'react';
import './Announcement.css';

function Announcement() {
    return (
        <div className="featured-home">
            <div>
                <h1 className="mx-4">Featured</h1>
                <div className="wrapper-featured">
                    <div className=" featured-image-left">
                        <div className="card-body">
                            <img
                                className="img-product"
                                src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/543974ae-f119-42a8-9198-072ccb76c064/air-force-1-older-shoes-w6PsF3.png"
                                alt=""
                            />
                            <div className="info">
                                <div className="title">nike</div>
                                <button>Shop</button>
                            </div>
                        </div>
                    </div>
                    <div className="featured-image-right">
                        <div className="">
                            <div className="card-body">
                                <img
                                    className="img-product"
                                    src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png"
                                    alt=""
                                />
                                <div className="info">
                                    <div className="title">nike</div>
                                    <button>Shop</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Announcement;
