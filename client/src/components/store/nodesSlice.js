import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [
    {
      id: 'node-1',
      type: 'textUpdater',
      position: { x: 0, y: 0 },
      data: { value: 123 },
    },
  ]
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const newNode = {
        id: `node-${state.nodes.length + 1}`,
        type: action.payload || 'textUpdater',
        position: {
          x: state.nodes.length * 200,
          y: 0
        },
        data: {
          value: ""
        },
      };
      state.nodes.push(newNode);
    },
    removeNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
    },
    updateNodeData: (state, action) => {
      const { nodeId, key, value } = action.payload;

      // Helper to set deeply nested values using "a.b.c" style paths
      const setNestedValue = (obj, path, val) => {
        const keys = path.split(".");
        let current = obj;
        keys.forEach((k, index) => {
          if (index === keys.length - 1) {
            current[k] = val; // last key → set value
          } else {
            // ensure intermediate objects exist
            if (!current[k]) current[k] = {};
            current = current[k];
          }
        });
        return obj;
      };

      state.nodes = state.nodes.map((node) =>
        node.id === nodeId
          ? {
            ...node,
            data: setNestedValue({ ...node.data }, key, value),
          }
          : node
      );
    },

    updateNodePosition: (state, action) => {
      const { id, position } = action.payload;
      const node = state.nodes.find(n => n.id === id);
      if (node) {
        node.position = position;
      }
    },

    resetNode: (state, action) => {
      state.nodes=action.payload
    }
  }
});

export const { addNode, removeNode, updateNodePosition, updateNodeData,resetNode } = nodesSlice.actions;
export default nodesSlice.reducer; 