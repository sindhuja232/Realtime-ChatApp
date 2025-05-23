import { useState } from "react";
import { useSendMessage } from "../../hooks/useSendMessage";
import { IoSend } from "react-icons/io5";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [voice, setVoice] = useState(null);
  const { sendMessage } = useSendMessage();

  const handleFileChange = async (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await convertToBase64(file);
    setter(base64);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image && !document && !voice) return;

    await sendMessage({
      text,
      image,
      document,
      voice,
    });

    setText("");
    setImage(null);
    setDocument(null);
    setVoice(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 p-2 border-t">
      <div className="flex gap-1 items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 border rounded p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="text-xl text-blue-500">
          <IoSend />
        </button>
      </div>
      <div className="flex gap-3 text-sm items-center">
        <label className="cursor-pointer">
          📷
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, setImage)}
          />
        </label>
        <label className="cursor-pointer">
          📄
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => handleFileChange(e, setDocument)}
          />
        </label>
        <label className="cursor-pointer">
          🎤
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, setVoice)}
          />
        </label>
      </div>
    </form>
  );
};

export default ChatInput;
