{
    let instagramSlider = document.querySelector('[data-slider="instagram-slider"]');
    if(instagramSlider) {
        let sliderData = new Swiper(instagramSlider.querySelector('.swiper'), {
            
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            loop: true,
            loopedSlides: 3,
            touchRatio: 0,
        });
    }
}