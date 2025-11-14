import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoClose, IoChevronBack, IoSave } from "react-icons/io5";
import { useRequest } from "../hooks/useRequest";
import { useSelector } from "react-redux";
import { genrateRandomID } from "../utils/helper";
const nodeTypes = [
  {
    icon: "🎧",
    title: "Gather",
    bgColor: "#F8F9FE",
    textColor: "#4a69bd",
    type: "textUpdater",
  },
  {
    icon: "📢",
    title: "Say",
    bgColor: "#F0F8FF",
    textColor: "#4a69bd",
    type: "sayNode",
  },
  {
    icon: "➡️",
    title: "Condition",
    bgColor: "#FFF8F0",
    textColor: "#e67e22",
    type: "conditionNode",
  },
  {
    icon: "🔄",
    title: "Make API Request",
    bgColor: "#F0FFF4",
    textColor: "#27ae60",
    type: "apiRequestNode",
  },
  {
    icon: "📞",
    title: "Hangup Call",
    bgColor: "#FFF0F7",
    textColor: "#e84393",
    type: "hangupCallNode",
  },
  {
    icon: "🔒",
    title: "Capture Data",
    bgColor: "#E6F9F7",
    textColor: "#16a085",
    type: "captureDataNode",
  },
  {
    icon: "💬",
    title: "Send SMS",
    bgColor: "#F3E6FF",
    textColor: "#8e44ad",
    type: "sendSmsNode",
  },
  {
    icon: "👤",
    title: "Open AI",
    bgColor: "#E8F5E9",
    textColor: "#4CAF50",
    type: "openAiNode",
  },
];


const Sidebar = ({ onAddNode }) => {
  const nodes = useSelector(state => state.nodes.nodes);
  const { data, loading, error, sendRequest } = useRequest();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleAddNode = (nodeType) => {
    console.log(nodeType, "nodeType")
    onAddNode(nodeType.type);
    setIsOpen(false); // Close drawer after adding node
  };
  const [flowName, setFlowName] = useState("Untitled");

  const saveFlow = () => {
    let payload = {
      nodes: nodes,
      "flowId": genrateRandomID(),
      "edges": [],
      "title": "Untitled"
    }
    sendRequest("/api/chat_flow/add_new", "POST",payload);
  }
  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md w-[100%]">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <IoClose onClick={() => navigate(-1)} className="text-gray-600 text-xl cursor-pointer" />
          <h4 className="text-blue-700 font-semibold text-sm">Create Flow</h4>
        </div>

        {/* Input Section - Right Aligned */}
        <div className="flex items-center space-x-3 ml-auto">
          <input
            type="text"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            className="border-none focus:outline-none bg-transparent text-gray-700 text-lg"
          />
          {/* Right Section */}
          <IoSave className="text-green-500 text-xl cursor-pointer" onClick={saveFlow}/>
          <IoChevronBack onClick={() => setIsOpen(!isOpen)} className="text-blue-500 text-xl cursor-pointer" />
        </div>
      </div>




      {/* Drawer */}
      <div
        style={{
          position: "absolute",
          right: isOpen ? "0" : "-320px",
          top: "0",
          width: "300px",
          height: "100vh",
          background: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 5,
          transition: "right 0.3s ease",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "15px 20px",
            background: "#F8F9FE",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>🎧</span>
            <span style={{ fontWeight: "bold", color: "#4a69bd" }}>
              Select node
            </span>
          </div>
          <span
            onClick={() => setIsOpen(false)}
            style={{ cursor: "pointer", color: "#4a69bd" }}
          >
            ✕
          </span>
        </div>

        {/* Node Types */}
        <div style={{ padding: "10px" }}>
          {nodeTypes.map((node, index) => (
            <div
              key={index}
              onClick={() => handleAddNode(node)}
              style={{
                padding: "12px 15px",
                background: node.bgColor,
                borderRadius: "8px",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span>{node.icon}</span>
                <span style={{ color: node.textColor }}>{node.title}</span>
              </div>
              <span style={{ color: node.textColor }}>⊕</span>
            </div>
          ))}
        </div>

        {/* AI Section */}
        <div style={{ padding: "10px" }}>
          <div
            style={{
              padding: "15px",
              background: "linear-gradient(to right, #e66465, #9198e5)",
              borderRadius: "8px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>🎧</span>
              <span>Call transfer to AI</span>
            </div>
            <span>⌃</span>
          </div>

          <div
            style={{
              padding: "12px 15px",
              background: "#3CB371",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>👤</span>
              <span>Open AI</span>
            </div>
            <span>⊕</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
