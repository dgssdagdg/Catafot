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

//Содание inputa с маской и выбор кода страны---------------------------------------
const input = document.querySelector("#phone");
window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: callback => {
        fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => callback(data.country_code))
        .catch(() => callback("us"));
    },
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.15/build/js/utils.js",
});

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




//Получение масива json и дальнейший перенос в html---------------------------------------------
let pageItems = document.querySelector('.reviews-items');
const requestURL ="/Catafot/json/rewies.json"
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
  const superHeroes = request.response;
  addToReviews(superHeroes.slice(0, 4));
};
let reviewsItems = document.querySelector('.reviews-items')
function addToReviewsCreate(items, json) {
  let pageItemsDataOne = (items.dataset.page * 4 - 4);
  let pageItemsDataTwo = (items.dataset.page * 4);
  pageItems.innerHTML = ''
  if(items.dataset.page == 1) {
    addToReviews(json.slice(0, 4));
  } else addToReviews(json.slice(pageItemsDataOne, pageItemsDataTwo));
}
function addToReviews(jsonObj) {
  jsonObj.forEach(element => {
    reviewsItems.insertAdjacentHTML(
      'beforeend',
      `
      <div id="${element.id}" class="reviews-item">
        <div class="reviews-item-block df-align">
            <div class="reviews-item-name _title-sub">${element.name}</div>
            <div class="reviews-item-date">${element.date}</div>
        </div>
        <div class="reviews-item-block df-align">
            <div class="reviews-item-stars df-align">
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${element.stars >= 1 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${element.stars >= 2 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${element.stars >= 3 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${element.stars >= 4 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${element.stars >= 5 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
            </div>
            <div class="reviews-item-title">${element.title}</div>
        </div>
        <div class="reviews-item-text">
        ${element.description}
        </div>
        <img onclick="openTextHeigth(this)" src="./img/reviews/text-bg.png" alt="Bg" class="reviews-item-text-bg">
        <div class="reviews-item-text-bg-open">...</div>
        <img src="./img/reviews/item-img.jpg" alt="${element.title}" class="reviews-item-img">
    </div>
      `
    );
  });
}

