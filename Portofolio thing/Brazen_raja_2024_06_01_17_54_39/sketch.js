let panel;
let panelArray = [];

let colorArray = [];
let sizeArray = [];

let scrambleCalled = true;
let enableTimer = true;

let timer = 0;
let randIncrement = 0;

let destinationX, destinationY;

let bgImage;

var canvas;

function windowResized()
{
  resizeCanvas(windowWidth,windowHeight);
  centreX = windowWidth/2;
  centreY = windowHeight/2;
}
function setup()
{
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style("z-index","-1");
  rectMode(CENTER);
  
  
  centreX = windowWidth/2;
  centreY = windowHeight/2;
  
  panel = new Panel(centreX,centreY,25,55);
  
  for(let i = 0; i <= 10; i++)
    {
      sizeArray[i] = [random(5,110),random(5,110)];
      panelArray[i] = new Panel(centreX,centreY,sizeArray[i][0],sizeArray[i][0]);
      colorArray[i] = color(random(0,255),random(0,255),random(0,255),255);
    }
}

function draw()
{
  background(255);
  panel.render(color(0,0,0,255));
  
  for(let i = 0; i <= panelArray.length - 1; i++)
    panelArray[i].render(colorArray[i]);
  

  
  timer += internalClock();
}

function scramble(x,y,x2,y2)
{
  let dice = random([-1,1,2]);
  randIncrement = random([750,900,1000,1100]);
  
      if(dice == -1)
      {    
        x = random(0,windowWidth);
        y = 0;
      
        y2 *= -1;
        
        let results = [x,y,x2 * 2,y2 * 2];
        return  results;
      }
    else if(dice == 1)
      {
        x = 0;
        y = random(0,windowHeight);
        
        x2 *= -1;
        y2 *= -1;
        
        let results = [x,y,x2 * 2,y2 * 2];
        return results;
      }
    else if(dice ==2)
      {
        x = windowWidth;
        y = random(0,windowHeight);
        
        x2 = sqrt(pow(x2,2));
        y2 = sqrt(pow(y2,2));
        
        let results = [x,y,x2 * 2,y2 * 2];
        return results;
      
      }
}

function internalClock()
{
  return deltaTime / 1000;
}

class Panel
{
  constructor(x,y,_width,_height)
  {
    this.x = x;
    this.y = y;
    
    
    this._width = _width;
    this._height = _height;
    
    this.scaling = 0;
    
    this.finalX = windowWidth;
    this.finalY = random(0,windowHeight);
    
    this.timer = 0;
    this.delay = random(0.4,8.25);
    this.fadeTimer = 0;
    this.fadeDelay = this.delay;
    
    this.opacity = 0;
    
    this.enableTimer = true;
    this.coords = [];
    
    //print(this.delay);
    this.scrambleCalled = true;
    
  }
  
  scramble(x,y,x2,y2)
  {
      let dice = random([-1,1,2]);
  randIncrement = random([750,900,1000,1100]);
  
      if(dice == -1)
      {    
        x = random(0,windowWidth);
        y = 0;
      
        y2 *= -1;
        
        let results = [x,y,x2 * 2,y2 * 2];
        return  results;
      }
    else if(dice == 1)
      {
        x = 0;
        y = random(0,windowHeight);
        
        x2 *= -1;
        y2 *= -1;
        
        let results = [x,y,x2 * 2,y2 * 2];
        return results;
      }
    else if(dice ==2)
      {
        x = windowWidth;
        y = random(0,windowHeight);
        
        x2 = sqrt(pow(x2,2));
        y2 = sqrt(pow(y2,2));
        
        let results = [x,y,x2 * 2,y2 * 2];
        return results;
      
      }
  }
  
  move()
  {
    
    if(this.scrambleCalled)
      {
       this.coords = this.scramble(this.x,this.y,this._width,this._height);
       //print(this.coords) ;
      }
    this.scrambleCalled = false;
    this.enableTimer = false;
    
        
    this.x = lerp(this.x,this.coords[0] + this.coords[2],deltaTime / randIncrement);
    this.y = lerp(this.y,this.coords[1] + this.coords[3],deltaTime / randIncrement);
    
    if((this.x >= windowWidth + this._width || this.x < 0 - this._width ) && (this.y >= windowHeight + this._height || this.y < 0 - this._height))
      {
        this.x = centreX + random(0,100);
        this.y = centreY + random(0,100);

        
        this.scrambleCalled = true;
        this.timer = 0;
        this.scaling = 0;
        if(this.enableTimer)
          this.delay = random(0.4,8.25);
        else
          this.delay = 0;
      }
  }
  
  render(initialColor)
  {

    
    this.timer += internalClock();
    this.fadeTimer += internalClock();
    
    if(dist(mouseX,mouseX,this.x,this.y) <= 10)
      {
        initialColor = color(85,120,37,225);
      }
    if(this.enableTimer)
      {
        //text("This will disappear as soon as the boolean is false", centreX,centreY);
      }
    
    if(this.timer >= this.delay)
      {
        this.scaling += internalClock() * 0.8;
        initialColor.setAlpha(this.opacity);
        
        push();
        fill(initialColor);
        noStroke();
        translate(this.x,this.y);
        scale(this.scaling);
        rectMode(CENTER);
        rect(0,0,this._width,this._height);
        if(this._width <= this._height)
          {
            noFill();
            circle(0,0,this._width);
            
          }
        else
          {
            noFill();
            circle(0,0,this._height);
            if(mouseIsPressed && (dist(mouseX,mouseY,0,0) <= this._height/2))
              initialColor = color(25,128,200,255);
          }
        
        pop();
        
        if(mouseIsPressed && ((dist(mouseX,mouseY,this.x,this.y) <= (this._height/2) * this.scaling) || (dist(mouseX,mouseY,this.x,this.y) <= (this._width/2) * this.scaling)) && this.fadeTimer <= this.fadeDelay)
              {
                this.fadeTimer *= 1.5;
              }
        
        if(this.fadeTimer <= this.fadeDelay)
          this.opacity += this.scaling;
        else
          {
            this.opacity -= this.scaling;
            if(this.opacity <= 0)
              {
                this.fadeTimer = 0;
                this.x = centreX + random(0,100);
                this.y = centreY + random(0,100);
                
                this.scaling = 0;
                
              }
          }
        
        this.move();
        
      }
  }
}

