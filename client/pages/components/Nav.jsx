import Link from 'next/link';

import ComposeIcon from '../../icons/compose.svg';

const Nav = ({ userInfo, toggleComposeModal }) => {
  const { username, firstName, lastName } = userInfo;

  return (
    <nav>
      <button onClick={toggleComposeModal}>
        <ComposeIcon />
      </button>

      <Link href={`/profile?u=${username}`}>
        <a className='username'>
          <span>
            {firstName} {lastName}
          </span>
        </a>
      </Link>

      <style jsx>{`
        nav {
          display: inline-block;
          float: right;
        }
        nav button,
        nav a {
          min-height: 33px;
          border: none;
          padding: 7px;
          text-align: center;
          border-radius: 24px;
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
          margin: 0 10px;
          transition: background-color 0.1s;
          color: inherit;
        }
        nav button:hover,
        nav a:hover {
          background-color: rgba(140, 111, 193, 0.14);
        }
        nav button:focus {
          outline: none;
        }
        .username {
          font-size: 18px;
          text-decoration: none;
        }
        .username span {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          margin-right: 10px;
        }
        nav :global(svg) {
          margin-bottom: -2px;
        }
      `}</style>
    </nav>
  );
};

export default Nav;
