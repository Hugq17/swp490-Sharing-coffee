// import InputField from "../../components/fields/InputField";
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <section class="bg-gray-50 dark:bg-gray-900 w-[1000px]">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[600px]">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                            Sharing café
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
