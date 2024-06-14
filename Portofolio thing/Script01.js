let panels = [];
let sketchPanels = [];

let orderArray = [];
//let auxArray = [];
let buttons;
let indexArray = [[0,1,2],[0,1,2]];
let selectors = [];
let sketchSelectors = [];

let modalPanel;
let imgSrc;

let workList;
let workListChildren;

let sketchList;
let sketchListChildren;

let descriptions = ["Posters","Studies & W.I.P.","Digital Drawings"];

let descriptionIndex = 0;
let descriptionThresholds = [4,9];


let moveBack;
let moveFront;


const description = {
    tags: ["Posters","Studies & W.I.P.","Digital Drawings"],
    index: 0,
    thresholds: [4,9],
    id: "dgtlWorkHeader"
};

const sketchDescription = {
    tags: ["Original work","Sketches"],
    index: 0,
    thresholds: [3,5],
    id: "sketchHeader"
};

const deltas = {
    x: null,
    y: null,
    width: null,
    height: null
};

let sketchDescriptions = descriptions;

let sketchIndex = 0;
let sketchThresholds = [3,4,5];

let transformIndex = 1;

const parser = new DOMParser();
const _delay = 1260;

let fillMode = 'forwards';

let queryThing = window.matchMedia("(width <= 1014px)");

const digitalImages = [
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Poster01_banner.jpg">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Poster02.jpg">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Poster03_trad.jpg">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Poster04.jpg">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Afisa gia theatrikh (hopefully)_v3.2.webp">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Afisa gia theatrikh (hopefully)_v3.3.webp">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Afisa gia theatrikh (hopefully)_v3.4.webp">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Afisa gia theatrikh (hopefully)_v4.webp">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Posters enhanced/Afisa gia theatriki_v2.webp">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Digital Drawings/Story Concept 01.webp">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Digital Drawings/Story Concept 02.webp">','text/html').body.firstChild
];

const sketchImages = [
    parser.parseFromString('<img src="Page Export_files/Sketches/IMG_20240611_180215.jpg">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Sketches/IMG_20240611_181010.jpg">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Sketches/IMG_20240611_181935.jpg">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Sketches/Library_of_Ephesus.jpg">','text/html').body.firstChild,
    parser.parseFromString('<img src="Page Export_files/Sketches/20210328_105358.jpg">','text/html').body.firstChild,
];

window.addEventListener("resize",function(){
    //console.log("Resizeeee!");
    
    animateShit(document.querySelector("[style='order: 4;']"),document.querySelector("[style='order: 3;']"),true,true,0,"none");
    animateShit(document.querySelector("[style='order: 3;']"),document.querySelector("[style='order: 2;']"),true,true,0,"none");
    animateMultiple([document.querySelector("[style='order: 2;']"), buttons[0].parentElement,buttons[1].parentElement,document.querySelector("[style='order: 4;']")], true,true,0,"none");
    
    animateShit(document.querySelector("[style='order: 8;']"),document.querySelector("[style='order: 7;']"),true,true,0,"none");
    animateShit(document.querySelector("[style='order: 7;']"),document.querySelector("[style='order: 6;']"),true,true,0,"none");
    animateMultiple([document.querySelector("[style='order: 6;']"), buttons[0].parentElement,buttons[1].parentElement,document.querySelector("[style='order: 8;']")], true,true,0,"none");
    

    
    for(let i = 0; i <= panels.length-1;i++)
        {
            panels[i].classList.add("resetTransforms");
            panels[i].style.order = orderArray[0][i];
            
            sketchPanels[i].classList.add("resetTransforms");
            sketchPanels[i].style.order = orderArray[1][i];
        }
});

