import { useEffect, useState } from 'react';
import NavbarAdmin from '../Components/layout/NabvarAdmin/NavbarAdmin.jsx';
import SidbarAdmin from '../Components/layout/SidbarAdmin/SidbarAdmin.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { GetUsers } from '../../redux/apiCall';
import { adminRequest } from '../../requestMethods';
import ReactPaginate from 'react-paginate';
import { DeleteUser } from '../../redux/apiCall';
import { useSelector } from 'react-redux';
import AlertMessage from '../../Components/layout/AlertMessage/AlertMessage';
import axios from 'axios';
import { faBackwardStep, faForwardStep, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
function UserAdmin() {
    const [inputsearch, setInputSearch] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getuser.user);
    let SearchUser;
    if (user) {
        SearchUser = user.filter((e) => {
            if (inputsearch == '') {
                return e;
            } else if (e.address) {
                return (
                    e._id.includes(inputsearch) ||
                    e.name.includes(inputsearch) ||
                    e.address.includes(inputsearch) ||
                    e.createAt.includes(inputsearch)
                );
            } else {
                return e._id.includes(inputsearch) || e.name.includes(inputsearch) || e.createAt.includes(inputsearch);
            }
        });
    }
    const [updateUser, setUpdateUser] = useState({});
    const onChangeUpdateForm = (event) => setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
    const handleUpdateUser = (id) => {
        const defaultuser = user.filter((user) => user._id === id);
        let updateUsers = {
            userId: id,
            name: updateUser.name ? updateUser.name : defaultuser[0].name,
            lastname: updateUser.lastname ? updateUser.lastname : defaultuser[0].lastname,
            address: updateUser.address ? updateUser.address : defaultuser[0].address,
        };
        const UpdateUser = async () => {
            adminRequest
                .put(`/users/update/user`, updateUsers)
                .then((res) => {
                    if (res.data.success) {
                        const getUser = async () => {
                            axios
                                .get('http://localhost:5000/api/users/', {
                                    headers: {
                                        token: `Bearer ${
                                            user
                                                ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
                                                      .currentUser?.accessToken
                                                : ''
                                        }`,
                                    },
                                })
                                .then((res) => {
                                    const alertMessupdate = () => {
                                        const userid = id + 'update';
                                        const alertUpdate = document.getElementById(userid);
                                        alertUpdate.classList.add('open-alert-user-admin');
                                        setTimeout(() => {
                                            alertUpdate.classList.remove('open-alert-user-admin');
                                            console.log(true);
                                        }, 3000);
                                    };
                                    alertMessupdate();
                                    const data = res.data;
                                    GetUsers(dispatch, data);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        };
                        getUser();
                    }
                })
                .catch((err) => console.log(err));
        };
        UpdateUser();
    };

    const handleDeleteUser = (id) => {
        const userid = id + 'adf';
        const btnid = id + 'ark';
        const deleteuser = document.getElementById(userid);
        const btncheck = document.getElementById(btnid);
        deleteuser.classList.toggle('open-alert-user-admin');
        btncheck.classList.toggle('open-alert-user-admin');
    };
    const handleCheckedDeleteUser = (id) => {
        DeleteUser(id, dispatch);
        const userid = id + 'adf';
        const btnid = id + 'ark';
        const deleteuser = document.getElementById(userid);
        const btncheck = document.getElementById(btnid);
        deleteuser.classList.remove('open-alert-user-admin');
        btncheck.classList.remove('open-alert-user-admin');
    };

    const ChangePage = ({ selected }) => {
        setPageNum(selected);
    };
    const handleSearch = (e) => {
        var lowerCase = e.target.value;
        setInputSearch(lowerCase);
    };

    const handleEdit = (e) => {
        const edit = document.getElementById(e);
        edit.classList.toggle('open-edit-user-admin');
    };

    const handleSee = (e, i) => {
        const see = document.getElementById(e);
        see.classList.toggle('open-user-admin');
    };
    const [pageNum, setPageNum] = useState(0);
    const proPerPage = 11;
    const pagesVistied = pageNum * proPerPage;
    const pageCount = Math.ceil(user?.length / proPerPage);
    let displayUser;
    if (user) {
        displayUser = SearchUser.slice(pagesVistied, pagesVistied + proPerPage).map((e, i) => {
            const date = e.createAt.slice(8, 10);
            const month = e.createAt.slice(5, 7);
            const year = e.createAt.slice(0, 4);
            const time = e.createAt.slice(11, 16);
            return (
                <div
                    className="wrapper-admin-product col-12 padding-0 py-2"
                    key={i}
                    style={e.address === undefined ? { backgroundColor: '#F4C2C2' } : { backgroundColor: '#fff' }}
                >
                    <AlertMessage
                        classname="alertmessage-user-admin"
                        id={e._id + 'adf'}
                        variant="warning"
                        info="Are you sure you want to delete this account?"
                        infobtn="yes"
                    />
                    <AlertMessage
                        classname="alertmessage-user-admin"
                        id={e._id + 'update'}
                        variant="success"
                        info="Account has been update"
                    />
                    <div className="alertmessage-user-admin" id={e._id + 'ark'}>
                        <button
                            className="btn-checked-delete-user-admin"
                            onClick={() => handleCheckedDeleteUser(e._id)}
                        >
                            Yes
                        </button>
                    </div>
                    <div className="d-flex nav-order-admin d-flex justify-content-between">
                        <div className="userid-user-admin">#{e._id.slice(8, 19)}</div>
                        <div className="name-user-admin">{e.name}</div>
                        <div className="address-user-admin">{e.address}</div>
                        <div className="createat-user-admin ">
                            <div>{year}</div>-<div>{month}</div>-<div>{date}</div>
                        </div>
                        <div className="action-user-admin my-1">
                            <button className="btn-edit-product-admin mx-2" onClick={() => handleEdit(e.email)}>
                                <span>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </span>
                            </button>
                            <button className="btn-delete-product-admin" onClick={() => handleDeleteUser(e._id)}>
                                <span>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                            </button>
                        </div>
                        <div className="see-detail-user-admin" onClick={() => handleSee(e._id, i)}>
                            Detail
                        </div>
                    </div>
                    <div className="mt-2 px-3 py-3 detail-user-admin" key={i} id={e._id}>
                        <div className="">Id: #{e._id}</div>
                        <div className="">Username: {e.name}</div>
                        <div className="">Address: {e.address}</div>
                        <div className="d-flex">
                            <div>Created: {date}</div>-<div>{month}</div>-<div>{year}</div>
                        </div>
                    </div>
                    <div className="edit-user-admin col-12 my-4" id={e.email}>
                        <div className="row">
                            <div className=" col-sm-3">
                                <img className="edit-img-user-admin" src={e.avatar} alt="" />
                            </div>
                            <div className="col-sm-5 my-4 padding-0">
                                <div className="input-userid-user-admin d-flex">
                                    <label className="label-user-admin" htmlFor="userid">
                                        user Id:
                                    </label>
                                    <input
                                        className="input-user-admin"
                                        type="text"
                                        defaultValue={e._id}
                                        name="userid"
                                        disabled
                                    />
                                </div>
                                <div className="d-flex ">
                                    <label className="label-user-admin" htmlFor="name">
                                        name:
                                    </label>
                                    <input
                                        onChange={onChangeUpdateForm}
                                        name="name"
                                        className="input-user-admin"
                                        type="text"
                                        defaultValue={e.name}
                                    />
                                </div>
                                <div className="d-flex">
                                    <label className="label-user-admin" htmlFor="lastname">
                                        lastname:
                                    </label>
                                    <input
                                        onChange={onChangeUpdateForm}
                                        className="input-user-admin"
                                        type="text"
                                        defaultValue={e.lastname}
                                        name="lastname"
                                    />
                                </div>
                                <div className="d-flex">
                                    <label className="label-user-admin" htmlFor="address">
                                        Address:
                                    </label>
                                    <input
                                        onChange={onChangeUpdateForm}
                                        className="input-user-admin"
                                        type="text"
                                        defaultValue={e.address}
                                        name="address"
                                    />
                                </div>
                            </div>
                            <div className="" onClick={() => handleUpdateUser(e._id)}>
                                <button className="btn-update-user-admin">update</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
            <NavbarAdmin />
            <div className="col-12 page-chart py-5">
                <div className="row">
                    <div className="nav-admin-dashboard">
                        <SidbarAdmin />
                    </div>
                    <div className="padding-0 display-admin-dashboard">
                        <div className="d-flex home-route">
                            <span>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <div className="px-2">/ Users</div>
                        </div>
                        <div className="d-flex justify-content-between row mx-0">
                            <h1 className="col-md-6">Users</h1>
                            <div className="col-md-6">
                                <input
                                    className="search-order-admin"
                                    onChange={(e) => handleSearch(e)}
                                    type="search"
                                    placeholder="search... UserId, Name ,Address"
                                />
                            </div>
                        </div>
                        <div className="wrapper-order-admin">
                            <div className="col-12 padding-0">
                                <div className="py-3 nav-user-admin d-flex">
                                    <div className="userid-user-admin">User Id</div>
                                    <div className="name-user-admin">Name</div>
                                    <div className="address-user-admin">Address</div>
                                    <div className="createat-user-admin">CreateAt</div>
                                    <div className="action-user-admin">Action</div>
                                </div>
                            </div>
                            {displayUser}
                            <ReactPaginate
                                previousLabel={<FontAwesomeIcon icon={faBackwardStep} />}
                                nextLabel={<FontAwesomeIcon icon={faForwardStep} />}
                                pageCount={pageCount}
                                onPageChange={ChangePage}
                                containerClassName={'paginationBttns'}
                                previousLinkClassName={'previousBttns'}
                                nextLinkClassName={'nextBttn'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAdmin;
