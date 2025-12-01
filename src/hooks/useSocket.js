import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config/env';

export const useSocket = (eventId, callbacks = {}) => {
  const socketRef = useRef(null);
  const callbacksRef = useRef(callbacks);

  useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    const socket = socketRef.current;

    if (eventId) {
      socket.emit('join-event', eventId);
    }
    const handleRSVPUpdate = (data) => {
      if (callbacksRef.current.onRSVPUpdate) {
        callbacksRef.current.onRSVPUpdate(data);
      }
    };

    const handleRSVPDeleted = (data) => {
      if (callbacksRef.current.onRSVPDeleted) {
        callbacksRef.current.onRSVPDeleted(data);
      }
    };

    const handleInvitationUpdate = (data) => {
      if (callbacksRef.current.onInvitationUpdate) {
        callbacksRef.current.onInvitationUpdate(data);
      }
    };

    const handleCollaborationUpdate = (data) => {
      if (callbacksRef.current.onCollaborationUpdate) {
        callbacksRef.current.onCollaborationUpdate(data);
      }
    };

    const handleNewInvitation = (data) => {
      if (callbacksRef.current.onNewInvitation) {
        callbacksRef.current.onNewInvitation(data);
      }
    };

    socket.on('rsvp-updated', handleRSVPUpdate);
    socket.on('rsvp-deleted', handleRSVPDeleted);
    socket.on('invitation-updated', handleInvitationUpdate);
    socket.on('collaboration-updated', handleCollaborationUpdate);
    socket.on('new-invitation', handleNewInvitation);

    return () => {
      if (eventId) {
        socket.emit('leave-event', eventId);
      }
      socket.off('rsvp-updated', handleRSVPUpdate);
      socket.off('rsvp-deleted', handleRSVPDeleted);
      socket.off('invitation-updated', handleInvitationUpdate);
      socket.off('collaboration-updated', handleCollaborationUpdate);
      socket.off('new-invitation', handleNewInvitation);
      socket.disconnect();
    };
  }, [eventId]);

  return socketRef.current;
};

