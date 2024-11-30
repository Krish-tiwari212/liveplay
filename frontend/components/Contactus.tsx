import React from 'react'
import { FaBuilding, FaComments, FaEnvelope, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';
import { IoArrowForwardCircle } from 'react-icons/io5';
import { MdEvent } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { Button } from './ui/button';

const Contactus = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#fff] to-[#ccdb28] px-4 pt-10 pb-5">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 transition-shadow duration-300">
        <h1 className="text-4xl font-bold text-[#141f29] mb-4 text-center leading-tight">
          Contact Us
        </h1>
        <p className="text-md md:text-lg text-gray-700 mb-8 text-center">
          Whether you’re here to host, join or just say "Hi," we’d love to hear
          from you!
        </p>
        <div className="grid gap-2 md:grid-cols-2 mb-8 w-full md:w-[80%] md:mx-auto">
          <div className="flex items-start justify-center space-x-4">
            <FaMapMarkerAlt className="w-8 h-8  flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-[#141f29]">Address</h2>
              <p className="text-gray-600 leading-relaxed">
                212-A, Amar Cottages CHS,
                <br />
                Bhosale Nagar, Hadapsar,
                <br />
                Pune - 411028
              </p>
            </div>
          </div>
          <div className="flex items-start justify-center space-x-4">
            <FaEnvelope className="w-8 h-8  flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-[#141f29]">Email</h2>
              <p className="text-gray-600">teamsupport@liveplay.in</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 grid-cols-1 justify-center items-center md:w-[70%] md:mx-auto">
          <div className="flex  space-x-4 ">
            <FaBuilding className="w-8 h-8 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-[#141f29]">Company</h2>
              <p className="text-gray-600">
                Impact Stream Ventures proudly brings you liveplay.in™ ❤
              </p>
            </div>
          </div>

          {/* <div className="flex items-start space-x-4">
              <FaComments className="w-8 h-8  flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-[#141f29]">
                  Get in Touch
                </h2>
                <p className="text-gray-600">
                  We’re always game for a chat! 😄
                </p>
              </div>
            </div> */}
        </div>
        <div className="mt-8 text-center">
          <a href="mailto:liveplayindia@gmail.com">
            <Button className="px-6 py-3 rounded-full shadow-lg">
              Contact Us Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contactus