window.onload = function(){
    panels = document.getElementsByClassName("panel");
    panels = Array.from(panels);
    
    sketchPanels = document.getElementsByClassName("sketchPanel");
    sketchPanels = Array.from(sketchPanels);
    
    modalPanel = document.getElementById("imgModal");
    document.getElementById("dgtlWorkHeader").innerHTML = descriptions[0];
    
    for(let i = 0; i <= panels.length - 1; i++){
        
        //orderArray[i] = getComputedStyle(panels[i]).order;
        orderArray[0] = [];
        orderArray[1] = [];
        for(let j = 0; j <= panels.length-1;j++)
            {
                orderArray[0][j] = getComputedStyle(panels[j]).order;
                orderArray[1][j] = getComputedStyle(sketchPanels[j]).order;
            }
        //orderArray[1] = getComputedStyle(sketchPanels[i]).order;
        
        //auxArray[i] = document.querySelectorAll("[style*='order']")[i];
        panels[i].addEventListener("click",function(){getImage(this)});
        sketchPanels[i].addEventListener("click",function(){getImage(this)});
        panels[i].addEventListener("animationstart",function(){console.log("Fuck you");});
        //panels[i].innerHTML += " " + (indexArray[i]).toString();
    }
    //buttons = [document.querySelectorAll("[onClick]")[0],document.querySelectorAll("[onClick]")[1]];
    buttons = [document.getElementsByClassName("button")[0],document.getElementsByClassName("button")[1]];
    sketchButtons = [document.getElementsByClassName("button")[2],document.getElementsByClassName("button")[3]];
    selectors = [document.querySelector("[style='order: 2;']"),document.querySelector("[style='order: 3;']"),document.querySelector("[style='order: 4;']")];
    sketchSelectors = [document.querySelector("[style='order: 6;']"),document.querySelector("[style='order: 7;']"),document.querySelector("[style='order: 8;']")];
    
    modalPanel.addEventListener("click",function(){modalPanel.style.display = "none";});
    document.getElementsByClassName("appIcon").addEventListener("click",function(){getImage(this)});
    
    workList = document.getElementsByClassName("workList")[0];
    sketchList = document.getElementsByClassName("workList")[1];
    workListChildren = [buttons[0].parentElement,selectors[0],selectors[1],selectors[2],buttons[1].parentElement];
    sketchListChildren = [sketchButtons[0].parentElement,sketchSelectors[0],sketchSelectors[1],sketchSelectors[2],sketchButtons[1].parentElement];
    
    
    


}


//onclick="moveBack(panels,selectors,buttons,orderArray[0],indexArray[0],digitalImages,description)"

queryThing.addEventListener("change",function(){
    
    if(!this.matches)
        {
            for(let i = 0; i <= selectors.length-1;i++)
                {
                    selectors[i].firstChild.style.removeProperty('transform');
                    sketchSelectors[i].firstChild.style.removeProperty('transform');
                }
        }    
});


function getImage(elmnt)
{
    imgSrc = elmnt.firstChild.src;
    modalPanel.style.display = "block";
    modalPanel.firstChild.src = imgSrc;
    console.log(imgSrc);
    
}

function changeHeader(id,text,textIndex,delay,itIncrements)
{

    document.getElementById(id).classList.add("animationHeader");
    setTimeout(function(){
        if(itIncrements)
            document.getElementById(id).innerHTML = text[++textIndex];
        else
            document.getElementById(id).innerHTML = text[--textIndex];
    },delay/2);
    console.log("Index: " + textIndex);
    setTimeout(function(){
       document.getElementById(id) .classList.remove("animationHeader");
    },delay);  
    
    if(textIndex == window.descriptionIndex && itIncrements)
        window.descriptionIndex += 1;
    
    //return itIncrements ? ++textIndex : --textIndex;
}

function getDeltas(elmntfrom, elmntTo){
    
    let deltaObject = {
        x: null,
        y: null,
        width: null,
        height: null
    };
    deltaObject.x = elmntfrom.offsetLeft - elmntTo.offsetLeft;
    deltaObject.y = elmntfrom.offsetTop - elmntTo.offsetTop;
    
    deltaObject.width = elmntfrom.offsetWidth - elmntTo.offsetWidth;
    
    deltaObject.x = Math.sqrt(Math.pow(deltaObject.x, 2));
    
    return deltaObject;
}

