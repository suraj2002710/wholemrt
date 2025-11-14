import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { removeNode } from './store/nodesSlice';

function ConditionCustomNode({ data, id }) {
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
          background: '#FFF8F0',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#e67e22' }}>➡️</span>
            <span style={{ color: '#e67e22', fontWeight: 'bold' }}>Condition</span>
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
              Gather response can be passed from condition node
            </span>
          </div>
        </div>

        {/* Equal To Condition */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#000'
          }}>
            If response equal to:
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Not Equal To Condition */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#000'
          }}>
            If response not equal to:
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}
          />
        </div>
      </div>

      {/* Add two source handles for the two conditions */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="equal"
        style={{ left: '30%' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="not-equal"
        style={{ left: '70%' }}
      />
    </div>
  );
}

export default ConditionCustomNode; 