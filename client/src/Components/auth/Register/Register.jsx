import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from '../../layout/Navbar/Navbar.jsx';
import Footer from '../../layout/Footer/Footer.jsx';
import AlertMessage from '../../layout/AlertMessage/AlertMessage.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

function Register() {
    const { registerUser } = useContext(AuthContext);
    const [block, setBlock] = useState('none');
    const [nameenter, setNameenter] = useState('none');
    const [lastnameenter, setLastnameenter] = useState('none');
    const [emailenter, setemailenter] = useState('none');
    const [emailalready, setemailalready] = useState('none');

    const [passenter, setpassenter] = useState('none');
    const [confirmpassenter, setconfirmpassenter] = useState('none');
    const [confirmpassenternotmatch, setconfirmpassenternotmatch] = useState('none');

    const [registerForm, setRegisterForm] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
    });

    const { name, lastname, email, password, confirmpassword } = registerForm;

    const onChangeForm = (event) => setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });

    const register = async (event) => {
        event.preventDefault();
        if (name === '' && lastname === '' && email === '' && password === '' && confirmpassword === '') {
            setNameenter('block');
            setLastnameenter('block');
            setemailenter('block');
            setpassenter('block');
            setconfirmpassenter('block');
            setTimeout(() => {
                setNameenter('none');
                setLastnameenter('none');
                setemailenter('none');
                setpassenter('none');
                setconfirmpassenter('none');
            }, 2000);
        } else if (name === '') {
            setNameenter('block');
            setTimeout(() => {
                setNameenter('none');
            }, 2000);
        } else if (lastname === '') {
            setLastnameenter('block');
            setTimeout(() => {
                setLastnameenter('none');
            }, 2000);
        } else if (email === '') {
            setemailenter('block');
            setTimeout(() => {
                setemailenter('none');
            }, 2000);
        } else if (password === '') {
            setpassenter('block');
            setTimeout(() => {
                setpassenter('none');
            }, 2000);
        } else if (confirmpassword === '') {
            setconfirmpassenter('block');
            setTimeout(() => {
                setconfirmpassenter('none');
            }, 2000);
        } else if (password !== confirmpassword) {
            setconfirmpassenternotmatch('block');
            setTimeout(() => {
                setconfirmpassenternotmatch('none');
            }, 3000);
        } else {
            try {
                const registerData = await registerUser(registerForm);
                if (registerData.success === false) {
                    setemailalready('block');
                    setTimeout(() => {
                        setemailalready('none');
                    }, 3000);
                } else if (registerData.success === true) {
                    setBlock('block');
                    setTimeout(() => {
                        setBlock('none');
                    }, 3000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    };
    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
    };
    let body = (
        <>
            <Navbar />
            <div className="my-2 d-flex justify-content-center">
                <div className="wrapper-register">
                    <form onSubmit={register}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                            <header>
                                <div className="text-center" onClick={routeChangeHome}>
                                    <img
                                        className="img-nike"
                                        src="https://s3.nikecdn.com/unite/app/953/images/swoosh_black_2x.png"
                                        alt=""
                                    />
                                </div>
                                <div className="view-header text-center my-3">BECOME A NIKE MEMBER</div>
                                <div id="joinMessage" className="view-sub-header nike-unite-message text-center">
                                    Create your Nike Member profile and get first access to the very best of Nike
                                    products, inspiration and community.
                                </div>
                            </header>
                        </div>

                        <AlertMessage open={block} variant="success" info="Register success wellcome to nike" />
                        <h5 className="fw-normal " style={{ letterSpacing: '1px' }}>
                            Sign into your account
                        </h5>
                        <div className="form-outline ">
                            <label className="form-label" htmlFor="form2Example17">
                                Name
                            </label>
                            <AlertMessage open={nameenter} variant="warning" info="Please enter your name here" />

                            <input className="form-control" name="name" onChange={onChangeForm} />
                        </div>
                        <div className="form-outline ">
                            <label className="form-label" htmlFor="form2Example17">
                                Last Name
                            </label>
                            <AlertMessage
                                open={lastnameenter}
                                variant="warning"
                                info="Please enter your last name here"
                            />

                            <input className="form-control " name="lastname" onChange={onChangeForm} />
                        </div>
                        <div className="form-outline ">
                            <label className="form-label" htmlFor="form2Example17">
                                Email address
                            </label>
                            <AlertMessage open={emailenter} variant="warning" info="Please enter your email here" />
                            <AlertMessage open={emailalready} variant="danger" info="Email already exists" />

                            <input type="email" className="form-control " name="email" onChange={onChangeForm} />
                        </div>
                        <div className="form-outline ">
                            <label className="form-label" htmlFor="form2Example17">
                                Password
                            </label>
                            <AlertMessage open={passenter} variant="warning" info="Please enter your password here" />

                            <input type="password" className="form-control " name="password" onChange={onChangeForm} />
                        </div>
                        <div className="form-outline ">
                            <label className="form-label" htmlFor="form2Example27">
                                Confirmpassword
                            </label>
                            <AlertMessage
                                open={confirmpassenter}
                                variant="warning"
                                info="Please enter your confirmpass here"
                            />
                            <AlertMessage
                                open={confirmpassenternotmatch}
                                variant="warning"
                                info="Password is not match please check your password"
                            />
                            <input
                                type="password"
                                id="form2Example27"
                                className="form-control "
                                name="confirmpassword"
                                onChange={onChangeForm}
                            />
                        </div>
                        <div className="pt-1 ">
                            <button className="btn btn-dark btn-lg btn-block" type="submit">
                                Sign Up
                            </button>
                        </div>

                        <p className="mb-2 pb-lg-2 mt-2" style={{ color: '#393f81' }}>
                            Do you already have an account !{' '}
                            <span onClick={routeChange} style={{ color: '#393f81' }}>
                                Login here
                            </span>
                        </p>
                        <span>Terms of use.</span>
                        <span>Privacy policy</span>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
    return body;
}

export default Register;
