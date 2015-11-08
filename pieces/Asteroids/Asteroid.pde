//This class represents the Asteroid objects. It handles the physics, drawing, and behovoir
//of the asteroid objects.
class Asteroid{
  PVector asteroidVelocity;                                //velocity and position vectors used for movement
  PVector asteroidPosition;                                //There is no acceleration vector becasue they have a constant speed.
  float asteroidDirection;                                 //This variable is used when the asteroids split 
  float rotAngle;                                          //This is the delta rotation between the control points
  float[] anchorsX;                                        //Array that holds the x-coords of the control points
  float[] anchorsY;                                        //Array that holds the y-coords of the control points
  float asteroidSize;                                      //The multiplication factor on the asteroid base size
  int numAnchors;                                          //The number of anchor points

  //The main constructor for the asteroid. It sets the default values for the variables above and gives them all random sizes
  Asteroid(int px, int py, float vx, float vy, float inD){
    asteroidVelocity = new PVector(vx, vy);
    asteroidPosition = new PVector(px, py);
    asteroidDirection = inD;
    asteroidSize = random(15,30);
    numAnchors = 6;
    rotAngle = 0;
    anchorsX = new float[numAnchors];
    anchorsY = new float[numAnchors];
  }

  //The secondary contructor that is used when an asteroid splits. It has an extra param which represents the size of the asteroid parent.
  //This is used to calculate the size of the child asteroid.
  Asteroid(int px, int py, float vx, float vy, float inD, float s){
    asteroidVelocity = new PVector(vx, vy);
    asteroidPosition = new PVector(px, py);
    asteroidDirection = inD;
    asteroidSize = random(s/3,s/1.5);
    numAnchors = 6;
    rotAngle = 0;
    anchorsX = new float[numAnchors];
    anchorsY = new float[numAnchors];
  }

  //This method handles the drawing of the asteroid by drawing curved lines between the control points.
  //The curve tightness is set to 0 for the smoothest lines. Increased tightness would result in sharper corners.
  void drawAsteroid(){
    updateAsteroid();
    curveTightness(0);
    beginShape();
    noStroke();
    for (int i=0; i<numAnchors; i++) {
      curveVertex(anchorsX[i], anchorsY[i]);}
    for (int i=0; i<numAnchors; i++) {
      curveVertex(anchorsX[i], anchorsY[i]);}
    endShape(CLOSE);
  }

  //Handles the movement od the asteroid and screen wrapping. It also updates the control vertices using perlin noise
  //Finally, it checks the size of the asteroid and determines if it should die, split or niether. 
  void updateAsteroid(){
    asteroidPosition.add(asteroidVelocity);
    asteroidPosition.x %= width;
    if (asteroidPosition.x < -10)
      {asteroidPosition.x = width;}
    asteroidPosition.y %= height;
    if (asteroidPosition.y < -10)
      {asteroidPosition.y = height;}
    rotAngle = 0;
    for (int i=0; i<numAnchors; i++){
      anchorsX[i] = asteroidPosition.x + cos(radians(rotAngle) + noise(asteroidPosition.x/20+i*4))*asteroidSize ;
      anchorsY[i] = asteroidPosition.y + sin(radians(rotAngle) + noise(asteroidPosition.y/20+i*4))*asteroidSize ;
      rotAngle += 360/numAnchors;
    }
    asteroidSize +=.01; 
    if(asteroidSize < 10)
      die();
    if(asteroidSize > 50)
      split();
  }
  
  //Splits the asteroid into two smaller asteroids by calling the secondary contructor in Asteroid. It then calls die() on the current asteroid to remove it
  void split(){
    asteroids.add(new Asteroid((int)asteroidPosition.x, (int)asteroidPosition.y, asteroidVelocity.x + random(-2,2), asteroidVelocity.y + random(-2,2), asteroidDirection + random(-40,40),asteroidSize));
    asteroids.add(new Asteroid((int)asteroidPosition.x, (int)asteroidPosition.y, asteroidVelocity.x + random(-2,2), asteroidVelocity.y + random(-2,2), asteroidDirection + random(-40,40),asteroidSize));
    die();
  }

  //A method that removes the current asteroid
  void die(){
    asteroids.remove(this);
  }
}