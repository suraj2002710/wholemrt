import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaUser } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdPhoneAndroid } from "react-icons/md";
import CallFlowBuilder from "./CallFlowBuilder";
import DashboardHome from "./DashboardHome";
import { FiLogOut } from "react-icons/fi"
import setting from '../../public/calls_manager.svg'
import setting2 from '../../public/wifi.svg'
import { IoIosLogOut } from "react-icons/io"; 
import { FaRegMessage } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdPhoneCallback } from "react-icons/md";
  
const menuItems = [
  {
    category: "Useful",
    items: [
      {
        name: "Dashboard",
        icon: <IoMdCheckmarkCircle />,
        component: "DashboardContent",
      },
    ],
  },
  {
    category: "Voice",
    items: [
      { name: "Dialer", icon: <FaPhone />, component: "DialerContent" },
      {
        name: "Prepare Device",
        icon: <MdPhoneAndroid />,
        component: "PrepareDeviceContent",
      },
      {
        name: "Call Broadcast",
        icon: <FaPhone />,
        component: "CallBroadcastContent",
      },
    ],
  },
  {
    category: "Chat",
    items: [
      {
        name: "Messaging",
        icon: <FaEnvelope />,
        component: "MessagingContent",
      },
    ],
  },
  {
    category: "Productivity",
    items: [
      { name: "Phonebook ", icon: <FaUser />, component: "PhonebookContent" },
      {
        name: "Call Flow Builder",
        icon: <FaPhone />,
        component: "CallFlowBuilderContent",
      },
      {
        name: "Call Flow Captures",
        icon: <FaPhone />,
        component: "CallFlowCapturesContent",
      },
    ],
  },
  {
    category: "Agent Management",
    items: [
      {
        name: "Create Agent",
        icon: <FaUser />,
        component: "CreateAgentContent",
      },
      { name: "Call Force", icon: <FaPhone />, component: "CallForceContent" },
    ],
  },
];

