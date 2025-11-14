import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { removeNode } from './store/nodesSlice';

function SayCustomNode({ data, id }) {
  const dispatch = useDispatch();

  const handleRemove = useCallback(() => {
    dispatch(removeNode(id));
  }, [dispatch, id]);

  const handleClose = (e) => {
    e.stopPropagation();
    handleRemove();
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      minWidth: '100px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <Handle type="target" position={Position.Top} />
      
      <div className='w-80' style={{ marginBottom: '20px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          background: '#F0F8FF',
          padding: '10px',
          width:"100%",
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#4a69bd' }}>📢</span>
            <span style={{ color: '#4a69bd', fontWeight: 'bold' }}>Say</span>
          </div>
          <span 
            style={{ color: '#e74c3c', cursor: 'pointer' }}
            onClick={handleClose}
            className="nodrag"
          >
            ✕
          </span>
        </div>

        {/* Info Box */}
        <div style={{
          background: '#F0F8FF',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#4a69bd' }}>ℹ️</span>
            <span style={{ color: '#000' }}>
              This node is used to utilize dynamic variables. Please add this node to make use of dynamic variables.
            </span>
          </div>
        </div>

        {/* Language Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#000'
          }}>
            Select language
          </label>
          <select style={{
            width: '100%',
            padding: '8px',
            borderRadius: '20px',
            border: '1px solid #ddd'
          }}>
            <option>English (US)</option>
            <option>India</option>
            <option>USA</option>
            <option>india</option>
          </select> 
        </div>

        {/* Voice Model Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#000'
          }}>
            Select voice model
          </label>
          <select style={{
            width: '100%',
            padding: '18px',
            borderRadius: '20px',
            border: '1px solid #ddd'
          }}>
            <option>Salli</option>
            <option>Salli</option>
            <option>Salli</option>
            <option>Salli</option>
          </select>
        </div>

        {/* Say Text Area */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#000'
          }}>
            Say
          </label>
          <textarea
            placeholder="Welcome to the call press 1 for the menu..."
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minHeight: '100px'
            }}
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default SayCustomNode; 