// import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import HeroSection from '../pages/HeroSection';

const Layout = () => {
  return (
    <div className='overflow-hidden '>
        <Navbar/>
        {/* <Outlet/> */}
        <HeroSection/>
        {/* <Footer/> */}
    </div>
  )
}

export default Layout