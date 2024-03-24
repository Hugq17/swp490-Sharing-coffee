// import InputField from "../../components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [status, setStatus] = useState(false)
    const url = 'https://sharing-coffee-be-capstone-com.onrender.com/api/admin';

    const handleSignIn = (event) => {
        event.preventDefault();
        axios.post(`${url}/login`, {
            email: email,
            password: password
        })
            .then(res => {
                if (res.status === 200) {
                    console.log('success');
                    const token = res.data.token;
                    const userData = res.data;
                    const userId = `${values.email}:${token}`;
                    // sessionStorage.setItem('token', userId);
                    localStorage.setItem('token', res.data.accessToken)
                    if (userData && userData.UserRole && userData.UserRole.role_name === "ADMIN") {
                        // Đăng nhập thành công và role là ADMIN, chuyển đến trang khác
                        navigate('/admin/default'); // Thay đổi '/dashboard' thành đường dẫn bạn muốn chuyển đến
                    } else {
                        console.error('Tài khoản không có quyền truy cập.');
                    }
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log('Đăng nhập thất bại: Tài khoản không tồn tại.');
                    // Xử lý khi tài khoản không tồn tại
                    setStatus(true)
                } else {
                    console.error("Lỗi trong quá trình xử lý yêu cầu:");
                    // Xử lý lỗi khi có lỗi trong quá trình gửi yêu cầu đến server
                }
            });
    }
    return (
        // <div className="mt-[100px] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        //     <h4 className="mb-2.5 text-[50px] font-bold text-navy-700 dark:text-white">
        //         Đăng nhập
        //     </h4>

        //     {status ? <p className="text-red-700 mb-6 flex justify-center"> Email hoặc mật khẩu không đúng</p> : ""}

        //     <input
        //         className={`mb-3 w-full h-[70px] px-3 py-2 rounded-lg border ${status ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-brand-500`}
        //         type="email"
        //         placeholder="mail@simmmple.com"
        //         value={email}
        //         onChange={(e) => setEmail(e.target.value)}
        //     />

        //     <input
        //         className="mb-3 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-500"
        //         type="password"
        //         placeholder="Min. 8 characters"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //     />
        //     {/* Checkbox */}
        //     <div className="mb-4 flex items-center justify-between px-2">
        //         <div className="flex items-center">

        //         </div>
        //         <Link
        //             className=" text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
        //             to={"/auth/Forget-Password"}
        //         >
        //             Quên mật khẩu
        //         </Link>
        //     </div>

        //     <button onClick={handleSignIn} className="linear mt-2 w-full rounded-xl bg-[#A4634D] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
        //         Đăng nhập
        //     </button>
        // </div>
        <section class="bg-gray-50 dark:bg-gray-900 w-[1000px]">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[600px]">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đăng nhập vào hệ thống
                        </h1>
                        <div class="space-y-4 md:space-y-6" action="#">
                            {status ? <p className="text-red-700 mb-6 flex justify-center"> Email hoặc mật khẩu không đúng</p> : ""}
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} id="email" className={`${status ? 'border-red-500' : 'border-gray-300'} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div class="flex items-center justify-between">
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu</a>
                            </div>
                            <button onClick={handleSignIn} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
