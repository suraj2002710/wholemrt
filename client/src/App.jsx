import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "../src/components/store/store"; // Ensure the path is correct

// import FlowBuilder from "./pages/FlowBuilder";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CallFlowBuilder from "./components/CallFlowBuilder";
import Flow from "./components/Flow";

const App = () => {
  return (
    
      <Router>
        <div className="app-container">
          {/* <Sidebar /> */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/flow-builder" element={<CallFlowBuilder />} />
              <Route path="/flow" element={<Flow />} />
            </Routes>
          </div>
        </div>
      </Router>

  );
};

export default App; // ✅ Ensure this default export exists
