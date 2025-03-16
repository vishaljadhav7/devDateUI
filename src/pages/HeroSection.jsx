import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HeroSection = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 relative overflow-hidden">
        {/* Background subtle pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-100/20 via-transparent to-transparent opacity-50"></div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-slide-up tracking-tight relative z-10">
          Welcome to <span className="text-rose-600 bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">DevDates</span>
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 text-gray-700 animate-slide-up animation-delay-200 leading-relaxed">
          Where tech enthusiasts meet, connect, and build meaningful relationships. Find your coding partner, or mentor today.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400 z-10">
          <Link to="/signup">
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 px-10 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl duration-300">
              Get Started
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-transparent border-2 border-rose-600 hover:border-rose-700 text-rose-600 hover:text-rose-700 font-semibold py-4 px-10 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl duration-300">
              Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-gray-900">
            Why Choose DevDates?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-6 text-rose-600 animate-bounce">💻</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Tech-Focused</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with IT professionals who share your passion for technology and innovation.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-6 text-rose-600 animate-bounce animation-delay-200">❤️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Meaningful Connections</h3>
              <p className="text-gray-600 leading-relaxed">
                Build relationships that go beyond coding—find mentors, collaborators, or your soulmate.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-6 text-rose-600 animate-bounce animation-delay-400">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Easy to Use</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform is designed with simplicity in mind, so you can focus on connecting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-3xl font-semibold text-rose-600 mb-4">1. Sign Up</div>
              <p className="text-gray-600">
                Create your profile and tell us about your tech interests and goals.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-semibold text-rose-600 mb-4">2. Match</div>
              <p className="text-gray-600">
                Browse profiles and connect with people who share your passions.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-semibold text-rose-600 mb-4">3. Connect</div>
              <p className="text-gray-600">
                Start chatting and building relationships that matter to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ready to Find Your Match?</h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join DevDates today and connect with IT professionals who share your interests and goals.
          </p>
          <Link to="/signup">
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 px-12 rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl duration-300">
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;