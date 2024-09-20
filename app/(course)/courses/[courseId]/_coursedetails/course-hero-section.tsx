"use client"
import Image from 'next/image';
import ArrowIcon from '@/assets/arrow-right.svg'

interface courseHeroProps {
    title: string;
    description: string;
    imageSrc:string;
}


export const CourseHero = ({title, description, imageSrc}:courseHeroProps) => {


  return (
    <section className='pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip'>
      <div className="container relative">
      <div
          className="absolute inset-0 -z-10 opacity-5"
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
          ></div>
        <div className='md:flex items-center'>
          <div className='md:w-[478px]'>
            <div className="tag">Version 2.0 is here</div>
            <h1
                className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6"
              >
                {title}
              </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6"
            >
              {description}
            </p>
            <div className="flex gap-1 items-center mt-[30px]" >
              <button className='btn btn-primary'>Get for free</button>
              <button className="btn btn-text gap-1">
                <span>Learn more</span>
                <ArrowIcon className="h-5 w-5"/>
              </button>
            </div>
          </div>
          {/* <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative bg-red-400 ">
            <Image
                src={imageSrc} 
                 alt="Course image" 
                 layout="fill"
                 objectFit="cover"
                 className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none lg:right-0"
                
                />
          </div> */}
        </div>

      </div>
    </section>
  );
};
