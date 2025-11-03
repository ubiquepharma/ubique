"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"));

const HomeSlider = ({ sliders }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section>
      <div className="w-full h-auto">
        {Slider && (
          <Slider {...settings}>
            {sliders?.map((slide) => (
              <Image
                src={slide.image.secure_url}
                alt="slider"
                key={slide._id}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default HomeSlider;
