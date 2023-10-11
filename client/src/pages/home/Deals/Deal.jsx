import { useEffect, useState } from "react"

const Deal = () => {
    const [currTime, setCurrTime] = useState(new Date());

    useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
            setCurrTime(new Date());
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    const hours = currTime.getHours().toString().padStart(2, '0');
    const minutes = currTime.getMinutes().toString().padStart(2, '0');
    const seconds = currTime.getSeconds().toString().padStart(2, '0');

    return (
        <div className=" flex justify-center p-10 bg-red-600">
            <div className="w-[40%]">
                <h2 className=" font-semibold text-2xl m-5">Get 25% off during our one-time sale</h2>
                <p className=" text-xl text-white">Most of our products are limited releases that won't come back. Get your favorite items while they're in stock.</p>
            </div>
            <div className="w-[50%] text-center bg-black p-1">
                <div className="m-5 text-3xl font-extrabold text-white">Deal Expire <br/> <span className="text-8xl text-red-600">{`${hours}`}<span className=" text-white">{`:${minutes}`}</span> <span className=" text-lime-600">{`:${seconds}`}</span></span> </div>
                <button className=" bg-white pt-2 pb-2 pl-4 pr-4">Grab Offer</button>
            </div>
        </div>
    )
}

export default Deal;
