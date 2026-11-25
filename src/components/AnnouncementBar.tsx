import { BUSINESS } from '../data/business';

export default function AnnouncementBar() {
  return (
    <div className="bg-burgundy px-4 py-2 text-center text-xs font-medium tracking-wide text-gold sm:text-sm">
      {BUSINESS.announcement}
    </div>
  );
}