const Sidebar = ({ onSelect }) => {
  return (
    <div className="w-64 bg-white shadow-lg p-4 h-screen overflow-y-auto">
      <div className="flex items-center mb-6">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <h2 className="text-xl font-bold  "  style={{color:'#456f97'}}>PhoneticAI </h2>
      </div>
      {menuItems.map((section) => (
        <div key={section.category}>
          <p className="text-gray-500 text-sm font-semibold mt-4 mb-2">
            {section.category}
          </p>
          {section.items.map((item) => (
            <button  key={item.name}  onClick={() => onSelect(item.component)}
              className="w-full flex items-center px-3 py-2 text-[#456f97] rounded-lg  text-left hover:bg-gray-200 hover:rounded-xl transition-all font-semibold  "
            >
              <span className="mr-2 text-gray-400 ">{item.icon}</span>{" "}
              {item.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] =
    useState("DashboardContent");

  const renderContent = () => {
    switch (selectedComponent) {
      case "DashboardContent":
        return (
          <h2 className="text-xl font-semibold ">
            <DashboardHome />
          </h2>
        );
      case "DialerContent":
        return <div className="bg-gray-50 min-h-screen p-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-2xl font-semibold text-blue-900">
          <span className=" ">👋</span>
          <h5 className="mb-0">Welcome back!</h5>
        </div>
  
        {/* Main Content */}
        <div className="  mt-6 p-6 rounded-lg  ">
              <FaPhone className="text-gray-800   mb-4" />
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <div>
                <h5 className="text font-semibold text-gray-800">Device Manager</h5>
                <h6 className="text-gray-500">Dashboard &gt; Device Manager</h6>
              </div>
            </div>
  
            {/* Right Section (Button) */}
            <button className="flex items-center gap-2 bg-[#2e4a62] rounded text-white px-4 py-2 rounded-md hover:bg-blue-600  ">
              <h6 className="mb-0">📱</h6> Select Device
            </button>
          </div>
  
          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 text-gray-600 p-4 rounded-md flex items-center gap-2">
            <span>ℹ️</span> Please select a device
          </div>
        </div>
      </div> ;
      case "PrepareDeviceContent":
        return (
          <div className="bg-gray-50 min-h-screen p-6">
          {/* Header */}
          <div className="flex items-center gap-2 text-2xl font-semibold text-blue-900">
            <span className=" ">👋</span>
            <h5 className="mb-0">Welcome back!</h5>
            <div>
               
            </div>
          </div>
    
          {/* Main Content */}
          <div className="  mt-6 p-6 rounded-lg  ">
             <img src={setting } className="w-20 mb-4"/>
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <div>
                  <h5 className="text font-semibold text-gray-800">Prepare Device
                  </h5>
                  <h6 className="text-gray-700">Dashboard &gt; Prepare Device</h6>
                </div>
              </div>
    
           
            </div>
    
            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 text-gray-600 p-4 rounded-md flex items-center gap-2">
              <span>ℹ️</span> Please select a device
            </div>
          </div>
        </div>
        );
      case "CallBroadcastContent":
        return (
          <> 
          <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-semibold flex items-center font-semibold text-blue-900 ">
          <span className="mr-2 font-semibold  ">👋</span> Welcome back!
        </h5>
        <div className="flex items-center space-x-4 text-gray-600 text-lg">
        <FaUser  className="mx-4"/>
        <IoIosLogOut />


        </div>
      </div>

      {/* Main Content */}
         <img src={setting2} className="w-20 my-4"/>
      <div className="mt-10 flex items-center justify-between">
       
        <div className="ml-4">
          <h5 className="text-2xl font-bold text-blue-700">Call Broadcast</h5>
          <p className="text-gray-500    ">
            Dashboard <span className="mx-1">-</span> Call Broadcast
          </p>
        </div>


        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow ">
          Set Campaign
        </button>
      </div>

      {/* Set Campaign Button */}
      <div className="mt-4 flex justify-end">
       
      </div>

      {/* Table */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left">
                {[
                  "Title",
                  "Campaign ID",
                  "Device name",
                  "Phonebook",
                  "Status",
                  "Schedule",
                  "Created at",
                  "Logs",
                  "Delete",
                ].map((header, index) => (
                  <th key={index} className="p-2 text-blue-700 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Sample Data</td>
                <td className="p-2 border">12345</td>
                <td className="p-2 border">Device A</td>
                <td className="p-2 border">Book 1</td>
                <td className="p-2 border">Active</td>
                <td className="p-2 border">10:00 AM</td>
                <td className="p-2 border">01-01-2024</td>
                <td className="p-2 border">View</td>
                <td className="p-2 border text-red-500 cursor-pointer">🗑</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
          </>
        );
      case "MessagingContent":
        return <>   

<div className="  min-h-screen p-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-2xl font-semibold text-blue-900">
          <span className=" ">👋</span>
          <h5 className="mb-0">Welcome back!</h5>
        </div>
  
        {/* Main Content */}
        <div className="  mt-6 p-6 rounded-lg  ">
              <FaRegMessage className="text-gray-800   mb-4 text-6xl" />
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <div>
                <h5 className="text font-semibold text-gray-800">Messaging</h5>
                <h6 className="text-gray-500">Dashboard &gt; Messaging</h6>
              </div>
            </div>
  
            {/* Right Section (Button) */}
            <button className="flex items-center gap-2 bg-[#2e4a62] rounded text-white px-4 py-2 rounded-md hover:bg-blue-600  ">
              <h6 className="mb-0">📱</h6> Select Device
            </button>
          </div>
  
          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 text-gray-600 p-4 rounded-md flex items-center gap-2">
            <span>ℹ️</span> Please select a device
          </div>
        </div>
      </div>
        </>
      case "PhonebookContent":
        return(
        <>
        {/* <h2 className="text-xl font-semibold">Phonebook Content</h2>; */}

        <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-semibold flex items-center" style={{color:'#5b5bf9'}}>
          <span className="mr-2">👋</span> Welcome back!
        </h4>
        <div className="flex items-center space-x-4 text-gray-600 text-lg">
        <FaUser  className="mx-4"/>
        <IoIosLogOut />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10 flex items-center">
        <div className="text-6xl">
          <i className="fas fa-address-book"></i>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-blue-700">Phonebook</h2>
          <p className="text-gray-500 text-sm">
            Dashboard <span className="mx-1">•</span> Phonebook
          </p>
        </div>
      </div>

      {/* Add Phonebook Button */}
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center">
          <i className="fas fa-plus mr-2"></i> Add Phonebook
        </button>
      </div>

      {/* Table */}
      <div className="mt-6   p-4 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left">
                {[
                  "",
                  "Name",
                  "Phonebook",
                  "Mobile",
                  "var1",
                  "var2",
                  "var3",
                  "var4",
                  "var5",
                  "createdAt",
                ].map((header, index) => (
                  <th key={index} className="p-2 text-blue-700 whitespace-nowrap">
                    {index === 0 ? (
                      <input type="checkbox" />
                    ) : (
                      header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border">John Doe</td>
                <td className="p-2 border">PB001</td>
                <td className="p-2 border">9876543210</td>
                <td className="p-2 border">Var1</td>
                <td className="p-2 border">Var2</td>
                <td className="p-2 border">Var3</td>
                <td className="p-2 border">Var4</td>
                <td className="p-2 border">Var5</td>
                <td className="p-2 border">01-01-2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Export & Delete */}
      <div className="mt-4 flex justify-end space-x-4">
        <button className="text-blue-700 flex items-center">
          <i className="fas fa-download mr-2"></i> Export
        </button>
        <button className="text-red-600">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
        </> 
        )
      case "CallFlowBuilderContent":
        return (
          <h2 className="text-xl font-semibold">
            <CallFlowBuilder />
          </h2>
        );
      case "CallFlowCapturesContent":
        return (

          <>
          {/* <h2 className="text-xl font-semibold  ">Call Flow Captures Content</h2> */}
          <div className="min-h-screen   p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-semibold flex items-center">
          <span className="mr-2">👋</span> Welcome back!
        </h4>

        
        <div className="flex items-center space-x-4 text-gray-600 text-lg">
          <FaUser/>
          <FiLogOut />
        </div>
      </div>
      <div>
        <CgNotes className="text-6xl my-4" />

        </div>
      {/* Main Content */}
      <div className="mt-10 flex items-center">
        <div className="text-6xl">
          <i className="fas fa-receipt"></i>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-blue-700">Call flow captures</h2>
          <p className="text-gray-500 text-sm">
            Dashboard <span className="mx-1">•</span> Call flow captures
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <div className="flex justify-end mb-2">
          <button className="text-blue-600 flex items-center">
            <i className="fas fa-download mr-2"></i> Export
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr className="border-b">
              <th className="p-3">Text</th>
              <th className="p-3">Recipient number</th>
              <th className="p-3">My number</th>
              <th className="p-3">Digit</th>
              <th className="p-3">createdAt</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty Row for UI */}
            <tr>
              <td className="p-3" colSpan="6">
                <div className="h-6 bg-gray-200 rounded"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
          </>
        );
      case "CreateAgentContent":
        return (
          <> 
          {/* <h2 className="text-xl font-semibold">Create Agent Content</h2> */}
          <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-semibold flex items-center">
          <span className="mr-2">👋</span> Welcome back!
        </h5>
        <div className="flex items-center space-x-4 text-gray-600 text-lg">
          <FaUser/>
          <FiLogOut/>
        </div>
      </div>

      <div>
      <MdOutlineSupportAgent className="text-6xl my-5 ms-4" />

      </div>

      {/* Main Content */}
      <div className="mt-10 flex items-center">
        <div className="text-6xl">
          <i className="fas fa-headset"></i>
        </div>
        <div className="ml-4">
          <h4 className="text-2xl font-bold text-blue-700">Create Agent</h4>
          <p className="text-gray-500 text-sm">
            Dashboard <span className="mx-1">•</span> Create Agent
          </p>
        </div>
      </div>

      {/* Add Agent Button */}
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center">
        <MdOutlineSupportAgent className=" me-2" />Add Agent
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr className="border-b">
              <th className="p-3">Auto login</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Comments</th>
              <th className="p-3">Is active</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
              <th className="p-3">Created at</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty Row for UI */}
            <tr>
              <td className="p-3" colSpan="9">
                <div className="h-6 bg-gray-200 rounded"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
          
</>
        )
      case "CallForceContent":
        return( 
        <>
        {/* <h4 className="text-xl font-semibold">Call Force Content</h4> */}
        <div className="min-h-screen   p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-semibold flex items-center">
          <span className="mr-2">👋</span> Welcome back!
        </h4>
        <div className="flex items-center space-x-4 text-gray-600 text-lg">
          <FaUser/>
          <FiLogOut/> 
        </div>
      </div>

      {/* Main Content */}

      <div>
      <MdPhoneCallback  className="my-4 text-6xl"/>
      </div>
      <div className="mt-10 flex items-center">
       

        
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-blue-700">Call Force</h2>
          <p className="text-gray-500 text-sm">
            Dashboard <span className="mx-1">•</span> Call Force
          </p>
        </div>
      </div>

      

      {/* Add Call Task Button */}
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center">
          <i className="fas fa-sync-alt mr-2"></i> Add Call Task
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-100 text-blue-700">
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Agent</th>
              <th className="py-2 px-4 text-left">Device</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">View</th>
              <th className="py-2 px-4 text-left">Delete</th>
              <th className="py-2 px-4 text-left">CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {/* Add rows dynamically here */}
            <tr className="border-b">
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">-</td>
              <td className="py-2 px-4">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
        </>

          
        )
      default:
        return <h2 className="text-xl font-semibold">Select an option</h2>;
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar onSelect={setSelectedComponent} />

        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto scrollbar-hide">
         
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
