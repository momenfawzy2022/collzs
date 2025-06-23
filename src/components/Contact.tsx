import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';
import Buttons from "./Buttons";
import { FaDiscord } from "react-icons/fa6";





gsap.registerPlugin(ScrollTrigger);

const ImageClipBox = ({src, clipClass}: {src: string, clipClass: string}) => (
    <div className={clipClass}>
        <img src={src} />
    </div>
)

const Contact = () => {
  return (
    <div id='contact' className="my-42 min-h-96 w-screen px-10  "> 
      <div className="relative rounded-lg bg-violet-100 py-24 text-blue-100 sm:overflow-hidden">
        <div className=" absolute -left-20 top-0 hidden h-full  w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
            <ImageClipBox 
             clipClass="contact-clip-path-1"
             src="/img/contact-1.webp" 
            />
            <ImageClipBox 
             clipClass="contact-clip-path-2 lg:translate-y-10
              "
             src="/img/contact-2.webp" 
            />
            </div>
            <div className="absolute -top-40 left-20  w-60 sm:top-1/2 
            md:left-auto md:right-10 lg:top-20 lg:w-80  ">
                <ImageClipBox 
             src="/img/swordman-partial.webp" 
             clipClass="absolute md:scale-125 "
            />
            <ImageClipBox 
             src="/img/swordman.webp " 
             clipClass="sword-man-clip-path md:scale-125"
            />
            </div>
        <div className=" flex flex-col items-center text-center">
            <p className="font-general text-[15px] uppercase">
            Join Ravan Conquer Community
            </p>
            <p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:[5rem]">
            let's connect and <b>Conuqer</b> together!<br /> send us a message so we can help you<br/> <b>with any questions or concerns you may have.</b>
            </p>
            <Buttons className="mt-10 !bg-blue-100 cursor-pointer !text-violet-100 " 
            text="Contact Us "  rightIcon={<FaDiscord />} hrf="https://discord.gg/NNYaUGbe"/>
        </div>
      </div>
      </div>
        
  );
};

export default Contact;