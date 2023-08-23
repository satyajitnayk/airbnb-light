'use client';

import { useEffect } from 'react';
import EmptyState from './components/EmptyState';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FunctionComponent<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error); // Analytics suc as SENTRY could be used here
  }, [error]);

  return <EmptyState title="Uh Oh" subTitle="Something went wrong" />;
};

export default ErrorState;
