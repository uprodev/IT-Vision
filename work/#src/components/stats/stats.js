{
    let statsSection = document.querySelector('[data-stats]');
    if (statsSection) {
        let numElements = statsSection.querySelectorAll('.stats__num span');
        if (numElements.length) {
            numElements.forEach(el => {
                gsap.from(el, {
                    textContent: 0,
                    duration: 0.4,
                    snap: { textContent: 1 },
                    stagger: 1,
                    // onUpdate: textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 75%',
                    }
                });
            })

        }
    }
}