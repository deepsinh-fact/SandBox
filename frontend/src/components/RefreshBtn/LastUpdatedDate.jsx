import React from "react";
import moment from "moment";
import Service from "Service/Service";

export default function LastUpdatedDate({ date }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-1 text-center text-sm font-bold text-gray-500">
      Last Updated: {Service.DateFormet(date)}
    </div>
  );
}
