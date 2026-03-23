import Image from '@/ui/image';

import * as Page from '@/ui/page';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type SplitPaneProps = {
  section: Types.SplitPaneSection;
};

const SplitPane: React.FC<SplitPaneProps> = (props) => {
  return (
    <section className="split-pane border-y border-line" id={props.section._key}>
      <Page.Container className="grid grid-cols-2">
        <Pane {...props.section.firstPane} index={0} />
        <Pane {...props.section.secondPane} index={1} />
      </Page.Container>
    </section>
  );
};

type PaneProps = {
  eyebrow?: string;
  heading: string;
  image: Types.SplitPaneSection['firstPane']['image'];
  index: number;
};

const Pane: React.FC<PaneProps> = (props) => {
  return (
    <div
      className={Utils.cx('col-span-2 sm:col-span-1 py-12', {
        'sm:border-r sm:border-line sm:pr-8 pb-0 sm:pb-12': props.index === 0,
        'sm:pl-8': props.index === 1,
      })}
    >
      <div className="relative aspect-4/3">
        <Image className="h-full w-full object-cover" image={props.image} />
      </div>
      <div className="mt-8">
        {props.eyebrow && <Text.Detail className="mb-2 text-muted">{props.eyebrow}</Text.Detail>}
        <Text.Heading>{props.heading}</Text.Heading>
      </div>
    </div>
  );
};

export default SplitPane;
