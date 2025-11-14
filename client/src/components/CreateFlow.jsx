import React, { useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLongArrowAltLeft, FaMicrophone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Add, Headset, Chat, Api, CallEnd, Sms } from "@mui/icons-material";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const nodeOptions = [
  { id: "gather", label: "Gather", icon: <Headset />, color: "#e3f2fd" },
  { id: "say", label: "Say", icon: <Chat />, color: "#bbdefb" },
  { id: "api", label: "Make API Request", icon: <Api />, color: "#c8e6c9" },
  { id: "hangup", label: "Hangup Call", icon: <CallEnd />, color: "#f8bbd0" },
  { id: "sms", label: "Send SMS", icon: <Sms />, color: "#e1bee7" },
];

export default function CreateFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ New Edge Connections
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  // ✅ Add New Node
  const addNode = (node) => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "default",
      data: { label: node.label, type: node.id },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // ✅ Remove Node Function
  const removeNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      {/* 🔹 Left Section - React Flow */}
      <div style={{ width: "100%", height: "100%", position: "relative", borderRight: "1px solid #ccc" }}>
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          {/* Back Arrow */}
          <FaLongArrowAltLeft className="text-xl cursor-pointer text-gray-700 hover:text-blue-600 transition" onClick={() => navigate(-1)} />

          {/* Select Node Button */}
          <Button color="primary" onClick={() => setDrawerOpen(true)}>
          <FaGreaterThan /><FaGreaterThan />
          </Button>
        </div>

        {/* ✅ React Flow Component */}
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}>
          <Background />
          <Controls />
        </ReactFlow>

        {/* 🔹 Forms for Nodes */}
        {nodes.map((node) => (
          <Paper key={node.id} style={{
            position: "absolute", left: node.position.x, top: node.position.y + 50,
            padding: 10, borderRadius: 5, boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}>
            <div className="flex justify-between items-center">
              <h4>{node.data.label} Form</h4>
              <IconButton size="small" onClick={() => removeNode(node.id)}>
                <IoClose className="text-red-500 text-xl" />
              </IconButton>
            </div>

            {/* Gather Form */}
            {node.data.type === "gather" && (
              <div className="bg-white shadow-lg border p-3 rounded-lg w-72">
                <label>Condition:</label>
                <TextField fullWidth size="small" placeholder="If response equals to:" />
                <TextField fullWidth size="small" placeholder="If response not equals to:" className="mt-2" />
              </div>
            )}

            {/* Say Form */}
            {node.data.type === "say" && (
              <div className="bg-white shadow-md rounded-lg w-80 p-4 border relative">
                <label>Select Language:</label>
                <Select fullWidth size="small" defaultValue="English (US)">
                  <MenuItem value="English (US)">English (US)</MenuItem>
                </Select>

                <label className="mt-2">Say:</label>
                <TextField fullWidth multiline rows={3} placeholder="Welcome to the call..." />

                <label className="mt-2">Enter number key:</label>
                <div className="flex items-center border px-2">
                  <input type="text" className="w-full py-2 px-2 outline-none" placeholder="Enter number key" />
                  <CiCirclePlus className="text-gray-500 text-2xl cursor-pointer" />
                </div>
              </div>
            )}

            {/* API Request Form */}
            {node.data.type === "api" && <TextField label="API Endpoint" fullWidth />}

            {/* Hangup Form */}
            {node.data.type === "hangup" && <p>Call will be disconnected.</p>}

            {/* SMS Form */}
            {node.data.type === "sms" && <TextField label="Enter SMS Text" fullWidth />}
          </Paper>
        ))}
      </div>

      {/* 🔹 Right Side - Drawer for Selecting Nodes */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          {nodeOptions.map((node) => (
            <ListItem
              button key={node.id}
              onClick={() => { addNode(node); setDrawerOpen(false); }}
              style={{ backgroundColor: node.color, margin: 5, borderRadius: 5 }}
            >
              <ListItemIcon>{node.icon}</ListItemIcon>
              <ListItemText primary={node.label} />
              <CiCirclePlus className="bg-blue-200 text-black w-10 h-10 rounded-full p-2" />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
