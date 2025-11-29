import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const useSocket = (eventId, callbacks = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    const socket = socketRef.current;

    // Join event room
    if (eventId) {
      socket.emit('join-event', eventId);
    }

    // Set up event listeners
    if (callbacks.onRSVPUpdate) {
      socket.on('rsvp-updated', callbacks.onRSVPUpdate);
    }

    if (callbacks.onRSVPDeleted) {
      socket.on('rsvp-deleted', callbacks.onRSVPDeleted);
    }

    if (callbacks.onInvitationUpdate) {
      socket.on('invitation-updated', callbacks.onInvitationUpdate);
    }

    if (callbacks.onCollaborationUpdate) {
      socket.on('collaboration-updated', callbacks.onCollaborationUpdate);
    }

    if (callbacks.onNewInvitation) {
      socket.on('new-invitation', callbacks.onNewInvitation);
    }

    // Cleanup
    return () => {
      if (eventId) {
        socket.emit('leave-event', eventId);
      }
      socket.off('rsvp-updated');
      socket.off('rsvp-deleted');
      socket.off('invitation-updated');
      socket.off('collaboration-updated');
      socket.off('new-invitation');
      socket.disconnect();
    };
  }, [eventId, callbacks]);

  return socketRef.current;
};

