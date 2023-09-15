'use client';

import { useRouter } from 'next/navigation';
import Heading from './heading';
import Button from './button';

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing a filter.',
  showReset,
}) => {
  const router = useRouter();
  return (
    <div
      className="
        h-[60vh]
      flex
   flex-col items-center justify-center gap-2"
    >
      <Heading title={title} subtitle={subtitle} center />
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
