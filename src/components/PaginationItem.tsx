import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PaginationItem({
  text,
  desc,
  num,
  img,
}: {
  text: string;
  desc: string;
  num: string;
  img?: string;
}) {
  return (
    <div className="pagination flex text-black items-start" data-num={num}>
      <div className="flex flex-col items-center mr-1">
        <span className="text-xs lg:text-[10px] font-general mt-[0.6px]">{num}</span>
        <span className="lineContainer bg-blue-75 relative overflow-hidden rounded-xl mt-4 w-1 h-24">
          <span className="bg-violet-300 absolute line -translate-y-full top-0 rounded-xl mt-4 w-1 h-24"></span>
        </span>
      </div>
      <div className="flex pagination2 flex-col gap-2 relative font-robert-regular flex-1">
        <h4 className="title text-lg lg:text-xl font-extrabold text-violet-150 mb-1">{text}</h4>
        <div className="h-auto mt-2 flex items-center justify-between">
          <p className="max-w-64 text-sm lg:text-lg font-circular-web text-violet-150">{desc}</p>
          <div style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}>
            {/* جميع الصور تظهر هنا بشكل مخفي مع أنيميشن fade-in/fade-out */}
            {img && (
              <img
                src={img}
                alt="logo"
                className="pagination-hidden-img"
                style={{
                  display: 'block',
                  opacity: 0,
                  transition: 'opacity 0.5s',
                  position: 'absolute',
                  zIndex: -1,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginationItem;
