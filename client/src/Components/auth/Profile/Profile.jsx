import Navbars from '../../layout/Navbar/Navbar';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { loginredux } from '../../../redux/apiCall';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import app from '../../../firebase';
import AlertMessage from '../../layout/AlertMessage/AlertMessage';

import './Profile.css';
function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const [inputs, setInputs] = useState({
        name: user.user.name,
        lastname: user.user.lastname,
        address: user.user.address,
        email: user.user.email,
    });
    const [file, setFile] = useState(null);
    const [success, setsuccess] = useState('none');
    const handleChangeInput = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (file !== null) {
            const fileName = new Date().getTime + file.name;
            const Storage = getStorage(app);
            const StorageRef = ref(Storage, fileName);
            const uploadTask = uploadBytesResumable(StorageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case 'paused':
                            break;
                        case 'running':
                            break;
                        default:
                            break;
                    }
                },
                (error) => {},
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const updateUser = {
                            ...inputs,
                            userId: user.user._id,
                            avatar: downloadURL,
                        };
                        const UpdatUser = async () => {
                            try {
                                const res = await axios.put('http://localhost:5000/api/auth/update', updateUser);
                                const user = res.data;
                                loginredux(dispatch, user);
                            } catch (error) {
                                console.log(error);
                            }
                        };
                        UpdatUser();
                    });
                },
            );
        } else {
            const updateUser = {
                ...inputs,
                userId: user.user._id,
            };
            const UpdatUser = async () => {
                try {
                    const res = await axios.put('http://localhost:5000/api/auth/update', updateUser);
                    const user = res.data;
                    loginredux(dispatch, user);
                    setsuccess('block');
                    setTimeout(() => {
                        setsuccess('none');
                    }, 3000);
                } catch (error) {
                    console.log(error);
                }
            };
            UpdatUser();
        }
    };

    return (
        <div className="wrapper-profile">
            <Navbars />
            <div className="my-2 profile">
                <AlertMessage open={success} variant="success" info="Account has been updated" />
                <div className="mx-3 headline-1">OverView</div>
                <h2 className="mx-3 headline-user">User Profile</h2>
                <div className="d-flex ">
                    <div className="info-image mx-3 my-3 text-center">
                        <img className="image-user-profile my-2" src={user.user.avatar} alt="" />
                        <div>
                            <input
                                className="input-profile-image"
                                type="file"
                                name="image"
                                id="file"
                                placeholder="Air Jordan 1 Low SE"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="info-text mx-3 my-3">
                        <div className="d-flex justify-content-between">
                            <div className="mx-3 my-3 profile-text-sidebar">
                                <h5>OverView</h5>
                                <h3>User Profile</h3>
                            </div>
                            <div className="profile-text-sidebar">
                                <div className="info-image-sidebar-profile mx-3 my-3 text-center">
                                    <img className="image-user-profile my-2" src={user.user.avatar} alt="" />
                                    <div>
                                        <input
                                            className="input-profile-image"
                                            type="file"
                                            name="image"
                                            id="file"
                                            placeholder="Air Jordan 1 Low SE"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 my-2">Account ID: {user.user._id}</div>
                        <div className="px-3">
                            <div className="">
                                <div>
                                    <label htmlFor="name">Email</label>
                                    <br />
                                    <input
                                        disabled
                                        className="email-profile"
                                        onChange={(e) => handleChangeInput(e)}
                                        defaultValue={user.user.email}
                                        id="input-email"
                                        type="text"
                                        name="email"
                                    />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-6">
                                    <label htmlFor="name">Name</label>
                                    <br />
                                    <input
                                        className="name-profile"
                                        onChange={(e) => handleChangeInput(e)}
                                        defaultValue={user.user.name}
                                        id="input-name"
                                        type="text"
                                        name="name"
                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="name">Lastname</label>
                                    <br />
                                    <input
                                        className="lastname-profile"
                                        onChange={(e) => handleChangeInput(e)}
                                        defaultValue={user.user.lastname}
                                        id="input-name"
                                        type="text"
                                        name="lastname"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="my-3">
                                    <label htmlFor="name">Address</label>
                                    <br />

                                    <input
                                        className="address-profile"
                                        onChange={(e) => handleChangeInput(e)}
                                        defaultValue={user.user.address}
                                        id="input-address"
                                        type="text"
                                        name="address"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mx-3 my-3">
                            <button onClick={handleClick} className="btn-update-profile btn-primary">
                                Update Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
