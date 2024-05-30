import React, { useState } from "react";
import axios from "axios";

const CreateProvince = () => {
  const [provinceName, setProvinceName] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://sharing-coffee-be-capstone-com.onrender.com/api/map/province?province=${provinceName}`
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={provinceName}
          onChange={(e) => setProvinceName(e.target.value)}
          placeholder="Enter province name"
        />
        <button type="submit">Tạo Tỉnh</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{JSON.stringify(response)}</p>
        </div>
      )}
    </div>
  );
};

export default CreateProvince;
