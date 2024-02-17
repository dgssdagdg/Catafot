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

    //Переключение между блоками events-view---------------------------------------
    if(e.target.closest('.events-view') && e.target.closest('.events-views') && !e.target.closest('.events-view-active')) {
      let viewContainer = document.querySelector('.events-views');
      let event = viewContainer.querySelector('.events-view-active')
      let eventItem = document.querySelector('.events-items-active')
      let dataJSValue = e.target.getAttribute('data-id');
      let dataItem = document.getElementById(`${dataJSValue}`);
      e.target.classList.add('events-view-active')
      dataItem.classList.add('events-items-active')
      eventItem.classList.remove('events-items-active')
      event.classList.remove('events-view-active')
    } else if (e.target.closest('.events-view') && e.target.closest('.events-views-swiper') && !e.target.closest('.events-view-active')) {
      let viewContainer = document.querySelector('.events-views-swiper');
      let event = viewContainer.querySelector('.events-view-active')
      let eventItem = document.querySelector('.events-items-active')
      let dataJSValue = e.target.getAttribute('data-id');
      let dataItem = document.getElementById(`${dataJSValue}`);
      e.target.classList.add('events-view-active')
      dataItem.classList.add('events-items-active')
      eventItem.classList.remove('events-items-active')
      event.classList.remove('events-view-active')
    }
    //Открытия модального окна зависимо от того открытали менюшка или нет---------------------------------------------
    if(e.target.closest('.pop-open-btn') && menu.closest(".active")) {
      let popUp = document.getElementById(`${e.target.getAttribute('data-id')}`);
      popUp.classList.add('_pop-up-active')
      menuBtn.classList.remove('active');
      menu.classList.remove('active');
    } else if (e.target.closest('.pop-open-btn')) {
      let popUp = document.getElementById(`${e.target.getAttribute('data-id')}`);
      popUp.classList.add('_pop-up-active')
    }
    //Закрытие модального окна зависо от того дестом или нет--------------------------------------------
    let popUpActive = document.querySelector('._pop-up-active');
    if (popUpActive && e.target.closest('.pop-up') && !e.target.closest('.pop-up-not-toch') && html.closest("._overflow")) {
      popUpActive.classList.remove('_pop-up-active')
      header.classList.remove('header-active')
      html.classList.remove('_overflow')
    } else if(popUpActive && e.target.closest('.pop-up') && !e.target.closest('.pop-up-not-toch')) {
      popUpActive.classList.remove('_pop-up-active')
    }

})

//Поевление обект при скроле вниз-----------------------------------------------
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

//Скрол верх при клике на стрелку--------------------------------------------------
var t;
function up() {
	var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(top > 0) {
		window.scrollBy(0,-100);
		t = setTimeout('up()',20);
	} else clearTimeout(t);
	return false;
}



//-------------------------------------------------------------

//Создание Звездного рейтинга---------------------------------------------------
const starsView = ['one', 'two', 'three', 'four', 'five']
document.addEventListener("mouseover", function(e) {
  if(e.target.closest('.reviews-forms-reqting-star')) {
    let star = e.target.closest(".reviews-forms-reqting-star");
    let stars = document.querySelector('.reviews-forms-reqting');
    const number = star.dataset.starnumber;
    if (star.dataset.starnumber >= '1') {
      stars.classList.add(`reviews-forms-reqting-${starsView[number - 1]}`)
    }
  }
})
document.addEventListener("mouseout", function(e) {
  if(e.target.closest('.reviews-forms-reqting-star')) {
    let star = e.target.closest(".reviews-forms-reqting-star");
    let stars = document.querySelector('.reviews-forms-reqting');
    const number = star.dataset.starnumber;
    if (star.dataset.starnumber >= '1') {
      stars.classList.remove(`reviews-forms-reqting-${starsView[number - 1]}`)
    }
  }
})
document.addEventListener('click', function(e) {
  if(e.target.closest('.reviews-forms-reqting-star')) {
    let star = e.target.closest(".reviews-forms-reqting-star");
    let stars = document.querySelector('.reviews-forms-reqting');
    const number = star.dataset.starnumber;
    if (star.dataset.starnumber >= '1' && stars.dataset.stars >= '1') {
      stars.classList.remove(`reviews-forms-reqting-click-${starsView[stars.dataset.stars - 1]}`)
      stars.dataset.stars = number
      stars.classList.add(`reviews-forms-reqting-click-${starsView[number - 1]}`)

    } else if (star.dataset.starnumber >= '1') {
      stars.dataset.stars = number
      stars.classList.add(`reviews-forms-reqting-click-${starsView[number - 1]}`)
    }
  }
  
})


