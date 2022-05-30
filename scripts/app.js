function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

var canvas = document.createElement("canvas");

window.addEventListener('resize', () => {
  setTimeout(() => {
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.75;
  }, 500)

});

function randomIndex(number) {
  return Math.floor(Math.random() * number)
}

const indexTeam = 0
const loopTeam = true;

$(".team-gallery").slick({
  dots: false,
  slidesToShow: 1,
  draggable: true,
  infinite: loopTeam,
  speed: 200,
  centerMode: true,
  variableWidth: true,
  arrows: false,
  initialSlide: indexTeam,
  focusOnSelect: true,
  asNavFor: ".team-description-list",
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
  if (currentSlide !== nextSlide) {
    document.querySelectorAll('.slick-center + .slick-cloned').forEach((next) => {
      setTimeout(() => next.classList.add('slick-current', 'slick-center'));
    });
  }
});


$(".feature-list").slick({
  dots: true,
  infinite: true,
  centerMode: true,
  adaptiveHeight: true,
  variableWidth: true,
  focusOnSelect: true,
  initialSlide: 0,
  arrows: true,
  prevArrow: `<button type='button' class='slick-prev pull-left'><span class="icon-arrow-left"></span></button>`,
  nextArrow: `<button type='button' class='slick-next pull-right'><span class="icon-arrow-right"></span></button>`,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        centerMode: false,
      },
    },
  ],
}).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
  if (currentSlide !== nextSlide) {
    document.querySelectorAll('.slick-center + .slick-cloned').forEach((next) => {
      // timeout required or Slick will overwrite the classes
      setTimeout(() => next.classList.add('slick-current', 'slick-center'));
    });
  }
});


$(".advisor-list").slick({
  dots: false,
  infinite: true,
  slidesToShow: 3,
  variableWidth: true,
  centerMode: true,
  focusOnSelect: true,
  initialSlide: randomIndex(4),
  arrows: true,
  prevArrow: `<button type='button' class='slick-prev pull-left'><span class="icon-chevron-left"></span></button>`,
  nextArrow: `<button type='button' class='slick-next pull-right'><span class="icon-chevron-right"></span></button>`,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        centerMode: false,
      },
    },
  ],
});

$(".team-description-list").slick({
  dots: true,
  slidesToShow: 1,
  infinite: loopTeam,
  arrows: true,
  speed: 200,
  initialSlide: indexTeam,
  focusOnSelect: true,
  asNavFor: ".team-gallery",
  prevArrow: `<button type='button' class='slick-prev pull-left'><span class="icon-chevron-left"></span></button>`,
  nextArrow: `<button type='button' class='slick-next pull-right'><span class="icon-chevron-right"></span></button>`,
});

function scrollHorizontal(classname) {
  const scrollBrand = document.querySelector(classname);
  scrollBrand.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollBrand.scrollLeft += evt.deltaY;
  });
}

$(document).ready(function () {
  $(".mb-navigation-list-menu-item-text").on("click", () => {
    $("body").removeClass("nav-active");
  });
  // scrollHorizontal(".timeline-scroll");
  // scrollHorizontal(".partners-brand-item");
  countdown();
  formEvent();
  app();
});

function onSubmit(e) {
  e.preventDefault();

  const name = document.querySelector("#fullname").value;
  const email = document.querySelector("#email").value;

  if (!name || !email) {
    notification("Please enter data full form", "Warning");
    return;
  }

  grecaptcha
    .execute("6Ldb9_gfAAAAAObJHYgKp5ifrmL7U4iGIIUCTfGu", {
      action: "homepage",
    })
    .then(function (token) {
      const captcha = token;

      fetch("https://nodejsv3captcha.herokuapp.com/subscribe", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          captcha: captcha,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const { success } = result;
          if (success) {
            notification("Your whitelist is added");
            document.querySelector("#fullname").value = "";
            document.querySelector("#email").value = "";
          }
        });
    });
}

function notification(text, heading = "Success") {
  $.toast({
    heading: heading,
    text: text,
    showHideTransition: "slide",
    icon: heading,
    position: "bottom-right",
  });
}

function formEvent(e) {
  document
    .getElementById("formWhiteListSubmit")
    .addEventListener("submit", onSubmit);
}

