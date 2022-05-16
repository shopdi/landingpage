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

  $(".mb-navigation-list-menu-item-text").on("click", () => {
    $("body").removeClass("nav-active");
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
console.clear();
const app = (() => {
    let body;
    let menu;
    let menuItems;
    let nav;
    const init = () => {
        body = document.querySelector("body");
        menu = document.querySelector(".menu-icon");
        nav = document.querySelector(".nav");
        applyListeners();
    };
    const applyListeners = () => {
        menu.addEventListener("click", () => toggleClass(body, "nav-active"));
    };
    const toggleClass = (element, stringClass) => {
        if (element.classList.contains(stringClass))
            element.classList.remove(stringClass);
        else element.classList.add(stringClass);
    };
    init();
})();
const sections = document.querySelectorAll("section[id]");

  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 120,
        sectionId = current.getAttribute("id");
      console.log(current.offsetTop)
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".mb-navigation-list-menu a[href*=" + sectionId + "]")
          .classList.add("active");
      } else {
        document
          .querySelector(".mb-navigation-list-menu a[href*=" + sectionId + "]")
          .classList.remove("active");
      }
    });
  }
  window.addEventListener("scroll", scrollActive);
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


var canvas = document.createElement("canvas");
var width = canvas.width = window.innerWidth * 0.75;
var height = canvas.height = window.innerHeight * 0.75;
document.getElementsByClassName('first-view')[0].appendChild(canvas);
var gl = canvas.getContext('webgl');

var mouse = {x: 0, y: 0};

var numMetaballs
if(window.innerWidth > 992) {
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
    r: radius * 0.75
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

var fragmentShaderSrc = `
precision highp float;

const float WIDTH = ` + (width >> 0) + `.0;
const float HEIGHT = ` + (height >> 0) + `.0;

uniform vec3 metaballs[` + numMetaballs + `];

void main(){
float x = gl_FragCoord.x;
float y = gl_FragCoord.y;

float sum = 0.0;
for (int i = 0; i < ` + numMetaballs + `; i++) {
vec3 metaball = metaballs[i];
float dx = metaball.x - x;
float dy = metaball.y - y;
float radius = metaball.z;

sum += (radius * radius) / (dx * dx + dy * dy);
}

if (sum >= 0.99) {
gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0.992,1,0.086), max(1.0, 1.0 - (sum - 0.99) * 100.0)), 0.1);
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
  -1.0,  1.0, // top left
  -1.0, -1.0, // bottom left
  1.0,  1.0, // top right
  1.0, -1.0, // bottom right
]);
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

var positionHandle = getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle,
                       2, // position is a vec2
                       gl.FLOAT, // each component is a float
                       gl.FALSE, // don't normalize values
                       2 * 4, // two 4 byte float components per vertex
                       0 // offset into each span of vertex data
                      );

var metaballsHandle = getUniformLocation(program, 'metaballs');

loop();
function loop() {
  for (var i = 0; i < numMetaballs; i++) {
    var metaball = metaballs[i];
    metaball.x += metaball.vx;
    metaball.y += metaball.vy;

    if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
    if (metaball.y < metaball.r || metaball.y > height - metaball.r) metaball.vy *= -1;
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
    throw 'Can not find uniform ' + name + '.';
  }
  return uniformLocation;
}

function getAttribLocation(program, name) {
  var attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw 'Can not find attribute ' + name + '.';
  }
  return attributeLocation;
}

canvas.onmousemove = function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}


