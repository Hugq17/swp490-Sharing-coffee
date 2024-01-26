import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../../routes.js";
import { Player } from '@lottiefiles/react-lottie-player';

export default function Auth() {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <Route path={`/${prop.path}`} element={prop.component} key={key} />
                );
            } else {
                return null;
            }
        });
    };
    return (
        <div>
            <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
                {/* <FixedPlugin /> */}
                <main className={`mx-auto min-h-screen`}>
                    <div className="relative flex">
                        <div className="mx-auto flex justify-center items-center  min-h-full w-full flex-col  pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
                            <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                                <div>
                                    <Player
                                        src='https://lottie.host/39aafee5-fbbb-4f97-8a30-0f02808e558a/h6pcKjMDMI.json'
                                        className="player"
                                        loop
                                        autoplay
                                        style={{ width: '200px', height: '250px' }}
                                    />
                                </div>
                                <Routes>
                                    {getRoutes(routes)}
                                    <Route
                                        path="/"
                                        element={<Navigate to="/auth/sign-in" replace />}
                                    />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        </div >
    );
}
