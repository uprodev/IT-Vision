let headerEl = document.querySelector('[data-header]');
if (headerEl) {
    let headerNavEl = document.querySelector('[data-header-nav]');
    let mainWrapper = document.querySelector('#smooth-wrapper');
    let pageScrollValue = window.pageYOffset;

    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 200) {
            if(window.pageYOffset > pageScrollValue) {
                headerEl.classList.add('header--scroll-down');
            } else if(window.pageYOffset < pageScrollValue) {
                headerEl.classList.remove('header--scroll-down');
            }
        } else {
            headerEl.classList.remove('header--scroll-down');
        }

        pageScrollValue = window.pageYOffset;
    })

    if(!this.utils.isMobile()) {
        headerEl.addEventListener('mouseenter', () => {
            headerEl.classList.add('headerEl--not-hide');
        })
        headerEl.addEventListener('mouseleave', () => {
            headerEl.classList.remove('headerEl--not-hide');
        })
    } else {
        let menuItemsHasChildren = headerEl.querySelectorAll('.menu-item-has-children');
        if(menuItemsHasChildren.length) {
            menuItemsHasChildren = Array.from(menuItemsHasChildren).map(i => ({el: i, subMenu: i.querySelector('.sub-menu')}));
            
            if(document.documentElement.clientWidth < 768) {
                menuItemsHasChildren.forEach(i => {
                    headerNavEl.append(i.subMenu);
                })
            }

            menuItemsHasChildren.forEach(manuItem => {
                manuItem.el.addEventListener('click', (e) => {
                    e.preventDefault();
                    if(manuItem.el.classList.contains('sub-menu-open')) {
                        manuItem.el.classList.remove('sub-menu-open');
                        manuItem.subMenu.classList.remove('sub-menu--open');
                        headerEl.classList.remove('headerEl--not-hide');
                        mainWrapper.classList.remove('sub-menu-open');
                        document.documentElement.classList.remove('overflow-hidden');
                    } else {
                        manuItem.el.classList.add('sub-menu-open');
                        manuItem.subMenu.classList.add('sub-menu--open');
                        headerEl.classList.add('headerEl--not-hide');
                        mainWrapper.classList.add('sub-menu-open');
                        document.documentElement.classList.add('overflow-hidden');
                    }

                    menuItemsHasChildren.forEach(i => {
                        if(i.el !== manuItem.el) {
                            i.el.classList.remove('sub-menu-open');
                            i.subMenu.classList.remove('sub-menu--open');
                        }
                    })
                })
            });

            document.addEventListener('click', (e) => {
                if(!e.target.closest('.menu-item-has-children')) {
                    headerEl.classList.remove('headerEl--not-hide');

                    menuItemsHasChildren.forEach(i => {
                        i.el.classList.remove('sub-menu-open');
                        i.subMenu.classList.remove('sub-menu--open');
                    });
                    mainWrapper.classList.remove('sub-menu-open');
                    document.documentElement.classList.remove('overflow-hidden');
                }
            })
        }
    }



    if (headerNavEl) {
        let mySwiper;
        let slider = headerNavEl;
        let activeEl = headerNavEl.querySelector('.header__nav-link.active');

        function mobileSlider() {
            if (document.documentElement.clientWidth <= 767.98 && slider.dataset.mobile == 'false') {
                mySwiper = new Swiper(slider, {
                    slidesPerView: 'auto',
                    speed: 600,
                    spaceBetween: 36,
                    freeMode: true,
                    //slideToClickedSlide: true,
                    watchOverflow: true,
                    watchSlidesVisibility: true,
                    initialSlide: activeEl ? Array.from(headerNavEl.firstElementChild.children).indexOf(activeEl.closest('.swiper-slide')) : 0,
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