import React, { useContext } from "react";
import { getLocalStorage } from "../../utils/utils";
import { useFormik } from "formik";
import { DatePicker, Space } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { NotificationContext } from "../../App";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { useNavigate } from "react-router-dom";
import { path } from "../../common/path/path";
const ContentRightInfor = ({ setInfor }) => {
  let token = getLocalStorage("user")?.token;
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: getLocalStorage("user")?.user.email,
      phone:
        getLocalStorage("user")?.user.phone == "string"
          ? ""
          : getLocalStorage("user")?.user.phone,
      gender: getLocalStorage("user")?.user.gender,
      birthday: "",
      avatar: {},
    },
    onSubmit: (values) => {
      const { avatar, ...formData } = values;
      const dataForm = new FormData();
      dataForm.append("formFile", avatar.file); // Thêm tệp vào FormData
      nguoiDungService
        .uploadAvatar(dataForm, token)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      nguoiDungService
        .updateUser(getLocalStorage("user")?.user.id, formData)
        .then((res) => {
          showNotification(
            "Cập nhật thông tin thành công, vui lòng đăng nhập lại",
            "success",
            1000
          );
          setTimeout(() => {
            navigate(path.signIn);
          }, 2000);
        })
        .catch((err) => {
          showNotification("Có lỗi xảy ra vui lòng thử lại", "error");
          console.log(err);
        });
    },
  });
  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("DD-MM-YYYY") : ""; // Chuyển đổi thành chuỗi với định dạng mong muốn
    setFieldValue("birthday", formattedDate); // Cập nhật giá trị của trường birthday
  };
  return (
    <div>
      <form className="px-10 py-7 rounded-2xl border" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between border-b py-4">
          <div className="space-y-1">
            <h3 className="font-bold">Thông tin chung</h3>
            <p>Thay đổi thông tin cá nhân và ảnh của bạn tại đây</p>
          </div>
          <div className="space-x-4 flex">
            <div
              onClick={() => {
                setInfor(false);
              }}
              className="py-2 px-4 rounded-md border hover:opacity-100 opacity-90"
            >
              Hủy
            </div>

            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-blue-500 text-white hover:opacity-100 opacity-90"
            >
              Lưu
            </button>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-start gap-5 py-5">
          <div className="md:w-[60%] w-full py-4 px-3 rounded-lg border bg-[#F9FBFC]">
            <h3 className="text-xl font-bold border-b pb-4">
              Thông tin cá nhân
            </h3>
            <div className="mt-10 space-y-7">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 font-medium text-gray-500"
                >
                  Họ tên
                </label>
                <Input
                  placeholder="Nhap ten"
                  className="py-2"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-gray-500"
                >
                  Email
                </label>
                <Input
                  placeholder="Nhap ten"
                  className="py-2"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 font-medium text-gray-500"
                >
                  Số điện thoại
                </label>
                <Input
                  placeholder="Nhap so dien thoai"
                  className="py-2"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-5">
                <div className="w-1/2">
                  <label
                    htmlFor="phone"
                    className="block mb-1 font-medium text-gray-500"
                  >
                    Ngày sinh
                  </label>
                  <DatePicker
                    format={"DD-MM-YYYY"}
                    className="w-full"
                    id="birthday"
                    name="birthday"
                    onChange={handleDateChange}
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="phone"
                    className="block mb-1 font-medium text-gray-500"
                  >
                    Giới tính
                  </label>
                  <Select
                    placeholder="Select gender"
                    className="w-full"
                    id="gender"
                    name="gender"
                    value={values.gender}
                    onChange={(value) => {
                      setFieldValue("gender", value);
                    }}
                    options={[
                      { value: true, label: "Male" },
                      { value: false, label: "Female" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" md:w-[40%] w-full py-4 px-3 rounded-lg border bg-[#F9FBFC]">
            <h3 className="text-xl font-bold border-b pb-4">Tải ảnh lên</h3>
            <div className="py-5 flex items-center gap-3">
              <div className="rounded-full w-[70px] h-[70px]">
                {getLocalStorage("user")?.user.avatar ? (
                  <img
                    src={getLocalStorage("user")?.user.avatar}
                    alt=""
                    className="w-full h-full border object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full text-2xl text-white bg-black flex justify-center items-center">
                    {getLocalStorage("user")?.user.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <h3>Thay đổi ảnh</h3>
                <div className="flex gap-5">
                  <h3 className="text-sm text-red-500 cursor-pointer">Xóa</h3>
                  <h3 className="text-sm text-blue-500 cursor-pointer">
                    Thay đổi
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer">
              <input
                type="file"
                name="avatar"
                id="avatar"
                // value={values.avatar}
                onChange={(event) => {
                  showNotification(
                    "Upload avatar thành công!",
                    "success",
                    1000
                  );
                  const file = event.target.files[0];
                  if (file) {
                    const urlAvarta = URL.createObjectURL(file);
                    setFieldValue("avatar", {
                      file: event.target.files[0],
                      url: urlAvarta,
                    });
                  } // Lấy tệp đầu tiên từ danh sách tệp // Cập nhật giá trị của trường avatar với đối tượng tệp // Hiển thị đối tượng tệp trong console
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <p className="text-gray-500 text-sm">
                  Click to upload or drag and drop
                </p>
                <p className="text-gray-500 text-xs">
                  SVG, PNG, JPG or GIF (Max. 800x400px)
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContentRightInfor;
