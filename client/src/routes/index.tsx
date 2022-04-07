import { Routes, Route } from 'react-router-dom';

import { HomePage } from '../pages/home.page';
import { ToursPage } from '../pages/tours.page';
import { TourDetailsPage } from '@/pages/tourDetails.page';
import { LoginPage } from '../pages/login.page';
import { SignUpPage } from '../pages/signup.page';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/tours' element={<ToursPage />} />
      <Route path='/tours/:tourSlug' element={<TourDetailsPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
    </Routes>
  );
}
