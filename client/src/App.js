import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cart from './Components/Cart/Cart.jsx';
import Login from './Components/auth/Login/Login.jsx';
import Register from './Components/auth/Register/Register.jsx';
import AuthContextProvider from './Context/AuthContext.jsx';
import Home from './Views/Home.jsx';
import Shoes from './Components/Products/Men/Shoes/Shoes.jsx';
import ShoesRunning from './Components/Products/Men/Shoes-runing/ShoesRunning.jsx';
import DetailProduct from './Components/DetailProducts/DetailProduct.jsx';
import ProductsContext from './Context/ProductsContext.jsx';
import Jordan from './Components/Products/Men/Jordan/Jordan.jsx';
import TopAndTShirts from './Components/Products/Men/TopAndTShirts/TopAndTShirts.jsx';
import GymandTraining from './Components/Products/Men/GymandTraining/GymandTraining.jsx';
import { useSelector } from 'react-redux';
import CheckoutSuccess from './Views/CheckoutSuccess.jsx';
import ErrorNotFound from './Views/ErrorNotFound.jsx';
import Profile from './Components/auth/Profile/Profile.jsx';
import DashBoard from './admin/Views/Dashboard.jsx';
import LoginAdmin from './admin/Components/Auth/LoginAdmin.jsx';
import Chart from './admin/Views/Chart.jsx';
import OrderAdmin from './admin/Views/Order.jsx';
import ProductsAdmin from './admin/Views/Products.jsx';
import DetailProductsAdmin from './admin/Views/DetailProductsAdmin.jsx';
import NewProducts from './admin/Views/NewProducts.jsx';
import UserAdmin from './admin/Views/UserAdmin.jsx';
import ClubFootBall from './Components/Products/Men/ClubFootball/ClubFootball.jsx';
import AllClothingMen from './Components/Products/Men/AllClothing/AllClothing.jsx';
import Men from './Components/Products/Men/Men/Men.jsx';
import BacsicsEseentinals from './Components/Products/Men/BacktoBasics/BacsicsEseentinals.jsx';
import HoodiesAndSweatShirts from './Components/Products/Men/HoodiesAndSweatShirts/HoodiesAndSweatShirts.jsx';
import ShortMen from './Components/Products/Men/Short/Short.jsx';

function App() {
    const user = useSelector((state) => state.user.currentUser);
    const cart = useSelector((state) => state.cart);
    let admin = null;
    if (user) {
        admin = user.user.isadmin;
    }

    const licensed = cart.licensed;
    return (
        <AuthContextProvider>
            <ProductsContext>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin/dashboard" element={admin ? <DashBoard /> : <ErrorNotFound />} />
                        <Route path="/admin/order" element={admin ? <OrderAdmin /> : <ErrorNotFound />} />
                        <Route path="/admin/chart" element={admin ? <Chart /> : <ErrorNotFound />} />
                        <Route path="/admin/login" element={<LoginAdmin />} />
                        <Route path="/admin/newProduct" element={<NewProducts />} />
                        <Route path="/admin/products" element={<ProductsAdmin />} />
                        <Route path="/admin/users" element={<UserAdmin />} />
                        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/checkout-success" element={licensed ? <CheckoutSuccess /> : <ErrorNotFound />} />
                        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
                        <Route path="/shoes" element={<Shoes />} />
                        <Route path="/clubfootball" element={<ClubFootBall />} />
                        <Route path="/allclothingmen" element={<AllClothingMen />} />
                        <Route path="/shoes-runing" element={<ShoesRunning />} />
                        <Route path="/jordan" element={<Jordan />} />
                        <Route path="/men" element={<Men />} />
                        <Route path="/gymandtraining" element={<GymandTraining />} />
                        <Route path="/bacsicseseentinails" element={<BacsicsEseentinals />} />
                        <Route path="TopAndTShirts" element={<TopAndTShirts />} />
                        <Route path="shortmen" element={<ShortMen />} />
                        <Route path="hoodiesandsweatshirts" element={<HoodiesAndSweatShirts />} />
                        <Route path="products/:_id" element={<DetailProduct />} />
                        <Route path="/admin/detailproduct/:_id" element={<DetailProductsAdmin />} />
                        <Route path="*" element={<ErrorNotFound />} />
                    </Routes>
                </BrowserRouter>
            </ProductsContext>
        </AuthContextProvider>
    );
}

export default App;
