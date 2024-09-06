import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from "../../assets/errorPage.svg"

function PageNotFound() {
    return (
        <main className="flex items-center w-screen h-[37rem] ">
            <div className="container flex flex-col items-center justify-between px-5 mx-auto text-gray-700 md:flex-row">
                <div className="w-full mx-8 text-center lg:w-1/2 md:text-left">
                    <div className="mb-8 font-extrabold text-wwtext text-7xl font-dark"> 404</div>
                    <p className="mb-8 text-2xl font-light leading-normal md:text-3xl text-wwsecondarytext">
                        Sorry we couldn't find the page you're looking for
                    </p>

                    <Link to={"home"} className="inline px-5 py-3 text-sm font-medium leading-5 text-white transition-all border border-transparent rounded-lg shadow-2xl bg-wwred duration-400 focus:outline-none active:bg-red-600 hover:bg-red-700">back to homepage</Link>
                </div>
                <div className="w-full mx-5 my-12 lg:flex lg:justify-end lg:w-1/2">
                    <img src={errorImage} className="" alt="Page not found" />
                </div>

            </div>
        </main>
    );
}

export default PageNotFound;    