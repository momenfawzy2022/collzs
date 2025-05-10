import { useEffect, useRef } from "react";
import { MainContainers } from "../App";
import gsap from "gsap";

 const AnimatedTitel = ({text , className}: {text:string , className?:string}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
      useEffect(()=>{
         const ctx = gsap.context (()=> {
          if(!containerRef.current) return ; 
          gsap.timeline({
            scrollTrigger :{
              trigger: containerRef.current,
              start: "top bottom",
              scroller: MainContainers,
              scrub: true,
              toggleActions: "play none none reverse",
            },
          }).to (containerRef.current?.querySelectorAll(".anmited-word"),{
           opacity: 1,
           transform: `translate3d(0,0,0) rotateY(0deg) rotateX(0deg)`,
           stagger: 0.05,
           ease: "power2.out",
          })
         });
         return () => ctx.revert()
      },[]);
  return (
    <div ref={containerRef} className={`${className} animated-titles`}>
        {text.split("<br/>").map((line, index) => (
          <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
            {line.split(" ").map((word, i) => (
             <span className='anmited-word' dangerouslySetInnerHTML={{__html:word}} key={i} />  
            ))}  
          </div> 
        ))}
    </div>
  );
};

export default AnimatedTitel