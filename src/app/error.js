'use client';

const { default: EmptyState } = require('@/components/empty-state');
const { useEffect } = require('react');

const ErrorState = ({ error }) => {
  useEffect(() => {
    console.error('Error');
  }, [error]);

  return (
    <EmptyState
      title="Oh no!"
      description="Something went wrong. Please try again later."
    />
  );
};

export default ErrorState;
