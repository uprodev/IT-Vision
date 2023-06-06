{
    let parallaxCoverSection = document.querySelector('.parallax-cover-section');
    if(parallaxCoverSection) {
        let inner = parallaxCoverSection.querySelector('.parallax-cover-section__inner');
        let firstChild = inner.firstElementChild;
        if(firstChild) {
            let attrValue = inner.getAttribute('data-scroll-parallax');
            if(attrValue) {
                inner.removeAttribute('data-scroll-parallax');
                firstChild.setAttribute('data-scroll-parallax', attrValue);
            }
        }
    }
}