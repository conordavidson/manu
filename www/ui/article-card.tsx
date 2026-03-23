import Image from '@/ui/image';
import Link from 'next/link';

import * as Text from '@/ui/text';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type ArticleCardProps = {
  article: Types.Article;
};

const ArticleCard: React.FC<ArticleCardProps> = (props) => {
  const getMeta = () => {
    if (!props.article.author) return Utils.formatDate(props.article.publishedAt);
    return `${props.article.author.name} · ${Utils.formatDate(props.article.publishedAt)}`;
  };

  return (
    <Link
      className="@container border border-line rounded-lg p-4 grid grid-cols-12 gap-x-3 gap-y-3 hover:bg-surface transition-colors"
      href={`/articles/${props.article.slug.current}`}
    >
      {props.article.coverImage && (
        <div className="col-span-12 @xs:col-span-3 relative aspect-square rounded-md overflow-hidden">
          <Image className="h-full w-full object-cover" image={props.article.coverImage} />
        </div>
      )}
      <div className="col-span-9 flex flex-col justify-between gap-y-2">
        <div>
          <Text.Body className="text-muted leading-none!">{getMeta()}</Text.Body>
          <div className="mt-2.5">
            <Text.Subheading>{props.article.title}</Text.Subheading>
          </div>
        </div>
        <Text.Body bold className="text-primary">
          Read More
        </Text.Body>
      </div>
    </Link>
  );
};

export default ArticleCard;
