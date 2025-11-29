import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventService } from '../services/eventService';
import { rsvpService } from '../services/rsvpService';
import { invitationService } from '../services/invitationService';
import { collaborationService } from '../services/collaborationService';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../contexts/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [rsvpCounts, setRsvpCounts] = useState({ yes: 0, no: 0, maybe: 0, total: 0 });
  const [myRSVP, setMyRSVP] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [rsvpComment, setRsvpComment] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState(1);

  useSocket(id, {
    onRSVPUpdate: (data) => {
      loadRSVPs();
      if (data.user._id === user?.id) {
        setMyRSVP(data);
      }
    },
    onRSVPDeleted: () => {
      loadRSVPs();
      setMyRSVP(null);
    },
  });

  useEffect(() => {
    loadEvent();
    loadRSVPs();
    loadInvitations();
    loadCollaborations();
  }, [id]);

  const loadEvent = async () => {
    try {
      const data = await eventService.getEvent(id);
      setEvent(data.event);
    } catch (err) {
      console.error('Failed to load event:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRSVPs = async () => {
    try {
      const data = await rsvpService.getEventRSVPs(id);
      setRsvps(data.rsvps || []);
      setRsvpCounts(data.counts || { yes: 0, no: 0, maybe: 0, total: 0 });
      
      const myRSVPData = await rsvpService.getMyRSVP(id);
      if (myRSVPData.rsvp) {
        setMyRSVP(myRSVPData.rsvp);
        setRsvpStatus(myRSVPData.rsvp.status);
        setRsvpComment(myRSVPData.rsvp.comment || '');
        setRsvpGuests(myRSVPData.rsvp.guests || 1);
      }
    } catch (err) {
      console.error('Failed to load RSVPs:', err);
    }
  };

  const loadInvitations = async () => {
    try {
      const data = await invitationService.getEventInvitations(id);
      setInvitations(data.invitations || []);
    } catch (err) {
      console.error('Failed to load invitations:', err);
    }
  };

  const loadCollaborations = async () => {
    try {
      const data = await collaborationService.getEventCollaborations(id);
      setCollaborations(data.collaborations || []);
    } catch (err) {
      console.error('Failed to load collaborations:', err);
    }
  };

  const handleRSVP = async (status) => {
    try {
      await rsvpService.createOrUpdateRSVP({
        eventId: id,
        status,
        comment: rsvpComment,
        guests: rsvpGuests,
      });
      setRsvpStatus(status);
      await loadRSVPs();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update RSVP');
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone and all associated data will be permanently removed.')) {
      try {
        await eventService.deleteEvent(id);
        navigate('/dashboard');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete event. Please try again.');
      }
    }
  };

  const isOwner = event?.owner?._id === user?.id || event?.owner === user?.id;
  const canEdit = isOwner || collaborations.some(c => c.user._id === user?.id && c.role === 'editor');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
        <Link to="/dashboard" className="text-primary-600 hover:text-primary-700">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        {event.coverImage && (
          <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${event.coverImage})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>📅 {new Date(event.startDate).toLocaleDateString()}</span>
                {event.location && <span>📍 {event.location}</span>}
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded">{event.category}</span>
              </div>
            </div>
            {isOwner && (
              <div className="flex space-x-2">
                <Link
                  to={`/events/${id}/edit`}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Edit Event
                </Link>
                <button
                  onClick={handleDeleteEvent}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Delete Event
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-6 border-b">
          {['details', 'rsvps', 'invitations', 'collaborators'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'details' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Event Details</h2>
            {event.description && (
              <p className="text-gray-700 mb-4">{event.description}</p>
            )}
            <div className="space-y-2">
              <div><strong>Start:</strong> {new Date(event.startDate).toLocaleString()}</div>
              <div><strong>End:</strong> {new Date(event.endDate).toLocaleString()}</div>
              {event.location && <div><strong>Location:</strong> {event.location}</div>}
              <div><strong>Invitation Link:</strong> 
                <span className="ml-2 text-primary-600">
                  {window.location.origin}/invite/{event.invitationLink}
                </span>
              </div>
            </div>

            {!isOwner && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Will you be attending?</h3>
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleRSVP('yes')}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        rsvpStatus === 'yes' ? 'bg-green-600 text-white shadow-lg' : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      Yes, I'll be there
                    </button>
                    <button
                      onClick={() => handleRSVP('maybe')}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        rsvpStatus === 'maybe' ? 'bg-yellow-600 text-white shadow-lg' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      }`}
                    >
                      Maybe
                    </button>
                    <button
                      onClick={() => handleRSVP('no')}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        rsvpStatus === 'no' ? 'bg-red-600 text-white shadow-lg' : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      Can't make it
                    </button>
                  </div>
                  {rsvpStatus && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div>
                        <label htmlFor="rsvpGuests" className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Guests
                        </label>
                        <input
                          type="number"
                          id="rsvpGuests"
                          min="1"
                          value={rsvpGuests}
                          onChange={(e) => setRsvpGuests(parseInt(e.target.value) || 1)}
                          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="1"
                        />
                      </div>
                      <div>
                        <label htmlFor="rsvpComment" className="block text-sm font-medium text-gray-700 mb-2">
                          Add a Comment <span className="text-gray-500 font-normal">(optional)</span>
                        </label>
                        <textarea
                          id="rsvpComment"
                          value={rsvpComment}
                          onChange={(e) => setRsvpComment(e.target.value)}
                          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          rows="3"
                          placeholder="Let the organizer know if you have any questions or special requests..."
                        />
                      </div>
                      <button
                        onClick={() => handleRSVP(rsvpStatus)}
                        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                      >
                        Confirm RSVP
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'rsvps' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Guest Responses</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-700">{rsvpCounts.yes}</div>
                <div className="text-sm text-green-600 font-medium">Attending</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="text-2xl font-bold text-yellow-700">{rsvpCounts.maybe}</div>
                <div className="text-sm text-yellow-600 font-medium">Maybe</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="text-2xl font-bold text-red-700">{rsvpCounts.no}</div>
                <div className="text-sm text-red-600 font-medium">Not Attending</div>
              </div>
            </div>
            {rsvps.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No guests have responded yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {rsvps.map((rsvp) => (
                  <div key={rsvp._id} className="border rounded p-4">
                    <div className="flex justify-between">
                      <div>
                        <strong>{rsvp.user?.username || rsvp.user?.email}</strong>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                          rsvp.status === 'yes' ? 'bg-green-100 text-green-800' :
                          rsvp.status === 'maybe' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {rsvp.status}
                        </span>
                      </div>
                      {rsvp.guests > 1 && <span>{rsvp.guests} guests</span>}
                    </div>
                    {rsvp.comment && <p className="text-gray-600 text-sm mt-1">{rsvp.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'invitations' && canEdit && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Send Invitations</h2>
            <p className="text-gray-600 mb-6">Invite guests by email or username</p>
            <InvitationManager eventId={id} invitations={invitations} onUpdate={loadInvitations} />
          </div>
        )}

        {activeTab === 'collaborators' && isOwner && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Team Collaborators</h2>
            <p className="text-gray-600 mb-6">Add team members to help manage this event</p>
            <CollaborationManager eventId={id} collaborations={collaborations} onUpdate={loadCollaborations} />
          </div>
        )}
      </div>
    </div>
  );
};

// Invitation Manager Component
const InvitationManager = ({ eventId, invitations, onUpdate }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email && !username) {
      alert('Please provide an email address or username');
      return;
    }
    try {
      setLoading(true);
      await invitationService.createInvitation({
        eventId,
        inviteeEmail: email,
        inviteeUsername: username,
      });
      setEmail('');
      setUsername('');
      onUpdate();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 space-y-3">
        <div className="flex space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="border rounded-lg px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Invitee email address"
          />
          <span className="self-center text-gray-500">or</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="border rounded-lg px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Invitee username"
          />
        </div>
        <button
          onClick={handleInvite}
          disabled={loading}
          className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Sending Invitation...' : 'Send Invitation'}
        </button>
      </div>
      <div className="space-y-2">
        {invitations.map((inv) => (
          <div key={inv._id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <span>{inv.inviteeEmail || inv.inviteeUsername || inv.inviteeUser?.username}</span>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                inv.status === 'accepted' ? 'bg-green-100' :
                inv.status === 'declined' ? 'bg-red-100' :
                'bg-yellow-100'
              }`}>
                {inv.status}
              </span>
            </div>
            <button
              onClick={async () => {
                await invitationService.deleteInvitation(inv._id);
                onUpdate();
              }}
              className="text-red-600 hover:text-red-800 font-medium"
              aria-label="Remove invitation"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Collaboration Manager Component
const CollaborationManager = ({ eventId, collaborations, onUpdate }) => {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('viewer');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!userId) {
      alert('Please provide a user ID or username');
      return;
    }
    try {
      setLoading(true);
      await collaborationService.addCollaborator({ eventId, userId, role });
      setUserId('');
      onUpdate();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add collaborator. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 space-y-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID or username"
            className="border rounded-lg px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="User ID or username"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Collaborator role"
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <button
          onClick={handleAdd}
          disabled={loading}
          className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Adding Collaborator...' : 'Add Collaborator'}
        </button>
      </div>
      <div className="space-y-2">
        {collaborations.map((collab) => (
          <div key={collab._id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <span>{collab.user?.username || collab.user?.email}</span>
              <span className="ml-2 px-2 py-1 bg-primary-100 rounded text-xs">{collab.role}</span>
            </div>
            <button
              onClick={async () => {
                await collaborationService.removeCollaborator(collab._id);
                onUpdate();
              }}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;


