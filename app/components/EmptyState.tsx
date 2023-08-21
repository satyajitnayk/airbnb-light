'use client'; // since we are using hooks

import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FunctionComponent<EmptyStateProps> = ({
  title = 'No Exact matches',
  subTitle = 'Try changing or removing some of your filters',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
    >
      <Heading center title={title} subTitle={subTitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
