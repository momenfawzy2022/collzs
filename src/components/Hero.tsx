import { useEffect, useRef, useState } from "react";
import { Buttons } from "./Buttons";
import { TiLocation, } from "react-icons/ti";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


import { MainContainers } from "../App";

gsap.registerPlugin(ScrollTrigger);



const Hero =() =>{
    const backgroundvideo = useRef<HTMLVideoElement>(null)
    const totelvideos= 4;
    const [currentIndex , setcurentIndex] = useState(0);
    const heroRef = useRef <HTMLDivElement | null>(null);
    const [isLoading, setIsLoding] =useState(true);
    const timeoutMouseRef = useRef<ReturnType<typeof setTimeout> | null>();
    const [loadedVideo , setLoadedVideos] = useState(0);
//loerd Loding 
    useEffect(()=>{
      if( loadedVideo === totelvideos -1 ) setIsLoding(false);
    },[loadedVideo]);


    const nextindex = (currentIndex +1 ) % totelvideos ; 
    const handlenextvideo =()=>{
      setcurentIndex(nextindex);
      const animatedvideo = `#video-${nextindex}`;
      const videos=["#video-0", "#video-1" ,"#video-2","#video-3"] .filter((v)=> v !== animatedvideo);
      gsap.set(animatedvideo, {zIndex: 30, width : '16rem', height: '16rem' });
      const currentvideo: HTMLVideoElement | null =document.querySelector(animatedvideo);
      if(currentvideo){
        currentvideo.pause();
        currentvideo.currentTime = 0;
        currentvideo.play();
        //TransformStreamDefaultController: "center center",
      }
      gsap.set(videos, {zIndex: 20 });
      gsap.to(animatedvideo,{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", 
        width : "100%",
        height: "100%",transformOrigin:'center center',
      });
    }
    useEffect(() => {
    const handelMouseEvent = (e: MouseEvent) => {
     if(!backgroundvideo.current) return;
     if (timeoutMouseRef.current !== null) clearTimeout(timeoutMouseRef.current);
    timeoutMouseRef.current = setTimeout(()=>{
      gsap.to(backgroundvideo.current,{autoAlpha:0,direction:0.5});
    },1500);
    gsap.to(backgroundvideo.current,{autoAlpha:1});


     const { clientX, clientY } = e;
     const maxOffsetX = 50;
     const maxOffsetY = 50;
     console.log(clientX, clientY);
     const centerX = window.innerWidth  / 2;
     const centerY = window.innerHeight / 2;
    
    const constraindeX = Math.min(Math.max(clientX, centerX - maxOffsetX), centerX + maxOffsetX);
    const constraindeY = Math.min(Math.max(clientY, centerY - maxOffsetY), centerY + maxOffsetY);
    const polygonClipath = `polygon(
      ${Math.max(constraindeX  - 100, 0)}px ${Math.max(constraindeY - 100, 0 )}px,
      ${Math.min(constraindeX  + 100, window.innerWidth)}px ${Math.max(constraindeY - 100, 0)}px,
      ${Math.min(constraindeX  + 100, window.innerWidth)}px ${Math.min(constraindeY + 100, window.innerHeight)}px,
      ${Math.max(constraindeX  - 100, 0)}px ${Math.min(constraindeY + 100, window.innerHeight)}px
    )`;
    gsap.to(backgroundvideo.current,{
      clipPath:polygonClipath,
      direction:0.3,
      ease:"power1.out"

    })
    };

    //mousemovment
    const hero = heroRef.current;
    if(!hero) return;
    hero.addEventListener("mousemove",handelMouseEvent);
    return ()=> hero.removeEventListener("mousemove",handelMouseEvent);    
    },[]);
    //-----------------------------------------------
    useEffect(()=> {
      const ctx = gsap.context(()=>{
        gsap.set("#video-frame",{ clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)"})
        gsap.to("#video-frame",{
          scrollTrigger: {
            trigger:"#video-frame",
            start:"center 40%",
            end:"bottom center",
            scrub:true, 
            scroller: MainContainers,

          },
          clipPath: "polygon(10% 0, 72% 0, 90% 97%, 0 96%)",
        }); 
      });
      return()=> ctx.revert();
    },[]);

    return (
    
    <section className="relative h-dvh w-screen ">
    <div ref={heroRef} className="z-10 overflow-hidden bg-blue-50  h-dvh">
      
      {isLoading && ( 
      <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-blue-100">
        <div className="loader">
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
        <div className="loader__dot"></div>
      </div>
      </div>
      
    )}
        <div id="video-frame" className=" relative z-10 h-dvh w-screen overflow-hidden">
        <video 
        onClick={handlenextvideo}
        ref={backgroundvideo} 
        className=" invisible cursor-pointer absolute object-cover z-50 h-full w-full " 
        src={`/videos/hero-${nextindex}.mp4`}
         autoPlay
         loop
         muted
            />
        {Array.from({length: totelvideos},(_, index)=>(
          <video 
          key={index}
          id= {`video-${index}`}
          className=" object-cover z-10 top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2  h-full w-full" 
          src={`/videos/hero-${index}.mp4`} 
          autoPlay loop muted  
          onLoadedData={() =>setLoadedVideos((l)=> l +1 )}
          />
        ))}
        <h1 className=" special-font lg:text-[12rem] absolute z-40 bottom-5   
        uppercase sm:right-10 sm:text-7xl md:text-9xl text-blue-100 font-zentry font-[900]  "><b>C</b>onuq<b>e</b>r
        </h1>
        </div> 
        
     <div className="flex flex-col items-start gap-3 z-40 absolute top-20 left-5 px-5 " >
     <h1 
        className=" special-font lg:text-[11rem] 
          uppercase  sm:text-7xl md:text-9x  text-white-100 font-zentry font-[400] "><b>raven</b></h1> 
         <p className="mb-5 max-w-64 font-robert-regular text-white-100 font-200 text-lg">Battle Moments
          <br/> ReturnToGloryBattleMoments
          </p> 
         <Buttons rightIcon={<TiLocation/>} text="Watch Trailer"/>
         
     </div>
     </div>
     <h2 className="  lg:text-[12rem]  absolute bottom-5 
      uppercase sm:right-10 sm:text-7xl md:text-9xl text-blue-200 font-zentry font-[900]  ">
      Conuqer</h2>
     
          
          {/* <h2 className=" special-font lg:text-[12rem] absolute  bottom-5 
          uppercase sm:right-10 sm:text-7xl md:text-9xl text-violet-100 font-zentry font-[900]  ">Conuqer
          </h2>
         */}

    </section>

    );
        
    
};
export default Hero;