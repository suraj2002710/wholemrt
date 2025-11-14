import { useEffect, useState } from "react";
import { useRequest } from "../hooks/useRequest";
import { timeAgo } from "../utils/helper";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


export default function CallFlowCard() {
  let navigate=useNavigate()
  const [files, setFiles] = useState([
    { id: 1, title: "Untitled", time: "2 hours ago" },
    { id: 2, title: "Untitled", time: "2 hours ago" },
    { id: 3, title: "Untitled", time: "an hour ago" },
    { id: 4, title: "Untitled", time: "an hour ago" },
    { id: 5, title: "Untitled", time: "an hour ago" },
  ]);

  const handleDelete = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/flow?flowid=${id}`)
  };

    const { data, loading, error, sendRequest } = useRequest();

  useEffect(() => {
    sendRequest("/api/chat_flow/get_mine", "GET");
  }, [sendRequest]);

  if (loading) return <p className="text-blue-500">Loading chat flows...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

console.log(data,"data")
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-4">
        {data?.data?.map((file) => (
          <div
            key={file.id}
            className="flex justify-between items-center bg-white rounded-xl shadow-sm px-5 py-4 border border-gray-100 hover:shadow-md transition-all"
          >
            <div>
              <h2 className="text-lg font-semibold text-blue-900">{file.title}</h2>
              <p className="text-gray-500 text-sm">{timeAgo(file.createdAt)}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(file.flow_id)}
                className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={() => handleDelete(file.flow_id)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
