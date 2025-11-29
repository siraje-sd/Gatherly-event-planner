import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Logo from '../components/Logo/Logo';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: '📅',
      title: 'Event Management',
      description: 'Create and manage all your events in one place with detailed information and beautiful cover images.',
    },
    {
      icon: '✉️',
      title: 'Smart Invitations',
      description: 'Send invitations via email or username, track status, and generate unique invitation links.',
    },
    {
      icon: '👥',
      title: 'RSVP Tracking',
      description: 'Real-time RSVP tracking with Yes/No/Maybe options, guest counts, and comments.',
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Add co-organizers with role-based permissions. Work together seamlessly.',
    },
    {
      icon: '⚡',
      title: 'Real-Time Updates',
      description: 'Get instant notifications and live updates on RSVPs and event changes.',
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Modern, responsive interface that works perfectly on all devices.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Event Coordinator',
      company: 'Tech Events Inc.',
      content: 'EventPlanner has transformed how we manage our conferences. The RSVP tracking is incredibly accurate and the collaboration features are a game-changer.',
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Wedding Planner',
      company: 'Dream Weddings',
      content: 'I love how easy it is to send invitations and track responses. My clients are always impressed with the professional look and real-time updates.',
      avatar: 'MC',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      company: 'Startup Hub',
      content: 'The real-time collaboration features make it so easy to work with my team. We can all manage events together seamlessly.',
      avatar: 'ER',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-8"
            >
              <Logo variant="full" size="xl" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-rose-500 to-gold-500">
              Plan. Invite. Celebrate.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-2 max-w-3xl mx-auto leading-relaxed font-medium">
              Gatherly
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Create beautiful celebrations with elegance and ease. Plan your wedding, birthday, or special moment with tools designed for life's most important occasions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {isAuthenticated ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300"
                  >
                    Go to Dashboard
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 inline-block"
                    >
                      Get Started Free
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className="bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-all duration-300 inline-block shadow-md"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to plan, manage, and celebrate your events
            </p>
          </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Event Organizers</h2>
            <p className="text-xl text-gray-600">See what our community is saying</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl shadow-md border border-primary-100"
              >
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-primary-600">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Create Your Celebration?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands planning their weddings, birthdays, and special moments with Gatherly</p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors inline-block shadow-lg"
            >
              Get Started Free
            </Link>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

