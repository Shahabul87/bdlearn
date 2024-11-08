import { TimelineDemo } from "./timelinedemo"
import Logo from '@/assets/logo.png'; 
import Link from 'next/link';
import Image from 'next/image';
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "iSham",
      className: "text-fuchsia-500 dark:text-blue-500"
    },
    {
      text: "Life",
    },
    {
      text: "Journey",
      className: "text-cyan-400 dark:text-blue-500",
    },
    
  ];

const MyLifeJourneyPage =() => {

    return (
        <>
        
         <div className="flex flex-col items-center justify-center text-white mt-10 relative">
             <Link href="/" className="">
                <Image src={Logo} alt="Saas Logo" height={50} width={50} className="rounded-full absolute top-0 mb-5 md:mb-0 md:top-10 left-10"/>
             </Link>
                {/* <h1 className="text-white text-4xl lg:text-6xl font-bold p-8 text-center">
                    Welcome to iSham Life Journey 
                </h1> */}
                <div>
                   <TypewriterEffectSmooth words={words} />
                </div>
         </div>
         <div className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"></div>
         <TimelineDemo />
        </>
    )
}


export default MyLifeJourneyPage