import Image from '@/ui/image';
import Link from 'next/link';

import * as Text from '@/ui/text';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type EventCardProps = {
  event: Types.Event;
};

const EventCard: React.FC<EventCardProps> = (props) => {
  return (
    <Link
      className="@container border border-line rounded-lg p-4 grid grid-cols-12 gap-x-3 gap-y-3 hover:bg-surface transition-colors"
      href={`/events/${props.event.slug.current}`}
    >
      {props.event.coverImage && (
        <div className="col-span-12 @xs:col-span-3 relative aspect-square rounded-md overflow-hidden">
          <Image className="h-full w-full object-cover" image={props.event.coverImage} />
        </div>
      )}
      <div className="col-span-9 flex flex-col justify-between gap-y-2">
        <div>
          <Text.Subheading>{props.event.title}</Text.Subheading>
          <div>
            <Text.Body className="text-muted">
              {Utils.formatDateRange(props.event.startsAt, props.event.endsAt)}
            </Text.Body>
            <Text.Body className="text-muted">{props.event.location}</Text.Body>
          </div>
          <Text.Body className="mt-2 line-clamp-3">{props.event.description}</Text.Body>
        </div>
        <Text.Body bold className="text-primary">
          View Event
        </Text.Body>
      </div>
    </Link>
  );
};

export default EventCard;
