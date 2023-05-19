class Utils {
	slideUp(target, duration = 500) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideDown(target, duration = 500) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideToggle(target, duration = 500) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return this.slideDown(target, duration);
			} else {
				return this.slideUp(target, duration);
			}
		}
	}

	isSafari() {
		let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		return isSafari;
	}

	Android() {
		return navigator.userAgent.match(/Android/i);
	}
	BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	isMobile() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
	}

	scrollTrigger(el, value, callback) {
		let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
		const trigger = () => {
			if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
				if(typeof callback === 'function') {
					callback();
					el.classList.add('is-show')
				}
			}
		}
	
		trigger();
	
		window.addEventListener('scroll', trigger);
	}

	numberCounterAnim() {
		let counterItems = document.querySelectorAll('[data-number-counter-anim]');
		if (counterItems) {
	
			counterItems.forEach(item => {
				let animation = anime({
					targets: item,
					textContent: [0, item.innerText],
					round: 1,
					easing: 'linear',
					autoplay: false,
					duration: 1000
				});
	
				window.addEventListener('load', () => {
					this.scrollTrigger(item, 15, () => {animation.play()})
				})
			})
		}
	}

	initTruncateString() {
		function truncateString(el, stringLength = 0) {
			let str = el.innerText;
			if (str.length <= stringLength) return;
			el.innerText = str.slice(0, stringLength) + '...';
		}

		let truncateItems = document.querySelectorAll('[data-truncate-string]');
		if(truncateItems.length) {
			truncateItems.forEach(truncateItem => {
				truncateString(truncateItem, truncateItem.dataset.truncateString);
			})
		}
	}

	replaceToInlineSvg(query) {
		const images = document.querySelectorAll(query);

		if(images.length) {
			images.forEach(img => {
					let xhr = new XMLHttpRequest();
					xhr.open('GET', img.src);
					xhr.onload = () => {
						if (xhr.readyState === xhr.DONE) {
							if (xhr.status === 200) {
								let svg = xhr.responseXML.documentElement;
								svg.classList.add('_svg');
								img.parentNode.replaceChild(svg, img);
							}
						}
					}
					xhr.send(null);
			})
		}
	}

	setSameHeight() {
		let elements = document.querySelectorAll('[data-set-same-height]');
		if(elements.length) {
			const getGropus = (elements) => {
				let obj = {};

				elements.forEach(el => {
					let id = el.dataset.setSameHeight;
					if(obj.hasOwnProperty(id)) {
						obj[id].push(el);
					} else {
						obj[id] = [el];
					}
				})

				return obj;
			}
			const setMinHeight = (groups) => {
				for(let key in groups) {
					let maxHeight = Math.max(...groups[key].map(i => i.clientHeight));
					
					groups[key].forEach(el => {
						el.style.minHeight = maxHeight + 'px';
					})
				}
			}

			let groups = getGropus(elements);

			if(document.documentElement.clientWidth > 767.98) {
				setMinHeight(groups);
			}
		}
	}

	setFullHeaghtSize() {
		let elments = document.querySelectorAll('[data-full-min-height]');
		if(elments.length) {
			elments.forEach(el => {
				const setSize = () => {
					el.style.minHeight = document.documentElement.clientHeight + 'px';
				}

				setSize();

				window.addEventListener('resize', setSize);
			})
		}
	}
}


