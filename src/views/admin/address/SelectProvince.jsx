import React, { useState, useEffect } from "react";
import axios from "axios";

function SelectProvince({ onSelect }) {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://sharing-coffee-be-capstone-com.onrender.com/api/map/province"
      )
      .then((response) => {
        setProvinces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Đã xảy ra lỗi khi tải danh sách tỉnh.");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <label>Chọn tỉnh:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Chọn tỉnh</option>
        {provinces.map((province) => (
          <option key={province.province_id} value={province.province_id}>
            {province.province}
          </option>
        ))}
      </select>
      {loading && <p>Đang tải danh sách tỉnh...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default SelectProvince;
