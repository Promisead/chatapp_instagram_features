import React from 'react';
import { RiNotification3Line } from 'react-icons/ri';
import { BsMessenger } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';

import './navbar.css';
import { useEffect, useState } from 'react';
const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on('getNotification', (data) => {
      setNotifications((previous) => [...previous, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = 'liked';
    } else if (type === 2) {
      action = 'commented';
    } else {
      action = 'shared';
    }
    return (
      <span className="notification">{`${senderName} ${action} your post `}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Let's Chat</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <RiNotification3Line size={20} />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <BsMessenger size={20} />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <AiOutlineSetting size={20} />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
