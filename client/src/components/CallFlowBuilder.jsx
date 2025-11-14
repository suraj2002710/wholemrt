import React from 'react'
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CallFlowCard from "./CallFlowCard"
const CallFlowBuilder = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <div>
          <h1 className="text-2xl font-semibold text-blue-900">
            Call flow builder
          </h1>
          <p className="text-gray-500 text-sm">
            <span className="text-gray-600">Dashboard</span> &nbsp;•&nbsp;
            <span className="text-gray-700 font-medium">Call flow builder</span>
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
          {/* <FaPlus className="text-sm" /> */}
          <button
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
            onClick={() => navigate("/Flow")}
          >
            <FaPlus className="text-sm" />
            <span className="text-sm font-medium">Create Flow</span>
          </button>
        </button>
      </div>
      
      <CallFlowCard/>
    </div>
    </div>
  )
}

export default CallFlowBuilder