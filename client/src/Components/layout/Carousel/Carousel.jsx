import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import $ from 'jquery';
import { useEffect } from 'react';

function CarouselFadeExample() {
    useEffect(() => {
        $('.carousel-indicators').hide();
    });

    let body = (
        <div className=" carousel-home">
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block p-3 height-control"
                        src="https://firebasestorage.googleapis.com/v0/b/store-8cd28.appspot.com/o/function%20getTime()%20%7B%20%5Bnative%20code%5D%20%7DFEDo3znUcAEp9tO.jfif?alt=media&token=fb910fb4-0446-4e2e-b60b-2e0cedaee17a"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 p-3 height-control"
                        src="https://firebasestorage.googleapis.com/v0/b/store-8cd28.appspot.com/o/function%20getTime()%20%7B%20%5Bnative%20code%5D%20%7D40aea4bb964355bef5a33a0bc5cf80aa.png?alt=media&token=4de0cd03-4305-4b22-8d8b-7100077c0104"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 p-3 height-control"
                        src="https://firebasestorage.googleapis.com/v0/b/store-8cd28.appspot.com/o/function%20getTime()%20%7B%20%5Bnative%20code%5D%20%7DNike-2017-whatwilltheysay-carousel2-scaled1111111111111111111111111111111.jpg?alt=media&token=0c5a0f57-b3d4-448f-bb64-b7f0d22d72b0"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 p-3 height-control"
                        src="https://firebasestorage.googleapis.com/v0/b/store-8cd28.appspot.com/o/function%20getTime()%20%7B%20%5Bnative%20code%5D%20%7DSocial_Carousel_01.png?alt=media&token=5eb58d26-0358-45bd-97e4-1dbb88775bbd"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
    return body;
}

export default CarouselFadeExample;
