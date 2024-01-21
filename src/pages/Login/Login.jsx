import React from "react"
// import Link from "next/link";
// import Image from "next/image";
import logo from '../../assets/images/logo-icon-30.png'
// import Switcher from "../components/switcher";
// import BackButton from "../components/backButton";

export default function Login() {

    return (
        <>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/[0.02]"></div>
                <div className="container-fluid relative">
                    <div className="md:flex items-center">
                        <div className="xl:w-[30%] lg:w-1/3 md:w-1/2">
                            <div className="relative md:flex flex-col md:min-h-screen justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 md:px-10 py-10 px-4 z-1">
                                <div className="text-center">
                                    <img src={logo} width={72} height={64} placeholder="blur" className="mx-auto" alt="" />
                                </div>
                                <div className="title-heading text-center md:my-auto my-20">
                                    <form className="text-start">
                                        <div className="grid grid-cols-1">
                                            <div className="mb-4">
                                                <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                                <input id="LoginEmail" type="email" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="name@example.com" />
                                            </div>

                                            <div className="mb-4">
                                                <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                                                <input id="LoginPassword" type="password" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="Password:" />
                                            </div>

                                            <div className="flex justify-between mb-4">
                                                <div className="flex items-center mb-0">
                                                    <input className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe" />
                                                    <label className="form-checkbox-label text-slate-400" htmlFor="RememberMe">Remember me</label>
                                                </div>
                                                <p className="text-slate-400 mb-0">
                                                    {/* <Link href="/auth-re-password" className="text-slate-400">Forgot password ?</Link> */}
                                                </p>
                                            </div>

                                            <div className="mb-4">
                                                <input type="submit" className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" value="Login / Sign in" />
                                            </div>

                                            <div className="text-center">
                                                <span className="text-slate-400 me-2">Dont have an account ?</span>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>

                        <div className="xl:w-[70%] lg:w-2/3 md:w-1/2 flex justify-center mx-6 md:my-auto my-20">
                            <div>
                                <div className="relative">
                                    <div className="absolute top-20 start-20 bg-indigo-600/[0.02] h-[1200px] w-[1200px] rounded-full"></div>
                                    <div className="absolute bottom-20 -end-20 bg-indigo-600/[0.02] h-[600px] w-[600px] rounded-full"></div>
                                </div>

                                <div className="text-center">
                                    <div>

                                        <div className="relative max-w-xl mx-auto text-start">
                                            <div className="relative p-8 border-2 border-indigo-600 rounded-[30px] before:content-[''] before:absolute before:w-28 before:border-[6px] before:border-white dark:before:border-slate-900 before:-bottom-1 before:start-16 before:z-2 after:content-[''] after:absolute after:border-2 after:border-indigo-600 after:rounded-none after:rounded-e-[50px] after:w-20 after:h-20 after:-bottom-[80px] after:start-[60px] after:z-3 after:border-s-0 after:border-b-0">
                                                <span className="font-semibold leading-normal">
                                                    Launch your campaign and benefit from our expertise on designing and managing conversion centered latest Tailwind CSS html page.
                                                </span>

                                                <div className="absolute text-8xl -top-0 start-4 text-indigo-600/10 dark:text-indigo-600/20 -z-1">
                                                    <i className="mdi mdi-format-quote-open"></i>
                                                </div>
                                            </div>

                                            <div className="text-lg font-semibold mt-6 ms-44">
                                                - Techwind
                                            </div>
                                        </div>
                                        <p className="text-slate-400 max-w-xl mx-auto">Start working with Tailwind CSS that can provide everything you need to generate awareness, drive traffic, connect. Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with real content.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Switcher/>
            <BackButton/> */}
        </>
    )
}