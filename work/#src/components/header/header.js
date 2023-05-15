let headerEl = document.querySelector('[data-header]');
if (headerEl) {
    let pageScrollValue = window.pageYOffset;

    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 200) {
            if(window.pageYOffset > pageScrollValue) {
                headerEl.classList.add('header--scroll-down');
            } else if(window.pageYOffset < pageScrollValue) {
                headerEl.classList.remove('header--scroll-down');
            }
        }

        pageScrollValue = window.pageYOffset;
    })



    let headerNavEl = document.querySelector('[data-header-nav]');
    if (headerNavEl) {
        let mySwiper;
        let slider = headerNavEl;

        function mobileSlider() {
            if (document.documentElement.clientWidth <= 767.98 && slider.dataset.mobile == 'false') {
                mySwiper = new Swiper(slider, {
                    slidesPerView: 'auto',
                    speed: 600,
                    spaceBetween: 36,
                    freeMode: true,
                    slideToClickedSlide: true,
                    watchOverflow: true,
                    watchSlidesVisibility: true,
                    initialSlide: Array.from(headerNavEl.firstElementChild.children).indexOf(headerNavEl.querySelector('.header__nav-link.active').closest('.swiper-slide')),
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