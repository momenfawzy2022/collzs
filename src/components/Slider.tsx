import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  if (!images.length) return null;
  return (
    <div className="w-full flex flex-col items-center justify-center mt-0 min-h-screen bg-black">
      <h2 className="text-2xl md:text-3xl font-bold  mb-6 mt-[3px]">News</h2>
      <div className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center overflow-visible bg-[#23294a] rounded-2xl shadow-xl border border-yellow-200/10">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          effect="coverflow"
          loop
          centeredSlides
          slidesPerView={1.5}
          autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: false, stopOnLastSlide: false, waitForTransition: true }}
          speed={700}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1.2,
            slideShadows: false,
          }}
          className="w-full h-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  draggable={false}
                />
                {/* يمكنك إضافة عنوان أو وصف هنا إذا أردت */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
