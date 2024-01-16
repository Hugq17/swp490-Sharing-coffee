"use client"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll';

import { HiOutlineMoon, HiOutlineSun, HiArrowSmUp } from 'react-icons/hi'

export default function Switcher() {
    const [scrollToTops, setScrollToTops] = useState(false);
    useEffect(() => {
        function scrollHandler() {
            setScrollToTops(window.scrollY >= 500)
        }
        if (typeof window !== "undefined") {
            window.addEventListener('scroll', scrollHandler);
        }
        window.scrollTo(0, 0)

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [])

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });
    }

    function changeMode(mode, event) {
        switch (mode) {
            case 'mode':
                if (document.documentElement.className.includes("dark")) {
                    document.documentElement.className = 'light'
                } else {
                    document.documentElement.className = 'dark'
                }
                break;
            case 'layout':
                if (event.target?.innerText === "LTR") {
                    document.documentElement.dir = "ltr"
                }
                else {
                    document.documentElement.dir = "rtl"
                }
                break;
            default:
                break;
        }
    }
    return (
        <>
            <div className="fixed top-1/4 -right-3 z-50">
                <span className="relative inline-block rotate-90">
                    <input type="checkbox" className="checkbox opacity-0 absolute" id="chk" onClick={(event) => changeMode('mode', event)} />
                    <label className="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8" htmlFor="chk">
                        <HiOutlineMoon className="text-[20px] text-yellow-500" />
                        <HiOutlineSun className="text-[20px] text-yellow-500" />
                        <span className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"></span>
                    </label>
                </span>
            </div>

            <div className="fixed top-[40%] -right-3 z-50">
                <Link href="#" id="switchRtl" className="cursor-pointer">
                    <span className="py-1 px-3 relative inline-block rounded-t-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold rtl:block ltr:hidden" onClick={(event) => changeMode('layout', event)}>LTR</span>
                    <span className="py-1 px-3 relative inline-block rounded-t-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold ltr:block rtl:hidden" onClick={(event) => changeMode('layout', event)}>RTL</span>
                </Link>
            </div>

            <Link href="#" onClick={scrollToTop}
                id="back-to-top" className={`${!scrollToTops ? "hidden" : "back-to-top fixed  text-lg rounded-full z-10 bottom-5 end-2 h-9 w-9 text-center bg-indigo-600 text-white leading-9 flex items-center justify-center"}`}><HiArrowSmUp /></Link>

        </>
    )
};