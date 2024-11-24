import React from 'react'
import { FaInstagram, FaTwitter } from 'react-icons/fa'; // Importing icons
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router=useRouter()
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6 flex flex-col text-center md:text-start">
        <div className="flex flex-col md:flex-row w-[90%] mx-auto justify-between ">
          {/* Left Section */}
          <div className=" flex flex-col  pt-6">
            <div className="flex items-center justify-center md:justify-start">
              <h4 className="text-3xl font-bold  mr-4">
                <Image
                  src="/images/Logo.png"
                  alt="/images/Logo.png"
                  width={200}
                  height={200}
                />
              </h4>
            </div>
            <p className="text-gray-400 my-2 text-md">
              <span className="font-semibold hover:underline text-[#cad927] mr-1">
                liveplay.in
              </span>
              helps organizers in hosting sports events and players to discover
              and join them across 10+ sports
            </p>
            <div className="md:hidden flex flex-col py-2 mb-2">
              <h4 className="text-lg font-semibold text-white mb-2">
                Quick Links
              </h4>
              <ul className="list-none pl-0 space-y-1 cursor-pointer">
                <li className="text-[#cad927] hover:text-white transition duration-300">
                  Create your Event
                </li>
                <li className="text-[#cad927] hover:text-white transition duration-300">
                  About Us
                </li>
                <li className="text-[#cad927] hover:text-white transition duration-300">
                  FAQs
                </li>
              </ul>
            </div>
            <div className=" flex gap-2 items-center mb-2 justify-center md:justify-start">
              <h4 className="text-lg font-semibold text-gray-300 ">
                Connect With Us:
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition duration-300"
                >
                  <Image
                    src="/icons/image 60.svg"
                    alt="public/icons/image 60.svg"
                    width={40}
                    height={40}
                  />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition duration-300"
                >
                  <Image
                    src="/icons/X.svg"
                    alt="public/icons/X.svg"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-300">
              Reach us out on:{" "}
              <a
                href="mailto:liveplayindia@gmail.com"
                className="text-[#cad927] hover:underline"
              >
                teamsupport@liveplay.in
              </a>
            </p>
          </div>
          <div className="hidden md:flex flex-col pt-2 sm:pt-0 sm:py-6">
            <h4 className="text-lg font-semibold text-white mb-2">
              Quick Links
            </h4>
            <ul className="list-none pl-0 space-y-1 cursor-pointer">
              <li className="text-[#cad927] hover:text-white transition duration-300">
                Create your Event
              </li>
              <li className="text-[#cad927] hover:text-white transition duration-300">
                About Us
              </li>
              <li className="text-[#cad927] hover:text-white transition duration-300">
                FAQs
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4 mx-auto border-gray-600 w-[80%] md:w-[90%]" />
        <div className="flex flex-col md:flex-row justify-between text-center text-wrap sm:text-sm w-[90%] mx-auto">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link
              href="/policies/termsandcondition"
              className="text-[#cad927] hover:underline"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/policies/privacypolicy"
              className="text-[#cad927] hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/refund"
              className="text-[#cad927] hover:underline"
            >
              Refund Policy
            </Link>
            <Link
              href="/policies/cancelation"
              className="text-[#cad927] hover:underline"
            >
              Cancellation Policy
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            &copy; 2024 Impact Stream Ventures. <br className='md:hidden'/>liveplay.in™ All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer
