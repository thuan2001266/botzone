import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function Carousel({ images }: { images: { big: string[]; small: string[] } }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageType, setImageType] = useState<string>();

  const handleOnPrevClick = () => {
    const productsLength = images.big.length;
    setCurrentIndex((currentIndex + productsLength - 1) % productsLength);
  };
  const handleOnNextClick = () => {
    const productsLength = images.big.length;
    setCurrentIndex((currentIndex + productsLength + 1) % productsLength);
  };

  useEffect(() => {
    const startSlider = setInterval(() => {
      handleOnNextClick();
    }, 6000);
    return () => clearInterval(startSlider);
  }, [currentIndex]);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setImageType("small");
    } else {
      setImageType("big");
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  return (
    <div className="w-full m-auto">
      <div className="w-full relative select-none ">
        <div className="w-full">
          <img
            src={
              imageType == "big"
                ? images.big[currentIndex]
                : images.small[currentIndex]
            }
            alt=""
            className={`min-h-[350px] w-full object-cover`}
          />
        </div>

        <div className="absolute w-full bottom-6 flex">
          <div className="m-auto flex">
            {images.big.map((e, i) => {
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
