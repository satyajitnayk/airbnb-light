'use client';

import { useRouter } from 'next/navigation';

import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null; // when user not logged in
}

const ListingCard: React.FunctionComponent<ListingCardProps> = ({
  data,
  actionId = '',
  actionLabel,
  currentUser,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();
  const { getByValues } = useCountries();

  const location = getByValues(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Prevents the event from propagating further in the DOM hierarchy

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, onAction, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        col-span-1 cursor-pointer group 
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
