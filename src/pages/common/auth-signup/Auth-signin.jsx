import React from 'react'
import { useNavigate } from 'react-router-dom'
// import Switcher from '../../../components/common/switcher';
import logo from '../../../assets/images/logo-icon-30.png'

export default function AuthSignup() {
    const navigate = useNavigate();
    return (
        <>
            <section className="md:h-screen py-36 flex items-center  bg-no-repeat bg-center bg-cover  justify-center" style={{ backgroundImage: 'url("https://i.pinimg.com/564x/a8/fe/d5/a8fed574ea986e6b59296bba0378dcf7.jpg")', width: '100%' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                <div className="container relative">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                            <img src={logo} height={64} width={72} className="mx-auto" alt="" />
                            <h5 className="my-6 text-xl font-semibold">Signup</h5>
                            <form action="auth-signup-success" className="text-start">
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="RegisterName">Your Name:</label>
                                        <input id="RegisterName" type="text" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="Harry" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                        <input id="LoginEmail" type="email" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="name@example.com" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                                        <input id="LoginPassword" type="password" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="Password:" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Confirm Password:</label>
                                        <input id="LoginConfirmPassword" type="password" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="Password:" />
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center w-full mb-0">
                                            <input className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="AcceptT&C" />
                                            {/* <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">I Accept <Link href="#" className="text-indigo-600">Terms And Condition</Link></label> */}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <input type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" value="Register" />
                                    </div>

                                    <div className="text-center">
                                        <span className="text-slate-400 me-2">Already have an account ? </span> <button onClick={() => navigate('/login')}>Sign in</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Switcher /> */}
        </>
    )
}
