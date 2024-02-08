class Slot {
    constructor(choice){
        this.choice = choice;
        this.choiceNum = choice.length;
    }

    registerChoice(){
        let elemSlot = document.getElementById("js-slot");
        let choiceNum = this.choice.length;

        for (let i=0; i<choiceNum*5; i++){
            if (i==2){
                let elem = document.createElement("div");
                elem.setAttribute("class", "hit");
                elemSlot.appendChild(elem);
            }
            let elem = document.createElement("p");
            elem.setAttribute("class", "js-text-slot");
            elem.textContent = this.choice[i%choiceNum];
            elemSlot.appendChild(elem);
        }
    }

    setKeyframes(){
        let keyframes = `
            @keyframes slot{
                0%{
                    transform: translateY(${-48*this.choiceNum}px);
                }
                100%{
                    transform: translateY(0);
                }
            }
        `;
        let style = document.getElementsByTagName("style")[0];
        style.insertAdjacentHTML("afterbegin", keyframes);
    }
}

function rand(n){
    return Math.trunc(Math.random()*n);
}

function enableButtonStart(choiceNum){
    let elemButtonStart = document.getElementById("js-button-start");
    let elemTextSlot = document.getElementsByClassName("js-text-slot");

    elemButtonStart.onclick = ()=>{
        elemButtonStart.disabled = true;
        for (let text of elemTextSlot){
            text.classList.add("slot-mode");
            let loopDuration = choiceNum*0.14;
            text.style.animationDuration = `${loopDuration}s`;
            text.style.animationIterationCount = "infinite";
        }
        let spinDuration = 3000;
        setTimeout(() => {
            let unit = -24;
            let randSelect = unit*(choiceNum+rand(choiceNum));
            for (let text of elemTextSlot){
                text.classList.remove("slot-mode");
                text.style.transform = `translateY(${randSelect}px)`;
            }
            let restartDuration = 800;
            setTimeout(()=>{
                elemButtonStart.disabled = false;
            }, restartDuration);
        }, spinDuration);
    };
}

// スロットの出目
let choice = [
    "所持金+10%",
    "所持金増加量+10%",
    "所持金+30%",
    "スロット間隔短縮30秒",
    "所持金+50%",
    "ショップ1回",
    "所持金増加量+30%",
    "スロット強化30秒",
];

// 回すボタン
enableButtonStart(choice.length);

// スロット
let slot = new Slot(choice);
slot.registerChoice();
slot.setKeyframes();

// 所持金
let elemMoney = document.getElementById("js-money");
let savedMoney = localStorage.getItem("money");
let money;
if (savedMoney===null){
    money = 0;
} else {
    money = parseInt(savedMoney);
    elemMoney.textContent = money;
}
let moneyIncrease = 1;
setInterval(() => {
    money += moneyIncrease;
    elemMoney.textContent = money;
    localStorage.setItem("money", money);
}, 1000);

let elemButtonReset = document.getElementById("js-button-reset");
elemButtonReset.onclick = ()=>{
    money = 0;
    localStorage.setItem("money", 0);
    elemMoney.textContent = 0;
}