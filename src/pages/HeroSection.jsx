import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Laptop, Heart, Rocket } from "lucide-react";
import Footer from "../components/Footer";

const HeroSection = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
    <div className="w-full bg-gradient-to-br from-green-50 via-purple-50 to-yellow-100 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <div className="h-[600px] relative flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
          <motion.div
            className="absolute top-0 left-0 w-3/4 h-1/2 bg-green-200/10 rounded-b-[100%] blur-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-purple-200/10 rounded-tl-[100%] blur-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </div>

        {/* Main hero content */}
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-block px-3 py-1 mb-4 rounded-full bg-white/70 backdrop-blur-md border border-purple-200/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <span className="text-purple-500 text-sm font-normal">Where tech meets connection</span>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Welcome to{" "}
                <span className="bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">
                  DevDates
                </span>
              </motion.h1>

              <motion.p
                className="text-base max-w-md mx-auto lg:mx-0 mb-6 text-gray-600 leading-relaxed font-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Where tech enthusiasts meet, connect, and build meaningful relationships. Find your coding partner or
                mentor today.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <Link to="/signup">
                  <motion.button
                    className="bg-gradient-to-r from-purple-500 to-yellow-500 text-white font-normal py-3 px-6 rounded-lg shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 16px -4px rgba(168, 85, 247, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link to="/signin">
                  <motion.button
                    className="bg-transparent border-2 border-purple-500 text-purple-500 font-normal py-3 px-6 rounded-lg shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 16px -4px rgba(168, 85, 247, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative bg-white bg-opacity-100 border border-gray-200/50 rounded-lg p-1 shadow-md">
                <div className="pt-8 pb-4 px-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Alex Chen", role: "Frontend Developer" },
                      { name: "Sarah Kim", role: "UX Designer" },
                      { name: "Marcus Johnson", role: "DevOps Engineer" },
                      { name: "Priya Patel", role: "Data Scientist" },
                    ].map((profile, i) => (
                      <motion.div
                        key={profile.name}
                        className="bg-white border border-gray-200/50 rounded-lg p-3 hover:border-purple-500 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-yellow-500 flex items-center justify-center text-white font-medium">
                            {profile.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-800">{profile.name}</h3>
                            <p className="text-xs text-gray-600">{profile.role}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <span className="text-xs text-gray-600">95% match</span>
                          <motion.button className="text-purple-500 text-xs font-normal" whileHover={{ scale: 1.05 }}>
                            Connect
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute left-[41%] "
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-1 text-gray-600 cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-sm font-normal">Scroll to explore</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-green-50 to-purple-50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">Why Choose DevDates?</h2>
            <div className="w-12 h-1 bg-purple-500 mx-auto mt-3"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {[
              {
                icon: <Laptop className="h-8 w-8 text-purple-500 group-hover:scale-110 transition-transform" />,
                title: "Tech-Focused",
                description: "Connect with IT professionals who share your passion for technology and innovation.",
              },
              {
                icon: <Heart className="h-8 w-8 text-purple-500 group-hover:scale-110 transition-transform" />,
                title: "Meaningful Connections",
                description: "Build relationships that go beyond coding—find mentors, collaborators, or more.",
              },
              {
                icon: <Rocket className="h-8 w-8 text-purple-500 group-hover:scale-110 transition-transform" />,
                title: "Smart Matching",
                description: "Our AI-powered algorithm finds the perfect matches based on your skills and interests.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="bg-white bg-opacity-100 p-4 rounded-lg shadow-md hover:border-purple-500 hover:shadow-purple-200/50 transition-all border border-transparent">
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-medium mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed font-normal">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gradient-to-b from-purple-50 to-yellow-100 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">How It Works</h2>
            <div className="w-12 h-1 bg-purple-500 mx-auto mt-3"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-purple-500 hidden md:block"></div>

            {[
              {
                title: "Sign Up",
                description: "Create your profile and tell us about your tech interests and goals.",
                step: "01",
              },
              {
                title: "Match",
                description: "Browse profiles and connect with people who share your passions.",
                step: "02",
              },
              {
                title: "Connect",
                description: "Start chatting and build relationships that matter to you.",
                step: "03",
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-yellow-500 flex items-center justify-center text-white text-lg font-medium relative shadow-md"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="relative">{step.step}</span>
                </motion.div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">{step.title}</h3>
                <p className="text-base text-gray-600 max-w-xs mx-auto font-normal">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-t from-green-50 to-yellow-100 relative">
        <motion.div
          className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-200/10 rounded-br-[100%] blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            className="bg-white bg-opacity-100 border border-gray-200/50 rounded-lg p-8 text-center shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to Find Your Match?
            </motion.h2>

            <motion.p
              className="text-base text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed font-normal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join DevDates today and connect with IT professionals who share your interests and goals.
            </motion.p>

            <Link to="/signup">
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-yellow-500 text-white font-normal py-3 px-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 16px -4px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up Now
              </motion.button>
            </Link>

            <motion.p
              className="mt-4 text-sm text-gray-600 font-normal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              No credit card required. Free to join.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HeroSection;