;
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
	  this.type = type;
	}
  
	init() {
	  this.оbjects = [];
	  this.daClassname = '_dynamic_adapt_';
	  this.nodes = [...document.querySelectorAll('[data-da]')];
  
	  this.nodes.forEach((node) => {
		const data = node.dataset.da.trim();
		const dataArray = data.split(',');
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
		оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	  });
  
	  this.arraySort(this.оbjects);
  
	  this.mediaQueries = this.оbjects
		.map(({
		  breakpoint
		}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
		.filter((item, index, self) => self.indexOf(item) === index);
  
	  this.mediaQueries.forEach((media) => {
		const mediaSplit = media.split(',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
  
		const оbjectsFilter = this.оbjects.filter(
		  ({
			breakpoint
		  }) => breakpoint === mediaBreakpoint
		);
		matchMedia.addEventListener('change', () => {
		  this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	  });
	}
  
	mediaHandler(matchMedia, оbjects) {
	  if (matchMedia.matches) {
		оbjects.forEach((оbject) => {
		  оbject.index = this.indexInParent(оbject.parent, оbject.element);
		  this.moveTo(оbject.place, оbject.element, оbject.destination);
		});
	  } else {
		оbjects.forEach(
		  ({ parent, element, index }) => {
			if (element.classList.contains(this.daClassname)) {
			  this.moveBack(parent, element, index);
			}
		  }
		);
	  }
	}
  
	moveTo(place, element, destination) {
	  element.classList.add(this.daClassname);
	  if (place === 'last' || place >= destination.children.length) {
		destination.append(element);
		return;
	  }
	  if (place === 'first') {
		destination.prepend(element);
		return;
	  }
	  destination.children[place].before(element);
	}
  
	moveBack(parent, element, index) {
	  element.classList.remove(this.daClassname);
	  if (parent.children[index] !== undefined) {
		parent.children[index].before(element);
	  } else {
		parent.append(element);
	  }
	}
  
	indexInParent(parent, element) {
	  return [...parent.children].indexOf(element);
	}
  
	arraySort(arr) {
	  if (this.type === 'min') {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return -1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return 1;
			}
			return a.place - b.place;
		  }
		  return a.breakpoint - b.breakpoint;
		});
	  } else {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return 1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return -1;
			}
			return b.place - a.place;
		  }
		  return b.breakpoint - a.breakpoint;
		});
		return;
	  }
	}
}
;

class SmoothScroll {
	constructor() {
		this.utils = new Utils();
	}

	init() {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		ScrollTrigger.normalizeScroll(true);
		let smoother = ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			ignoreMobileResize: true,
			smooth: 2.5,
			speed: 1.3,
			effects: true,
		});

		this.initScrollParallax();

		return smoother;
	}

	update() {
		this.updatePageHeight();
		ScrollTrigger.refresh();
	}

	updatePageHeight() {
		document.body.style.height = this.container.clientHeight + 'px';
	}

	initScrollParallax() {
		let scrollParalaxElements = document.querySelectorAll('[data-scroll-parallax]');
		if (scrollParalaxElements.length) {
			scrollParalaxElements.forEach(el => {

				if (el.dataset.scrollParallaxMob && document.documentElement.clientWidth < 768) {
					let [value, startEl, startScreen, endEl, endScreen, scrub = true] = el.dataset.scrollParallaxMob.split(',');
					gsap.to(el, {
						y: value,
						duration: 1,
						scrollTrigger: {
							trigger: el.closest('[data-scroll-parallax-trigger]'),
							scrub: typeof scrub == 'boolean' ? scrub : Number(scrub),
							start: `${startEl} ${startScreen}`,
							end: `${endEl} ${endScreen}`,
							//markers: true
						}
					});
				} else {
					let [value, startEl, startScreen, endEl, endScreen] = el.dataset.scrollParallax.split(',');
					gsap.to(el, {
						y: value,
						duration: 1,
						scrollTrigger: {
							trigger: el.closest('[data-scroll-parallax-trigger]'),
							scrub: 2,
							start: `${startEl} ${startScreen}`,
							end: `${endEl} ${endScreen}`,
							//markers: true
						}
					});
				}
			})
		}
	}
}


class App {
	constructor(utils, dynamicAdapt) {
		this.utils = utils;
		this.dynamicAdapt = dynamicAdapt;
		this.smoothScroll = new SmoothScroll();
	}

