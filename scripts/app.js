$(".team-gallery").slick({
  dots: false,
  slidesToShow: 1,
  infinite: false,
  centerMode: true,
  variableWidth: true,
  arrows: false,
  initialSlide: 3,
  asNavFor: ".team-description-list",
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

$(".team-description-list").slick({
  dots: true,
  slidesToShow: 1,
  infinite: true,
  arrows: true,
  initialSlide: 3,
  focusOnSelect: true,
  asNavFor: ".team-gallery",
  prevArrow: `<button type='button' class='slick-prev pull-left'><span class="icon-chevron-left"></span></button>`,
  nextArrow: `<button type='button' class='slick-next pull-right'><span class="icon-chevron-right"></button>`,
});
$(document).ready(function () {
  $("#btn_menu_open").on("click", () => {
    $(".mb-navigation").css("left", "0px");
    $(".mb-navigation").css("opacity", "1");
  });

  $("#btn_menu_close").on("click", () => {
    $(".mb-navigation").css("left", "-1000px");
    $(".mb-navigation").css("opacity", "0");
  });

  scrollHorizontal(".timeline-scroll");
  scrollHorizontal(".partners-brand-item");
  countdown();
});

function scrollHorizontal(classname) {
  const scrollBrand = document.querySelector(classname);
  scrollBrand.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollBrand.scrollLeft += evt.deltaY;
  });
}

function countdown() {
  var countDownDate = new Date("Aug 5, 2022 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("advertisement-days").innerHTML = days;
    document.getElementById("advertisement-hours").innerHTML = hours
      .toString()
      .padStart(2, 0);
    document.getElementById("advertisement-minutes").innerHTML = minutes
      .toString()
      .padStart(2, 0);
    document.getElementById("advertisement-seconds").innerHTML = seconds
      .toString()
      .padStart(2, 0);

    // If the count down is finished, write some text
  }, 1000);
}

const swiper = new Swiper(".feature-list", {
  grabCursor: false,
  slidesPerView: 1,
  nextButton: ".nav-pre",
  prevButton: ".nav-next",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".nav-next",
    prevEl: ".nav-pre",
  },
  breakpoints: {
    800: {
      width: 357,
      spaceBetween: 32,
    },
    400: {
      slidesPerView: 1,
      spaceBetween: 32,
    },
  },
});
