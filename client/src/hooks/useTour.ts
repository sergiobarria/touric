import { useQuery, gql } from '@apollo/client';

const GET_TOUR = gql`
  query GetTour($tourId: ID!) {
    tour(id: $tourId) {
      id
      name
      slug
      summary
      description
      duration
      maxGroupSize
      ratingsAverage
      ratingsQuantity
      price
      imageCover
      images
      startDates
      difficulty
    }
  }
`;

export function useTour(id: String) {
  const { data, loading, error } = useQuery(GET_TOUR, {
    variables: { tourId: id },
  });

  return { data, loading, error };
}
