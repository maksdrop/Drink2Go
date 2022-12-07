const menuSelectElement = document.querySelector('.sorting__select');
const selectButtonElement = menuSelectElement.querySelector('.sorting__button');
const selectOptionsElement = menuSelectElement.querySelectorAll('.sorting__option');
const optionDefaultElement = menuSelectElement.querySelector('.sorting__default');
const navMenuElement = document.querySelector('.header-nav');
const navToggleElement = navMenuElement.querySelector('.header-nav__toggle');
const sliderElement = document.querySelectorAll('.slider__container');
const stepsElement = document.querySelectorAll('.slider-steps__button');
const forwardElement = document.querySelector('.slider__arrow-forward');
const backElement = document.querySelector('.slider__arrow-back');
let sliderIndex = 0;
const mapCenter = {
  lat: 59.968337,
  lng: 30.317572,
}

// Select

selectButtonElement.addEventListener('click', () => {
  menuSelectElement.classList.toggle('active');
})

selectOptionsElement.forEach(option => {
  option.addEventListener('click', () => {
    let selectedOption = option.querySelector('.sorting__option-text').textContent;
    optionDefaultElement.textContent = selectedOption;

    menuSelectElement.classList.remove('active');
  })
})

// Menu burger

navMenuElement.classList.remove('header-nav--nojs');

navToggleElement.addEventListener('click', () => {
  if (navMenuElement.classList.contains('header-nav--closed')) {
    navMenuElement.classList.remove('header-nav--closed');
    navMenuElement.classList.add('header-nav--opened');
    document.body.classList.add('header__overflow-hidden');
  } else {
    navMenuElement.classList.remove('header-nav--opened');
    navMenuElement.classList.add('header-nav--closed');
    document.body.classList.remove('header__overflow-hidden');
  }
})

// Slider

const showSlider = (moveTo) => {
  if (moveTo >= sliderElement.length) {
    moveTo = 0;
  }
  if (moveTo < 0) {
    moveTo = sliderElement.length - 1;
  }

  sliderElement[sliderIndex].classList.toggle('slider__active');
  stepsElement[sliderIndex].classList.toggle('slider-steps__button--active');
  sliderElement[moveTo].classList.toggle('slider__active');
  stepsElement[moveTo].classList.toggle('slider-steps__button--active');

  sliderIndex = moveTo;
}

forwardElement.addEventListener('click', () => {
  showSlider(sliderIndex + 1);
})

backElement.addEventListener('click', () => {
  showSlider(sliderIndex - 1);
})

stepsElement.forEach((indicator, indicatorIndex) => {
  indicator.addEventListener('click', () => {
    if (sliderIndex !== indicatorIndex) {
      showSlider(indicatorIndex);
    }
  })
})

// Map

const map = L.map('map')
  .setView({
    lat: mapCenter.lat,
    lng: mapCenter.lng,
  }, 18);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mapPinIcon = L.icon({
  iconUrl: './img/map/map-icon.svg',
  iconSize: [38, 50],
  iconAnchor: [19, 50],
});

const marker = L.marker(
  {
    lat: mapCenter.lat,
    lng: mapCenter.lng,
  },
  {
    icon: mapPinIcon,
  }
)

marker.addTo(map);
