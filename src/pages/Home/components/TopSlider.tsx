import { slider1, slider2 } from "@/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function TopSlider() {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // adaptiveHeight: true
      };

    return (
        <>
            <Slider {...settings}>
                <div className="item-slider">
                    <img src={slider1} alt="" />
                    <div className="slider-content">
                        <h2 className="title">Have You Got Yours?</h2>
                        <p>Our brand-new medical supplies <br /> catalogue is out now!</p>
                        <div className="slider-btn">
                            <a type="button" className="action btn hero-btn theme-btn-1" data-toggle="modal" data-target="#requestCopy">Request A Copy</a>
                            <a href="/publications/" className="btn hero-btn theme-btn-1" target="_blank">View Online</a>
                        </div>
                    </div>
                </div>
                <div className="item-slider">
                    <img src={slider2} alt="" />
                </div>
            </Slider>
        </>
    );
}

export default TopSlider;