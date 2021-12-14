const main = $("#main");
const itemUL = $("#main #itemList");
function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      const clockList = res.clock;
      let output = "";
      $.each(clockList, function (idx, item) {
        output += `
          <li>
            <div class="card">
              <div class="front face">
                <div class="img"><img src="${item.bg}" alt="" /></div>
              </div>
              <div class="back face">
                <div class="info">
                  <p class="category">${item.category}</p>
                  <h2 class="title">${item.title}</h2>
                  <p class="depth">${item.depth}mm</p>
                  <p class="price">${item.price} CHN</p>
                </div>
              </div>
            </div>
          </li>
          `;
      });
      itemUL.html(output);
    },
  });
}
loadJson("../data/bigbang.json");

const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const jsonFile = $(this).data("json");
  //console.log(jsonFile);
  if ($(this).hasClass("selected")) {
    return;
  }
  $(this).addClass("selected").siblings("li").removeClass("selected");
  loadJson(jsonFile);
});

//이벤트 위임
let aa = 10;
// if (aa === 10) {
//   aa = 20;
// } else {
//   aa = 10;
// }
//삼항연산자...
//aa === 10 ? (aa = 20) : (aa = 10);
let age = 10;
let isAdult = age >= 20 ? "adult" : "baby";
console.log(isAdult);
$("#itemList").on("click", "li .card", function () {
  const tr = !$(this).parent().hasClass("on") ? 180 : 0;
  $(this).parent().toggleClass("on");
  gsap.to(this, { rotateY: tr, duration: 1, ease: "back.inOut" });
});
