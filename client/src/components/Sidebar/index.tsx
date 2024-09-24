'use client';
import { useState } from 'react';
import {
  LockIcon,
  LucideIcon,
  Home,
  X,
  Briefcase,
  Search,
  Settings,
  User,
  Users,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Layers3,
} from 'lucide-react';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';
import Link from 'next/link';
import { setIsSidebarCollapsed } from '@/redux/state';

const mainNavLinks = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Briefcase, label: 'Timeline', href: '/timeline' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: User, label: 'User', href: '/users' },
  { icon: Users, label: 'Team', href: '/team' },
];

const priorityNavLinks = [
  { icon: AlertCircle, label: 'Urgent', href: '/priority/urgent' },
  { icon: ShieldAlert, label: 'High', href: '/priority/high' },
  { icon: AlertTriangle, label: 'Medium', href: '/priority/medium' },
  { icon: AlertOctagon, label: 'Low', href: '/priority/low' },
  { icon: Layers3, label: 'Backlog', href: '/priority/users' },
];

interface ISidebarLink {
  href: string;
  icon: LucideIcon;
  label: string;
}

function SidebarLink({ href, icon: Icon, label }: ISidebarLink) {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 text-white dark:bg-gray-600' : ''} justify-start px-8 py-3`}
      >
        {isActive && <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200"></div>}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>{label}</span>
      </div>
    </Link>
  );
}

export function Sidebar() {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const dispatch = useAppDispatch();
  const { isSidebarCollapsed } = useAppSelector((state) => state.global);

  const showButton = isSidebarCollapsed ? null : (
    <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))} className="py-3">
      <X className="h-6 w-6 text-gray-600 hover:text-gray-500 dark:text-white" />
    </button>
  );
  const showProjectsChevron = showProjects ? (
    <ChevronUp className="h-5 w-5" />
  ) : (
    <ChevronDown className="h-5 w-5" />
  );

  const showPrioritiesChevron = showPriority ? (
    <ChevronUp className="h-5 w-5" />
  ) : (
    <ChevronDown className="h-5 w-5" />
  );
  const mainLinks = mainNavLinks.map(({ href, label, icon }) => (
    <div key={label}>
      <SidebarLink href={href} label={label} icon={icon} />
    </div>
  ));
  const priorityLinks = priorityNavLinks.map(({ href, label, icon }) => (
    <div key={label}>
      <SidebarLink href={href} label={label} icon={icon} />
    </div>
  ));

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
  transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? 'w-0 hidden' : 'w-64'}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">JXV LIST</div>
          {showButton}
        </div>
        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">JXV TEAM</h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">{mainLinks}</nav>

        {/* PROJECT LIST */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjectsChevron}
        </button>

        {/* PRIORITY LIST */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPrioritiesChevron}
        </button>
        {showPriority && <>{priorityLinks}</>}
      </div>
    </div>
  );
}
