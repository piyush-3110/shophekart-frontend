import React from "react";

interface SidebarProps {
  chats: { [key: string]: { id: string; sender: string; content: string }[] };
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  className?: string; // Adding the className prop to pass custom classes
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  selectedChat,
  onSelectChat,
  className,
}) => {
  return (
    <div
      className={`bg-white m-4 rounded-xl text-black border border-[#D7DDE7] p-4 ${className}`} // Apply custom className passed as a prop
    >
      <h2 className="text-lg font-bold mb-4">Messages</h2>
      {Object.keys(chats).map((chatId) => (
        <div
          key={chatId}
          className={`p-2 mb-2 rounded cursor-pointer ${
            selectedChat === chatId ? "#f6f9fe shadow-md" : ""
          }`}
          onClick={() => onSelectChat(chatId)}
        >
          <div className="relative">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <h3 className="text-sm font-semibold">Chat {chatId}</h3>
                <p className="text-xs text-gray-400 truncate max-w-[12rem]">
                  {chats[chatId][chats[chatId].length - 1]?.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
