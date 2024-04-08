import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
function Weather() {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = 'd86bc16148b66837d76e72186425fbe7';

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
            const data = await response.json();
            if (response.ok) {
                setWeatherData(data);
                setError(null);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className="mt-7 border-[1px] w-fit rounded-xl bg-slate-50">
            <div className='p-5'>
                <div>
                    <h1 className='font-bold text-xl'>Thời tiết</h1>
                    <div className='flex items-center mt-[20px]'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex items-center mt-[20px]'>
                                <div className='border-[1px] rounded-xl w-[350px] h-[52px] shadow-xl flex items-center'>
                                    <CiSearch className='ml-1 w-8' />

                                    <input
                                        type="text"
                                        value={cityName}
                                        onChange={(e) => setCityName(e.target.value)}
                                        placeholder="Nhập thành phố muốn tìm kiếm"
                                        className='w-full h-full rounded-xl p-[15px]'
                                    />
                                </div>
                                <button className="bg-[#008DDA] w-[120px] h-[52px] rounded-[60px] mr-5 text-white font-semibold ml-[20px]" type="submit">Tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {weatherData && (
                    <div className='mt-[100px]'>
                        <div class="relative flex flex-col mt-1 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[600px]">
                            <div
                                class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                <img
                                    src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="card-image" />
                            </div>
                            <div class="p-6 flex justify-center items-center">
                                <h5 class="block  font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    {weatherData.name}
                                </h5>
                                <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit ml-5">
                                    Nhiệt độ: {(weatherData.main.temp - 273.15).toFixed(2)} °C
                                </p>
                                <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit ml-5">
                                    Mô tả: {weatherData.weather[0].description}
                                </p>
                                <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit ml-5">
                                    Độ ẩm: {weatherData.main.humidity}%
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather
