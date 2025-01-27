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
    <div className="w-full bg-white text-gray-900">

      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold mb-6 animate-fade-in">
          Welcome to <span className="text-rose-500">DevDates</span>
        </h1>
        <p className="text-xl mb-8 text-gray-600 animate-fade-in-up">
          Where tech enthusiasts meet, connect, and build meaningful relationships. Whether you're looking for a coding partner, a mentor, or something more, DevDates is here to help you find your perfect match.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center animate-fade-in-up">
          <Link to="/signup">
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
              Get Started
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-transparent border-2 border-rose-500 hover:border-rose-600 text-rose-500 hover:text-rose-600 font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
              Sign In
            </button>
          </Link>
        </div>
      </div>


      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose DevDates?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-rose-500">💻</div>
              <h3 className="text-2xl font-bold mb-4">Tech-Focused</h3>
              <p className="text-gray-600">
                Connect with like-minded IT professionals who share your passion for technology and innovation.
              </p>
            </div>

          
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-rose-500">❤️</div>
              <h3 className="text-2xl font-bold mb-4">Meaningful Connections</h3>
              <p className="text-gray-600">
                Build relationships that go beyond coding—find mentors, collaborators, or even your soulmate.
              </p>
            </div>

         
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-rose-500">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Easy to Use</h3>
              <p className="text-gray-600">
                Our platform is designed with simplicity in mind, so you can focus on what matters most—connecting.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-rose-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Match?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join DevDates today and start connecting with IT professionals who share your interests and goals.
          </p>
          <Link to="/signup">
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;