const app = () => {
  let body;
  let menu;
  let menuItems;
  let nav;
  let whitelistBlur;
  let btnWhitelist;
  let mouseoverFormWhitelist = false;
  const init = () => {
    body = document.querySelector("body");
    menu = document.querySelector(".menu-icon");
    nav = document.querySelector(".nav");
    containerWhitelist = document.querySelector(".form-whitelist");
    whitelistBlur = document.getElementById("whitelist-blur");
    btnWhitelist = document.getElementById("btnWhiteList");
    applyListeners();
  };
  const applyListeners = () => {
    menu.addEventListener("click", () => toggleClass(body, "nav-active"));
    containerWhitelist.addEventListener("mouseover", () => {
      mouseoverFormWhitelist = true;
    });
    containerWhitelist.addEventListener("mouseout", () => {
      mouseoverFormWhitelist = false;
    });
    whitelistBlur.addEventListener("click", () => {
      if (!mouseoverFormWhitelist) {
        closePopupWhitelist(whitelistBlur, "whitelist-show");
      }
    });
    btnWhitelist.addEventListener("click", () => {
      openPopupWhitelist(whitelistBlur, "whitelist-show");
    });
  };
  const toggleClass = (element, stringClass) => {
    if (element.classList.contains(stringClass))
      element.classList.remove(stringClass);
    else element.classList.add(stringClass);
  };
  const closePopupWhitelist = (element, stringClass) => {
    if (element.classList.contains(stringClass)) {
      element.classList.remove(stringClass);
    }
  };
  const openPopupWhitelist = (element, stringClass) => {
    if (!element.classList.contains(stringClass)) {
      element.classList.add(stringClass);
    }
  };
  init();
};
const sections = document.querySelectorAll("section[id]");

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - 100
  }, 200);
});

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 120,
      sectionId = current.getAttribute("id");
    if (scrollY > 65) {
      $("nav").addClass("fixed-menu");
    } else {
      $("nav").removeClass("fixed-menu");
    }
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".mb-navigation-list-menu a[href*=" + sectionId + "]")
        .classList.add("active");
      document
        .querySelector(
          ".header-menu-item a[href*=" + sectionId + "].header-menu-text"
        )
        .classList.add("active");
    } else {
      document
        .querySelector(".mb-navigation-list-menu a[href*=" + sectionId + "]")
        .classList.remove("active");
      document
        .querySelector(
          ".header-menu-item a[href*=" + sectionId + "].header-menu-text"
        )
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);
function countdown() {
  var countDownDate = new Date("June 24, 2022 16:30:00").getTime();

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

    document.getElementById("advers-days").innerHTML = days;
    document.getElementById("advers-hours").innerHTML = hours
      .toString()
      .padStart(2, 0);
    document.getElementById("advers-minutes").innerHTML = minutes
      .toString()
      .padStart(2, 0);
    document.getElementById("advers-seconds").innerHTML = seconds
      .toString()
      .padStart(2, 0);

    // If the count down is finished, write some text
  }, 1000);
}


var width = (canvas.width = window.innerWidth * 0.75);
var height = (canvas.height = window.innerHeight * 0.75);
document.getElementsByClassName("first-view")[0].appendChild(canvas);
var gl = canvas.getContext("webgl");

var mouse = { x: 0, y: 0 };

var numMetaballs;
if (window.innerWidth > 992) {
  numMetaballs = 25;
} else {
  numMetaballs = 8;
}
var metaballs = [];

for (var i = 0; i < numMetaballs; i++) {
  var radius = Math.random() * 60 + 10;
  metaballs.push({
    x: Math.random() * (width - 2 * radius) + radius,
    y: Math.random() * (height - 2 * radius) + radius,
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 3,
    r: radius * 0.75,
  });
}

var vertexShaderSrc = `
attribute vec2 position;

void main() {
// position specifies only x and y.
// We set z to be 0.0, and w to be 1.0
gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentShaderSrc =
  `
precision highp float;

const float WIDTH = ` +
  (width >> 0) +
  `.0;
const float HEIGHT = ` +
  (height >> 0) +
  `.0;

uniform vec3 metaballs[` +
  numMetaballs +
  `];

void main(){
float x = gl_FragCoord.x;
float y = gl_FragCoord.y;

float sum = 0.0;
for (int i = 0; i < ` +
  numMetaballs +
  `; i++) {
vec3 metaball = metaballs[i];
float dx = metaball.x - x;
float dy = metaball.y - y;
float radius = metaball.z;

sum += (radius * radius) / (dx * dx + dy * dy);
}

if (sum >= 0.99) {
gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0.992,0.85,0.03), max(1.0, 1.0 - (sum - 0.8) * 100.0)), 0.1);
return;
}

gl_FragColor = vec4(0.184,0.239,0.29, 1.0);
}

`;

var vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

var vertexData = new Float32Array([
  -1.0,
  1.0, // top left
  -1.0,
  -1.0, // bottom left
  1.0,
  1.0, // top right
  1.0,
  -1.0, // bottom right
]);
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

var positionHandle = getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(
  positionHandle,
  2, // position is a vec2
  gl.FLOAT, // each component is a float
  gl.FALSE, // don't normalize values
  2 * 4, // two 4 byte float components per vertex
  0 // offset into each span of vertex data
);

var metaballsHandle = getUniformLocation(program, "metaballs");

loop();
function loop() {
  for (var i = 0; i < numMetaballs; i++) {
    var metaball = metaballs[i];
    metaball.x += metaball.vx;
    metaball.y += metaball.vy;

    if (metaball.x < metaball.r || metaball.x > width - metaball.r)
      metaball.vx *= -1;
    if (metaball.y < metaball.r || metaball.y > height - metaball.r)
      metaball.vy *= -1;
  }

  var dataToSendToGPU = new Float32Array(3 * numMetaballs);
  for (var i = 0; i < numMetaballs; i++) {
    var baseIndex = 3 * i;
    var mb = metaballs[i];
    dataToSendToGPU[baseIndex + 0] = mb.x;
    dataToSendToGPU[baseIndex + 1] = mb.y;
    dataToSendToGPU[baseIndex + 2] = mb.r;
  }
  gl.uniform3fv(metaballsHandle, dataToSendToGPU);

  //Draw
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(loop);
}

function compileShader(shaderSource, shaderType) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }

  return shader;
}

function getUniformLocation(program, name) {
  var uniformLocation = gl.getUniformLocation(program, name);
  if (uniformLocation === -1) {
    throw "Can not find uniform " + name + ".";
  }
  return uniformLocation;
}

function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw "Can not find attribute " + name + ".";
  }
  return attributeLocation;
}

canvas.onmousemove = function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};
