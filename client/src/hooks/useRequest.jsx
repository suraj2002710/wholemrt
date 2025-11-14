import React, { useState, useCallback } from "react";

const API_BASE_URL = "https://app.phoneticai.cloud"; // Change to your API base URL

export function useRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJsRWt3YzZWblNlM3NLUnp5aE5jbkNqS1NORlZ5OGRDdyIsInJvbGUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkY1NDb2NPTGpLTnVCOTAzWElIRUUzLktiSkIxOEdTUEZuWUVzUFRLaklkcHBERE5IRU1XNkMiLCJlbWFpbCI6ImFtYW4zNjc3ODdAZ21haWwuY29tIiwiaWF0IjoxNzU3MTc2MDQxfQ.ohU03j6LS_mBhKQ-9fub0qAfG5aig6QB_ZNaCWrgsgg"
  
  const sendRequest = useCallback(
    async (endpoint, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`,
            ...headers,
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || "Something went wrong");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, sendRequest };
}
