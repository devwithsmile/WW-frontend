import React, { lazy, useEffect, useState } from "react";
import { MdGeneratingTokens, MdLocationOn } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import api from "../../api/axios.js";

import homepageImage from "../../assets/images/homepage.jpg";
import BlogSection from "../../components/Home/BlogSection.jsx";

const Carousel = lazy(() => import("../../components/Home/Carousel.jsx"));
const GymCardHome = lazy(() =>
  import("../../components/Home/GymCardHome/GymCardHome.jsx")
);

function Home() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [topGyms, setTopGyms] = useState([]);
  const [popularGyms, setPopularGyms] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    // Check if Geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          // console.log(location.lat);
          // console.log(location.lng);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location.lat !== null && location.lng !== null) {
      const fetchPopularGyms = async () => {
        try {
          // http://localhost:3000/gyms/popular?latitude=23.3441&longitude=85.3096
          const response = await api.get(`/gyms/popular`, {
            params: {
              latitude: location.lat,
              longitude: location.lng,
            },
          });
          // console.log(response.data);
          setPopularGyms(response.data);
        } catch (error) {
          setError("Error fetching gym details");
        }
      };

      fetchPopularGyms();
    }
  }, [location]);

  useEffect(() => {
    const fetchTopGyms = async () => {
      try {
        const response = await api.get(`/gyms`, {
          params: {
            sort_by: "rating",
            limit: 3,
          },
        });
        // console.log("topgyms: ", response.data.gyms);
        setTopGyms(response.data.gyms);
      } catch (error) {
        setError("Error fetching gym details");
      }
    };
    fetchTopGyms();
  }, []);

  return (
    <main>
      <div
        className="relative flex items-center content-center justify-center pt-16 pb-32"
        style={{
          minHeight: "75vh",
        }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${homepageImage})`,
          }}
        >
          <span
            id="blackOverlay"
            className="absolute w-full h-full bg-black opacity-70"
          ></span>
        </div>

        {/* Top Content */}
        <div className="container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 ml-auto mr-auto text-center lg:w-6/12">
              <div className="pr-12">
                <h1 className="text-4xl font-semibold text-wwtext">
                  Unleash Your Fitness Journey with WorkoutWings
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Explore top-rated gyms, book flexible sessions, and achieve
                  your fitness goals with ease—anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none"
          style={{ height: "70px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-current text-wwpopdiv"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      {/* Featured section content */}
      <section className="pb-24 -mt-24 bg-wwbg">
        <div className="container flex flex-wrap px-4 mx-auto">
          {/* Top-Rated Gyms */}
          <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-8 break-words shadow-lg bg-wwpopdiv">
              <div className="flex-auto px-4 py-5">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center rounded-full shadow-lg bg-wwbg text-wwTitleRed">
                  <MdGeneratingTokens size={40} />
                </div>
                <h6 className="text-xl font-semibold">Top-Rated Gyms</h6>
                <p className="mt-2 mb-4 text-gray-300">
                  Access the best gyms with high ratings and top-notch
                  facilities, all conveniently available at your fingertips.
                </p>
              </div>
            </div>
          </div>
          {/* Nearby Gyms */}
          <div className="w-full px-4 text-center md:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-8 break-words shadow-lg bg-wwpopdiv">
              <div className="flex-auto px-4 py-5">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center rounded-full shadow-lg bg-wwbg text-wwTitleRed">
                  <MdLocationOn size={30} />
                </div>
                <h6 className="text-xl font-semibold">Find Nearby Gyms</h6>
                <p className="mt-2 mb-4 text-gray-300">
                  Discover top-rated gyms around you with just a click. Enjoy
                  the convenience of working out close to home.
                </p>
              </div>
            </div>
          </div>
          {/* Fitness Potential */}
          <div className="w-full px-4 pt-6 text-center md:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-8 break-words shadow-lg bg-wwpopdiv">
              <div className="flex-auto px-4 py-5">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center rounded-full shadow-lg bg-wwbg text-wwTitleRed">
                  <FaBookOpenReader size={30} />
                </div>
                <h6 className="text-xl font-semibold">
                  Unlock Your Fitness Potential
                </h6>
                <p className="mt-4 mb-4 text-gray-300">
                  Get inspired and informed with our latest workout guides,
                  nutrition advice, and more. Elevate your fitness.
                </p>
              </div>
            </div>
          </div>

          {/* Popular Gyms */}
          <Carousel items={topGyms} />
        </div>
      </section>

      <section className="relative hidden py-20" id="PopularGyms">
        <div
          className="absolute top-0 left-0 right-0 bottom-auto w-full -mt-20 overflow-hidden pointer-events-none"
          style={{ height: "80px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-current text-wwbg"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap mt-12 justify-evenly">
            {popularGyms.map((gym, index) => {
              return (
                <div
                  key={gym.gym_id}
                  className="w-auto px-4 text-center lg:w-3/12"
                >
                  <GymCardHome gym={gym} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative block pb-20 bg-wwpopdiv" id="blog">
        <div
          className="absolute top-0 left-0 right-0 bottom-auto w-full -mt-20 overflow-hidden pointer-events-none"
          style={{ height: "80px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-current text-wwpopdiv"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <BlogSection />
      </section>
    </main>
  );
}

export default Home;
