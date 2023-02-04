import { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
let count = 0;
function Carousel({ images }: { images: Object[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const startSlider = setInterval(() => {
      handleOnNextClick();
    }, 6000);
    return () => clearInterval(startSlider);
  }, [currentIndex]);

  return (
    <div className="w-full m-auto">
      <div className="w-full relative select-none ">
        <div className="w-full">
          <img
            src={images[currentIndex].src}
            alt=""
            // className="w-full object-cover transition duration-500 ease-in-out"
            // style="transition: transform 0.5s ease;"
            className={`min-h-[350px] w-full object-cover`}
            // style={{ transition: "all 0.5s ease-in-out" }}
          />
        </div>

        <div className="absolute w-full bottom-6 flex">
          <div className="m-auto flex">
            {images.map((e, i) => {
              return (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={
                    i == currentIndex
                      ? "p-1 rounded-full mx-1 bg-[#fdefef] border-[#84afeb] border-2 hover:bg-[#fdefef] hover:border-[#84afeb]"
                      : "p-1 rounded-full mx-1 bg-[#c7c7c7] border-[#fdefef] border-2 hover:bg-[#fdefef] hover:border-[#84afeb]"
                  }
                ></div>
              );
            })}
          </div>
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
