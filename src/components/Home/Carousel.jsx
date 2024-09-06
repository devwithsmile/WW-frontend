import React, { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getFirstFewSentences } from "../../utils/helperFunctions.js";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const useResponsiveNum = () => {
  const [num, setNum] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setNum(1); // 'sm' screen
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setNum(2); // 'md' screen
      } else {
        setNum(4); // 'lg' and larger screens
      }
    };

    // Initial check
    handleResize();

    // Debounce logic
    const debouncedHandleResize = debounce(handleResize, 200);

    // Event listener for resizing
    window.addEventListener("resize", debouncedHandleResize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []); // Empty dependency array means this runs once on mount

  // Log whenever num changes
  useEffect(() => {
    // console.log("num updated:", num);
  }, [num]);

  return num;
};

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const responsiveNum = useResponsiveNum(); // Call the hook here

  const handlePrevClick = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden h-96">
      <TransitionGroup component="div" className="flex">
        {items.map((item, index) => (
          <CSSTransition
            key={index}
            timeout={500}
            classNames={`carousel-item-${direction}`}
            unmountOnExit
          >
            <div
              className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-500 ease-in-out transform ${
                index === currentIndex
                  ? "translate-x-0"
                  : direction === "right"
                  ? "translate-x-full"
                  : "-translate-x-full"
              }`}
            >
              {/* Pass responsiveNum as prop */}
              <CarouselItem item={item} responsiveNum={responsiveNum} />{" "}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="absolute transform -translate-y-1/2 md:top-1/2 left-4 ">
        <button
          onClick={handlePrevClick}
          className="p-2 rounded-full text-wwtext hover:bg-red-500 hover:text-wwbg "
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute transform -translate-y-1/2 md:top-1/2 right-4 ">
        <button
          onClick={handleNextClick}
          className="p-2 rounded-full text-wwtext hover:bg-red-500 hover:text-wwbg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const CarouselItem = ({ item, responsiveNum }) => {
  return (
    <div className="flex flex-col w-full h-full md:flex-row" id="#topGyms">
      {/* Left Div for Title and Description */}
      <div className="flex flex-col justify-center flex-1 p-6 bg-transparent shadow-lg ">
        <h3 className="mb-2 text-lg font-bold text-wwtext">{item.gym_name}</h3>
        <p className="text-wwsecondarytext">
          {getFirstFewSentences(item.description, responsiveNum)}
        </p>{" "}
        {/* Use responsiveNum here */}
      </div>

      {/* Right Div for Image */}
      <div className="flex items-center justify-center flex-1 bg-transparent">
        <img
          src={item.images[0]}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Carousel;
