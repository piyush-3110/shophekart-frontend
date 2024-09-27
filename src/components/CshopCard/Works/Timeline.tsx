import React from "react";

const Timeline = () => {
  const timelineItems = [
    {
      title: "Item One",
      description: "This is the first item on the timeline.",
      date: "January 1, 2024",
    },
    {
      title: "Item Two",
      description: "This is the second item on the timeline.",
      date: "February 1, 2024",
    },
    {
      title: "Item Three",
      description: "This is the third item on the timeline.",
      date: "March 1, 2024",
    },
    {
      title: "Item Four",
      description: "This is the fourth item on the timeline.",
      date: "April 1, 2024",
    },
    {
      title: "Item Five",
      description: "This is the fifth item on the timeline.",
      date: "May 1, 2024",
    },
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* Central Line */}
      <div className="absolute w-1 bg-gray-300 h-full left-1/2 transform -translate-x-1/2"></div>

      {timelineItems.map((item, index) => (
        <div
          key={index}
          className={`mb-8 w-full flex justify-${
            index % 2 === 0 ? "start" : "end"
          } items-center`}
        >
          {/* Connector */}
          <div className="flex items-center justify-center w-full">
            <div
              className={`${
                index % 2 === 0 ? "pr-[13rem]" : "pl-8"
              } relative w-1/2`}
            >
              {/* Item Content */}
              <div
                className={`p-4 bg-white rounded-lg shadow-lg border dark:bg-gray-800 dark:text-white w-80 ${
                  index % 2 === 0 ? "text-left" : "text-right"
                }`}
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <time className="text-sm text-gray-500">{item.date}</time>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          </div>

          {/* Icon Circle */}
          <div className="absolute flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg border-4 border-white left-1/2 transform -translate-x-1/2">
            {/* Your SVG Icon */}
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
