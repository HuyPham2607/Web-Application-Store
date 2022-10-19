import UncontrolledExample from '../Components/layout/Carousel/Carousel.jsx';
import Navbars from '../Components/layout/Navbar/Navbar.jsx';
import Announcement from '../Components/Announcement/Announcement.jsx';
import Content from '../Components/Content/Content.jsx';
import Footer from '../Components/layout/Footer/Footer.jsx';
import CarouselProducts from '../Components/CarouselProducts/CarouselProducts.jsx';
import Trending from '../Components/Trending/Trending.jsx';
import MoreNike from '../Components/MoreNike/MoreNike.jsx';
function Home() {
    return (
        <>
            <Navbars />
            <UncontrolledExample />
            <Announcement />
            <CarouselProducts />
            <Trending />
            <MoreNike />
            <Content />
            <Footer />
        </>
    );
}

export default Home;