function animateShit(elmntFrom, elmntTo,xToNegative, yToNegative,time,fill){
    
    //deltas.x = elmntFrom.offsetLeft - elmntTo.offsetLeft;
    //deltas.y = elmntFrom.offsetTop - elmntTo.offsetTop;
    
    deltas.x = getDeltas(elmntFrom,elmntTo).x;
    deltas.y = getDeltas(elmntFrom,elmntTo).y;
    
    //deltas.x = Math.sqrt(Math.pow(deltas.x,2));
    if(yToNegative)
        deltas.y = -deltas.y;
    if(xToNegative)
        deltas.x = -deltas.x;
    
    console.log(deltas.x);
    
    let keyframes = new KeyframeEffect(elmntFrom,[{transform: 'translate(0px, 0px)'},{transform: `translate(${deltas.x}px, ${deltas.y}px)`}],{duration: time,easing: 'ease-in-out',fill: fill});
    let animation = new Animation(keyframes);
    
    animation.play();
    
    //elmntFrom.animate([{transform: 'translate(0px, 0px)'},{transform: `translate(${deltas.x}px, ${deltas.y}px)`}],{duration: _delay,easing: 'ease-in-out',fill:'none'});
}
function animateMultiple(elmntArray, xToNegative, yToNegative,time,fill){
    
    let deltasInBtwn = {
        initialX: getDeltas(elmntArray[0], elmntArray[1]).x,
        initlalY: getDeltas(elmntArray[0],elmntArray[1]).y,
        inBtweenX: getDeltas(elmntArray[0],elmntArray[2]).x,
        inBtweenY: getDeltas(elmntArray[0],elmntArray[2]).y,
        finalX: getDeltas(elmntArray[0],elmntArray[3]).x,
        finalY: getDeltas(elmntArray[0],elmntArray[3]).y
        
    };
    //deltas.x = getDeltas(elmntFrom,elmntTo).x;
    //deltas.y = getDeltas(elmntFrom,elmntTo).y;
    
    if(yToNegative)
        deltas.y = -deltas.y;
    if(xToNegative)
        deltas.x = -deltas.x;
    
    console.log(deltas.x);
    
    elmntArray[0].animate([{transform: 'translate(0px, 0px)',opacity: '1'},{transform: `translate(${-deltasInBtwn.initialX}px, ${deltasInBtwn.initlalY + deltasInBtwn.initialX / 2}px)`,opacity: '0'},{transform: `translate(${deltasInBtwn.inBtweenX}px, ${deltasInBtwn.inBtweenY + deltasInBtwn.initialX / 2}px)`,opacity: '0'},{transform: `translate(${deltasInBtwn.finalX}px, ${-deltasInBtwn.finalY}px)`, opacity: '1'}],{duration: time,easing: 'ease-in-out',fill:fill});
    
}

function animateXAxis(elmntFrom,elmntTo, xToNegative,alpha,time,fill,delay)
{
    deltas.x = getDeltas(elmntFrom,elmntTo).x;
    deltas.width = getComputedStyle(elmntTo).width;
    //let matrix = getComputedStyle(elmntTo).trans;
    
    let xRatio = elmntTo.offsetWidth / elmntFrom.offsetWidth;
    let yRatio = elmntTo.offsetHeight / elmntFrom.offsetHeight;
    
    deltas.x -= ((elmntTo.offsetWidth/xRatio) - (elmntTo.offsetWidth/2) / 2);
    
    //deltas.x = Math.sqrt(Math.pow(deltas.x,2));
    if(xToNegative)
        deltas.x = -deltas.x;
    
    console.log(deltas.x);
    
    let keyframes = new KeyframeEffect(elmntFrom,[{transform: 'translateX(0px)'},{transform: `translateX(${deltas.x}px) scale(${xRatio,yRatio})`,rotate: 'y 0deg'}],{duration: time,easing: 'ease-in-out',fill: fill,delay: delay});
    let animation = new Animation(keyframes);
    
    animation.play();
    elmntFrom.firstChild.style.transform = getComputedStyle(elmntTo.firstChild).transform;
}
function animateXn2(elmntFrom,elmntTo, xToNegative,alpha,time,fill,delay)
{
    deltas.x = getDeltas(elmntFrom,elmntTo).x;
    deltas.width = getComputedStyle(elmntTo).width;
    //let matrix = getComputedStyle(elmntTo).trans;
    
    let xRatio = elmntTo.offsetWidth / elmntFrom.offsetWidth;
    let yRatio = elmntTo.offsetHeight / elmntFrom.offsetHeight;
    
    deltas.x -= elmntTo.offsetWidth/2;
    
    //deltas.x = Math.sqrt(Math.pow(deltas.x,2));
    if(xToNegative)
        deltas.x = -deltas.x;
    
    console.log(xRatio);
    
    let keyframes = new KeyframeEffect(elmntFrom,[{transform: 'translateX(0px)'},{transform: `translateX(${-deltas.x}px) scale(${xRatio,yRatio})`,rotate: 'y 0deg'}],{duration: time,easing: 'ease-in-out',fill: fill,delay: delay});
    let animation = new Animation(keyframes);
    
    animation.play();
    elmntFrom.firstChild.style.transform = getComputedStyle(elmntTo.firstChild).transform;
}

