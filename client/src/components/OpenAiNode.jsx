import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { removeNode } from './store/nodesSlice';

function OpenAiNode({ data, id }) {
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
          background: '#4CAF50',
          padding: '10px',
          borderRadius: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'white' }}>👤</span>
            <span style={{ color: 'white', fontWeight: 'bold' }}>Open AI</span>
          </div>
          <span 
            style={{ color: 'white', cursor: 'pointer' }}
            onClick={handleClose}
            className="nodrag"
          >
            ✕
          </span>
        </div>

        {/* Setup Opening Message Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#666',
            fontSize: '16px',
            marginBottom: '15px'
          }}>
            Setup opening message
          </h3>

          {/* Language Selection */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#666'
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
              <option>English (US)</option>
              <option>English (US)</option>
              <option>English (US)</option>
            </select>
          </div>

          {/* Voice Model Selection */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#666'
            }}>
              Select voice model
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}>
              <option>Salli</option>
              <option>Salli</option>
              <option>Salli</option>
              <option>Salli</option>
              <option>Salli</option>
            </select>
          </div>

          {/* Opening Message */}
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Hello my name is Ai, How can i help you?"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '20px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        </div>

        {/* Setup AI Training Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000',
            fontSize: '16px',
            marginBottom: '15px'
          }}>
            Setup Ai training
          </h3>

          <div style={{ marginBottom: '15px' }}>
            <textarea
              placeholder="e.g. you are a helpful assistant"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                minHeight: '100px'
              }}
            />
          </div>

          {/* AI Model Selection */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#000'
            }}>
              Select ai model
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}>
              <option>gpt-3.5-turbo</option>
              <option>gpt-3.5-turbo</option>
              <option>gpt-3.5-turbo</option>
              <option>gpt-3.5-turbo</option>
              <option>gpt-3.5-turbo</option>
            </select>
          </div>

          {/* OpenAI Key */}
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="OpenAi Keys"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        </div>

        {/* Additional Settings */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#666' }}>Old number of messages history:</span>
            <span style={{ color: '#4a69bd', fontWeight: 'bold' }}>3</span>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#666' }}>Wait for words per sec</span>
            <span style={{ color: '#4a69bd', fontWeight: 'bold' }}>3</span>
          </div>
        </div>

        {/* Add AI Task Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          background: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#4a69bd' }}>❓</span>
            <span style={{ color: '#666' }}>Add ai task</span>
          </div>
          <div style={{
            width: '40px',
            height: '20px',
            backgroundColor: '#ddd',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '18px',
              height: '18px',
              backgroundColor: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '1px',
              left: '1px'
            }} />
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default OpenAiNode; 