import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTweet } from '../../redux/reducers/contract/contract.actions';
import Button from './Button';

const ComposeModal = ({ onClose }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const post = async () => {
    try {
      dispatch(createTweet(text));
      alert('Your tweet was posted!');

      onClose();
    } catch (error) {
      alert(`Sorry we couldn't post a tweet: ${error}`);
    }
  };

  const disabled = text === '';

  return (
    <div>
      <h3>Post a new tweet</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={140}
      />

      <Button
        onClick={post}
        disabled={disabled}
        style={{
          marginTop: 12,
          float: 'right'
        }}>
        Post tweet
      </Button>

      <style jsx>{`
        textarea {
          box-sizing: border-box;
          margin: 0px;
          margin-top: 10px;
          border: 2px solid rgba(107, 108, 139, 0.58);
          border-radius: 7px;
          width: 100%;
          padding: 11px;
          font-size: 16px;
        }
        textarea:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default ComposeModal;
