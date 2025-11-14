// import React from 'react'

// const FlowSidebar = () => {
//     const [selectedNode, setSelectedNode] = useState(null);
//     const nodes = [
//         { id: 1, name: "Gather", color: "bg-blue-100", icon: "📞" },
//         { id: 2, name: "Say", color: "bg-blue-200", icon: "🔊" },
//         { id: 3, name: "Condition", color: "bg-orange-200", icon: "➡️" },
//         { id: 4, name: "Make API Request", color: "bg-green-200", icon: "🔗" },
//         { id: 5, name: "Hangup Call", color: "bg-pink-200", icon: "📴" },
//         { id: 6, name: "Capture Data", color: "bg-cyan-200", icon: "📊" },
//         { id: 7, name: "Send SMS", color: "bg-purple-200", icon: "✉️" },
//       ];
//   return (
//      <div className="flex h-screen bg-gray-100">
//     {/* Left Side - Flow Area */}
//     <div className="flex-1 p-4 relative">
//       <h2 className="text-lg font-semibold">Create Flow</h2>
//       <div className="bg-white shadow-lg rounded-lg p-4 mt-4 w-60">
//         <div className="flex items-center gap-2 text-blue-600">
//           <FiPhoneCall />
//           <span>On call</span>
//         </div>
//         <div className="mt-2">
//           <div className="flex items-center gap-2 text-gray-700">
//             <FiInfo />
//             <span>{{ "recipient_number" }}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-700 mt-1">
//             <FiInfo />
//             <span>{{ "my_number" }}</span>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Right Side - Nodes List */}
//     <div className="w-80 bg-white p-4 shadow-xl overflow-y-auto">
//       <h3 className="text-lg font-semibold mb-4">Select Node</h3>
//       {nodes.map((node) => (
//         <div
//           key={node.id}
//           className={`p-2 mb-2 rounded-lg cursor-pointer flex items-center justify-between ${node.color} hover:shadow-md transition`}
//           onClick={() => setSelectedNode(node)}
//         >
//           <span>{node.icon} {node.name}</span>
//           <FaPlus className="text-gray-600" />
//         </div>
//       ))}
//     </div>

//     {/* Right Panel - Selected Node Info */}
//     {selectedNode && (
//       <div className="absolute top-0 right-0 w-80 bg-gray-50 p-4 shadow-lg h-full">
//         <h3 className="text-lg font-semibold mb-2">{selectedNode.name}</h3>
//         <p>Details of {selectedNode.name} node...</p>
//         <Button className="mt-4" onClick={() => setSelectedNode(null)}>Close</Button>
//       </div>
//     )}
//   </div>
//   )
// }

// export default FlowSidebar