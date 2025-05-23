import React from "react";
import useAuth from "../../hooks/useAuth";

const MessageItem = ({ message }) => {
  const { authUser } = useAuth();
  const fromMe = message.senderId === authUser._id;
  const bubbleClasses = fromMe
    ? "bg-blue-500 text-white ml-auto"
    : "bg-gray-200 text-black";

  return (
    <div className={`max-w-[80%] p-2 rounded-xl shadow ${bubbleClasses} mb-2`}>
      {message.text && <div>{message.text}</div>}

      {message.image && (
        <img
          src={message.image}
          alt="Image"
          className="mt-2 rounded-lg max-w-[250px]"
        />
      )}

      {message.document && (
        <a
          href={message.document}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline break-all block mt-2"
        >
          📄 View Document
        </a>
      )}

      {message.voice && (
        <audio controls className="mt-2 w-full">
          <source src={message.voice} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default MessageItem;
