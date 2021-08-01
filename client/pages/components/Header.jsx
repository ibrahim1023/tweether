import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Center } from './Layout';
import Nav from './Nav';
import Modal from './Modal';
import Logotype from '../../icons/logotype.svg';

import TweetComposer from './TweetComposer';

const Header = () => {
  const [showComposeModal, setShowComposeModal] = useState(false);
  const { user, loggedIn } = useSelector((state) => state.user);

  const toggleComposeModal = async () => {
    setShowComposeModal((prevState) => !prevState);
  };

  return (
    <header>
      <Center>
        <Link href='/'>
          <a className='logotype'>
            <Logotype />
          </a>
        </Link>

        <nav>
          {loggedIn && (
            <Nav userInfo={user} toggleComposeModal={toggleComposeModal} />
          )}
        </nav>
      </Center>

      {showComposeModal && (
        <Modal onClose={toggleComposeModal}>
          <TweetComposer onClose={toggleComposeModal} />
        </Modal>
      )}

      <style jsx>{`
        header {
          background-color: #ffffff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.14);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }
      `}</style>
    </header>
  );
};

export default Header;
