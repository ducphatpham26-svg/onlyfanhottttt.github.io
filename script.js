const confirmBtn=document.getElementById("confirmBtn")
const napBtn=document.getElementById("napBtn")
const loadingBox=document.getElementById("loadingBox")
const loadingBar=document.getElementById("loadingBar")
const loadingText=document.getElementById("loadingText")
const formBox=document.getElementById("formBox")
const surveyBox=document.getElementById("surveyBox")
const beautyRange=document.getElementById("beautyRange")
const iqRange=document.getElementById("iqRange")
const beautyValue=document.getElementById("beautyValue")
const iqValue=document.getElementById("iqValue")
const beautyConfirm=document.getElementById("beautyConfirm")
const iqConfirm=document.getElementById("iqConfirm")
const nextBtn=document.getElementById("nextBtn")

let allowClick=false,loading=false,progress=0,stuckMode=true,popupBox=null
let originalTexts={},scrambleInterval=null
let surveyOpened=false  

confirmBtn.addEventListener("mouseover",()=>{if(!allowClick&&!loading){confirmBtn.style.position="absolute";const x=Math.random()*300-150,y=Math.random()*200-100;confirmBtn.style.transform=`translate(${x}px,${y}px)`}})

napBtn.addEventListener("click",()=>{


if(surveyOpened){
nextBtn.style.display="block"
}

if(!allowClick){
allowClick=true
confirmBtn.style.transform="translate(0,0)"
confirmBtn.style.position="static"
}else stuckMode=false})

confirmBtn.addEventListener("click",()=>{if(!allowClick)return;loading=true;loadingBox.style.display="block";runLoading()})

function runLoading(){const t=setInterval(()=>{if(!stuckMode){progress+=2;if(progress>=100){
progress=100
updateLoading()
clearInterval(t)
formBox.style.display="none"
surveyBox.style.display="block"
surveyOpened = true
saveOriginalTexts()
scrambleLoop()
}}else{
if(progress<67)progress+=1.5
else{
progress-=1.2
if(progress<40)progress=40
}}
updateLoading()},80)}

function updateLoading(){loadingBar.style.width=progress+"%";loadingText.textContent=Math.floor(progress)+"%"}

function saveOriginalTexts(){document.querySelectorAll("h2,label,.scramble-text").forEach((el,i)=>{originalTexts[i]=el.textContent;el.dataset.scrambleId=i})}

function scrambleLoop(){if(scrambleInterval)return;scrambleInterval=setInterval(()=>{
const iq=Number(iqRange.value)
const els=document.querySelectorAll("h2,label,.scramble-text")
if(iq<60){
els.forEach(el=>{
let t=originalTexts[el.dataset.scrambleId]
let s=t.split("").sort(()=>Math.random()-.5).join("")
el.textContent=s
})
}else{
els.forEach(el=>{el.textContent=originalTexts[el.dataset.scrambleId]})
}},150)}

beautyRange.addEventListener("input",()=>{beautyValue.textContent=beautyRange.value})
iqRange.addEventListener("input",()=>{iqValue.textContent=iqRange.value})

beautyConfirm.addEventListener("click",()=>{let b=Number(beautyRange.value)
if(b<50){showPopup("you are always the main char in ur own story lol",()=>{beautyRange.value=80;beautyValue.textContent=80});return}
if(b===100){showPopup("confidence is also a skill yk..");return}})

iqConfirm.addEventListener("click",()=>{let iq=Number(iqRange.value)
if(iq<60)return
if(iq>=150){showHardMath();return}})

function showPopup(t,cb=null){closePopup();popupBox=document.createElement("div");popupBox.className="math-box";popupBox.innerHTML=`<p class="messy">${t}</p><button id="closePopup" class="btn">close</button>`;document.body.appendChild(popupBox);document.getElementById("closePopup").onclick=()=>{closePopup();if(cb)cb()}}

function closePopup(){if(popupBox){popupBox.remove();popupBox=null}}

function showHardMath(){closePopup();popupBox=document.createElement("div");popupBox.className="math-box";popupBox.innerHTML=`<h3 class="messy">hard iq stuff</h3><p class="messy">solve this messy thing pls:</p><p style="font-size:18px;margin:10px 0;" class="messy">(7×13)+(√4489÷7)-log₁₀(10⁶·⁷)</p><input id="mathAnswer" type="number" placeholder="answer.."><button id="submitMath" class="btn">ok</button>`;document.body.appendChild(popupBox);document.getElementById("submitMath").onclick=()=>{closePopup()}}  // ⭐ bỏ toán luôn

nextBtn.onclick=()=>{window.location.href="https://ducphatpham26-svg.github.io"}
