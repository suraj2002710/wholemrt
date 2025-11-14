import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { removeNode } from './store/nodesSlice';

function SendSmsNode({ data, id }) {
  const dispatch = useDispatch();
  const [charCount, setCharCount] = useState(0);

  const handleRemove = useCallback(() => {
    dispatch(removeNode(id));
  }, [dispatch, id]);

  const handleClose = (e) => {
    e.stopPropagation();
    handleRemove();
  };

  const handleTextChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      minWidth: '300px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <Handle type="target" position={Position.Top} />
      
      <div style={{ marginBottom: '20px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          background: '#F3E6FF',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#8e44ad' }}>💬</span>
            <span style={{ color: '#8e44ad', fontWeight: 'bold' }}>Send SMS</span>
          </div>
          <span 
            style={{ color: '#e74c3c', cursor: 'pointer' }}
            onClick={handleClose}
            className="nodrag"
          >
            ✕
          </span>
        </div>

        {/* Device Selection */}
        <div style={{ marginBottom: '15px' }}>
          <select
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              color: '#000'
            }}
          >
            <option value="">Select device</option>
            <option value="">Select device</option>
            <option value="">Select device</option>
            <option value="">Select device</option>
          </select>
        </div>

        {/* SMS Text Area */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#000',
          }}>
            SMS text
          </label>
          <textarea
            onChange={handleTextChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              minHeight: '120px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Character Count */}
        <div style={{
          color: '#000',
          fontSize: '0.9em',
          textAlign: 'right',
          marginRight:"10px"
        }}>
          Recommended characters are 320
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default SendSmsNode; 