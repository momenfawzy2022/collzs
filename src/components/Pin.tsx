import { useEffect } from 'react';
import AnimatedTitel from './AnimatedTitel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MainContainers } from '../App';
import PaginationItem from './PaginationItem';

gsap.registerPlugin(ScrollTrigger);

function Pin() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".pagination");
      const paragraphs = gsap.utils.toArray(".pagination p");
      const lineContainers = gsap.utils.toArray(".lineContainer");
      const images = gsap.utils.toArray(".pagination img");
      const fixedImage = document.getElementById('fixed-image') as HTMLImageElement;

      gsap.set(paragraphs, { opacity: 0.3, scaleY: 0, visibility: "hidden" });
      gsap.set(lineContainers, { opacity: 0, visibility: "hidden", height: 0 });
      gsap.set(images, { opacity: 0.3, scaleY: 0, visibility: "hidden" });

      ScrollTrigger.create({
        scroller: MainContainers,
        start: "top top",
        end: "+=8000 top",
        pinSpacing: false,
        trigger: "#Pin-last",
      });

      let cumlativeOffset = 0;
      const animationDuration = 1000; // قللنا التوقيت لتسريع ظهور الصور

      items.forEach((item, idx) => {
        if (!item || !(item instanceof HTMLElement)) return;
        const lineContainer = item.querySelector(".lineContainer");
        const line = item.querySelector(".line");
        const paragraph = item.querySelector("p");
        const title = item.querySelector("h4");
        const image = item.querySelector("img");
        // النص الذي سيظهر مع كل صورة
        const textForImage = title?.textContent || '';
        const fixedText = document.getElementById('fixed-image-text');

        const lineAnimationscrub = gsap.timeline({ paused: true }).to(line, { y: 100 });

        const start = `${cumlativeOffset} center`;
        const end = `+=${animationDuration}`;

        const mainanmation = gsap.timeline({ paused: true, delay: 0.2 })
          .to(lineContainer, { autoAlpha: 1, height: "6rem", duration: 0.4 })
          .to([paragraph, title], { scaleY: 1, autoAlpha: 1, duration: 0.4 }, "<");

        ScrollTrigger.create({
          scroller: MainContainers,
          trigger: item,
          start,
          end,
          animation: lineAnimationscrub,
          scrub: 1.5,
          onEnter: () => {
            if (fixedImage && image?.getAttribute("src")) {
              // Fade out all hidden images with scale effect
              for (let i = 1; i <= items.length; i++) {
                gsap.to(`#hidden-img-0${i}`, { autoAlpha: 0, scale: 0.85, duration: 0.15, ease: "power2.inOut" });
              }
              // Fade in the current image with scale up
              gsap.to(`#hidden-img-0${idx + 1}`, { autoAlpha: 1, scale: 1, duration: 0.12, ease: "power2.inOut" });
              gsap.to(fixedImage, { autoAlpha: 1, scale: 1, duration: 0.1, ease: "power2.inOut" });
              fixedImage.src = image.getAttribute("src")!;
              gsap.to(fixedImage, { autoAlpha: 1, scale: 1, duration: 0.18, ease: "power2.inOut" });
            }
            // إظهار النص مع الصورة
            if (fixedText) {
              fixedText.textContent = textForImage;
              gsap.to(fixedText, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.inOut" });
            }
            mainanmation.play();
          },
          onLeave: () => {
            gsap.to(fixedImage, { autoAlpha: 0, scale: 0.85, duration: 0.18, ease: "power2.inOut" });
            gsap.to(`#hidden-img-0${idx + 1}`, { autoAlpha: 0, scale: 0.85, duration: 0.09, ease: "power2.inOut" });
            gsap.to(fixedImage, { autoAlpha: 0, scale: 0.85, duration: 0.09, ease: "power2.inOut" });
            if (fixedText) gsap.to(fixedText, { autoAlpha: 0, y: 40, duration: 0.18, ease: "power2.inOut" });
            mainanmation.reverse();
          },
          onLeaveBack: () => {
            gsap.to(fixedImage, { autoAlpha: 0, scale: 0.85, duration: 0.18, ease: "power2.inOut" });
            gsap.to(`#hidden-img-0${idx + 1}`, { autoAlpha: 0, scale: 0.85, duration: 0.09, ease: "power2.inOut" });
            gsap.to(fixedImage, { autoAlpha: 0, scale: 0.85, duration: 0.09, ease: "power2.inOut" });
            if (fixedText) gsap.to(fixedText, { autoAlpha: 0, y: 40, duration: 0.18, ease: "power2.inOut" });
            mainanmation.reverse();
          },
          onEnterBack: () => {
            if (fixedImage && image?.getAttribute("src")) {
              // Fade out all hidden images with scale effect
              for (let i = 1; i <= items.length; i++) {
                gsap.to(`#hidden-img-0${i}`, { autoAlpha: 0, scale: 0.85, duration: 0.15, ease: "power2.inOut" });
              }
              // Fade in the current image with scale up
              gsap.to(`#hidden-img-0${idx + 1}`, { autoAlpha: 1, scale: 1, duration: 0.12, ease: "power2.inOut" });
              gsap.to(fixedImage, { autoAlpha: 1, scale: 1, duration: 0.1, ease: "power2.inOut" });
              fixedImage.src = image.getAttribute("src")!;
              gsap.to(fixedImage, { autoAlpha: 1, scale: 1, duration: 0.18, ease: "power2.inOut" });
            }
            if (fixedText) {
              fixedText.textContent = textForImage;
              gsap.to(fixedText, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.inOut" });
            }
            mainanmation.play();
          },
        });

        cumlativeOffset += animationDuration;
      });

      ScrollTrigger.create({
        trigger: "#Pin-last",
        start: "10% top top",
        end: "+=9000 top",
        scroller: MainContainers,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".pagination", {
            y: gsap.utils.interpolate(0, -1000, progress),
            ease: "none",
          });
        },
      });

      ScrollTrigger.create({
        trigger: "#Pin-last",
        start: "top top",
        end: "+=200",
        scroller: MainContainers,
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".classes-title", {
            opacity: 1 - self.progress,
            duration: 0.1,
            ease: "none",
          });
        },
      });

      gsap.fromTo(
        "#Pin-last",
        { scale: 0.85, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          duration: 3.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#Pin-last",
            scroller: MainContainers,
            start: "top 80%",
            end: "top 60%",
            scrub: false,
            once: true,
          },
        }
      );

      // ScrollTrigger للانتقال التلقائي بعد آخر صورة
      if (items.length > 0 && items[items.length - 1] instanceof HTMLElement) {
        ScrollTrigger.create({
          trigger: items[items.length - 1] as HTMLElement,
          start: `bottom center`,
          end: `bottom top`,
          scroller: MainContainers,
          onEnter: () => {
            const nextSection = document.querySelector('#Pin-last')?.nextElementSibling;
            if (nextSection) {
              gsap.to(window, {
                scrollTo: { y: nextSection, offsetY: 0 },
                duration: 1.2,
                ease: 'power2.inOut',
              });
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="Pin-last" className="relative w-full overflow-hidden mt-0 mb-0 p-0" style={{ minHeight: 'unset', height: 'auto' }}>
      {/* Fixed image in center */}
      <img
        id="fixed-image"
        src=""
        alt="Fixed Character"
        style={{
          position: 'fixed',
          top: '50%',
          left: '48%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          opacity: 0,
          width: '700px',
          height: 'auto',
          pointerEvents: 'none',
          transition: 'all 0.3s ease-in-out',
        }}
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-auto h-auto object-cover z-0"
      >
        <source src="/img/bg/loading.mp4" type="video/mp4" />
      </video>

      <AnimatedTitel text="</b>Classes<br/>" className="classes-title !text-violet-150 ele lg:mt-24 mt-8 !items-start !p-0 !pl-0 z-10" />

      <div className="flex flex-col items-center justify-center h-screen relative z-10">
        <div className="pagination-container flex flex-col items-center justify-center" style={{opacity: 0, position: 'absolute', pointerEvents: 'none', width: 0, height: 0}}>
          <PaginationItem num="01" text="Trojan" desc="The Warrior is a powerful melee class..." img="img/classe/zy-ys2.webp" />
          <PaginationItem num="02" text="Mage" desc="The Mage is a spellcaster class..." img="img/classe/zy-hds-20211201.webp" />
          <PaginationItem num="03" text="Archer" desc="The Archer is a ranged class..." img="img/classe/zy-gs-20210621.webp" />
          <PaginationItem num="04" text="Warrior" desc="The Assassin is a stealthy class..." img="img/classe/zy-zs.webp" />
          <PaginationItem num="05" text="Priest" desc="The Priest is a support class..." img="img/classe/zy-hhj.webp" />
          <PaginationItem num="06" text="Windwalker" desc="The Paladin is a holy warrior..." img="img/classe/zy-tsm.webp" />
          <PaginationItem num="07" text="Njnja" desc="The Paladin is a holy warrior..." img="img/classe/zy-rz-20211013.webp" />
          <PaginationItem num="08" text="Monk" desc="The Paladin is a holy warrior..." img="img/classe/zy-ws.webp" />
          <PaginationItem num="09" text="Dragon-warrior" desc="The Paladin is a holy warrior..." img="img/classe/zy-xl.webp" />
        </div>
      </div>

    
   

      {/* نص متغير يظهر مع كل صورة */}
      <div id="fixed-image-text" style={{
        position: 'fixed',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        zIndex: 30,
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '0 2px 8px #000',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'all 0.4s',
        textAlign: 'center',
        minWidth: '300px',
      }}>
      </div>
    </section>
  );
}

export default Pin;
