import { useEffect } from 'react'
import AnimatedTitel from './AnimatedTitel'
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

            gsap.set(paragraphs, { opacity: 0.3, scaleY: 0, visibility: "hidden" });
            gsap.set(lineContainers, { opacity: 0, visibility: "hidden", height: 0 });
            gsap.set(images, { opacity: 0.3, scaleY: 0, visibility: "hidden" });

            ScrollTrigger.create({
                scroller: MainContainers,
                start: "top top",
                end: "+=9000 top",
                pinSpacing: false,
                trigger: "#Pin-last",
                
                
                
            });

            let cumlativeOffset = 0;
            items.forEach((item) => {
                if (!item || !(item instanceof HTMLElement)) return;
                const lineContainer = item.querySelector(".lineContainer");
                const line = item.querySelector(".line");
                const paragraph = item.querySelector("p");
                const title = item.querySelector("h4");
                const image = item.querySelector("img");

                const lineAnimationscrub = gsap.timeline({paused: true}).to(line, {y: 100});
                const start = `${cumlativeOffset} center`;
                const animationDuration = 1000; // مدة الانتقال بين الصور
                const end = `+=${animationDuration}`;
                const mainanmation = gsap.timeline({paused: true})
                    .to(lineContainer, {autoAlpha: 1, height: "6rem", duration: 1})
                    .to([paragraph, title], {scaleY: 1, autoAlpha: 1, duration: 1}, "<")
                    .to(image, {scaleY: 4, scaleX: 4, autoAlpha: 1, duration: 1}, "<");

                ScrollTrigger.create({
                    scroller: MainContainers,
                    trigger: item,
                    start,
                    end,
                    animation: lineAnimationscrub,
                    scrub: 1,
                    onEnter: () => {
                        mainanmation.play();
                        gsap.to(image, {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", duration: 0});
                    },
                    onLeave: () => mainanmation.reverse(),
                    onLeaveBack: () => mainanmation.reverse(),
                    onEnterBack: () => {
                        mainanmation.play();
                        gsap.to(image, {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", duration: 0});
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

            // ScrollTrigger لإخفاء العنوان مع السحب لأسفل
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

            // Zoom-in animation on Pin section entrance
            gsap.fromTo(
                "#Pin-last",
                { scale: 0.85, opacity: 0.7 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 3.5, // تم زيادة المدة
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
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="Pin-last" className='relative w-full overflow-hidden -70 mt-0 mb-0 p-0' style={{minHeight: 'unset', height: 'auto'}}>
            {/* خلفية فيديو */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-auto h-auto object-cover z-0"
            >
                <source src="/img/bg/loading.mp4" type="video/mp4" />
            </video>
            <div className='absolute max-w-64 left-10 top-0 flex flex-col gap-2 z-10'></div>
            <AnimatedTitel  text="</b>Classes<br/>" className="classes-title !text-violet-150 ele lg:mt-24 mt-8 !items-start !p-0 !pl-0 z-10" />
            <div className="lg:mx-0 mx-auto pl-10 z-10"></div>

            <div className="flex flex-col items-center justify-center h-screen relative z-10">
                <div className="pagination-container flex flex-col items-center justify-center">
                    <PaginationItem 
                        num="01"
                        text="Trojan"
                        desc="The Warrior is a powerful melee class, excelling in close combat with high damage and durability"
                        img="img/classe/character_lycan.png"
                    />
                    <PaginationItem
                        num="02"
                        text="Mage"
                        desc="The Mage is a spellcaster class, specializing in elemental magic and dealing massive damage from a"
                        img="img/classe/zy-hds-20211201.webp"
                    />
                    <PaginationItem
                        num="03"
                        text="Archer"
                        desc="The Archer is a ranged class, using bows and arrows to attack enemies from a distance with precision."
                        img="img/classe/zy-gs-20210621.webp"
                    />
                    <PaginationItem
                        num="04"
                        text="warrior"
                        desc="The Assassin is a stealthy class, focusing on agility and critical strikes to eliminate targets quickly."
                        img="img/classe/character_warrior_m.png"
                    />
                    <PaginationItem
                        num="05"
                        text="Priest"
                        desc="The Priest is a support class, providing healing and buffs to allies while also dealing damage to enemies."
                        img="img/classe/zy-hhj.webp"
                    />
                    <PaginationItem
                        num="06"
                        text="Windwalker"
                        desc="The Paladin is a holy warrior class, using martial prowess and divine magic to protect allies and smite foes."
                        img="img/classe/zy-tsm.webp"
                    />
                    <PaginationItem
                        num="07"
                        text="Njnja"
                        desc="The Paladin is a holy warrior class, using martial prowess and divine magic to protect allies and smite foes."
                        img="img/classe/zy-rz-20211013.webp"
                    />
                    <PaginationItem
                        num="08"
                        text="Monk"
                        desc="The Paladin is a holy warrior class, using martial prowess and divine magic to protect allies and smite foes."
                        img="img/classe/zy-ws.webp"
                    />
                    <PaginationItem
                        num="09"
                        text="Drgon-warrior"
                        desc="The Paladin is a holy warrior class, using martial prowess and divine magic to protect allies and smite foes."
                        img="img/classe/zy-xl.webp"
                    />
                </div>
            </div>
        </section>
    );
}

export default Pin;