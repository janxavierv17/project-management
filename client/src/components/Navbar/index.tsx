import { setIsDarkMode, setIsSidebarCollapsed } from '@/redux/state';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed, isDarkMode } = useAppSelector((state) => state.global);
  const showButton = isSidebarCollapsed ? (
    <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
      <Menu className="h-8 w-8 dark:text-white" />
    </button>
  ) : null;

  const iconClassName = 'h-6 w-6 cursor-pointer';
  const showIcon = isDarkMode ? (
    <Sun className={iconClassName} />
  ) : (
    <Moon className={iconClassName} />
  );

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Search bar */}
      <div className="flex items-center gap-8">
        {showButton}
        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          />
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={`h-min w-min rounded p-2 ${isDarkMode ? `dark:hover:bg-gray-700` : `hover:bg-gray-100`}`}
        >
          {showIcon}
        </button>
        <Link href="settings" className="h-min w-min rounded p-2 hover:bg-gray-100">
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
}