function malakas(elmntFrom,elmntTo, xToNegative,alpha,time,fill,delay)
{
    deltas.x = getDeltas(elmntFrom,elmntTo).x; 
    //deltas.x -= elmntTo.offsetWidth/2;

    deltas.width = getComputedStyle(elmntTo).width;
    let matrix = getComputedStyle(elmntTo).transform;
    /*deltas.x -= elmntTo.offsetWidth/2;*/
    
    let xRatio = elmntTo.offsetWidth / elmntFrom.offsetWidth;
    let yRatio = elmntTo.offsetHeight / elmntFrom.offsetHeight;
    
    deltas.x += elmntTo.offsetWidth/2;
    
    
    //deltas.x = Math.sqrt(Math.pow(deltas.x,2));
    //+ matrix
    if(xToNegative)
        deltas.x = -deltas.x;
    
    console.log("This thing: " + xRatio);
    
    let keyframes = new KeyframeEffect(elmntFrom,[{transform: 'translateX(0px)'},{transform: `translateX(${deltas.x}px) scale(${xRatio,yRatio})` ,rotate: 'y 0deg'}],{duration: time,easing: 'ease-in-out',fill: fill,delay: delay});
    let animation = new Animation(keyframes);
    
    animation.play();
    elmntFrom.firstChild.style.transform = getComputedStyle(elmntTo.firstChild).transform;
}

function malakas2(elmntFrom,elmntTo, xToNegative,alpha,time,fill,delay)
{
    deltas.x = getDeltas(elmntFrom,elmntTo).x; 
    deltas.x = getDeltas(elmntTo,elmntFrom).x; 
    //deltas.x -= elmntTo.offsetWidth/2;

    deltas.width = getComputedStyle(elmntTo).width;
    let matrix = getComputedStyle(elmntTo).transform;
    /*deltas.x -= elmntTo.offsetWidth/2;*/
    
    let xRatio = elmntTo.offsetWidth / elmntFrom.offsetWidth;
    let yRatio = elmntTo.offsetHeight / elmntFrom.offsetHeight;
    
    deltas.x += (elmntTo.offsetWidth/4);
    
    
    //deltas.x = Math.sqrt(Math.pow(deltas.x,2));
    //+ matrix
    if(xToNegative)
        deltas.x = -deltas.x;
    
    console.log("This thing: " + deltas.x);
    
    let keyframes = new KeyframeEffect(elmntFrom,[{transform: 'translateX(0px)'},{transform: `translateX(${-deltas.x}px) scale(${xRatio,yRatio})` ,rotate: 'y 0deg'}],{duration: time,easing: 'ease-in-out',fill: fill,delay: delay});
    let animation = new Animation(keyframes);
    
    animation.play();
    elmntFrom.firstChild.style.transform = getComputedStyle(elmntTo.firstChild).transform;
}

function animateMultipleXEdition(elmntArray,xToNegative,time,fill,delay)
{
    let deltasInBtwn = {
        initialX: getDeltas(elmntArray[0], elmntArray[1]).x,
        inBtweenX: getDeltas(elmntArray[0],elmntArray[2]).x,
        finalX: getDeltas(elmntArray[0],elmntArray[3]).x,
        
    };
    //deltas.x = getDeltas(elmntFrom,elmntTo).x;
    //deltas.y = getDeltas(elmntFrom,elmntTo).y;
    let matrix = getComputedStyle(elmntArray[3]).transform;
    if(xToNegative)
        {
            deltasInBtwn.finalX *= -1;
            deltasInBtwn.initialX *= -1;
        }
    //deltasInBtwn.finalX += elmntArray[3].offsetWidth * 3 ;
    
    //console.log(deltas.x);
    
    elmntArray[0].animate([{transform: 'translateX(0px)'},{transform: `translateX(${deltasInBtwn.initialX}px)`, opacity: '0'},{transform: `translateX(${deltasInBtwn.finalX}px) `,rotate: 'y 0deg',opacity: '1'}],{duration: time,easing: 'ease-in-out',fill:fill,delay: delay});
    
}

