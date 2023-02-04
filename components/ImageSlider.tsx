import { useEffect, useState, useRef } from "react";
import image from "../assets/images";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ImageSlider() {
  let images = Object.values(image);
  const [currentIndex, setCurrentIndex] = useState(0);
  const refContainer = useRef(null);

  console.log(refContainer.current);

  const handleOnPrevClick = () => {
    refContainer.current.scrollLeft -= refContainer.current.offsetWidth;
  };
  const handleOnNextClick = () => {
    refContainer.current.scrollLeft += refContainer.current.offsetWidth;
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full m-auto">
      <div className="w-full relative select-none ">
        <div
          className="w-full flex flex-row overflow-scroll"
          id="imageSlider"
          ref={refContainer}
        >
          {images.map((e, i) => {
            return (
              <img
                src={images[i].src}
                alt=""
                // className="w-full object-cover transition duration-500 ease-in-out"
                className={`transition duration-500 ease-in-out h-full w-full object-cover`}
                // style={{ transition: "all 0.5s ease-in-out" }}
              />
            );
          })}
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

export default ImageSlider;
