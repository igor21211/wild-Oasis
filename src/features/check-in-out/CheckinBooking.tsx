import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import { useParams } from 'react-router-dom';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { bookingId } = useParams();
  const { checkin } = useCheckin();
  const moveBack = useMoveBack();

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.isPaid ?? false);
    }
  }, [booking]);

  if (!bookingId) return null;

  if (isLoading || !booking || isLoadingSettings) return <Spinner />;

  const { guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

  const breakfastPrice = settings?.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId: Number(bookingId),
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    } else {
      checkin({ bookingId: Number(bookingId) });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((s) => !s);
              setConfirmPaid(false);
            }}
            disabled={hasBreakfast}
          >
            Add breakfast for {numGuests} guests
            {breakfastPrice && ` (${formatCurrency(breakfastPrice)})`}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          onChange={() => setConfirmPaid((s) => !s)}
        >
          I confirm that {guests?.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + breakfastPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          size="small"
          variation={confirmPaid ? 'primary' : 'disabled'}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button size="small" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
