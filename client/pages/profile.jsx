import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';

import { Page, Center } from './components/Layout';
import TweetList from './components/TweetList';

import { getTweetsFromUser } from '../redux/reducers/contract/contract.actions';

const AVATAR_SIZE = 113;

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { tweets } = useSelector((state) => state.user);

  const { id, username, firstName, lastName, bio } = user;

  useEffect(() => {
    dispatch(getTweetsFromUser(id));
  }, []);

  return (
    <Page>
      <Center
        style={{
          maxWidth: 560
        }}>
        {tweets && (
          <div>
            <div className='profile-top'>
              <div className='info'>
                <h1>
                  {firstName} {lastName}
                </h1>
                <p className='username'>@{username}</p>
                <p className='desc'>{bio}</p>
              </div>
              {/* <Avatar size={AVATAR_SIZE} email={gravatarEmail} /> */}
            </div>

            <h2>
              {firstName}'s tweets {tweets.length}
            </h2>
            <TweetList tweets={tweets} username={username} />
          </div>
        )}
      </Center>

      <style jsx>{`
        .profile-top {
          margin: 40px 0;
        }
        .info {
          display: inline-block;
          width: calc(100% - ${AVATAR_SIZE}px);
          vertical-align: top;
        }
        h1 {
          font-size: 30px;
          font-weight: 500;
        }
        .username {
          font-size: 17px;
          font-weight: 400;
          margin: 7px 0;
        }
        .desc {
          font-size: 19px;
          font-weight: 400;
          margin-top: 22px;
        }

        h2 {
          font-size: 18px;
          font-weight: 600;
          margin-top: 70px;
        }
      `}</style>
    </Page>
  );
};

export default withRouter(ProfilePage);
