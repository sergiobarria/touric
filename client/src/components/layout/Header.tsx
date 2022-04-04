import { Link } from 'react-router-dom';

import clsx from 'clsx';

import logo from '../../assets/img/logo-white.png';

export default function Header() {
  return (
    <header className='flex items-center h-20 px-12 bg-gray-600'>
      <nav className='flex items-center justify-between w-full'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='h-[2rem]' />
        </Link>
        <ul className='flex items-center'>
          <li
            className={clsx(
              'uppercase text-white mr-8',
              'transition-all duration-150 ease-in-out hover:-translate-y-[2px]'
            )}
          >
            <Link to='/login'>Login</Link>
          </li>
          <li
            className={clsx(
              'uppercase text-white border px-8 py-3 rounded-full',
              'transition-all duration-150 ease-in-out hover:text-gray-600',
              'hover:-translate-y-[2px] hover:bg-white cursor-pointer',
              'hover:shadow-black hover:shadow-md'
            )}
          >
            <Link to='/signup'>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
