import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { removeNode } from './store/nodesSlice';

function ApiRequestNode({ data, id }) {
  const dispatch = useDispatch();
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);

  const handleRemove = useCallback(() => {
    dispatch(removeNode(id));
  }, [dispatch, id]);

  const handleClose = (e) => {
    e.stopPropagation();
    handleRemove();
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      minWidth: '400px',
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
          background: '#F0FFF4',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#27ae60' }}>🔄</span>
            <span style={{ color: '#27ae60', fontWeight: 'bold' }}>Make API Request</span>
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
            <span style={{ color: '#666' }}>
              You can use the API response in next target connected node like {'{'}{'{'}{'{'}order{'}'}{'}'}{'}'} etc..
            </span>
          </div>
        </div>

        {/* HTTP Method Selection */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '20px'
        }}>
          {['GET', 'POST', 'PUT', 'DELETE'].map((methodType) => (
            <button
              key={methodType}
              onClick={() => setMethod(methodType)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                background: method === methodType ? '#F0FFF4' : 'white',
                color: method === methodType ? '#27ae60' : '#666',
                cursor: 'pointer',
                fontWeight: method === methodType ? 'bold' : 'normal'
              }}
            >
              {methodType}
            </button>
          ))}
        </div>

        {/* API URL Input */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="https://api.some.com"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Headers Section */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '10px',
            color: '#666'
          }}>
            Add headers (optional)
          </label>
          
          {headers.map((header, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '10px',
              marginBottom: '10px' 
            }}>
              <input
                placeholder="Content-Type"
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <input
                placeholder="application/json"
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
          ))}

          <button
            onClick={addHeader}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: '#F0FFF4',
              color: '#27ae60',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Add
          </button>
        </div>

        {/* Try API Button */}
        <button
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            background: '#27ae60',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Try This API
        </button>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ApiRequestNode; 