{
    let footerLabelEl = document.querySelector('[data-footer-label]');
    if (footerLabelEl) {
        gsap.from(footerLabelEl, {
            opacity: 0,
            y: '50%',
            scrollTrigger: {
                trigger: footerLabelEl,
                scrub: 2,
                stagger: 0.1,
                start: 'top 110%',
                end: '+=200',
            }
        })
    }

}