import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { removeNode } from './store/nodesSlice';

function HangupCallNode({ data, id }) {
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
      padding: '10px 20px',
      borderRadius: '8px',
      minWidth: '250px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <Handle type="target" position={Position.Top} />
      
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#FFF0F7',
        padding: '10px',
        borderRadius: '4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#e84393' }}>📞</span>
          <span style={{ color: '#e84393', fontWeight: 'bold' }}>Hangup Call</span>
        </div>
        <span 
          style={{ color: '#e74c3c', cursor: 'pointer' }}
          onClick={handleClose}
          className="nodrag"
        >
          ✕
        </span>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default HangupCallNode; 