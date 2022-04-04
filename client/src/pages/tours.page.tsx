import useTours from '../hooks/useTours';

import TourCard from '../components/TourCard';

export default function ToursPage() {
  const { data: tours, loading, error } = useTours('/tours');

  return (
    <div className='layout'>
      {loading && <h2>Loading...</h2>}
      {error && <h2>Something went wrong. Please try again later</h2>}
      {tours && (
        <section>
          <h2 className='mb-6'>Check all the tours we offer.</h2>
          <p className='text-gray-500'>
            Click on details to see more about each tour.
          </p>
          <div className='grid grid-cols-1 gap-6 py-10 md:grid-cols-2 lg:grid-cols-3'>
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
