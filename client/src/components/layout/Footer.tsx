import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo-green.png';

export default function Footer() {
  return (
    <footer className='flex items-center justify-between px-10 pt-16 pb-8 mt-auto bg-gray-600'>
      <img src={logo} alt='Logo' className='w-40' />
      <div>
        <ul className='flex items-center mb-2 space-x-4'>
          <li className='text-sm text-gray-300 transition-colors duration-200 hover:text-primary'>
            <Link to='/'>About us</Link>
          </li>
          <li className='text-sm text-gray-300 transition-colors duration-200 hover:text-primary'>
            <Link to='/'>Download apps</Link>
          </li>
          <li className='text-sm text-gray-300 transition-colors duration-200 hover:text-primary'>
            <Link to='/'>Become a guide</Link>
          </li>
          <li className='text-sm text-gray-300 transition-colors duration-200 hover:text-primary'>
            <Link to='/'>Careers</Link>
          </li>
          <li className='text-sm text-gray-300 transition-colors duration-200 hover:text-primary'>
            <Link to='/'>Contact</Link>
          </li>
        </ul>
        <p className='text-sm text-right text-gray-400'>
          &copy; {new Date().getFullYear()}. Designed by Jonas Schmedtmann.
        </p>
        <p className='text-sm text-right text-gray-400'>
          Developed by Sergio Barria
        </p>
      </div>
    </footer>
  );
}
