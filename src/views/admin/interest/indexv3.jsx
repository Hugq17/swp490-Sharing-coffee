import React, { useState, useEffect } from "react";
import axios from "axios";
import InterestV4 from "./indexv4";
import { LuUpload } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [data, setData] = useState([]);
  const [itemsWithNullParentId, setItemsWithNullParentId] = useState([]);
  const [itemsWithNonNullParentId, setItemsWithNonNullParentId] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [image, setImage] = useState(""); //xử lý hình ảnh
  const [loading, setLoading] = useState(false); //xử lý hình ảnh
  const [nameParent, setNameParent] = useState("");
  const [showInput, setShowInput] = useState({}); // Trạng thái hiển thị input
  const [childName, setChildName] = useState("");
  //---------------------------------------------Danh sach thong bao---------------------------------------//
  const notifySuccess = () => toast("Thêm chủ đề thành công");
  const notifyFail = () => toast("Thêm chủ đề thất bại");
  const notifyEmpty = () => toast("Vui lòng điền đủ thông tin");
  //--------------------------------------------Thêm một parent interest-----------------------------------//

  const handleSubmit = async () => {
    // Kiểm tra nếu nameParent hoặc image là null
    if (!nameParent || !image) {
      // Hiển thị thông báo sử dụng react-toastify
      notifyEmpty();
      return; // Dừng xử lý hàm
    }

    // Tiếp tục xử lý nếu nameParent và image không null
    const formData = new FormData();
    formData.append("name", nameParent);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://sharing-coffee-be-capstone-com.onrender.com/api/interest",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("New data:", response.data);
      setData((prevData) => [...prevData, response.data]);

      // Đặt lại nameParent và image thành null sau khi tạo thành công
      setNameParent("");
      setSelectedFile("");

      console.log("Image after posting: " + image);
      if (response.status === 201){
        notifyFail()
      } else {
        console.error("Failed to add topic");
        notifySuccess();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNameChange = (event) => {
    setNameParent(event.target.value);
  };
  //-------------------------------------------------xử lý hình ảnh--------------------------------------//
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dating");
    setLoading(true);
    const res = await fetch(
      "http://api.cloudinary.com/v1_1/durpvwfnl/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
    console.log(file.secure_url);
    setSelectedFile(e.target.files[0]);
  };

  //---------------------------------------------------------------------------------------------------------//
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sharing-coffee-be-capstone-com.onrender.com/api/interest"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter items with null parent_interest_id
    const itemsNullParentId = data.filter(
      (item) => item.parent_interest_id === null
    );
    setItemsWithNullParentId(itemsNullParentId);

    // Filter items with non-null parent_interest_id
    const itemsNonNullParentId = data.filter(
      (item) => item.parent_interest_id !== null
    );
    setItemsWithNonNullParentId(itemsNonNullParentId);
  }, [data]);

  const toggleItem = (interestId) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [interestId]: !prevState[interestId],
    }));
  };
