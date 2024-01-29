// import InputField from "../../components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        const url = 'https://sharing-coffee-be-capstone-com.onrender.com/api/admin/login';

        try {
            const response = await axios.post(url, {
                email: email,
                password: password
            });

            if (response.status === 200) {
                const userData = response.data;
                // Đăng nhập thành công, xử lý logic ở đây
                if (userData && userData.UserRole && userData.UserRole.role_name === "ADMIN") {
                    // Đăng nhập thành công và role là ADMIN, chuyển đến trang khác
                    navigate('/admin/default'); // Thay đổi '/dashboard' thành đường dẫn bạn muốn chuyển đến
                } else {
                    console.error('Tài khoản không có quyền truy cập.');
                }
            } else if (response.status === 404) {
                console.log("Đăng nhập không thành công", response.data)
            }

            else {
                // Xử lý lỗi khi đăng nhập không thành công
                console.error('Đăng nhập không thành công:', response.data.error);
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
        }
    };
    return (
        <div className="">
            {/* Sign in section */}
            <div className="mt-[2vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                    Sign In
                </h4>
                <p className="mb-9 ml-1 text-base text-gray-600">
                    Enter your email and password to sign in!
                </p>
                <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
                    <div className="rounded-full text-xl">
                        <FcGoogle />
                    </div>
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white">
                        Sign In with Google
                    </h5>
                </div>
                <div className="mb-6 flex items-center  gap-3">
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                    <p className="text-base text-gray-600 dark:text-white"> or </p>
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                </div>
                {/* Email */}
                {/* <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Email*"
                    placeholder="mail@simmmple.com"
                    id="email"
                    type="text"
                /> */}
                <input
                    className="mb-3 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-500"
                    type="email"
                    placeholder="mail@simmmple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}
                {/* <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Password*"
                    placeholder="Min. 8 characters"
                    id="password"
                    type="password"
                /> */}
                <input
                    className="mb-3 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-500"
                    type="password"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* Checkbox */}
                <div className="mb-4 flex items-center justify-between px-2">
                    <div className="flex items-center">
                        {/* <Checkbox />
                        <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                            Keep me logged In
                        </p> */}
                    </div>
                    <a
                        className=" text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                        href=" "
                    >
                        Forgot Password?
                    </a>
                </div>
                <button onClick={handleSignIn} className="linear mt-2 w-full rounded-xl bg-[#A4634D] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Sign In
                </button>

            </div>
        </div>
    );
}
