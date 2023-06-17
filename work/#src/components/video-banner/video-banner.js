{
    let videoBanners = document.querySelectorAll('[data-video-banner]');
    if(videoBanners.length) {
        videoBanners.forEach(async videoBanner => {
            let video = videoBanner.querySelector('video');
            let btnPlay = videoBanner.querySelector('.video-banner__icon-play');
            if(video) {
                btnPlay.addEventListener('click', () => {
                    video.setAttribute('controls', true);
                    video.play();
                    btnPlay.classList.add('d-none');
                });
            }
        })
    }
}