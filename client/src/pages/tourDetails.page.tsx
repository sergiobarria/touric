import React from 'react';

import { useLocation } from 'react-router-dom';

import { QueryResult } from '@/components/QueryResult';
import { useTour } from '@/hooks/useTour';

interface IStateType {
  id: string;
}

export function TourDetailsPage() {
  const location = useLocation();
  const { id } = location.state as IStateType;

  const { data, loading, error } = useTour(id);

  return (
    <div>
      <QueryResult error={error} loading={loading} data={data}>
        <div>details page</div>
      </QueryResult>
    </div>
  );
}
