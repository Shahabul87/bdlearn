import { Bookmark, Share, GitFork } from "lucide-react";
import Image from "next/image";

export const FeatureAction = () => {
  return (
    <div className="bg-gray-800 text-gray-100 py-10 mt-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - Image or Illustration */}
        <div className="w-full md:w-1/2">
          <Image
            src="/path-to-your-image.webp" // replace with your image path
            alt="Team Working"
            width={600}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Right Side - Call to Action Items */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-12 space-y-6">
          {/* Item 1 */}
          <div className="flex items-start space-x-4">
            <div className="bg-blue-700 p-3 rounded-full">
              <Bookmark className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Sponsor us</h3>
              <p className="text-gray-400 mt-2">
                Patronize us on <a href="#" className="text-blue-400">GitHub Sponsors</a>, <a href="#" className="text-blue-400">Open Collective</a> or <a href="#" className="text-blue-400">PayPal</a> to back our project&apos;s growth. Together, we make a difference!
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start space-x-4">
            <div className="bg-blue-700 p-3 rounded-full">
              <Share className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Spread the word</h3>
              <p className="text-gray-400 mt-2">
                Unlock the power of community! Share our project with your network and watch as we grow stronger together. The more people know, the more inspiration we gain to innovate and elevate our project! <a href="#" className="text-blue-400">Share on X</a>
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start space-x-4">
            <div className="bg-blue-700 p-3 rounded-full">
              <GitFork className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Contribute</h3>
              <p className="text-gray-400 mt-2">
                Calling all web wizards and SVG virtuosos! Dive into the world of <a href="#" className="text-blue-400">Tabler Icons</a> and <a href="#" className="text-blue-400">Tabler Admin Template</a>. Your contributions, big or small, will make waves in the web development community. Join the revolution today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