function animateMultiple2(elmntArray, xToNegative, yToNegative,time,fill){
    
    let deltasInBtwn = {
        initialX: getDeltas(elmntArray[0], elmntArray[1]).x,
        initlalY: getDeltas(elmntArray[0],elmntArray[1]).y,
        inBtweenX: getDeltas(elmntArray[0],elmntArray[2]).x,
        inBtweenY: getDeltas(elmntArray[0],elmntArray[2]).y,
        finalX: getDeltas(elmntArray[0],elmntArray[3]).x,
        finalY: getDeltas(elmntArray[0],elmntArray[3]).y
        
    };
    //deltas.x = getDeltas(elmntFrom,elmntTo).x;
    //deltas.y = getDeltas(elmntFrom,elmntTo).y;
    
    //finalImg = digitalImages[indexArray[0]];
    
    if(yToNegative)
        deltas.y = -deltas.y;
    if(xToNegative)
        deltas.x = -deltas.x;
    
    console.log(deltas.x);
    
    elmntArray[0].animate([{transform: 'translate(0px, 0px)',opacity: '1'},{transform: `translate(${deltasInBtwn.initialX}px, ${deltasInBtwn.initlalY + deltasInBtwn.initialX / 2}px)`,opacity: '0'},{transform: `translate(${-deltasInBtwn.inBtweenX}px, ${deltasInBtwn.inBtweenY + deltasInBtwn.initialX / 2}px)`,opacity: '0'},{transform: `translate(${-deltasInBtwn.finalX}px, ${deltasInBtwn.finalY}px)`, opacity: '1'}],{duration: time,easing: 'ease-in-out',fill:fill});
    
}
/*function movePositionsFowards(){
    //alert("Screw you");
    for(let i = 0; i <= panels.length -1; i++)
        {
            panels[i].classList.remove("resetTransforms");
            panels[i].style.order = orderArray[0][i];    
            console.log(orderArray[0][i] - 2);
        }
    fillMode = "forwards";
    
    indexArray[0][0] -= 1;
    indexArray[0][indexArray[0].length-1] -= 1;
    
    alert(indexArray[0]);
    
    if(indexArray[0][0] <= 0)
        buttons[0].disabled = true;
    else
        {
            buttons[0].disabled = true;
            buttons[1].disabled = false;
        }
    if(indexArray[0][indexArray[0].length-1] < descriptionThresholds[descriptionIndex] && indexArray[0][indexArray[0].length-1] >= descriptionThresholds[descriptionIndex - 1])
        {
            document.getElementById("dgtlWorkHeader").classList.add("animationHeader");
            setTimeout(function(){
                document.getElementById("dgtlWorkHeader").innerHTML = descriptions[--descriptionIndex];
            },500);
            setTimeout(function(){
               document.getElementById("dgtlWorkHeader") .classList.remove("animationHeader");
            },1000);

        }
        
    
    animateShit(document.querySelector("[style='order: 3;']"), document.querySelector("[style='order: 4;']"),false,true,_delay,fillMode);
    animateShit(document.querySelector("[style='order: 2;']"),document.querySelector("[style='order: 3;']"),false,true,_delay,fillMode);
    
    animateMultiple2([document.querySelector("[style='order: 4;']"),buttons[1].parentElement,buttons[0].parentElement,document.querySelector('[style="order: 2;"]')],true,true,_delay,fillMode);
    

    //alert(indexArray);
    
    setTimeout(function(){
        document.querySelector("[style='order: 4;']").removeChild(document.querySelector("[style='order: 4;']").firstChild);
        document.querySelector("[style='order: 4;']").appendChild(digitalImages[indexArray[0][0]]);
    },_delay/2);
    
    setTimeout(function(){
        auxElement = orderArray[0][0];
    done = false;
    
    orderArray[0].shift();
    orderArray[0].push(auxElement);
    
    auxElement = orderArray[0][0];
    
    //alert(orderArray);
        
    done = true;
    fillMode = "none";
    if(indexArray[0][0] > 0)
        buttons[0].disabled = false;
   },_delay);
}*/
moveFront = function movePositionsFowards(elmnts,listElmnts,buttonArray,order,index,images,object)
{
    for(let i = 0; i <= panels.length -1; i++)
        {
            elmnts[i].classList.remove("resetTransforms");
            elmnts[i].style.order = order[i];    
            console.log(order[i] - 2);
        }
    fillMode = "forwards";
    
 
    if(index[index.length-1] - 1 == object.thresholds[object.index-1])
        {
            document.getElementById(object.id).classList.add("animationHeader");
            setTimeout(function(){
                document.getElementById(object.id).innerHTML = object.tags[--object.index];
            },500);
            setTimeout(function(){
               document.getElementById(object.id) .classList.remove("animationHeader");
            },1000);
        }

    
    index[0] -= 1;
    index[index.length-1] -= 1;
    //alert(index[index.length-1]);
    
    /*if(index[index.length-1] < (object.thresholds[object.index] || object.thresholds[object.index-1]) && index[index.length-1] >= object.thresholds[object.index - 1] && index[index.length-1] == object.thresholds[object.index-1])
        {
            document.getElementById(object.id).classList.add("animationHeader");
            setTimeout(function(){
                document.getElementById(object.id).innerHTML = object.tags[--object.index];
            },500);
            setTimeout(function(){
               document.getElementById(object.id) .classList.remove("animationHeader");
            },1000);

        }*/
    
    if(index[0][0] <= 0)
        buttonArray[0].disabled = true;
    else
        {
            buttonArray[0].disabled = true;
            buttonArray[1].disabled = false;
        }

    
    if(queryThing.matches)
        {
            animateXn2(listElmnts[1],listElmnts[listElmnts.length-1],[0,1],false,_delay,fillMode,0);
            malakas2(listElmnts[0],listElmnts[1],[1,0],false,_delay,fillMode,0);
                
            animateMultipleXEdition([listElmnts[listElmnts.length-1],buttonArray[1].parentElement,listElmnts[0],listElmnts[0]],true,_delay,fillMode,0);
        }
    else
        {
            
                for(let i = 0; i <= listElmnts.length-1;i++)
                    {
                        listElmnts[i].firstChild.style.removeProperty('transform');
                    }
            animateShit(listElmnts[1], listElmnts[listElmnts.length-1],false,true,_delay,fillMode);
            animateShit(listElmnts[0],listElmnts[1],false,true,_delay,fillMode);
    
            animateMultiple2([listElmnts[listElmnts.length-1],buttonArray[1].parentElement,buttonArray[0].parentElement,listElmnts[0]],true,true,_delay,fillMode);
    
        }

    
    
   /* animateShit(listElmnts[1], listElmnts[listElmnts.length-1],false,true,_delay,fillMode);
    animateShit(listElmnts[0],listElmnts[1],false,true,_delay,fillMode);
    
    animateMultiple2([listElmnts[listElmnts.length-1],buttonArray[1].parentElement,buttonArray[0].parentElement,listElmnts[0]],true,true,_delay,fillMode);*/
    

    //alert(indexArray);
    
    setTimeout(function(){
        listElmnts[listElmnts.length-1].removeChild(listElmnts[listElmnts.length-1].firstChild);
        listElmnts[listElmnts.length-1].appendChild(images[index[0]]);             
        if(queryThing.matches)            
        {
            listElmnts[listElmnts.length-1].firstChild.style.transform = "matrix3d(1, 0, 0, -0.001, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
        }
    },_delay/2);
    
    setTimeout(function(){
        auxElement = order[0];
    done = false;
    
    order.shift();
    order.push(auxElement);
    
    auxElement = order[0];
        
    auxElement = listElmnts[listElmnts.length-1];
        
    listElmnts.pop();
    listElmnts.unshift(auxElement);
    
    //alert(orderArray);
        
    done = true;
    fillMode = "none";
    if(index[0] > 0)
        buttonArray[0].disabled = false;
   },_delay);
}
/*function movePositionsBack(){
    //alert("Fuck you");
    for(let i = 0; i <= panels.length -1; i++)
        {
            panels[i].classList.remove("resetTransforms");
            panels[i].style.order = orderArray[0][i];    
            console.log(orderArray[0][i] - 2);
        }
    fillMode = "forwards";
    
    indexArray[0][indexArray[0].length-1] += 1;
    alert(indexArray[0]);
    indexArray[0][0] += 1;
    
    if(indexArray[0][indexArray.length-1] >= digitalImages.length-1)
        buttons[1].disabled = true;
    else
        {
            buttons[0].disabled = false;
            buttons[1].disabled = true;
        
        }
    
    if(indexArray[0][indexArray[0].length-1] > description.thresholds[description.index])
        {
            //document.getElementById("dgtlWorkHeader").classList.add("animationHeader");
            //setTimeout(function(){
              //  document.getElementById("dgtlWorkHeader").innerHTML = descriptions[++descriptionIndex];
            //},500);
            //setTimeout(function(){
              // document.getElementById("dgtlWorkHeader") .classList.remove("animationHeader");
            //},1000);
            
            document.getElementById("dgtlWorkHeader").classList.add("animationHeader");
            setTimeout(function(){
                document.getElementById("dgtlWorkHeader").innerHTML = description.tags[++description.index];
            },500);
            setTimeout(function(){
               document.getElementById("dgtlWorkHeader") .classList.remove("animationHeader");
            },1000);
        }
    //animateShit(document.querySelector("[style='order: 4;']"),document.querySelector("[style='order: 3;']"),true,true,_delay,fillMode);
    //animateShit(document.querySelector("[style='order: 3;']"),document.querySelector("[style='order: 2;']"),true,true,_delay,fillMode);
    animateShit(selectors[selectors.length-1],selectors[1],true,true,_delay,fillMode);
    animateShit(selectors[1],selectors[0],true,true,_delay,fillMode);
    
    //animateMultiple([document.querySelector("[style='order: 2;']"), buttons[0].parentElement,buttons[1].parentElement,document.querySelector("[style='order: 4;']")], true,true,_delay,fillMode);
    animateMultiple([selectors[0], buttons[0].parentElement,buttons[1].parentElement,selectors[selectors.length-1]], true,true,_delay,fillMode);
    
    //alert(indexArray);
    
    setTimeout(function(){
        //document.querySelector("[style='order: 2;']").removeChild(document.querySelector("[style='order: 2;']").firstChild);
        //document.querySelector("[style='order: 2;']").appendChild(digitalImages[indexArray[0][indexArray[0].length-1]]);
        
        selectors[0].removeChild(selectors[0].firstChild);
        selectors[0].appendChild(digitalImages[indexArray[0][indexArray[0].length-1]]);
        
    },_delay/2);
    
   setTimeout(function(){
        auxElement = orderArray[0][orderArray[0].length - 1];
        //auxAuxElement = auxArray[auxArray.length - 1];
        done = false;
    
        orderArray[0].pop();
        //auxArray.pop();
        orderArray[0].unshift(auxElement);
       //auxArray.unshift(auxAuxElement);
    
        auxElement = orderArray[0][orderArray[0].length - 1];
        //document.querySelector("[style='order: 2;']").innerHTML = "Thing " + indexArray[indexArray.length-1].toString();
    
        //alert(orderArray);
        auxElement = selectors[0];
        selectors.shift();
        selectors.push(auxElement);

       
        done = true;
        fillMode = "none";
        if(indexArray[0][indexArray[0].length-1] < digitalImages.length-1)
            buttons[1].disabled = false;
   },_delay);
}*/

