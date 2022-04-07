import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { ITour } from '../types';

interface ITourCardProps {
  tour: ITour;
}

/**
 * This component renders a preview card with important info related
 * to each tour.
 */
export function TourCard({ tour }: ITourCardProps) {
  return (
    <article className='w-full mx-auto overflow-hidden bg-white rounded-md text-left'>
      <div className='relative w-full h-56'>
        <div className='absolute z-10 w-full h-full gradient clip-image opacity-70' />
        <img
          src={tour.imageCover}
          alt={tour.name}
          className='object-cover w-full h-full clip-image'
        />
        <h3
          className={clsx(
            'absolute z-20 w-4/6 text-3xl text-right text-white uppercase',
            'bottom-4 right-8 leading-10'
          )}
        >
          <span className={clsx('px-4 py-2 gradient inset-0 opacity-90')}>
            {tour.name}
          </span>
        </h3>
      </div>
      <div className='px-6 py-4'>
        <div>
          <p className='mb-2 text-sm font-bold text-gray-500 uppercase'>
            <span>{tour.difficulty} </span>
            <span>{tour.duration}-day tour</span>
          </p>
          <p className='italic text-gray-500'>{tour.summary}</p>
          <div className='grid grid-cols-2'>
            <span>{tour.startDates[0]}</span>
            <span>{tour.maxGroupSize} people</span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div>price</div>
          <div>
            <Link to={tour.slug} state={{ id: tour.id }}>
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
