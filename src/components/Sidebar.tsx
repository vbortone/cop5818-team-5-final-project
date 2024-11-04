import { HomeIcon, UsersIcon } from "@heroicons/react/outline";

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold flex items-center border-b border-gray-800">
        Dashboard
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          <li className="p-4 flex items-center gap-2 hover:bg-gray-800 cursor-pointer">
            <HomeIcon className="w-5 h-5" />
            <span>Allocation</span>
          </li>
          <li className="p-4 flex items-center gap-2 hover:bg-gray-800 cursor-pointer">
            <UsersIcon className="w-5 h-5" />
            <span>Education</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
