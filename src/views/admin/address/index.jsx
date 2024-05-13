import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateProvince from "./CreateProvince";
import CreateDistrict from "./CreateDistrict";

function YourComponent() {
  const [provinces, setProvinces] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    // Thay đổi URL_API bằng URL thực tế của API bạn muốn lấy dữ liệu từ
    const URL_API =
      "https://sharing-coffee-be-capstone-com.onrender.com/api/map/district";

    // Gửi yêu cầu GET để lấy danh sách quận từ API
    axios
      .get(URL_API)
      .then((response) => {
        // Tạo một đối tượng mới để lưu trữ thông tin về các tỉnh và quận
        const provinceData = {};

        // Lặp qua dữ liệu từ API và tổ chức nó theo tỉnh
        response.data.forEach((district) => {
          if (!provinceData[district.province]) {
            provinceData[district.province] = [];
          }
          provinceData[district.province].push(district);
        });

        // Lưu trữ dữ liệu vào state provinces
        setProvinces(provinceData);

        // Khởi tạo mảng expandedRows với số lượng phần tử bằng với số lượng tỉnh
        setExpandedRows(
          new Array(Object.keys(provinceData).length).fill(false)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Hàm này được gọi khi quận mới được tạo thành công, để cập nhật danh sách quận
  const handleDistrictCreated = () => {
    // Gửi yêu cầu GET mới để lấy danh sách quận từ API
    axios
      .get(
        "https://sharing-coffee-be-capstone-com.onrender.com/api/map/district"
      )
      .then((response) => {
        // Tạo một đối tượng mới để lưu trữ thông tin về các tỉnh và quận
        const provinceData = {};

        // Lặp qua dữ liệu từ API và tổ chức nó theo tỉnh
        response.data.forEach((district) => {
          if (!provinceData[district.province]) {
            provinceData[district.province] = [];
          }
          provinceData[district.province].push(district);
        });

        // Cập nhật danh sách quận trong state
        setProvinces(provinceData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleExpand = (index) => {
    const newRow = [...expandedRows];
    newRow[index] = !newRow[index];
    setExpandedRows(newRow);
  };

  const renderDistricts = (districts) => {
    return (
      <table>
        <thead>
          <tr>
            <th>District ID</th>
            <th>District</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((district) => (
            <tr key={district.district_id}>
              <td>{district.district_id}</td>
              <td>{district.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <CreateProvince />
      <CreateDistrict onDistrictCreated={handleDistrictCreated} />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Province</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(provinces).map((province, index) => (
            <React.Fragment key={province}>
              <tr>
                <td>{index + 1}</td>
                <td>{province}</td>
                <td>
                  <button onClick={() => handleExpand(index)}>
                    {expandedRows[index] ? "-" : "+"}
                  </button>
                </td>
              </tr>
              {expandedRows[index] && (
                <tr>
                  <td colSpan="3">{renderDistricts(provinces[province])}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default YourComponent;
