document.addEventListener('click', function(e) {
    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.menu');
    let header = document.querySelector('.header');
    const html = document.documentElement;
    if(e.target.closest('.menu-btn')) {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
        header.classList.toggle('header-active')
        html.classList.toggle('_overflow')
    } else if (menu.closest('.active') && !e.target.closest('.menu') && menuBtn.closest('.active')) {
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
        header.classList.remove('header-active')
        html.classList.remove('_overflow')
    }

    if(e.target.closest('.events-view')) {
      let event = document.querySelector('.events-view-active')
      let eventItem = document.querySelector('.events-items-active')
      let dataJSValue = e.target.getAttribute('data-id');
      let dataItem = document.getElementById(`${dataJSValue}`);
      e.target.classList.add('events-view-active')
      dataItem.classList.add('events-items-active')
      eventItem.classList.remove('events-items-active')
      event.classList.remove('events-view-active')
    }

    if(e.target.closest('.intro-block-close')) {
      let block = e.target.closest('.intro-block');
      block.style.display="none";
    }

})

window.onscroll = function(){
  const html = document.documentElement, body = document.body;
  const wrapper = document.querySelector('.wrapper')
  const header = document.querySelector(".header")
  if(html.scrollTop>100||body.scrollTop>100) {
    wrapper.classList.add('wrapper-active');
    header.classList.add('header-fixed');
  } else{
    wrapper.classList.remove('wrapper-active')
    header.classList.remove('header-fixed');
  }
}

var t;
function up() {
	var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(top > 0) {
		window.scrollBy(0,-100);
		t = setTimeout('up()',20);
	} else clearTimeout(t);
	return false;
}

// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';


const swiperPartners = new Swiper('.partners-swipers', {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    // Navigation arrows
    navigation: {
      nextEl: '.partners-button-next',
      prevEl: '.partners-button-prev',
    },

    breakpoints: {

        320: {
          slidesPerView: 'auto',
          spaceBetween: 15
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        998: {
          slidesPerView: 4,
        }
      }
});

const swiperEvents = new Swiper('.events-swipers', {
  // loop: true,
  slidesPerView: "auto",
  spaceBetween: 15,
});