	init() {
		window.addEventListener('DOMContentLoaded', () => {
			document.body.classList.add('page-loaded');

			if (this.utils.isMobile()) {
				document.body.classList.add('mobile');
			}

			if (this.utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}

			if (this.utils.isSafari()) {
				document.body.classList.add('safari');
			}

			this.smoother = this.smoothScroll.init();

			this.utils.replaceToInlineSvg('.img-svg');
			this.dynamicAdapt.init();
			this.headerHandler();
			this.popupHandler();
			this.initSmoothScroll();
			this.inputMaskInit();
			this.tabsInit();
			this.selectInit();
			this.spollerInit();
			this.componentsBeforeLoad();
		});



		window.addEventListener('load', () => {
			this.slidersInit();
			this.componentsAfterLoad();
		});

	}

	headerHandler() {
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
                        this.smoother.paused(false);
                    } else {
                        manuItem.el.classList.add('sub-menu-open');
                        manuItem.subMenu.classList.add('sub-menu--open');
                        headerEl.classList.add('headerEl--not-hide');
                        mainWrapper.classList.add('sub-menu-open');
                        this.smoother.paused(true);
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
                    this.smoother.paused(false);
                }
            })
        }
    }



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
                    //slideToClickedSlide: true,
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
};
	}

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 600;

const smoother = this.smoother;


if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup')); 
			}
		});
		smoother.paused(true);
	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup--open');
		if(doUnlock) {
			bodyUnlock();
		}

		smoother.paused(false);
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// добавление API попапа в глобалную видимость
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	}
}


const ticker = {
	seconds: 120,
	currentTick: 0,

	_tick() {
		let id = setInterval(() => {
			this.currentTick++

			if (this.currentTick >= this.seconds) {
				this.currentTick = 0;
				if (this.cl) {
					this.cl();
					clearInterval(id);
				};
			}
		}, 1000)
	},

	init(cl) {
		this.cl = cl;
		this._tick();
	},

	reset() {
		this.currentTick = 0;
	}
}

ticker.init(() => {window.popup.open('#dont-leave')});

document.addEventListener('keydown', (e) => {
	ticker.reset();
});

document.addEventListener('mousemove', (e) => {
	ticker.reset();
})

