import React, { useState } from "react";
import axios from "axios";
import SelectProvince from "./SelectProvince";

function CreateDistrict({ onDistrictCreated }) {
  const [provinceId, setProvinceId] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // Thực hiện yêu cầu POST đến API để tạo quận mới
      const response = await axios.post(
        `https://sharing-coffee-be-capstone-com.onrender.com/api/map/district?province_id=${provinceId}&district=${districtName}`
      );

      setSuccessMessage(response.data.message);
      setDistrictName("");
      // Sau khi tạo quận mới thành công, gọi hàm onDistrictCreated để cập nhật danh sách quận
      if (typeof onDistrictCreated === "function") {
        onDistrictCreated();
      }
    } catch (error) {
      setError("Đã xảy ra lỗi khi tạo quận mới.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Tạo Quận Mới</h2>
      <form onSubmit={handleSubmit}>
        <SelectProvince onSelect={setProvinceId} />
        <label>
          Tên quận:
          <input
            type="text"
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
            placeholder="Nhập tên quận"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo Quận"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default CreateDistrict;
