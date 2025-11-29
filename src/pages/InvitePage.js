import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { rsvpService } from '../services/rsvpService';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Logo from '../components/Logo/Logo';

const InvitePage = () => {
  const { link } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [rsvpComment, setRsvpComment] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState(1);

  useEffect(() => {
    loadEvent();
  }, [link]);

  const loadEvent = async () => {
    try {
      const data = await eventService.getEventByInviteLink(link);
      setEvent(data.event);
      if (isAuthenticated) {
        const myRSVP = await rsvpService.getMyRSVP(data.event._id);
        if (myRSVP.rsvp) {
          setRsvpStatus(myRSVP.rsvp.status);
          setRsvpComment(myRSVP.rsvp.comment || '');
          setRsvpGuests(myRSVP.rsvp.guests || 1);
        }
      }
    } catch (err) {
      console.error('Failed to load event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (status) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: `/invite/${link}` } });
      return;
    }
    try {
      await rsvpService.createOrUpdateRSVP({
        eventId: event._id,
        status,
        comment: rsvpComment,
        guests: rsvpGuests,
      });
      setRsvpStatus(status);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update RSVP');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Invitation Link</h2>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Go to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {event.coverImage && (
            <div
              className="h-64 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${event.coverImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}
          
          <div className="p-8">
            <div className="text-center mb-8">
              <Logo variant="icon" size="large" className="mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.title}</h1>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
                <span>📅 {new Date(event.startDate).toLocaleDateString()}</span>
                {event.location && <span>📍 {event.location}</span>}
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="text-center space-y-4">
                <p className="text-gray-700">Please sign in to RSVP to this event</p>
                <div className="flex justify-center space-x-4">
                  <Link
                    to="/login"
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-primary-600 px-6 py-3 rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-center">Will you be attending?</h2>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleRSVP('yes')}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      rsvpStatus === 'yes'
                        ? 'bg-green-600 text-white shadow-lg scale-105'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleRSVP('maybe')}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      rsvpStatus === 'maybe'
                        ? 'bg-yellow-600 text-white shadow-lg scale-105'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    Maybe
                  </button>
                  <button
                    onClick={() => handleRSVP('no')}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      rsvpStatus === 'no'
                        ? 'bg-red-600 text-white shadow-lg scale-105'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    No
                  </button>
                </div>

                {rsvpStatus && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(parseInt(e.target.value) || 1)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comment (Optional)
                      </label>
                      <textarea
                        value={rsvpComment}
                        onChange={(e) => setRsvpComment(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows="3"
                        placeholder="Add a comment..."
                      />
                    </div>
                    <button
                      onClick={() => handleRSVP(rsvpStatus)}
                      className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                    >
                      Update RSVP
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvitePage;

