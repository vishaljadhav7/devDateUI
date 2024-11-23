import SignIn from "./SignIn"
import SignUp from "./SignUp"


const HeroSection = () => {
  return (
    <div
    className="hero min-h-screen fixed top-0"
    style={{
      backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold text-purple-200">Hello there</h1>
        <p className="mb-5 text-[20px] text-white">
        Ready to connect with fellow techies? Join our platform for casual encounters or meaningful relationships. Discover someone who speaks your language—both in coding and in love!
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
  )
}

export default HeroSection