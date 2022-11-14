import { useEffect, useState } from "react";
import image from "../assets/images";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
let count = 0;
function Carousel() {
    let images = Object.values(image);

    const handleOnPrevClick = () => {
        const productsLength = images.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
    };
    const handleOnNextClick = () => {
        count = (count + 1) % images.length;
        setCurrentIndex(count);
    };

    useEffect(() => {
        const startSlider = () => {
            setInterval(() => {
                handleOnNextClick();
            }, 8000);
        };
        startSlider();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="w-full m-auto">
            <div className="w-full relative select-none ">
                <div className="w-full">
                    <img
                        src={images[currentIndex].src}
                        alt=""
                        className="w-full object-cover"
                    />
                </div>

                <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
                    <button
                        onClick={handleOnPrevClick}
                        className="bg-[#68635c] rounded-full p-[6px] ml-5"
                    >
                        <ArrowBackIcon />
                    </button>
                    <button
                        onClick={handleOnNextClick}
                        className="bg-[#68635c] rounded-full p-[6px] mr-5"
                    >
                        <ArrowForwardIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