//Зависемо телофн или пк показывает постраничную навигацию---------------------------------------------
const parent = document.querySelector('.navigation-nav')
let navOne = document.querySelector('.navigation-page-one')
let navTwo = document.querySelector('.navigation-page-two')
let navCenter = document.querySelector('.navigation-page-center')
let navFour = document.querySelector('.navigation-page-four')
let navFive = document.querySelector('.navigation-page-five')
let navEnd = document.querySelector('.navigation-page-end')
let typesMedia = 'true';
function myFunction(x) {
  if (x.matches && parent) {
    typesMedia = 'false'
    parent.removeChild(navOne)
    parent.removeChild(navFive)
    navTwo.classList.add('navigation-page-active');
    navTwo.dataset.pagenumber = 1;
    navCenter.dataset.pagenumber = 2;
    navFour.dataset.pagenumber = 3;
    navEnd.dataset.pagenumber = 10;

    navTwo.textContent='1'
    navCenter.textContent='2'
    navFour.textContent='3'
    navEnd.textContent='10'
  } else {
    typesMedia = "true"
  }
}
var x = window.matchMedia("(max-width: 767px)")
myFunction(x)
x.addListener(myFunction)

//Создание Нумерованой погинации------------------------------------------------------------------------
let pageItems = document.querySelector('.navigation-items-block');
const pageNavLinks = document.querySelectorAll('.navigation-page');
let pageEnd = document.querySelector('.navigation-page-end')
let pageEndTwo = document.querySelector('.navigation-page-end-min')
let pageCenter = document.querySelector('.navigation-page-center')
function pageUpdate(pageNumber) {
  const maxPages = 10;
  let pageActive = document.querySelector(".navigation-page-active");
  let pageNumberNum = pageNumber.dataset.pagenumber;
  if (pageActive) {
    pageActive.classList.remove('navigation-page-active')
  }
  //One-------------------------------------------
  if(pageNumber.closest(".navigation-page-one") && 0 == pageNumberNum - 2) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 1, 1)
  } else if(pageNumber.closest(".navigation-page-one") && 0 < pageNumberNum - 1) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 2, 1)
  } else if (pageNumber.closest(".navigation-page-one")) {
    pageItems.dataset.page = pageNumberNum
    pageNumber.classList.add('navigation-page-active')
    // addToReviewsCreate(pageItems, jsonArry)
  }

  //Center-------------------------------------------
  if (pageNumber.closest(".navigation-page-center")) {
    pageItems.dataset.page = pageNumberNum
    pageNumber.classList.add('navigation-page-active')
    // addToReviewsCreate(pageItems, jsonArry)
  }

  //Two-------------------------------------------
  if(pageNumber.closest(".navigation-page-two") && 0 < pageNumberNum - 2 || pageNumber.closest(".navigation-page-two-min") && 0 < pageNumberNum - 1 && typesMedia == 'false') {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 1, 1)
  } else if (pageNumber.closest(".navigation-page-two") || pageNumber.closest(".navigation-page-two-min" && typesMedia == 'false')) {
    pageItems.dataset.page = pageNumberNum
    pageNumber.classList.add('navigation-page-active')
    // addToReviewsCreate(pageItems, jsonArry)
  }

  //Four-Two-------------------------------------------
  if(pageNumber.closest(".navigation-page-four") && maxPages > +pageNumberNum + 2 && maxPages != +pageNumberNum + 2
  || pageNumber.closest(".navigation-page-four-min") && maxPages > +pageNumberNum + 1 && maxPages != +pageNumberNum + 1 && typesMedia == 'false') {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 1, 2)
  } else if (pageNumber.closest(".navigation-page-four") || pageNumber.closest(".navigation-page-four-min") && typesMedia == 'false') {
    pageItems.dataset.page = pageNumberNum
    pageNumber.classList.add('navigation-page-active')
    // addToReviewsCreate(pageItems, jsonArry)
  }

  //Five-Two-------------------------------------------
  if(pageNumber.closest(".navigation-page-five") && maxPages > +pageNumberNum + 1 && maxPages == +pageNumberNum + 2) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 1, 2)
  } else if(pageNumber.closest(".navigation-page-five") && maxPages > +pageNumberNum + 2 && maxPages != +pageNumberNum + 1) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 2, 2)
  } else if (pageNumber.closest(".navigation-page-five")) {
    pageItems.dataset.page = pageNumberNum
    pageNumber.classList.add('navigation-page-active')
    // addToReviewsCreate(pageItems, jsonArry)
  }

  //End-Five-Four-Three-------------------------------------------
  if(pageNumber.closest(".navigation-page-end") && +pageEnd.dataset.pagenumber + 5 > maxPages && 0 == maxPages - pageEnd.dataset.pagenumber) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 2, 5)
  } else if(pageNumber.closest(".navigation-page-end") && +pageEnd.dataset.pagenumber + 5 > maxPages) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 1, 4)
  } else if (pageNumber.closest(".navigation-page-end")) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 2, 3)
  }
}
//Обновляет коментарии и навигацию--------------------------------
function pageUpdateNav(page, number, type) {
  const maxPages = 10;
  const dataActive = document.querySelector(`.navigation-page[data-pagenumber="${page - 1}"]`);
  const dataActivePrev = document.querySelector(`.navigation-page[data-pagenumber="${+page + 1}"]`);
  pageNavLinks.forEach(element => {
    let pageElement = element.dataset.pagenumber
    if (type == 1) {
      element.dataset.pagenumber = pageElement - number;
      element.textContent=`${element.dataset.pagenumber}`
      dataActivePrev.classList.add('navigation-page-active')
    }
    if (type == 11) {
      element.dataset.pagenumber = pageElement - number;
      element.textContent=`${element.dataset.pagenumber}`
    }
    if (type == 22) {
      element.dataset.pagenumber = +pageElement + number;
      element.textContent=`${element.dataset.pagenumber}`
    }

    if(type == 2 && maxPages >= +page + number + 4 && !element.closest('.navigation-page-end')) {
      element.dataset.pagenumber = +pageElement + number;
      element.textContent=`${element.dataset.pagenumber}`
    } else if (type == 2) {
      let pageEndElement = document.querySelector('.navigation-page-end')
      dataActive.classList.add('navigation-page-active')
      if(element.closest('.navigation-page-end') && maxPages > pageEndElement.dataset.pagenumber) {
        element.dataset.pagenumber = +pageElement + number;
        element.textContent=`${element.dataset.pagenumber}`
      } else if(!element.closest('.navigation-page-end')) {
        element.dataset.pagenumber = +pageElement + number;
        element.textContent=`${element.dataset.pagenumber}`
      }
    }

    if(type == 3 && page != pageElement && typesMedia == 'false') {
      if(element.closest(".navigation-page-two-min")) {
        element.dataset.pagenumber = page - 2;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-center")) {
        element.dataset.pagenumber = page - 1;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-four-min")) {
        element.dataset.pagenumber = page;
        element.textContent=`${element.dataset.pagenumber}`
        element.classList.add('navigation-page-active')
      }
    }else if (type == 3 && typesMedia == 'false') {
      element.dataset.pagenumber = +page + 5;
      element.textContent=`${element.dataset.pagenumber}`
    } else if (type == 3 && page != pageElement) {
      if(element.closest(".navigation-page-one")) {
        element.dataset.pagenumber = page - 2;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-two")) {
        element.dataset.pagenumber = page - 1;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-center")) {
        element.dataset.pagenumber = page;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-four")) {
        element.dataset.pagenumber = +page + 1;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-five")) {
        element.dataset.pagenumber = +page + 2;
        element.textContent=`${element.dataset.pagenumber}`
      }
    } else if (type == 3) {
      element.dataset.pagenumber = +page + 7;
      element.textContent=`${element.dataset.pagenumber}`
      pageCenter.classList.add('navigation-page-active')
    }

    if (type == 4 && page != pageElement && +page + 2 >= maxPages && typesMedia == 'false') {
      if(element.closest(".navigation-page-two-min")) {
        element.dataset.pagenumber = page - 2;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-center")) {
        element.dataset.pagenumber = page - 1;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-four-min")) {
        element.dataset.pagenumber = page;
        element.textContent=`${element.dataset.pagenumber}`
        element.classList.add('navigation-page-active')
      }
    } else if (type == 4 && typesMedia == 'false') {
      element.dataset.pagenumber = +page + (maxPages - page);
      element.textContent=`${element.dataset.pagenumber}`
    } else if(type == 4 && page != pageElement){
      element.dataset.pagenumber = +pageElement + number;
      element.textContent=`${element.dataset.pagenumber}`
    } else if (type == 4) {
      const dataActiveEl = document.querySelector(`.navigation-page[data-pagenumber="${page}"]`);
      dataActiveEl.classList.add('navigation-page-active')
      console.log(page);
      element.dataset.pagenumber = +pageElement + (maxPages - page);
      element.textContent=`${element.dataset.pagenumber}`
    }

    if(type == 5 && page != pageElement && typesMedia == 'false') {
      if(element.closest(".navigation-page-two-min")) {
        element.dataset.pagenumber = page - 3;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-center")) {
        element.dataset.pagenumber = page - 2;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-four-min")) {
        element.dataset.pagenumber = page - 1;
        element.textContent=`${element.dataset.pagenumber}`
      }
    } else if(type == 5 && page != pageElement) {
      if(element.closest(".navigation-page-one")) {
        element.dataset.pagenumber = page - 5;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-two")) {
        element.dataset.pagenumber = page - 4;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-center")) {
        element.dataset.pagenumber = page - 3;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-four")) {
        element.dataset.pagenumber = page - 2;
        element.textContent=`${element.dataset.pagenumber}`
      }
      if(element.closest(".navigation-page-five")) {
        element.dataset.pagenumber = page - 1;
        element.textContent=`${element.dataset.pagenumber}`
      }
    } else if (type == 5) {
      element.classList.add("navigation-page-active")
    }
  });
}
function pagePrev() {
  const pageOne = document.querySelector(".navigation-page-one")
  const pageTwo = document.querySelector(".navigation-page-two-min")
  const pageActive = document.querySelector(".navigation-page-active");
  if (pageOne && pageOne.closest('.navigation-page-active') && pageOne.dataset.pagenumber != 1 ||
     pageTwo && pageTwo.closest('.navigation-page-active') && pageTwo.dataset.pagenumber != 1 && typesMedia == 'false')  {
      const pageNumberNum = pageActive.dataset.pagenumber;
      const pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${pageNumberNum}"]`);
      pageItems.dataset.page = pagePrevActive.dataset.pagenumber;
      pageUpdateNav(pagePrevActive.dataset.pagenumber, 1, 11)
  } else if(pageOne && pageOne.dataset.pagenumber == 1 && !pageOne.closest('.navigation-page-active') ||
    pageTwo && pageTwo.dataset.pagenumber == 1 && !pageTwo.closest('.navigation-page-active') && typesMedia == 'false') {
      pageActive.classList.remove('navigation-page-active')
      const pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${pageActive.dataset.pagenumber - 1}"]`);
      const pageNumberNum = pagePrevActive.dataset.pagenumber
      pageItems.dataset.page = pageNumberNum
      pagePrevActive.classList.add('navigation-page-active')
  } else if (pageOne && !pageOne.closest('.navigation-page-active') && pageOne.dataset.pagenumber != 1 ||
    pageTwo && !pageTwo.closest('.navigation-page-active') && pageTwo.dataset.pagenumber != 1 && typesMedia == 'false') {
      if(pageActive.dataset.pagenumber - 1 > 0) {
        const pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${pageActive.dataset.pagenumber - 1}"]`);
        const pageNumberNum = pagePrevActive.dataset.pagenumber
        pageItems.dataset.page = pageNumberNum
        pageUpdateNav(pageNumberNum, 1, 1)
      }
  }

}
function pageNext() {
  const maxPages = 10;
  let pageActive = document.querySelector(".navigation-page-active");
  let pageFive = document.querySelector('.navigation-page-five')
  let pageFour = document.querySelector('.navigation-page-four-min')
  let pageEndClick = document.querySelector(".navigation-page-end")
  if (pageEndClick && pageEndClick.dataset.pagenumber != maxPages && pageEndClick.closest('.navigation-page-active')) {
    const pageNumberNum = pageActive.dataset.pagenumber;
    const pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${pageNumberNum}"]`);
    pageItems.dataset.page = pagePrevActive.dataset.pagenumber
    pageUpdateNav(pagePrevActive.dataset.pagenumber, 1, 22)
  } 
  if(pageFive && +pageFive.dataset.pagenumber + 1 == maxPages && !pageEndClick.closest('.navigation-page-active') ||
    pageFour && +pageFour.dataset.pagenumber + 1 == maxPages && !pageEndClick.closest('.navigation-page-active') && typesMedia == 'false') {
      pageActive.classList.remove('navigation-page-active')
      let pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${+pageActive.dataset.pagenumber + 1}"]`);
      let pageNumberNum = pagePrevActive.dataset.pagenumber
      pageItems.dataset.page = pageNumberNum
      pagePrevActive.classList.add('navigation-page-active')
  } else if (pageFive && !pageEndClick.closest('.navigation-page-active') && +pageFive.dataset.pagenumber + 1 != maxPages ||
    pageFour && !pageEndClick.closest('.navigation-page-active') && +pageFour.dataset.pagenumber + 1 != maxPages && typesMedia == 'false') {
      if(+pageActive.dataset.pagenumber + 1 < maxPages) {
        let pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${+pageActive.dataset.pagenumber + 1}"]`);
        let pageNumberNum = pagePrevActive.dataset.pagenumber
        pageItems.dataset.page = pageNumberNum
        pageUpdateNav(pageNumberNum, 1, 2)
      }
  }
}
//-----------------------------------------------------------------------------------------------------------


//На телефонах У коментариев убирает дымок---------------------------------------------------
function openTextHeigth(item) {
  let items = item.closest('.reviews-item').classList.add("reviews-item-active-text");
}
