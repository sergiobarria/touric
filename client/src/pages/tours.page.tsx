import clsx from 'clsx';

import { useTours } from '@/hooks/useTours';

import { TourCard } from '@/components/TourCard';
import { QueryResult } from '@/components/QueryResult';
import { ITour } from '@/types';

/**
 * This component renders a grid view of all the available tours
 * for the application
 */
export function ToursPage() {
  const { data, loading, error } = useTours();

  return (
    <div className='layout text-center'>
      <section>
        <h2 className='mb-6 inline-block'>Check all the tours we offer.</h2>
        <p className='text-gray-500'>
          Click on details to see more about each tour.
        </p>
        <QueryResult error={error} loading={loading} data={data}>
          <div
            className={clsx(
              'grid grid-cols-1 gap-24 py-10 md:grid-cols-2 lg:grid-cols-3',
              'max-w-[1200px] mx-auto'
            )}
          >
            {data?.tours.map((tour: ITour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </QueryResult>
      </section>
    </div>
  );
}
