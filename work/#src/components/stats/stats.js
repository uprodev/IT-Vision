{
    let statsSections = document.querySelectorAll('[data-stats]');
    if (statsSections.length) {
        statsSections.forEach(statsSection => {
            let isLoad = statsSection.dataset.stats === 'load' ? true : false;
            let numElements = statsSection.querySelectorAll('.stats__num');
            if (numElements.length) {
                numElements.forEach(el => {
                    let num = parseInt(el.innerText);
                    let sign = el.innerText.match(/[^0-9]$/);
                    el.innerHTML = `<span>${num}</span>${sign ? sign : ''}`;
                    gsap.from(el.firstElementChild, {
                        textContent: 0,
                        duration: isLoad ? 0.8 : 0.4,
                        snap: { textContent: 1 },
                        stagger: 1,
                        delay: isLoad ? 0.8 : 0,
                        // onUpdate: textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 75%',
                        }
                    });
                })
    
            }
        })
    }
}