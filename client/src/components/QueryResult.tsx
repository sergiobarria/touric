import React, { ReactElement } from 'react';

import { ApolloError } from '@apollo/client';

import { LoadingSpinner } from '@/components/LoadingSpinner';

interface IQueryResultProps {
  loading: boolean;
  error: ApolloError | undefined;
  data: any;
  children: React.ReactNode;
}

/**
 * This component renders conditionally Apollo useQuery hooks states:
 * loading, error or it's children when data is ready
 */
export function QueryResult({
  loading,
  error,
  data,
  children,
}: IQueryResultProps) {
  if (loading) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return <h2>Something went wrong. Please try again later</h2>;
  }

  return children as ReactElement<any>;
}
