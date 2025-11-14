import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { removeNode, updateNodeData } from './store/nodesSlice';
import { nanoid } from 'nanoid';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, id }) {
  const dispatch = useDispatch();
  const [addDigit,setAddDgit]=useState([{
                        "digit": "OTHER",
                        "id": nanoid()
                    }])
  const [enternumber,setEnterNumber]=useState(" ")
  const onChange = useCallback((evt) => {
    let {title,key}=evt.target
    console.log(evt.target.value,evt.target.key);
    dispatch(updateNodeData({value:evt.target.value,key:key || title,nodeId:id}))
  }, []);

  const handleRemove = useCallback(() => {
    dispatch(removeNode(id));
  }, [dispatch, id]);

  const handleClose = (e) => {
    e.stopPropagation();  // Prevent event bubbling
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
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#4a69bd' }}>🎧</span>
            <span style={{ color: '#4a69bd', fontWeight: 'bold' }}>Gather</span>
          </div>
          <span 
            style={{ color: '#e74c3c', cursor: 'pointer' }}
            onClick={handleClose}
            className="nodrag"
          >
            ✕
          </span>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#666'
          }}>
            Select language
          </label>
          <select
          title='local.language.language' 
          onChange={onChange}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '18px',
            border: '1px solid #ddd'
          }}>
            <option>English (US)</option>
            <option>English (US)</option>
            <option>English (US)</option>
            <option>English (US)</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#666'
          }}>
            Select voice model
          </label>
          <select 
          title='voice' 
          onChange={onChange}
           style={{
            width: '100%',
            padding: '12px',
            borderRadius: '18px',
            border: '1px solid #ddd'
          }}>
            <option>Salli</option>
            <option>Salli</option>
            <option>Salli</option>
            <option>Salli</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#666'
          }}>
            Say
          </label>
          <textarea
            title={'message'}
            placeholder="Welcome to the call press 1 for the menu..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '18px',
              border: '1px solid #ddd',
              minHeight: '100px'
            }}

            onChange={onChange}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            color: '#666'
          }}>
            Enter number key
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <input
            onChange={(e)=>setEnterNumber(e.target.value)}
              type="text"
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            <button onClick={()=>{
              let val=[...addDigit,{digit:enternumber,id:nanoid()}]
              setAddDgit(val)
              dispatch(updateNodeData({value:val,key:"digit",nodeId:id}))
            }} style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: 'white',
              cursor: 'pointer'
            }}>
              +
            </button>
          </div>
        </div>

        {/* <button style={{
          width: '100%',
          padding: '10px',
          background: '#f1f2f6',
          border: 'none',
          borderRadius: '4px',
          color: '#4a69bd',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Other
        </button> */}
        {addDigit && addDigit?.map((it)=>{
          
          return <button style={{
          width: '100%',
          padding: '10px',
          background: '#f1f2f6',
          border: 'none',
          borderRadius: '4px',
          color: '#4a69bd',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          {it?.digit}
        </button>
        })}
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </div>
  );
}

export default TextUpdaterNode;