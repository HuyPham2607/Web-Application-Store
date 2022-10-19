import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
    return (
        <div>
            <div className="wrapper py-5">
                <div className="footer px-3 ">
                    <div className="col-sm-9">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-sm-3 footer-home">
                                    <div>
                                        <ul className="padding-0">
                                            <li className="py-2">
                                                <h5>FIND A STORE</h5>
                                            </li>
                                            <li className="py-2">
                                                <h5>BECOME A MEMBER</h5>
                                            </li>
                                            <li className="py-2">
                                                <h5>SIGN UP FOR EMAIL</h5>
                                            </li>
                                            <li className="py-2">
                                                <h5>SEND US FEEDBACK</h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-3 footer-home">
                                    <div>
                                        <ul className="padding-0">
                                            <li className="py-2">
                                                <h5>GET HELP</h5>
                                            </li>
                                            <li className="py-2">Order Status</li>
                                            <li className="py-2">Delivery</li>
                                            <li className="py-2">Returns</li>
                                            <li className="py-2">Payment Options</li>
                                            <li className="py-2">Contact Us</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-3 footer-home">
                                    <div>
                                        <ul className="padding-0">
                                            <li className="py-2">
                                                <h5>ABOUT NIKE</h5>
                                            </li>
                                            <li className="py-2">News</li>
                                            <li className="py-2">Careers</li>
                                            <li className="py-2">Investors</li>
                                            <li className="py-2">Sustainability</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="footer-icon col-sm-12">
                                <ul>
                                    <FontAwesomeIcon className="px-1" icon={faTwitter} size="2x" />
                                    <FontAwesomeIcon className="px-1" icon={faFacebook} size="2x" />
                                    <FontAwesomeIcon className="px-1" icon={faYoutube} size="2x" />
                                    <FontAwesomeIcon className="px-1" icon={faInstagram} size="2x" />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer px-3 col-12 footer-home mt-3">
                    <div className="col-sm-6 d-flex">
                        <p>Location</p>
                        <p>© 2022 Nike, Inc. All Rights Reserved</p>
                    </div>
                    <div className="col-sm-6 footer-guides">
                        <p>Guides</p>
                        <p>Terms of Sale</p>
                        <p>Terms of Use</p>
                        <p>Nike Privacy Policy</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
