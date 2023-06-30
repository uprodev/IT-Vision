{
    //data-magnetic data-cursor="-lg"

    const setCursorAnimations = () => {
        let buttons = document.querySelectorAll('.header__logo a, .header__button, [data-hover-text], .social a, .product-head__link, .video-banner__icon-play, .work-preview-card__label, .reviews__btn-next');
        if (buttons.length) {
            buttons.forEach(btn => {
                if (btn.classList.contains('handling')) return;

                btn.classList.add('handling');
                btn.setAttribute('data-cursor', '-lg');

                const style = getComputedStyle(btn);

                if (style.transform === 'none') {
                    new window.Magnetic(btn);
                }
            })
        }

    }
    setCursorAnimations();

    window.pageSmoothScroll.listOfUpdateFunctions.push(setCursorAnimations);
}