//---------------------------------------------Thêm chủ đề con--------------------------------------------------------------//
  const addChildInterest = async (childName, parentId) => {
    try {
      const response = await axios.post(
        "https://sharing-coffee-be-capstone-com.onrender.com/api/interest",
        {
          name: childName,
          parent_interest_id: parentId,
        }
      );
      console.log("Child interest added:", response.data);

      // Cập nhật danh sách dữ liệu với phần tử mới
      const newItem = response.data;
      setData((prevData) => [...prevData, newItem]);

      // Cập nhật state để hiển thị phần tử mới
      setItemsWithNullParentId((prevItems) => [...prevItems, newItem]);
      if (response.status === 201){
        notifyFail()
      } else {
        console.error("Failed to add topic");
        notifySuccess();
      }
    } catch (error) {
      console.error("Error adding child interest:", error);
    }
  };
  //---------------------------------Xử lý và cập nhật hình ảnh-------------------------------------------------------//
  const handleUpdateImg = (interest_id) => {};

  const [showPopup, setShowPopup] = useState(false);
  const [interest_id, setInterest_id] = useState("");
  const handleUploadButton = (interestID) => {
    setShowPopup(true);
    console.log(interestID);
    setInterest_id(interestID);
  };

  // Định nghĩa hàm để cập nhật thông tin cho một mục quan tâm
  async function updateInterest() {
    try {
      const apiUrl = `https://sharing-coffee-be-capstone-com.onrender.com/api/interest/${interest_id}`;
      const newData = { image: image }; // Thông tin mới cần cập nhật

      // Gửi yêu cầu PUT để cập nhật thông tin
      const response = await axios.put(apiUrl, newData);

      // Kiểm tra nếu yêu cầu đã thành công
      if (response.status === 200) {
        console.log("Cập nhật thành công!");
      } else {
        console.log("Cập nhật không thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }

  // Gọi hàm để cập nhật mục quan tâm với interestId cụ thể

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  //---------------------------------Xử lý interest dạng list-------------------------------------------------------//
  const [showCurrentCode, setShowCurrentCode] = useState(true);

  const toggleCodeVisibility = () => {
    setShowCurrentCode(!showCurrentCode);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [editingIndex, setEditingIndex] = useState(-1); // -1 là không có ô input nào được chỉnh sửa
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleUpdateClick = async (interestId, newName, childName) => {
    try {
      const apiUrl = `https://sharing-coffee-be-capstone-com.onrender.com/api/interest/${interestId}`;
      const newData = { name: newName }; // Dữ liệu mới cần cập nhật
      // Gửi yêu cầu PUT để cập nhật thông tin
      const response = await axios.put(apiUrl, newData);

      // Kiểm tra kết quả của yêu cầu cập nhật
      if (response.status === 200) {
        console.log("Cập nhật thành công!");
        // Cập nhật state `itemsWithNonNullParentId` với dữ liệu mới
        const updatedItem = response.data; // Dữ liệu được trả về từ API sau khi cập nhật
        // Cập nhật `itemsWithNonNullParentId` bằng cách thay thế hoặc thêm dữ liệu mới
        setInputValue("");
        setItemsWithNonNullParentId((prevData) => {
          // Kiểm tra xem item đã tồn tại trong danh sách chưa
          const itemIndex = prevData.findIndex(
            (item) => item.id === updatedItem.id
          );
          if (itemIndex !== -1) {
            // Nếu item đã tồn tại, thay thế item cũ bằng item mới cập nhật
            const updatedData = [...prevData];
            updatedData[itemIndex] = updatedItem;
            return updatedData;
          } else {
            // Nếu item chưa tồn tại, thêm item mới vào danh sách
            return [...prevData, updatedItem];
          }
        });
      } else {
        console.log("Cập nhật không thành công.");
        // Xử lý khi cập nhật không thành công
      }
      // Sau khi cập nhật xong, đặt lại state `editingIndex` về -1 để thoát khỏi chế độ chỉnh sửa
      setEditingIndex(-1);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu cập nhật:", error);
      // Xử lý khi có lỗi xảy ra trong quá trình gửi yêu cầu cập nhật
    }
  };

  const handleCancelClick = (index) => {
    const updatedItems = [...itemsWithNonNullParentId];
    updatedItems[index].name = originalName; // Khôi phục tên ban đầu của mục
    setItemsWithNonNullParentId(updatedItems);
    setInputValue("");
    setEditingIndex(-1); // Thoát khỏi chế độ chỉnh sửa
  };
  const [originalName, setOriginalName] = useState("");
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="mt-3">
      {/* Hiển thị component mới nếu showCurrentCode là false */}
      {!showCurrentCode && <InterestV4 />}
      {showCurrentCode && (
        <div className="flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 py-6 flex flex-col justify-center items-center">
              <div className="border-black w-fit ">
                <label
                  htmlFor="fileInput"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white border-[1px]"
                >
                  <div className="flex flex-col justify-center items-center p-3">
                    <LuUpload />
                    <span className="">Tải ảnh</span>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    onChange={uploadImage}
                    style={{ display: "none" }}
                  />
                </label>
                <div id="fileName">
                  {selectedFile && <p>{selectedFile.name}</p>}
                </div>
              </div>
              <div className="flex mt-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    id="nameInput"
                    placeholder="Nhập chủ đề"
                    value={nameParent}
                    onChange={handleNameChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between ml-2">
                  <button
                    className="bg-[#F6EFED] hover:bg-[#A4634D] text-[#A4634D] hover:text-[#F6EFED] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
                  >
                    Thêm
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
          {/* <h2 className="text-xl font-bold mb-2">Items with null parent_interest_id:</h2> */}
          <div className="flex flex-wrap gap-5 justify-center">
            {itemsWithNullParentId.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-center items-center mt-8 text-gray-700 bg-white border-[0.5] border-blue-700 rounded-xl w-96"
              >
                {item.image ? (
                  <img
                    className="rounded-2xl w-2/3 object-cover"
                    src={item.image}
                    onClick={() => handleUpdateImg(item.interest_id)}
                  />
                ) : (
                  <button onClick={() => handleUploadButton(item.interest_id)}>
                    Upload ảnh
                  </button>
                )}
                <p
                  className="text-2xl font-sans"
                  onClick={() => toggleItem(item.interest_id)}
                >
                  {item.name}
                </p>
                <br />
                {expandedItems[item.interest_id] && (
                  <div className="w-full">
                    {showInput[item.interest_id] && (
                      <div className="flex items-center mb-2">
                        <input
                          type="text"
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Nhập"
                          onChange={(e) => setChildName(e.target.value)}
                        />
                        <button
                          onClick={() =>
                            addChildInterest(childName, item.interest_id)
                          }
                          className="ml-2 bg-[#F6EFED] hover:bg-[#A4634D] text-[#A4634D] py-2 px-4 rounded focus:outline-none hover:text-white focus:shadow-outline"
                        >
                          Thêm
                        </button>
                      </div>
                    )}
                    <button
                      className="m-2"
                      onClick={() =>
                        setShowInput((prevState) => ({
                          ...prevState,
                          [item.interest_id]: !prevState[item.interest_id],
                        }))
                      }
                    >
                      {showInput[item.interest_id] ? "Đóng" : "Thêm chủ đề"}
                    </button>
                    <ul className="grid grid-cols-2 gap-4">
                      {itemsWithNonNullParentId
                        .filter(
                          (childItem) =>
                            childItem.parent_interest_id === item.interest_id
                        )
                        .map((childItem, childIndex) => (
                          <li
                            key={childIndex}
                            className="flex items-center justify-center p-2 border border-gray-300 rounded-xl m-2"
                          >
                            {editingIndex === childIndex ? (
                              <div className="flex flex-col justify-center items-center">
                                <div className="flex">
                                  <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) =>
                                      handleInputChange(e, childIndex)
                                    }
                                    className="border border-gray-400 px-2 py-1 rounded mr-2 w-full"
                                  />
                                  <button
                                    className="text-[#A4634D]"
                                    onClick={() =>
                                      handleUpdateClick(
                                        childItem.interest_id,
                                        inputValue,
                                        childItem.name
                                      )
                                    }
                                  >
                                    <IoSend />
                                  </button>
                                </div>
                                <div className="flex">
                                  <button
                                    className="text-[#A4634D]"
                                    onClick={() =>
                                      handleCancelClick(childIndex)
                                    }
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="font-sans text-lg">
                                  {childItem.name}
                                </p>
                                <button
                                  className="ml-2 text-red-500 hover:text-red-700"
                                  onClick={() => setEditingIndex(childIndex)}
                                >
                                  <FaPen className="text-black" />
                                </button>
                              </>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
