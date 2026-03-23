'use client';

import Link from 'next/link';

import * as NextNavigation from 'next/navigation';
import * as Page from '@/ui/page';
import * as Paths from '@/lib/paths';
import * as Text from '@/ui/text';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type NavigationProps = {
  globals: Types.Globals;
  projects: Types.Project[];
};

const Navigation: React.FC<NavigationProps> = (props) => {
  const pathname = NextNavigation.usePathname();

  return (
    <nav className="h-nav-height">
      <Page.Container className="h-full w-full flex justify-between items-center">
        <Link href={Paths.home}>
          <Text.Body className={Utils.cx('text-foreground hover:text-muted transition-colors')}>
            {props.globals.settings.title}
          </Text.Body>
        </Link>
        <div className="flex items-center gap-x-4">
          <NavLink href={Paths.Projects.index} pathname={pathname}>
            Index
          </NavLink>
          <NavLink href={Paths.info} pathname={pathname}>
            Info
          </NavLink>
        </div>
      </Page.Container>
    </nav>
  );
};

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
  pathname: string;
};

const NavLink: React.FC<NavLinkProps> = (props) => {
  return (
    <Link href={props.href}>
      <Text.Body
        className={Utils.cx({
          'text-foreground': props.pathname === props.href,
          'text-subdued hover:text-muted transition-colors': props.pathname !== props.href,
        })}
      >
        {props.children}
      </Text.Body>
    </Link>
  );
};

export default Navigation;