moveBack = function movePositionsBack(elmnts,listElmnts,buttonArray,order,index,images,object)
{

    for(let i = 0; i <= panels.length -1; i++)
        {
            elmnts[i].classList.remove("resetTransforms");
            elmnts[i].style.order = order[i];    
            console.log(order[i] - 2);
        }
    fillMode = "forwards";
    let helpString;
    
    index[index.length-1] += 1;
    //alert(index);
    index[0] += 1;
    
    if(index[index.length-1] >= images.length-1)
        {
            buttonArray[1].disabled = true;
            buttonArray[0].disabled = false;
        }
    else
        {
            buttonArray[0].disabled = false;
            buttonArray[1].disabled = true;
        
        }
    
    if(index[index.length-1] > object.thresholds[object.index])
        {
            document.getElementById(object.id).classList.add("animationHeader");
            setTimeout(function(){
                document.getElementById(object.id).innerHTML = object.tags[++object.index];
            },500);
            setTimeout(function(){
               document.getElementById(object.id) .classList.remove("animationHeader");
            },1000);
        }
    
        if(queryThing.matches)
            {
                animateXAxis(listElmnts[listElmnts.length-1],listElmnts[1],[0,1],true,_delay,fillMode,0);
                malakas(listElmnts[1],listElmnts[0],[1,0],true,_delay,fillMode,0);
                
                animateMultipleXEdition([listElmnts[0],buttonArray[0].parentElement,listElmnts[listElmnts.length-1],listElmnts[listElmnts.length-1]],false,_delay,fillMode,0);
            }
        else
            {
                for(let i = 0; i <= listElmnts.length-1;i++)
                    {
                        listElmnts[i].firstChild.style.removeProperty('transform');
                    }
                animateShit(listElmnts[listElmnts.length-1],listElmnts[1],true,true,_delay,fillMode);
                animateShit(listElmnts[1],listElmnts[0],true,true,_delay,fillMode);
    
                animateMultiple([listElmnts[0], buttonArray[0].parentElement,buttonArray[1].parentElement,listElmnts[listElmnts.length-1]], true,true,_delay,fillMode);
            }
            

            
            setTimeout(function(){
                listElmnts[0].removeChild(listElmnts[0].firstChild);
                listElmnts[0].appendChild(images[index[index.length-1]]);
                listElmnts[0].firstChild.style.removeProperty('transform');
                if(queryThing.matches)
                    {
                        listElmnts[0].firstChild.style.transform = "matrix3d(1, 0, 0, 0.001, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
                    }
                
                
        
        //panels[0].removeChild(panels[0].firstChild);
       // panels[0].appendChild(digitalImages[indexArray[indexArray.length-1]]);
        
            },_delay/2);
        
    /*animateShit(listElmnts[listElmnts.length-1],listElmnts[1],true,true,_delay,fillMode);
    animateShit(listElmnts[1],listElmnts[0],true,true,_delay,fillMode);
    //animateShit(panels[panels.length-1],panels[1],true,true);
    //animateShit(panels[1],panels[0],true,true);
    
    animateMultiple([listElmnts[0], buttonArray[0].parentElement,buttonArray[1].parentElement,listElmnts[listElmnts.length-1]], true,true,_delay,fillMode);*/
    

    //animateMultiple([panels[0], buttons[0].parentElement,buttons[1].parentElement,panels[panels.length-1]], true,true);
    
    //alert(indexArray);
    
    /*setTimeout(function(){
        listElmnts[0].removeChild(listElmnts[0].firstChild);
        listElmnts[0].appendChild(images[index[index.length-1]]);
        
        //panels[0].removeChild(panels[0].firstChild);
       // panels[0].appendChild(digitalImages[indexArray[indexArray.length-1]]);
        
    },_delay/2);*/
    
   setTimeout(function(){
        auxElement = order[order.length - 1];
        //auxAuxElement = auxArray[auxArray.length - 1];
        done = false;
    
        order.pop();
        //auxArray.pop();
        order.unshift(auxElement);
       //auxArray.unshift(auxAuxElement);
    
        auxElement = order[order.length - 1];
        //document.querySelector("[style='order: 2;']").innerHTML = "Thing " + indexArray[indexArray.length-1].toString();
    
        //alert(orderArray);
        auxElement = listElmnts[0];
        
        listElmnts.shift();
        listElmnts.push(auxElement);
    

       
        done = true;
        fillMode = "none";
        if(index[index.length-1] < images.length-1)
            buttonArray[1].disabled = false;
   },_delay);

}
