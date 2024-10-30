import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importing icons

const Footer = () => {
  // Define the data for the footer sections
  const footerSections = [
    {
      row: "1",
      title: "Learn More",
      items: [
        "Pricing",
        "How it works",
        "Policies",
        "Privacy",
        "APIs for Developers",
        "Support / FAQs",
        "About",
      ],
    },

    {
      row: "2",
      title: "Organize Events",
      items: [
        "Conferences",
        "Workshops and Trainings",
        "Sports and Fitness Events",
        "Entertainment Events",
        "Treks and Trips",
      ],
    },
    {
      row: "1",
      title: "About us",
      items: [
        "Contact us",
        "Blog",
        "Event Magazine",
        "Product Diary",
        "Sitemap",
      ],
    },
    {
      row: "2",
      title: "Popular Searches",
      items: [
        "Indian Premier League (IPL)",
        "Hockey India League",
        "Pro Kabaddi League",
        "Indian Super League (ISL)",
        "Vijay Hazare Trophy",
        "Syed Mushtaq Ali Trophy",
      ],
    },
    
  ];

  return (
    <div>
      <footer className="bg-[#17202A] text-white py-6 flex flex-col">
        <div className="flex flex-col md:flex-row mx-auto w-[90%]">
          <div className="container flex flex-col flex-[1] px-16 py-6">
            <div className="flex items-center">
              <h4 className="text-3xl font-bold text-white mr-4">liveplay.in</h4>
            </div>
            <hr className="my-4 border-gray-700" />
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-300">Contact Us</h4>
              <p className="text-gray-400">
                Email:{" "}
                <a
                  href="mailto:support@sportseventapp.com"
                  className="text-gray-400 hover:text-white"
                >
                  support@sportseventapp.com
                </a>
              </p>
              <p className="text-gray-400">
                Phone: <span className="text-gray-400">(123) 456-7890</span>
              </p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">Follow Us</h4>
              <div className='flex space-x-8'>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition duration-300"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="container flex flex-wrap  gap-16 flex-[3] px-16 md:px-2 py-6 md:ml-auto">
            {footerSections.map((section, index) => (
              <div key={index} className="flex flex-col space-y-2 mb-4 md:mb-0">
                <h4 className="text-lg font-semibold text-gray-200 hover:text-white transition duration-300">{section.title}</h4>
                <ul className="list-none pl-0 space-y-1"> 
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-400 hover:text-gray-300 transition duration-300">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-4 mx-auto border-gray-600 w-[80%] md:w-[90%]" />
        <div className="text-center text-wrap sm:text-sm w-[70%] mx-auto">
          &copy; 2024 liveplay.in. All
          rights reserved. | Terms and Conditions | Privacy Policy
        </div>
      </footer>
    </div>
  );
}

export default Footer
