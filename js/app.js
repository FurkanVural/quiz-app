const soruListesi = [
  new Soru(
    "1-Hangisi Javascript paket yönetim uygulamasıdır?",
    { a: "Node.js", b: "Typescript", c: "Nuget", d: "Npm" },
    "d"
  ),
  new Soru(
    "2-Hangisi frontend kapsamında değerlendirilmez?",
    { a: "css", b: "html", c: "javascipt", d: "sql" },
    "d"
  ),
  new Soru(
    "3-Hangisi backend kapsamında değerlendirilir?",
    { a: "node.js", b: "typescript", c: "angular", d: "react" },
    "a"
  ),
  new Soru(
    "4-Hangisi javascript programlama dilini kullanmaz?",
    { a: "react", b: "angular", c: "vuejs", d: "asp.net" },
    "d"
  ),
];
function optionDisable(){
    const options = document.querySelectorAll(".option");
    for (let option of options) {
      option.classList.add("disabled");
    }
    ui.btnNext.classList.add("d-block");
    ui.btnNext.classList.remove("d-none");
}
const DURATION = 10;
let startTime;
let pausedAt = 0;
let rafId;

function tick(now) {
  const elapsed = Math.floor((now - startTime - pausedAt) / 1000);
  const left = Math.max(0, DURATION - elapsed);
  ui.timer.textContent = `${left}`;

  if (left > 0) {
    rafId = requestAnimationFrame(tick);
  } else {
    optionDisable();
  }
}

function start() {
  cancelAnimationFrame(rafId);
  startTime = performance.now();
  pausedAt = 0;
  rafId = requestAnimationFrame(tick);
}

const quiz = new Quiz(soruListesi);
const ui = new UI();
const soru = new Soru();
ui.btnNext.addEventListener("click", function () {
  if (quiz.soruIndex === soruListesi.length) {
    ui.quizBox.classList.add("d-none");
    ui.quizBox.classList.remove("d-block");
    ui.scoreBox.classList.add("d-block");
    ui.scoreBox.classList.remove("d-none");
  } else {
    ui.soruGoster(quiz.soruGetir());
    quiz.soruIndex += 1;
    ui.soruSayisi.innerHTML = quiz.soruIndex + " / " + soruListesi.length;
  }

  ui.timeFlow.style.animation = "none";
  ui.timeFlow.offsetHeight;
  ui.timeFlow.style.animation = "time-flow 10s linear forwards";
  ui.timeFlow.style.animationPlayState = "running";
  ui.btnNext.classList.add("d-none");
    ui.btnNext.classList.remove("d-block");
  start();
});
ui.btnStart.addEventListener("click", function () {
  quiz.soruIndex = 0;
  ui.soruGoster(quiz.soruGetir());
  quiz.soruIndex += 1;
  ui.soruSayisi.innerHTML = quiz.soruIndex + " / " + soruListesi.length;
  ui.btnStart.classList.add("d-none");
  ui.btnStart.classList.remove("d-block");
  ui.quizBox.classList.add("d-block");
  ui.quizBox.classList.remove("d-none");
  start();
});

ui.btnReplay.addEventListener("click", function () {
  quiz.soruIndex = 0;

  ui.soruGoster(quiz.soruGetir());
  quiz.soruIndex += 1;
  ui.soruSayisi.innerHTML = quiz.soruIndex + " / " + soruListesi.length;
  ui.quizBox.classList.add("d-block");
  ui.quizBox.classList.remove("d-none");
  ui.scoreBox.classList.add("d-none");
  ui.scoreBox.classList.remove("d-block");
  start();
});
ui.btnQuit.addEventListener("click", function () {
  ui.soruIndex = 0;
  ui.soruIndex += 1;

  ui.btnStart.classList.add("d-block");
  ui.btnStart.classList.remove("d-none");
  ui.scoreBox.classList.add("d-none");
  ui.scoreBox.classList.remove("d-block");
});
let score_point = 0;
function optionSelected(e) {
  console.log(e.target);
  let selectedElement = e.target;
  if (selectedElement.nodeName == "SPAN") {
    selectedElement = selectedElement.closest("div");
  }
  const cevap = selectedElement.innerText[0];
  const soru = quiz.sorular[quiz.soruIndex - 1];
  
  if (soru.cevabiKontrolEt(cevap)) {
    selectedElement.classList.add("correct");
    selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    soru_sayisi = soruListesi.length;
    score_point += 1;
    ui.scorePoint.textContent = `${soru_sayisi} sorudan ${score_point} soru doğru yaptınız.`;
  } else {
    selectedElement.classList.add("false");
    selectedElement.insertAdjacentHTML("beforeend", ui.falseIcon);
  }
  optionDisable();
  ui.timeFlow.style.animationPlayState = "paused";
  cancelAnimationFrame(rafId);
}
