import EventCard from '@/ui/event-card';

import * as Button from '@/ui/button';
import * as Page from '@/ui/page';
import * as Sanity from '@/lib/sanity';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';

type UpcomingEventsProps = {
  section: Types.UpcomingEventsSection;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = async (props) => {
  const events = await Sanity.Events.upcoming();
  const soonestEvents = events.slice(0, 3);

  return (
    <section className="upcoming-events" id={props.section._key}>
      <Page.Container>
        <div className="max-w-[400px] mx-auto mb-8 text-center">
          <Text.Heading>{props.section.heading}</Text.Heading>
        </div>

        {soonestEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {soonestEvents.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </div>
        )}

        {soonestEvents.length === 0 && (
          <div className="text-center">
            <Text.Body>No upcoming events</Text.Body>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button.Primary href="/events" inline>
            {props.section.ctaOverride || 'View Full Calendar'}
          </Button.Primary>
        </div>
      </Page.Container>
    </section>
  );
};

export default UpcomingEvents;
