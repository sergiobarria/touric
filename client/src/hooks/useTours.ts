import { useQuery, gql } from '@apollo/client';

const GET_ALL_TOURS = gql`
  query GetAllTours {
    tours {
      id
      slug
      name
      summary
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

export function useTours() {
  const { data, loading, error } = useQuery(GET_ALL_TOURS);

  return { data, loading, error };
}
