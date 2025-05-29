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
                start: "top ",
                end: "+=7000",
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
                const animationDuration = 1000;
                const end = `+=${animationDuration}`;
                const mainanmation = gsap.timeline({paused: true})
                    .to(lineContainer, {autoAlpha: 1, height: "6rem"})
                    .to([paragraph, title], {scaleY: 1, autoAlpha: 1,}, "<")
                    .to(image, {scaleY: 4, scaleX: 4, autoAlpha: 1,  }, "<");

                ScrollTrigger.create({
                    scroller: MainContainers,
                    trigger: item,
                    start,
                    end,
                    animation: lineAnimationscrub,
                    scrub: 1,
                    onEnter: () => mainanmation.play(),
                    onLeave: () => mainanmation.reverse(),
                    onLeaveBack: () => mainanmation.reverse(),
                    onEnterBack: () => mainanmation.play(),
                });
                cumlativeOffset += animationDuration;
            });

            ScrollTrigger.create({
                trigger: "#Pin-last",
                start: "8% top",
                end: "+=6000 top",
                scroller: MainContainers,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(".pagination", {
                        y: gsap.utils.interpolate(0, -1000, progress),
                        ease: "none",
                    });
                },
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="Pin-last" className='relative min-h-[100vh] w-screen overflow-hidden bg-white-70'>
            <div className='absolute max-w-64 left-10 top-10 flex flex-col gap-4'></div>
            <AnimatedTitel text="</b>Classes<br/>" className="ele lg:mt-32 mt-10 !items-start !p-0 !pl-0 !text-blue-200" />
            <div className="lg:mx-0 mx-auto pl-10"></div>

            <div className="flex mt-8 flex-col pl-8 items-start">
                <PaginationItem 
                    num="01"
                    text="Warrior"
                    desc="The Warrior is a powerful melee class, excelling in close combat with high damage and durability"
                    img="/img/classe/c1.png"
                />
                <PaginationItem
                    num="02"
                    text="Mage"
                    desc="The Mage is a spellcaster class, specializing in elemental magic and dealing massive damage from a"
                    img="/img/classe/c2.png"
                />
                <PaginationItem
                    num="03"
                    text="Archer"
                    desc="The Archer is a ranged class, using bows and arrows to attack enemies from a distance with precision."
                    img="/img/classe/c6.png"
                />
                <PaginationItem
                    num="04"
                    text="Assassin"
                    desc="The Assassin is a stealthy class, focusing on agility and critical strikes to eliminate targets quickly."
                    img="/img/classe/c8.png"
                />
                <PaginationItem
                    num="05"
                    text="Priest"
                    desc="The Priest is a support class, providing healing and buffs to allies while also dealing damage to enemies."
                    img="/img\New folder (2)/Screenshot_6.png"
                />
                <PaginationItem
                    num="06"
                    text="Paladin"
                    desc="The Paladin is a holy warrior class, using martial prowess and divine magic to protect allies and smite foes."
                    img="/img\New folder (2)/Screenshot_4.png"
                />
                
                <PaginationItem
                    num="07"
                    text="Njnja"
                    desc="The Paladin is a holy warrior class, using martial prowess and divine magic to protect allies and smite foes."
                    img="/img\New folder (2)/Screenshot_2.png"
                />
            </div>
        </section>
    );
}

export default Pin;