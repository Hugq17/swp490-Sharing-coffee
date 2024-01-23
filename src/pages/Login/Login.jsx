import React from "react"
// import Link from "next/link";
// import Image from "next/image";
import logo from '../../assets/images/logo-icon-30.png'
import { Player } from '@lottiefiles/react-lottie-player';
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
                                    {/* <img src={logo} width={72} height={64} placeholder="blur" className="mx-auto" alt="" /> */}
                                    <Player
                                        src='https://lottie.host/39aafee5-fbbb-4f97-8a30-0f02808e558a/h6pcKjMDMI.json'
                                        className="player"
                                        loop
                                        autoplay
                                    />
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



                                            <div className="mb-4">
                                                <input type="submit" className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" value="Login" />
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>

                        <div className="xl:w-[70%] lg:w-2/3 md:w-1/2 flex justify-center mx-6 md:my-auto my-20">
                            <div>


                                <div className="text-center">
                                    <div>
                                        <Player
                                            src='https://lottie.host/6c54d04a-7ed0-4492-86e2-1db4102e55a1/3GEaOEUjCc.json'
                                            className="player"
                                            style={{ height: '500px' }}
                                            loop
                                            autoplay
                                        />
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