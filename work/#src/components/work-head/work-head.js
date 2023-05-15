{
    let workHeadNavEl = document.querySelector('[data-work-head-nav]');
    if (workHeadNavEl) {
        let mySwiper;
        let slider = workHeadNavEl;

        function mobileSlider() {
            if (document.documentElement.clientWidth <= 767.98 && slider.dataset.mobile == 'false') {
                mySwiper = new Swiper(slider, {
                    slidesPerView: 'auto',
                    speed: 600,
                    spaceBetween: 16,
                    freeMode: true,
                    slideToClickedSlide: true,
                    watchOverflow: true,
                    watchSlidesVisibility: true,
                    initialSlide: Array.from(workHeadNavEl.firstElementChild.children).indexOf(workHeadNavEl.querySelector('.work-head__nav-link.active').closest('.swiper-slide')),
                });

                slider.dataset.mobile = 'true';
            }

            if (document.documentElement.clientWidth > 767.98) {
                slider.dataset.mobile = 'false';

                if (slider.classList.contains('swiper-initialized')) {
                    mySwiper.destroy();
                }
            }
        }

        mobileSlider();

        window.addEventListener('resize', () => {
            mobileSlider();
        })
    }
}