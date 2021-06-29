import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import { Center } from './Layout';
import Logotype from '../../icons/logotype.svg';
import Nav from './Nav';

const Header = () => {
  const { user, loggedIn } = useSelector((state) => state.contract);

  return (
    <header>
      <Center>
        <Link href='/'>
          <a className='logotype'>
            <Logotype />
          </a>
        </Link>

        <nav>{loggedIn && <Nav userInfo={user} />}</nav>
      </Center>

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
