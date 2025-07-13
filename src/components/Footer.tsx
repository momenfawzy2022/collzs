import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';
import { FaDiscord, FaTwitter, FaGithub, FaTwitch } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: 'https://discord.com', icon: <FaDiscord /> },
  { href: 'https://twitter.com', icon: <FaTwitter /> },
  { href: 'https://github.com', icon: <FaGithub /> },
  { href: 'https://twitch.com', icon: <FaTwitch /> }, // Fixed icon
]

const Footer = () => {
  return (
     <footer className="w-screen h-50 bg-violet-300 py-10 text-black my-5">
      <div className="container mx-auto flex flex-col items-center justify-between gap-20 px-20 md:flex-row ">
        <p className="text-center text-sm md:text-left">
          &copy; Ravan 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link, idx) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
            className="text-blue-200 transition-colors duration-500 ease-in-out hover:text-blue-100">
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer