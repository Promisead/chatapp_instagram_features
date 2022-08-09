import React from 'react';
import './card.css';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsHeartFill } from 'react-icons/bs';
import { FaComments } from 'react-icons/fa';
import { BsShare } from 'react-icons/bs';
import { BsInfoSquare } from 'react-icons/bs';

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit('sendNotification', {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <BsHeartFill className="cardIcon" style={{ color: 'red' }} />
        ) : (
          <AiOutlineHeart
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <FaComments
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />

        <BsShare className="cardIcon" onClick={() => handleNotification(3)} />

        <BsInfoSquare className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
