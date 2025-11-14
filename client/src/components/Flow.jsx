import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import TextUpdaterNode from './TextUpdaterNode';
import SayCustomNode from './SayCustomNode';
import ConditionCustomNode from './ConditionCustomNode';
import ApiRequestNode from './ApiRequestNode';
import HangupCallNode from './HangupCallNode';
import CaptureDataNode from './CaptureDataNode';
import SendSmsNode from './SendSmsNode';
import OpenAiNode from './OpenAiNode';
import Sidebar from './Sidebar';
import { addNode, removeNode, resetNode, updateNodePosition } from './store/nodesSlice';
import { useRequest } from '../hooks/useRequest';
 
const rfStyle = {
  backgroundColor: '#B8CEFF',
};
 
// we define the nodeTypes outside of the component to prevent re-renderings
const nodeTypes = { 
  textUpdater: TextUpdaterNode,
  sayNode: SayCustomNode,
  conditionNode: ConditionCustomNode,
  apiRequestNode: ApiRequestNode,
  hangupCallNode: HangupCallNode,
  captureDataNode: CaptureDataNode,
  sendSmsNode: SendSmsNode,
  openAiNode: OpenAiNode
};
 
function Flow() {
  const nodes = useSelector(state => state.nodes.nodes);
  const dispatch = useDispatch();
  const [edges, setEdges] = useState([]);
  const querySearch=new URLSearchParams(window.location.search)
  const { data, loading, error, sendRequest } = useRequest();
  console.log(nodes,'nodes')
  const onNodesChange = useCallback(
    (changes) => {
      changes.forEach((change) => {
        if (change.type === 'position') {
          dispatch(updateNodePosition({
            id: change.id,
            position: change.position
          }));
        } else if (change.type === 'remove') {
          dispatch(removeNode(change.id));
        }
      });
    },
    [dispatch],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  // const handleAddNode = useCallback(() => {
  //   dispatch(addNode());
  // }, [dispatch]);


  
  
    useEffect(() => {
      sendRequest("/api/chat_flow/get_by_flow_id", "POST",{flowId:querySearch.get("flowid")});
    }, [sendRequest]);

    useEffect(() => {
      if(data){
        console.log(data,'dara')
        dispatch(resetNode(data?.nodes))
      }
    }, [data]);

  
 
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Sidebar onAddNode={(type) => dispatch(addNode(type))} />
      {/* <button 
        onClick={handleAddNode}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 4,
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        नया नोड जोड़ें
      </button> */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
        multiSelectionKeyCode="Shift"
        selectionKeyCode="Control"
        nodesDraggable={true}
        nodesConnectable={true}
        connectOnClick={false}
        elementsSelectable={true}
      > <Background />
      <Controls />
      </ReactFlow>
    </div>
  );
}
 
export default Flow;