document.addEventListener('click', () => {
	ticker.reset();
})
document.addEventListener('scroll', () => {
	ticker.reset();
});
	}

	slidersInit() {
		{
    let carousels = document.querySelectorAll('[data-carousel]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let carouselSwiper = new Swiper(carousel.querySelector('.swiper'), {
                speed: 800,
                navigation: {
                    nextEl: carousel.querySelector('[data-action="btn-next"]'),
                    prevEl: carousel.querySelector('[data-action="btn-prev"]'),
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                        autoHeight: true,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                },
            });
        })
    }
};
		{
    let instagramSlider = document.querySelector('[data-slider="instagram-slider"]');
    if(instagramSlider) {
        let sliderData = new Swiper(instagramSlider.querySelector('.swiper'), {
            
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            loop: true,
            loopedSlides: 3,
            touchRatio: 0,
        });
    }
};
		{
    let reviewsSlider = document.querySelector('[data-slider="reviews"]');
    if(reviewsSlider) {
        let wrapper = reviewsSlider.querySelector('.swiper-wrapper');
        let sliderData = new Swiper(reviewsSlider.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            centeredSlides: true,
            loop: wrapper.children.length > 1 ? true : false,
            loopedSlides: 3,
            slideToClickedSlide: true,
            navigation: {
                nextEl: reviewsSlider.querySelector('.reviews__btn-next'),
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
};
		{
    let aboutTeamSlider = document.querySelector('[data-slider="about-team-slider"]');
    if(aboutTeamSlider) {
        let sliderData = new Swiper(aboutTeamSlider.querySelector('.swiper'), {
            
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            loop: true,
            loopedSlides: 3,
        });
    }
};
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
};
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
				let select = tabsContainer.querySelector('[data-tab-select]');

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					// init
					let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
					if (activeItem) {
						activeItem.classList.add('tab-active');
						getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
					} else {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})

							// update locomotive scroll
							let id = setInterval(() => {
								window.locomotivePageScroll.update();
							}, 20);
							setTimeout(() => {
								clearInterval(id);
							}, 200)
						})
					})
				}

				if (select) {
					select.addEventListener('change', (e) => {
						getContentItem(e.target.value).classList.add('tab-active');

						contentItems.forEach(item => {
							if (getContentItem(e.target.value) === item) return;

							item.classList.remove('tab-active');
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if (trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {
			let header = document.querySelector('.header');

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();
						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						if (header) {
							top = top - header.clientHeight;
						}

						window.scrollTo({
							top: top - 20,
							behavior: 'smooth',
						})
					}
				})

			})
		}
	}

	selectInit() {
		{
    function _slideUp(target, duration = 500) {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideDown(target, duration = 500) {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
    
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideToggle(target, duration = 500) {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (window.getComputedStyle(target).display === 'none') {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        }
    }

    //Select
    let selects = document.getElementsByTagName('select');
    if (selects.length > 0) {
        selects_init();
    }
    function selects_init() {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            select_init(select);
        }
        //select_callback();
        document.addEventListener('click', function (e) {
            selects_close(e);
        });
        document.addEventListener('keydown', function (e) {
            if (e.which == 27) {
                selects_close(e);
            }
        });
    }
    function selects_close(e) {
        const selects = document.querySelectorAll('.select');
        if (!e.target.closest('.select')) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                select.classList.remove('_active');
                _slideUp(select_body_options, 100);
            }
        }
    }
    function select_init(select) {
        const select_parent = select.parentElement;
        const select_modifikator = select.getAttribute('class');
        const select_selected_option = select.querySelector('option:checked');
        select.setAttribute('data-default', select_selected_option.value);
        select.style.display = 'none';

        select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

        let new_select = select.parentElement.querySelector('.select');
        new_select.appendChild(select);
        select_item(select);
    }
    function select_item(select) {
        const select_parent = select.parentElement;
        const select_items = select_parent.querySelector('.select__item');
        const select_options = select.querySelectorAll('option');
        const select_selected_option = select.querySelector('option:checked');
        const select_selected_text = select_selected_option.innerHTML;
        const select_type = select.getAttribute('data-type');
        const label = '<span class="select__label">Price:</span>';

        if (select_items) {
            select_items.remove();
        }

        let select_type_content = '';
        if (select_type == 'input') {
            select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
        } else {
            select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
        }

   
        select_parent.insertAdjacentHTML('beforeend',
            '<div class="select__item">' +
            `<div class="select__title">${(select.dataset.select === 'price') ? label : ''}` + select_type_content + '</div>' +
            '<div class="select__options">' + select_get_options(select_options) + '</div>' +
            '</div></div>');

        select_actions(select, select_parent);
    }
    function select_actions(original, select) {
        const select_item = select.querySelector('.select__item');
        const select_body_options = select.querySelector('.select__options');
        const select_options = select.querySelectorAll('.select__option');
        const select_type = original.getAttribute('data-type');
        const select_input = select.querySelector('.select__input');

        select_item.addEventListener('click', function () {
            let selects = document.querySelectorAll('.select');
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                if (select != select_item.closest('.select')) {
                    select.classList.remove('_active');
                    _slideUp(select_body_options, 100);
                }
            }
            _slideToggle(select_body_options, 100);
            select.classList.toggle('_active');
        });

        for (let index = 0; index < select_options.length; index++) {
            const select_option = select_options[index];
            const select_option_value = select_option.getAttribute('data-value');
            const select_option_text = select_option.innerHTML;

            if (select_type == 'input') {
                select_input.addEventListener('keyup', select_search);
            } else {
                if (select_option.getAttribute('data-value') == original.value) {
                    select_option.style.display = 'none';
                }
            }
            select_option.addEventListener('click', function () {
                for (let index = 0; index < select_options.length; index++) {
                    const el = select_options[index];
                    el.style.display = 'block';
                }
                if (select_type == 'input') {
                    select_input.value = select_option_text;
                    original.value = select_option_value;
                } else {
                    select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
                    original.value = select_option_value;
                    select_option.style.display = 'none';

                    let event = new Event("change", { bubbles: true });
                    original.dispatchEvent(event);
                }
            });
        }
    }
    function select_get_options(select_options) {
        if (select_options) {
            let select_options_content = '';
            for (let index = 0; index < select_options.length; index++) {
                const select_option = select_options[index];
                const select_option_value = select_option.value;
                if (select_option_value != '') {
                    const select_option_text = select_option.text;
                    select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
                }
            }
            return select_options_content;
        }
    }
    function select_search(e) {
        let select_block = e.target.closest('.select ').querySelector('.select__options');
        let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
        let select_search_text = e.target.value.toUpperCase();

        for (let i = 0; i < select_options.length; i++) {
            let select_option = select_options[i];
            let select_txt_value = select_option.textContent || select_option.innerText;
            if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
                select_option.style.display = "";
            } else {
                select_option.style.display = "none";
            }
        }
    }
    function selects_update_all() {
        let selects = document.querySelectorAll('select');
        if (selects) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                select_item(select);
            }
        }
    }

};
	}

	componentsBeforeLoad() {
		{
    let textParallaxSections = document.querySelectorAll('[data-text-parallax]');
    if (textParallaxSections) {
        textParallaxSections.forEach(textParallaxSection => {
            let cover = textParallaxSection.querySelector('.text-parallax__cover');
            let body = textParallaxSection.querySelector('.text-parallax__body');
            let bg = textParallaxSection.querySelector('.text-parallax__bg');
    
            ScrollTrigger.create({
                trigger: cover,
                pin: cover,
                start: () => `top top`,
                end: () => `+=${body.offsetHeight - cover.offsetHeight}`,
                pinSpacing: false
            });
    
            if(bg) {
                ScrollTrigger.create({
                    trigger: bg,
                    pin: bg,
                    start: () => `top top`,
                    end: () => `+=${body.offsetHeight - bg.offsetHeight}`,
                    pinSpacing: false
                });
            }
        });
    }
};
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
};
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
};
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

};
		(function uploadFileHandler() {
    let files = []
    let inputWrapItems = document.querySelectorAll('.file-input');
    if (inputWrapItems.length) {
        inputWrapItems.forEach(inputWrap => {
            let input = inputWrap.querySelector('input[type="file"]');
            let text = inputWrap.querySelector('.file-input__text');


            const changeHandler = (event) => {
                if (!event.target.files.length) {
                    return
                }

                files = Array.from(event.target.files);

                let result = files.map(item => item.name);
                text.innerText = result.join(', ');
                inputWrap.classList.add('file-added');
            }

            input.addEventListener('change', changeHandler);

            ;['dragenter', 'dragover'].forEach(eventName => {
                input.addEventListener(eventName, (e) => {
                    inputWrap.classList.add('highlight');
                });
            })
            ;['dragleave', 'drop'].forEach(eventName => {
                input.addEventListener(eventName, (e) => {
                    inputWrap.classList.remove('highlight');
                });
            })

        })
    }
})()

;
		{
    let videoBanner = document.querySelector('[data-video-banner]');
    if(videoBanner) {
        let video = videoBanner.querySelector('video');
        let playBtn = videoBanner.querySelector('.video-banner__icon-play');
        if(video) {
            if(document.documentElement.clientWidth < 768) {
                video.pause();

                playBtn.addEventListener('click', () => {
                    playBtn.classList.add('d-none');
                    video.setAttribute('controls', true);
                    video.play();
                })
            }
        }
    }
};
	}

	componentsAfterLoad() {

	}
}

let app = new App(new Utils(), new DynamicAdapt('max'));
app.init();


