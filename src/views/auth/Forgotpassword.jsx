import React from 'react'
import { Link } from 'react-router-dom';

function Forgotpassword() {
    return (
        <div className="mt-[2vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                Quên mật khẩu
            </h4>
            <p className="mb-9 ml-1 text-base text-gray-600 mt-6">
                Xin vui lòng điền địa chỉ Email vào ô dưới <br />
                đây để yêu cầu lấy lại mật khẩu
            </p>
            <input
                className="mb-3 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-500"
                type="password"
                placeholder="mail@simmmple.com"
            />
            <div className="mb-4 flex items-center justify-between px-2">
                <div className="flex items-center">

                </div>
                <Link
                    className=" text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                    to={"/auth/sign-in"}
                >
                    Quay lại đăng nhập
                </Link>

            </div>
            <button className="linear mt-2 w-full rounded-xl bg-[#A4634D] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Gửi
            </button>
        </div>
    )
}

export default Forgotpassword
