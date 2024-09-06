import React from "react";
import { FaBookOpen, FaCamera } from "react-icons/fa";
import blog1 from "../../assets/images/blog1.jpg";
import blog2 from "../../assets/images/blog2.jpg";
import blog3 from "../../assets/images/blog3.jpg";

function BlogSection() {
  // Mock data for blogs
  const blogs = [
    {
      id: 1,
      title: "Maximize Your Workout Efficiency",
      description:
        "Learn how to get the most out of every workout with expert tips and strategies.",
      imageUrl: blog3,
    },
    {
      id: 2,
      title: "Nutrition for Peak Performance",
      description:
        "Discover the best nutrition practices to fuel your fitness journey and enhance performance.",
      imageUrl: blog2,
    },
    {
      id: 3,
      title: "Recovery Techniques for Faster Results",
      description:
        "Explore effective recovery techniques to help your body bounce back and improve your results.",
      imageUrl: blog1,
    },
  ];

  return (
    <section className="w-full px-4 mx-auto lg:pt-24 ">
      <div className="flex flex-wrap justify-center text-center mb-12">
        <div className="w-full px-4 lg:w-6/12">
          <h2 className="text-4xl font-semibold text-wwtext">
            Elevate Your Fitness Knowledge
          </h2>
          <p className="mt-4 mb-4 text-lg leading-relaxed text-gray-500">
            {
              "Stay informed with our latest blog posts. Whether you're looking for workout tips, nutrition advice, or recovery techniques, we've got you covered."
            }
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`w-full px-4 mb-8 flex flex-col justify-center items-center space-y-6 lg:space-y-0 ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center`}
          >
            <div className="w-full flex justify-center items-center">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-[20rem] max-w-none     object-cover"
              />
            </div>
            <div className="flex-grow lg:pl-8 lg:pr-4 text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-wwTitleRed mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
