

document.addEventListener("DOMContentLoaded",app)

function app()
{
      //1.Model
const svg = document.querySelector("#editor")
const header=document.querySelector("#header1")
selectierectangle = document.querySelector("#rectangle");
selectiecircle = document.querySelector("#circle");
selectieline = document.querySelector("#line");
var value = "rectangle";
const audio = document.createElement('audio');
audio.src="woosh.mp3"
var mute=false;
var select = document.getElementById("colorpick")


let moving=false;
elemente = document.querySelector("#elemente");
let mx=0, my=0, x1=0, y1=0;
let selected = {valoare:value, tip: null};
var btnrectangle = document.querySelector("#rectanglebtn");
var btncircle = document.querySelector("#circlebtn");
var btnline = document.querySelector("#linebtn");
var btnmute=document.querySelector("#mutebtn");
var removebtn=document.querySelector("#removebtn");


btnrectangle.addEventListener("click", handleclickrectangle)
btncircle.addEventListener("click", handleclickcircle)
btnline.addEventListener("click", handleclickline)
btnmute.addEventListener("click",handleclickmute)
removebtn.addEventListener("click",handleclickremove)



function handleclickrectangle()
{
    //console.log("Button for rectangle drawing pressed");
    value = "rectangle";
  
}
function handleclickcircle()
{
   // console.log("Button for circle drawing pressed");
   value="circle";
   
}
function handleclickline()
{
   // console.log("Button for line drawing pressed");
   value="line"
}

function handleclickmute()
{
    if(mute===false)
       { mute=true;
        btnmute.style="background-image: url(mute.png)"}
    else
        {mute=false
        btnmute.style="background-image: url(soundon.png)"
        }
}

function handleclickremove()
{
     while (elemente.children.length>0) {
     elemente.children[0].remove();
     }
    //elemente.remove()
}

function colorpick()
{
    var x = select.value
}
    


svg.addEventListener("contextmenu" , e=>
{

    e.preventDefault();
})


    //2.Desenare

function desenare()
{
    
    if(moving)
    {
        if(value==="rectangle")
        {
        selectierectangle.style.display="block"
        selectierectangle.setAttributeNS(null,"x",Math.min(x1,mx));  //efectul coordonatelor mouse-ului la setarea atributelor pentru obiect -> echivalentul cu selectie.x = valoare
        selectierectangle.setAttributeNS(null,"y",Math.min(y1,my));
        selectierectangle.setAttributeNS(null,"width",Math.abs(mx-x1)); 
        selectierectangle.setAttributeNS(null,"height",Math.abs(my-y1));
        }

        else if(value === "circle")
        {
            selectiecircle.style.display="block";
            selectiecircle.setAttributeNS(null,"cx",x1);
            selectiecircle.setAttributeNS(null,"cy",y1);
            selectiecircle.setAttributeNS(null,"r",Math.max(Math.abs(mx-x1),Math.abs(my-y1)));
        }

        else if(value ==="line")
        {
            selectieline.style.display="block"
            selectieline.setAttributeNS(null,"x1",x1);
            selectieline.setAttributeNS(null,"y1",y1);
            selectieline.setAttributeNS(null,"x2",mx);
            selectieline.setAttributeNS(null,"y2",my);
        }
    }

    else{

        selectierectangle.style.display="none";   //nu afisam nimic daca nu este mousedown
        selectiecircle.style.display="none"
        selectieline.style.display="none"
        }

    requestAnimationFrame(desenare);
}
desenare();

svg.addEventListener('mousemove', e =>
{
    mx=e.clientX -svg.getBoundingClientRect().left;
    my=e.clientY -svg.getBoundingClientRect().top;
})

svg.addEventListener("mousedown", e => {

    colorpick()
    audio.src="woosh.mp3"
    
    if(e.button !== 0)
    {
        return;
    }
    moving=true;
    x1=mx;
    y1=my;

    
})

svg.addEventListener("mouseup" , e =>{

if(mute===false && e.button===0)
{
    audio.load();
    audio.play()
}
    if(e.button!==0)
    {
        return;
    }

    

if(value === "rectangle")
{
    let rectangle = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rectangle.style.fill=select.value
    rectangle.setAttributeNS(null,"x",Math.min(x1,mx));  
    rectangle.setAttributeNS(null,"y",Math.min(y1,my));
    rectangle.setAttributeNS(null,"width",Math.abs(mx-x1)); 
    rectangle.setAttributeNS(null,"height",Math.abs(my-y1));
    elemente.append(rectangle);

    rectangle.addEventListener("contextmenu", e => {
        e.preventDefault();
        selected.tip=e.target;
        selected.valoare=e.target.tagName
        
    })

   

}

else if (value === "circle")
{
    let circle=document.createElementNS("http://www.w3.org/2000/svg","circle")
     circle.style.fill=select.value
     circle.setAttributeNS(null,"cx",x1);
     circle.setAttributeNS(null,"cy",y1);
    circle.setAttributeNS(null,"r",Math.max(Math.abs(mx-x1),Math.abs(my-y1)));
    
    elemente.append(circle);

    circle.addEventListener("contextmenu", e => {
        e.preventDefault();
        selected.tip=e.target;
        selected.valoare=e.target.tagName


    })

}

else if (value ==="line")
{

    let line = document.createElementNS("http://www.w3.org/2000/svg","line")
    line.style.display="block"
    line.setAttributeNS(null,"x1",x1);
    line.setAttributeNS(null,"y1",y1);
    line.setAttributeNS(null,"x2",mx);
    line.setAttributeNS(null,"y2",my);
    elemente.append(line);

    line.addEventListener("contextmenu", e => {
        e.preventDefault();
        selected.tip=e.target;
        selected.valoare=e.target.tagName;

    })
}

moving=false;

})

document.addEventListener("keydown", e => {
    
    audio.src="movement.mp3"
    if(mute===false)
    {audio.load()
    audio.play()}
    
    if(e.key === "d" && selected !==null)
    {
        if(mute===false)
        {
        audio.src="delete.mp3"
        audio.load()
        audio.play()
        }
        selected.tip.remove();
        selected.tip=null;
    }

    if(selected.tip !=null)
    {
        switch(e.keyCode)
        {   case(37): 
                //console.log("left!")
                switch(selected.valoare)
                {
                    case("rect"):
                        //console.log("rectangle")
                        x1=selected.tip.getAttributeNS(null,"x")
                        
                        if(x1>=10)
                        {x1=x1-10;}
                        
                         else 
                         {x1=0;}

                         selected.tip.setAttributeNS(null,"x",x1);   
                        
                        break;

                    case("circle"):
                     x1=selected.tip.getAttributeNS(null,"cx")
                     if(x1>=10)
                        {x1=x1-10;}
                        selected.tip.setAttributeNS(null,"cx",x1);   
                        
                        break;


                    case("line"):
                    
                    x1=selected.tip.getAttributeNS(null,"x1")
                    mx=selected.tip.getAttributeNS(null,"x2")
                    if(x1>=10)
                        {x1=x1-10;}
                    
                    
                    if(mx>=10 && x1>=10)
                        mx=mx-10;
                    
                    selected.tip.setAttributeNS(null,"x1",x1);
                    selected.tip.setAttributeNS(null,"x2",mx);
                        
                        break;

                    default:

                        break;
                }

                break;
            case(38): 
                //console.log("up!")
            switch(selected.valoare)
                {
                    case("rect"):
                        
                        y1=selected.tip.getAttributeNS(null,"y")
                        if(y1>=10)
                        {y1=y1-10;}
                        
                         else 
                         {y1=0;}

                         selected.tip.setAttributeNS(null,"y",y1);   
                        
                        break;

                    case("circle"):
                    y1=selected.tip.getAttributeNS(null,"cy")
                     if(y1>=10)
                        {y1=y1-10;}
                        selected.tip.setAttributeNS(null,"cy",y1);   
                        
                        break;


                    case("line"):
                    //console.log(x1," ", mx);
                    y1=selected.tip.getAttributeNS(null,"y1")
                    my=selected.tip.getAttributeNS(null,"y2")
                    
                                           
                    if(my>=10 && y1>=10)
                    {y1=y1-10;
                        my=my-10;}

                    else 
                    if (my<10) {y1=y1-(my);my=0;}
                    if(y1<10) {my=my-y1; y1=0;}
                    
                    selected.tip.setAttributeNS(null,"y1",y1);
                    selected.tip.setAttributeNS(null,"y2",my);
                        
                        break;

                    default:

                        break;
                }
                
                break;   
            case(39): 
                //console.log("right!")
                svgwidth= svg.getBoundingClientRect().width

                switch(selected.valoare)
                {
                    case("rect"):
                        //console.log("rectangle")
                        x1=parseInt(selected.tip.getAttributeNS(null,"x"))
                        width=selected.tip.getAttributeNS(null,"width")
                        
                        if(x1<svgwidth-width-5)
                            { x1+=10;}

                         selected.tip.setAttributeNS(null,"x",x1);   
                        
                        break;

                    case("circle"):
                     width=selected.tip.getAttributeNS(null,"width")
                     x1=parseInt(selected.tip.getAttributeNS(null,"cx"))
                     if(x1<=svgwidth-width)
                        {x1=x1+10;}
                        selected.tip.setAttributeNS(null,"cx",x1);   
                        
                        break;

                    case("line"):
                    
                    x1=parseInt(selected.tip.getAttributeNS(null,"x1"))
                    mx=parseInt(selected.tip.getAttributeNS(null,"x2"))
                    length=parseInt(Math.abs(x1-mx))
                    console.log(length)
                    if(x1<=svgwidth-length-5)
                        {x1=x1+10;
                        mx+=10;}
                    selected.tip.setAttributeNS(null,"x1",x1);
                    selected.tip.setAttributeNS(null,"x2",mx);
                        
                        break;

                    default:

                        break;
                }

                break;
            case(40): 
                //console.log("down!")
                svgheight= svg.getBoundingClientRect().height
                headerheight=header.getBoundingClientRect().height
                switch(selected.valoare)
                {
                    case("rect"):
                        height=parseInt(selected.tip.getAttributeNS(null,"height"))
                        y1=parseInt(selected.tip.getAttributeNS(null,"y"))

                        if(y1<=svgheight-height-headerheight-5)
                        {y1=y1+10;}

                         selected.tip.setAttributeNS(null,"y",y1);   
                        
                        break;

                    case("circle"):

                    y1=parseInt(selected.tip.getAttributeNS(null,"cy"))
                     if(y1<=svgheight-headerheight)
                        {y1=y1+10;}
                        selected.tip.setAttributeNS(null,"cy",y1);   
                        
                        break;

                    case("line"):
                    
                    y1=parseInt(selected.tip.getAttributeNS(null,"y1"))
                    my=parseInt(selected.tip.getAttributeNS(null,"y2"))
                    
                    if(Math.max(y1,my)<=svgheight-headerheight-5)
                    {y1=y1+10;
                    my=my+10;}
                    selected.tip.setAttributeNS(null,"y1",y1);
                    selected.tip.setAttributeNS(null,"y2",my);
                        
                        break;

                    default:

                        break;
                }
                break;
            default:
            console.log(e.keyCode)
        }
    }
})

}