import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { removeNode } from './store/nodesSlice';

function CaptureDataNode({ data, id }) {
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
          background: '#E6F9F7',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#16a085' }}>🔒</span>
            <span style={{ color: '#16a085', fontWeight: 'bold' }}>Capture Data</span>
          </div>
          <span 
            style={{ color: '#e74c3c', cursor: 'pointer' }}
            onClick={handleClose}
            className="nodrag"
          >
            ✕
          </span>
        </div>

        {/* Capture Text Area */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#666'
          }}>
            Capture text
          </label>
          <textarea
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minHeight: '120px',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CaptureDataNode; 