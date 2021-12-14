const clockListUL = $("#main #clockList");
let clockSlider = null;
function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      console.log(res.clock);
      const clockList = res.clock;
      const total = clockList.length;
      const center = Math.round(total / 2);
      let output = "";
      $.each(clockList, function (idx, item) {
        output += `
          <li class="swiper-slide">
            <div class="info">
              <p class="category" data-splitting>${item.category}</p>
              <h2 class="title" data-splitting>${item.title}</h2>
              <p class="depth" data-splitting><strong>${item.depth}</strong> mm</p>
              <p class="price" data-splitting>CHF ${item.price}</p>
            </div>
            <div class="img">
              <img src="${item.bg}">
            </div>
          </li>
        `;
      });
      clockListUL.html(output);
      if (clockSlider !== null) {
        clockSlider.destroy();
      }
      setTimeout(function () {
        gsap.from("#clockList li", {
          opacity: 0,
          y: -300,
          ease: "bounce",
          duration: 2,
          stagger: {
            from: "center",
            amount: 2,
          },
        });
      }, 0);
      //loop 옵션을 쓰면 몇개의 li들이 더 생성된다.
      clockSlider = new Swiper("#main", {
        slidesPerView: "auto",
        loop: true,
        effect: "coverflow",
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          slideShadows: false,
          depth: 1000,
          stretch: 0,
        },
        pagination: {
          el: "#main .pagination",
          clickable: true,
        },
        mousewheel: true,
      });
    },
  });
}

loadJson("../data/bigbang.json");
const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const jsonFile = $(this).data("json");
  if ($(this).hasClass("selected")) return;
  $(this).addClass("selected").siblings("li").removeClass("selected");
  loadJson(jsonFile);
});
