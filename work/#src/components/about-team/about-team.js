{
    let aboutTeamSlider = document.querySelector('[data-slider="about-team-slider"]');
    if(aboutTeamSlider) {
        let sliderData = new Swiper(aboutTeamSlider.querySelector('.swiper'), {
            
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            loop: true,
            loopedSlides: 3,
        });
    }
}