import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import './style.css';
import { Autoplay, EffectCube } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faTv, faBolt, faGasPump, faWater, faMoneyCheckAlt, faChartLine } from '@fortawesome/free-solid-svg-icons'; // Import relevant icons

const Slider2 = () => {


    return (
        <div className={``}>
            <h1 className='mt-16 text-4xl text-bold text-center text-[#0d355b]'>Our Service</h1>
        <Swiper
            effect={'cube'}
            grabCursor={true}
            cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            }}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectCube]}
            className="mySwiper"
        >
            <SwiperSlide>
                <FontAwesomeIcon icon={faMobileAlt} size="5x" className=" text-[#0d355b] mt-10" />
                <h1 className='mt-6 text-xl text-[#0d355b]'>Mobile Recharge</h1>
            </SwiperSlide>
            <SwiperSlide>
                <FontAwesomeIcon icon={faTv} size="5x" className=" text-[#0d355b] mt-10" />
                <h1 className='mt-6 text-xl text-[#0d355b]'>DTH Recharge</h1>
            </SwiperSlide>
            <SwiperSlide>
                <FontAwesomeIcon icon={faBolt} size="5x" className=" text-[#0d355b] mt-10" />
                <h1 className='mt-6 text-xl text-[#0d355b]'>Electricity Bill</h1>
            </SwiperSlide>
            <SwiperSlide>
                <FontAwesomeIcon icon={faGasPump} size="5x" className=" text-[#0d355b] mt-10" />
                <h1 className='mt-6 text-xl text-[#0d355b]'>Gas Bill</h1>
            </SwiperSlide>
            <SwiperSlide>
                <FontAwesomeIcon icon={faWater} size="5x" className=" text-[#0d355b] mt-10" />
                <h1 className='mt-6 text-xl text-[#0d355b]'>Water Bill</h1>
            </SwiperSlide>
            <SwiperSlide>
                <FontAwesomeIcon icon={faMoneyCheckAlt} size="5x" className=" text-[#0d355b] mt-10" />
                <h1 className='mt-6 text-xl text-[#0d355b]'>Pay to Account</h1>
            </SwiperSlide>
            <SwiperSlide>
                <FontAwesomeIcon icon={faChartLine} size="5x" className=" text-[#0d355b] mt-10" />
                <h1 className='mt-6 text-xl text-[#0d355b]'>Loan & EMI</h1>
            </SwiperSlide>
        </Swiper>
        </div>
    );
};

export default Slider2;
