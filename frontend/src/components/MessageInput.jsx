import { useRef, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { Image, Send, X, File, Mic } from "lucide-react"
import toast from "react-hot-toast"

const MessageInput = () => {
  const [text, setText] = useState("")
  const [filePreview, setFilePreview] = useState(null)
  const [fileType, setFileType] = useState("")
  const fileInputRef = useRef(null)
  const { sendMessage } = useChatStore()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    if (file.type.startsWith("image/")) {
      reader.onloadend = () => {
        setFilePreview(reader.result)
        setFileType("image")
      }
      reader.readAsDataURL(file)
    } else if (file.type.startsWith("audio/")) {
      reader.onloadend = () => {
        setFilePreview(reader.result)
        setFileType("audio")
      }
      reader.readAsDataURL(file)
    } else {
      reader.onloadend = () => {
        setFilePreview(reader.result)
        setFileType("document")
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = () => {
    setFilePreview(null)
    setFileType("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim() && !filePreview) return

    try {
      await sendMessage({
        text: text.trim(),
        image: fileType === "image" ? filePreview : null,
        document: fileType === "document" ? filePreview : null,
        audio: fileType === "audio" ? filePreview : null
      })

      setText("")
      setFilePreview(null)
      setFileType("")
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  return (
    <div className="p-4 w-full">
      {filePreview && fileType === "image" && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img src={filePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />
            <button onClick={removeFile} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center" type="button">
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {filePreview && fileType === "document" && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative flex items-center gap-2 p-2 rounded-md border border-zinc-700">
            <File className="text-zinc-500" />
            <span className="text-sm">Document selected</span>
            <button onClick={removeFile} className="ml-2 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center" type="button">
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {filePreview && fileType === "audio" && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative flex items-center gap-2 p-2 rounded-md border border-zinc-700">
            <Mic className="text-zinc-500" />
            <span className="text-sm">Voice message selected</span>
            <button onClick={removeFile} className="ml-2 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center" type="button">
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input type="text" className="w-full input input-bordered rounded-lg input-sm sm:input-md" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
          <input type="file" accept="image/*,application/pdf,audio/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <button type="button" className="hidden sm:flex btn btn-circle text-zinc-400" onClick={() => fileInputRef.current?.click()}>
            <Image size={20} />
          </button>
        </div>
        <button type="submit" className="btn btn-sm btn-circle" disabled={!text.trim() && !filePreview}>
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
