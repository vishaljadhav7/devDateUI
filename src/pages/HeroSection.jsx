import {HERO_URL} from '../utils/constants'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div
    className="hero h-screen fixed top-0 "
    style={{
      backgroundImage:`url(${HERO_URL})`,
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold text-purple-200">Hello there</h1>
        <p className="mb-5 text-[20px] text-white">
        Ready to connect with fellow techies? Join our platform for casual encounters or meaningful relationships. Discover someone who speaks your language—both in coding and in love!
        </p>
        <div className=' flex gap-3  justify-center'>
        
        <Link to={"/signup"}>
        <button className="btn btn-primary text-white">Get Started</button>
        </Link>

        <Link to={"/signin"}>   
        <button className="btn btn-accent text-white">Sign In</button>
         </Link>
        
        </div>
      </div>
    </div>
  </div>
  )
}

export default HeroSection