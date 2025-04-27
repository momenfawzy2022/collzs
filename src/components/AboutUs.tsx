import { useEffect } from "react"
import AnimatedTitel from "./AnimatedTitel"
import gsap from "gsap"


export const AboutUs = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".mask-clip-path", {clipPath: "polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)"});
      gsap.timeline({
        scrollTrigger: {
           scroller: ".main-container",
          trigger: "#clip",
          start: "56% center",
          end:   "+=900 center",
          scrub: 0.5,
          pin: true,
          markers: true,
          onUpdate: (self) => {
            const progress = self.progress;
            console.log(progress);
            const clipvalue = `
            polygon(
              ${gsap.utils.interpolate(14,0, progress)}% 0%,
              ${gsap.utils.interpolate(82,100, progress)}% 0%,
              ${gsap.utils.interpolate(80,100, progress)}% 100%,
              ${gsap.utils.interpolate(6,0, progress)}% 100%
              )
              `;
            gsap.to(".mask-clip-path", {
               clipPath: clipvalue,
            });
          },
      },
    })
    .to (".mask-clip-path", {width: '100vw', height: "100vh", })
    });
    return () => ctx.revert()
  },[])
  return (
    <section  className=" bg-blue-50 min-h-dvh w-screen  overflow-hidden overflow-x-hidden relative ">
        <div className="flex mt-36 flex-col gap-5 items-center">
            <span className="text-xl  lg:text-[15px] text-center font-general">Welome to Revan Conuqer</span>
           < AnimatedTitel  className={`!text-violet-100`} 
           text={`The most popular <b>Conquer</b> private server with epic `}
           />
        </div>
        <div id="clip" className="h-dvh relative  w-screen ">
          <div className=" mask-clip-path w-[30vw]  mt-10  overflow-hidden rounded-2xl border border-violet-100 h-96 absolute left-1/2 -translate-x-1/2 top-0  ">  
            <img src="./img\co1.jpg" className="absolute  inset-0 size-full object-cover bg-cover bg-center " alt="" />
            
          </div>
        </div>
    </section>
  )
} 

