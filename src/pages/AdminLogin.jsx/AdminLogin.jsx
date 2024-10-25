//showNotification de hien react-toastify dung formik nhan du lieu tu dang nhap
// nguoi dung neu role la USER thi tra ve toast error ko co quyen admin
// neu nhap sai qua 3 lan bi day ve trang google

import React, { useContext } from "react";
import { useLottie } from "lottie-react";
import SignInAnimation from "../../assets/animation/SignInAdmin.json"
import {useFormik} from 'formik'
import { authService } from "../../service/auth.service";
import { NotificationContext } from "../../../App";
import { getLocalStorage, setLocalStorage } from "../../utils/util";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate()


  //react-toastify
  const {showNotification} = useContext(NotificationContext)


  //Gan animation lottie vao giao dien
  const options = {
    animationData: SignInAnimation,
    loop: true
  };
  const { View } = useLottie(options);


  // hook useFormik() xu ly form
  const {handleSubmit,handleChange,values} = useFormik({
    initialValues: {
      email:"",
      password:""
    },
    onSubmit: (values) => {
      console.log(values)
      authService.signIn(values).then((res) => {
        console.log(res.data.content)
        if(res.data.content.user.role == "USER"){
          showNotification("Bạn không có quyền ADMIN","error")
          let vipham = getLocalStorage("vipham")
          if(!vipham){
            setLocalStorage("vipham",1)
          }else{
            vipham++
            vipham == 3 ? (window.location.href = "https://www.google.com/") : setLocalStorage("vipham",vipham)
          }
        }else{
          setLocalStorage("admin",res.data.content)
          navigate("/admin")
        }
        showNotification("Đăng nhập thành công","success")
      }).catch((err) => {
        console.log(err)
        showNotification("Sai tên đăng nhập hoặc mật khẩu","error")
      })
    }
  })
  return (
    <>
      {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    */}
    <div className="container">
      <div className="flex h-screen items-center">
        <div className="login-img w-1/2">
          {View}
        </div>
        <div className="login-form w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your Admin Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminLogin;
