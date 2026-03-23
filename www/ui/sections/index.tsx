import CenteredImage from './centered-image';
import FullWidthImage from './full-width-image';
import SplitPane from './split-pane';
import TextImage from './text-image';
import UpcomingEvents from './upcoming-events';

import * as Types from '@/lib/types';

type SectionsProps = {
  sections: NonNullable<Types.Sanity.GET_PAGE_BY_SLUG_QUERY_RESULT>['sections'];
};

const Sections: React.FC<SectionsProps> = (props) => {
  return (
    <div className="space-y-24">
      {props.sections.map((section) => {
        if (section._type === 'centeredImage') {
          return <CenteredImage key={section._key} section={section} />;
        }
        if (section._type === 'fullWidthImage') {
          return <FullWidthImage key={section._key} section={section} />;
        }
        if (section._type === 'splitPane') {
          return <SplitPane key={section._key} section={section} />;
        }
        if (section._type === 'textImage') {
          return <TextImage key={section._key} section={section} />;
        }
        if (section._type === 'upcomingEvents') {
          return <UpcomingEvents key={section._key} section={section} />;
        }
        // @ts-expect-error - Throw on unknown section type
        throw new Error(`Unknown section type: ${section._type as string}`);
      })}
    </div>
  );
};

export default Sections;
