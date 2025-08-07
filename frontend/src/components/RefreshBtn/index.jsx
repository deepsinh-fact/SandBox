import React from "react";

export default function RefreshBtn({ handleRefresh, children }) {
  return handleRefresh ? (
    <div
      onClick={() => handleRefresh()}
      className="linear flex items-center justify-center rounded-lg border-[1px] border-green-500 bg-green-100/50 bg-none p-2
        text-base font-bold text-green-500
        transition duration-200 hover:cursor-pointer hover:bg-gray-100 hover:bg-none active:bg-none dark:bg-navy-700
         dark:text-white dark:hover:bg-green-100 dark:active:bg-white/10"
    >
      {children}
    </div>
  ) : (
    <div
      className="linear flex items-center justify-center rounded-lg border-[1px] border-green-500 bg-green-100/50 bg-none
        p-2 text-base font-bold
        text-green-500 transition duration-200 hover:bg-gray-100 hover:bg-none active:bg-none
         dark:bg-navy-700 dark:text-white dark:hover:bg-green-100 dark:active:bg-white/10"
    >
      {children}
    </div>
  );
}
