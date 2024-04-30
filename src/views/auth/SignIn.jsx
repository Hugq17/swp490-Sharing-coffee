// import InputField from "../../components/fields/InputField";
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
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
        <section class="bg-gray-50  w-[1000px]">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[600px]">
                <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl ">
                            Sharing café
                        </h1>
                        <div class="space-y-4 md:space-y-6" action="#">
                            {status ? <p className="text-red-700 mb-6 flex justify-center"> Email hoặc mật khẩu không đúng</p> : ""}
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} id="email" className={`${status ? 'border-red-500' : 'border-gray-300'} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `} placeholder="name@company.com" required="" />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                                <div className="relative flex justify-center">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
                                        required
                                    />
                                    <button
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ? <RiEyeCloseLine className="h-5 w-5 text-gray-500" /> : <RiEyeLine className="h-5 w-5 text-gray-500" />}
                                    </button>
                                </div>
                            </div>
                            <button onClick={handleSignIn} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
