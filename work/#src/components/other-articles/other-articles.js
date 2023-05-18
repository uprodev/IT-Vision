{
    let otherArticlesSlider = document.querySelector('[data-slider="other-articles"]');
    if(otherArticlesSlider) {
        let wrapper = otherArticlesSlider.querySelector('.swiper-wrapper');
        let sliderData = new Swiper(otherArticlesSlider.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            centeredSlides: true,
            loop: wrapper.children.length > 1 ? true : false,
            loopedSlides: 3,
            slideToClickedSlide: true,
            navigation: {
                nextEl: otherArticlesSlider.querySelector('.other-articles__btn-next'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoHeight: true,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    autoHeight: false,
                }
            }
        });
    }
}