//Создание Нумерованой погинации------------------------------------------------------------------------
const pageNavLinks = document.querySelectorAll('.navigation-page');
let pageEnd = document.querySelector('.navigation-page-end')
let pageEndTwo = document.querySelector('.navigation-page-end-min')
let pageCenter = document.querySelector('.navigation-page-center')
function pageUpdate(pageNumber) {
  const jsonArry = request.response;
  const maxPages = jsonArry.length / 4
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
    addToReviewsCreate(pageItems, jsonArry)
  }

  //Center-------------------------------------------
  if (pageNumber.closest(".navigation-page-center")) {
    pageItems.dataset.page = pageNumberNum
    pageNumber.classList.add('navigation-page-active')
    addToReviewsCreate(pageItems, jsonArry)
  }

  //Two-------------------------------------------
  if(pageNumber.closest(".navigation-page-two") && 0 < pageNumberNum - 2 || pageNumber.closest(".navigation-page-two-min") && 0 < pageNumberNum - 1) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 1, 1)
  } else if (pageNumber.closest(".navigation-page-two") || pageNumber.closest(".navigation-page-two-min")) {
    pageItems.dataset.page = pageNumberNum
    pageNumber.classList.add('navigation-page-active')
    addToReviewsCreate(pageItems, jsonArry)
  }

  //Four-Two-------------------------------------------
  if(pageNumber.closest(".navigation-page-four") && maxPages > +pageNumberNum + 2 && maxPages != +pageNumberNum + 2 || pageNumber.closest(".navigation-page-four-min") && maxPages > +pageNumberNum + 1 && maxPages != +pageNumberNum + 1) {
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 1, 2)
  } else if (pageNumber.closest(".navigation-page-four-min")) {
    pageItems.dataset.page = pageNumberNum
    pageNumber.classList.add('navigation-page-active')
    addToReviewsCreate(pageItems, jsonArry)
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
    addToReviewsCreate(pageItems, jsonArry)
  }

  //End-Five-Four-Three-------------------------------------------
  if(pageNumber.closest(".navigation-page-end") && +pageEnd.dataset.pagenumber + 5 > maxPages && 0 == maxPages - pageEnd.dataset.pagenumber) {
    console.log('1');
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 2, 5)
  } else if(pageNumber.closest(".navigation-page-end") && +pageEnd.dataset.pagenumber + 5 > maxPages) {
    console.log('2');
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 1, 4)
  } else if (pageNumber.closest(".navigation-page-end")) {
    console.log('3');
    pageItems.dataset.page = pageNumberNum
    pageUpdateNav(pageNumberNum, 2, 3)
  }
}
//Обновляет коментарии и навигацию--------------------------------
function pageUpdateNav(page, number, type) {
  const jsonArry = request.response;
  const maxPages = jsonArry.length / 4
  const dataActive = document.querySelector(`.navigation-page[data-pagenumber="${page - 1}"]`);
  const dataActivePrev = document.querySelector(`.navigation-page[data-pagenumber="${+page + 1}"]`);
  addToReviewsCreate(pageItems, jsonArry)
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

    if(type == 2 && maxPages <= +page + number + 4 && !element.closest('.navigation-page-end')) {
      element.dataset.pagenumber = +pageElement + number;
      element.textContent=`${element.dataset.pagenumber}`
    } else if (type == 2) {
      dataActive.classList.add('navigation-page-active')
      let pageEndElement = document.querySelector('.navigation-page-end')
      if(element.closest('.navigation-page-end') && maxPages > pageEndElement.dataset.pagenumber) {
        element.dataset.pagenumber = +pageElement + number;
        element.textContent=`${element.dataset.pagenumber}`
      } else if(!element.closest('.navigation-page-end')) {
        element.dataset.pagenumber = +pageElement + number;
        element.textContent=`${element.dataset.pagenumber}`
      }
    }

     if (type == 3 && page != pageElement) {
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

    if(type == 4 && page != pageElement){
      element.dataset.pagenumber = +pageElement + number;
      element.textContent=`${element.dataset.pagenumber}`
    } else if (type == 4) {
      const dataActiveEl = document.querySelector('.navigation-page[data-pagenumber="'+page+'"]');
      dataActiveEl.classList.add('navigation-page-active')
      element.dataset.pagenumber = +pageElement + (maxPages - page);
      element.textContent=`${element.dataset.pagenumber}`
    }
    if(type == 5 && page != pageElement && pageEndTwo.closest('.navigation-page-end-min')) {
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
  const jsonArry = request.response;
  if (pageOne && pageOne.closest('.navigation-page-active') && pageOne.dataset.pagenumber != 1 ||
    pageTwo && pageTwo.closest('.navigation-page-active') && pageTwo.dataset.pagenumber != 1) {
      const pageNumberNum = pageActive.dataset.pagenumber;
      const pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${pageNumberNum}"]`);
      pageItems.dataset.page = pagePrevActive.dataset.pagenumber;
      pageUpdateNav(pagePrevActive.dataset.pagenumber, 1, 11)
  } else if(pageOne && pageOne.dataset.pagenumber == 1 && !pageOne.closest('.navigation-page-active') ||
    pageTwo && pageTwo.dataset.pagenumber == 1 && !pageTwo.closest('.navigation-page-active')) {
      pageActive.classList.remove('navigation-page-active')
      const pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${pageActive.dataset.pagenumber - 1}"]`);
      const pageNumberNum = pagePrevActive.dataset.pagenumber
      pageItems.dataset.page = pageNumberNum
      pagePrevActive.classList.add('navigation-page-active')
      addToReviewsCreate(pageItems, jsonArry)
  } else if (pageOne && !pageOne.closest('.navigation-page-active') && pageOne.dataset.pagenumber != 1 ||
    pageTwo && !pageTwo.closest('.navigation-page-active') && pageTwo.dataset.pagenumber != 1) {
      const pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${pageActive.dataset.pagenumber - 1}"]`);
      const pageNumberNum = pagePrevActive.dataset.pagenumber
      pageItems.dataset.page = pageNumberNum
      pageUpdateNav(pageNumberNum, 1, 1)
  }

}
function pageNext() {
  const jsonArry = request.response;
  const maxPages = jsonArry.length / 4
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
    pageFour && +pageFour.dataset.pagenumber + 1 == maxPages && !pageEndClick.closest('.navigation-page-active')) {
      pageActive.classList.remove('navigation-page-active')
      let pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${+pageActive.dataset.pagenumber + 1}"]`);
      let pageNumberNum = pagePrevActive.dataset.pagenumber
      pageItems.dataset.page = pageNumberNum
      pagePrevActive.classList.add('navigation-page-active')
      addToReviewsCreate(pageItems, jsonArry)
  } else if (pageFive && !pageEndClick.closest('.navigation-page-active') && +pageFive.dataset.pagenumber + 1 != maxPages ||
    pageFour && !pageEndClick.closest('.navigation-page-active') && +pageFour.dataset.pagenumber + 1 != maxPages ) {
      let pagePrevActive = document.querySelector(`.navigation-page[data-pagenumber="${+pageActive.dataset.pagenumber + 1}"]`);
      let pageNumberNum = pagePrevActive.dataset.pagenumber
      pageItems.dataset.page = pageNumberNum
      pageUpdateNav(pageNumberNum, 1, 2)
  }
}
//-----------------------------------------------------------------------------------------------------------

//Создание Коментария-----------------------------------------------------------
const formElement = document.getElementById('form1');
const formElements = document.querySelectorAll('.form-cheked')
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);
  const fullName = formData.get('fullname');
  const shiftName = formData.get('shiftname');
  const description = formData.get('description');
  const date = formData.get('date');
  const re = /\s*-\s*/;
  const nameList = date.split(re); 
  const monthArry = {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Нояборь',
    12: 'Декабрь',
  }
  let number = nameList[1];
  if(nameList[1] < 10 ) {
    const regExp = /\*|%|0|&|\$/g;
    number = nameList[1].replace(regExp, '')
  }
  const starsnumber = document.querySelector('.reviews-forms-reqting').dataset.stars;
  if (fullName != '' && shiftName != '' && description != '' && date != '') {
    reviewsItems.insertAdjacentHTML(
      'afterbegin',
      `
      <div id="${41}" class="reviews-item">
        <div class="reviews-item-block df-align">
            <div class="reviews-item-name _title-sub">${fullName}</div>
            <div class="reviews-item-date">${number + " " + monthArry[number] + ' ' + nameList[0] + ' Года'}</div>
        </div>
        <div class="reviews-item-block df-align">
            <div class="reviews-item-stars df-align">
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${starsnumber >= 1 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${starsnumber >= 2 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${starsnumber >= 3 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${starsnumber >= 4 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
                <div class="reviews-item-star">
                    <svg width="28" height="26" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.54219 0.555559C9.96418 -0.185188 11.0359 -0.185187 11.4577 0.555568L14.1121 5.21535C14.2689 5.49072 14.5376 5.68514 14.849 5.74864L20.1187 6.82305C20.9564 6.99386 21.2876 8.00898 20.7106 8.63759L17.0815 12.592C16.867 12.8256 16.7643 13.1401 16.8 13.4548L17.4025 18.7786C17.4982 19.6249 16.6313 20.2523 15.8527 19.9001L10.9555 17.6842C10.6661 17.5533 10.334 17.5533 10.0446 17.6842L5.14729 19.9001C4.36873 20.2523 3.5018 19.6249 3.59756 18.7786L4.20006 13.4548C4.23562 13.1401 4.13306 12.8256 3.91857 12.592L0.289324 8.63759C-0.287552 8.00898 0.043597 6.99386 0.881273 6.82305L6.15099 5.74864C6.46233 5.68514 6.73102 5.49072 6.88787 5.21535L9.54219 0.555559Z" fill="#${starsnumber >= 5 ? 'E87000' : 'FADEC4'}"/>
                        </svg>
                        
                </div>
            </div>
            <div class="reviews-item-title">${shiftName}</div>
        </div>
        <div class="reviews-item-text">
        ${description}
        </div>
        <img onclick="openTextHeigth(this)" src="./img/reviews/text-bg.png" alt="Bg" class="reviews-item-text-bg">
        <div class="reviews-item-text-bg-open">...</div>
        <img src="./img/reviews/item-img.jpg" alt="${shiftName}" class="reviews-item-img">
    </div>
      `
    );
    let stars = document.querySelector('.reviews-forms-reqting');
    stars.classList.remove(`reviews-forms-reqting-click-${starsView[stars.dataset.stars - 1]}`)
    stars.dataset.stars = 0
    e.target.reset();
  }

});

//На телефонах У коментариев убирает дымок---------------------------------------------------
function openTextHeigth(item) {
  let items = item.closest('.reviews-item').classList.add("reviews-item-active-text");
}

//Зависемо телофн или пк показывает постраничную навигацию---------------------------------------------
let navigationBig = document.querySelector('.navigation-big')
let navigationMin = document.querySelector('.navigation-min')
const parent = document.querySelector('.reviews-navigation-container')
function myFunction(x) {
  if (x.matches) {
    parent.removeChild(navigationBig)
  } else {
    parent.removeChild(navigationMin)
  }
}
var x = window.matchMedia("(max-width: 767px)")
myFunction(x)
x.addListener(myFunction)

