boolean[] keys;                            //The array that will hold the value for key presses

class Ship{
  PVector shipAcceleration;                //acceleration, velocity, and position vecotrs are used in movement 
  PVector shipVelocity;                    //of the ship. 
  PVector shipPosition;
  PShape shipShape;                        //The shape of the ship
  float shipDirection;                     //holds the rotation of the ship from top dead center
  int shipLastFire;                        //holds the time in millis that the last bullet was fired
  int shipDelayTime;                       //The delay time in milli seconds between bullet firing
  
  
  //The main contructor for the Ship class. It sets the default values for the variables above and creates
  //the shape of the ship
  Ship(){
    shipAcceleration = new PVector();
    shipVelocity = new PVector();
    shipPosition = new PVector(width/2, height/2);
    shipDirection = 0;
    shipLastFire = 0;
    shipDelayTime = 300;
    keys = new boolean[5];
    shipShape = createShape();              //The ship is created with the center at 0,0 and is very small
    shipShape.beginShape();                 //Creating it at 0,0 ensures that the rotation point is in the center
    shipShape.fill(255);                    //Creating it very small just gives a bit more control when scaling
    shipShape.strokeWeight(1);              //the ship up
    shipShape.vertex(0, -4);
    shipShape.vertex(2,0);
    shipShape.vertex(2,2);
    shipShape.vertex(0,1);
    shipShape.vertex(-2,2);
    shipShape.vertex(-2,0);
    shipShape.vertex(0, -4);
    shipShape.endShape();
  }
  
  //Handles the drawing of the ship by first updating the physics, then resetting it back to 0,0 with no rotation or scaling
  //The ship is then rotated based on the rotation variable, and drawn at the position stored in the position vector with 
  //the appropriate scale.
  void drawShip(){
    updateShip();
    shipShape.resetMatrix();
    shipShape.rotate(radians(shipDirection));
    shape(shipShape, shipPosition.x, shipPosition.y, 10,10);
  }
  
  // Stops the drawing loop and prints a simple message to the screen saying that the player has lost.
  void destroyShip(){
    fill(150);
    textAlign(CENTER,CENTER);
    textSize(72);
    noLoop();
    text("You Lose",width/2, height/2);
  }
  
  //adds acceleration if up key is pressed based on direction. Updates roation based on key presses and
  //adds drag to velocity. It also handles screen wrapping and calls fireBullet if enough time has passed
  //since the last bullet was fired
  void updateShip(){
    shipAcceleration.x = 0;
    shipAcceleration.y = 0;
    if(keys[0]){
      shipAcceleration.x = 0.5 * cos(radians(shipDirection)  - PI/2);
      shipAcceleration.y = 0.5 * sin(radians(shipDirection) - PI/2);
    }
    if(keys[1] && !keys[2])
      {shipDirection -= 5;}
    if(keys[2] && !keys[1])
      {shipDirection += 5;}
    shipVelocity.add(shipAcceleration);
    shipPosition.add(shipVelocity);
    shipVelocity.mult(.95);
    shipPosition.x %= width;
    if(shipPosition.x < -10)
      {shipPosition.x = width;}
    shipPosition.y %= height;
    if(shipPosition.y < -10)
      {shipPosition.y = height;}
    if(keys[4]){
      if(millis() - shipLastFire > shipDelayTime){
          shipLastFire = millis();
          manager.fireBullet(shipPosition, shipVelocity, shipDirection);
        }
    }
  }
}

void keyPressed(){
   if(key == CODED){
     if(keyCode == UP)
       keys[0] = true;
     if(keyCode == LEFT)
       keys[1] = true;
     if(keyCode == RIGHT)
       keys[2] = true;
     if(keyCode == DOWN)
       keys[3] = true;
   }
   else{
     if(key == 'w')
       keys[0] = true;
     if(key == 'a')
       keys[1] = true;
     if(key == 'd')
       keys[2] = true;
     if(key == 's')
       keys[3] = true;
     if(key == ' ')
       keys[4] = true;
   }
}

void keyReleased(){
   if(key == CODED){
     if(keyCode == UP)
       keys[0] = false;
     if(keyCode == LEFT)
       keys[1] = false;
     if(keyCode == RIGHT)
       keys[2] = false;
     if(keyCode == DOWN)
       keys[3] = false;
   }
   else{
     if(key == 'w')
       keys[0] = false;
     if(key == 'a')
       keys[1] = false;
     if(key == 'd')
       keys[2] = false;
     if(key == 's')
       keys[3] = false;
     if(key == ' ')
       keys[4] = false;
   }
}