function UI(){
    this.questionBox = document.querySelector("#question-box");
    this.btnNext = document.querySelector(".btn-next");
    this.scoreBox = document.querySelector("#score");
    this.quizBox = document.querySelector("#quiz-box");
    this.btnStart = document.querySelector("#btn-start")
    this.btnReplay = document.querySelector(".btn-replay");
    this.btnQuit = document.querySelector(".btn-quit");
    this.soruSayisi = document.querySelector(".soru-sayisi");
    this.falseIcon = `<i class="bi bi-x-circle"></i>`;
    this.correctIcon = `<i class="bi bi-check-circle"></i>`
    
}



UI.prototype.soruGoster = function(soru){
    this.questionBox.innerHTML = "";
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const soruTitle = document.createElement("h2");
    soruTitle.classList.add("soru-text");
    soruTitle.textContent = soru.soruText;

    const optionList = document.createElement("div");
    optionList.classList.add("option-list", "d-grid", "gap-2");


    for(let [key, value] of Object.entries(soru.cevapSecenekleri)){
        const option = document.createElement("div");
        option.classList.add("option", "btn", "btn-outline-secondary");
        option.addEventListener("click", optionSelected)
        const span = document.createElement("span");
        span.classList.add("option-span");
        span.textContent = key + ") " + value;

        option.appendChild(span);
        optionList.appendChild(option);
    }
    
    cardBody.appendChild(soruTitle);
    cardBody.appendChild(optionList);

    this.questionBox.appendChild(cardBody);
}