import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { BookingType } from '../bookings/types';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

const Stats = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings: BookingType[] | undefined;
  confirmedStays: BookingType[] | undefined;
  numDays: number | undefined;
  cabinCount: number | undefined;
}) => {
  const numBookings = bookings?.length || 0;
  const sales =
    bookings?.reduce((acc, booking) => acc + booking.totalPrice, 0) || 0;
  const checkins = confirmedStays?.length || 0;
  const occupancy =
    confirmedStays!.reduce((acc, booking) => acc + booking.numNights, 0) /
      (numDays! * cabinCount!) || 0;

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color="blue"
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color="green"
      />
      <Stat
        title="Check-ins"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
      />
      <Stat
        title="Occupancy"
        value={`${Math.round(occupancy * 100)}%`}
        icon={<HiOutlineChartBar />}
        color="yellow"
      />
    </>
  );
};

export default Stats;
