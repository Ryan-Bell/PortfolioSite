//This is a javascript port and slight modification to my HumansVzZombies repo, originally in processing.

//This is the main file for the program. It contains the global variables and handles the setup of the simulation as well
//as the drawing. It also sets what the keyPressed and mouseClicked action listeners do.

PVector rightForce, upForce;                                  //two vectors that will be used in adding corrective forces
float buffer;                                                 //The bounding padding where corrective forces start being applied
Zombie z;                                                     //The initial zombie
boolean hp = false;         
ArrayList<Human> humans;                                      //This will hold all of the human objects
ArrayList<Zombie> zombies;                                    //This will hold all of the zombie objects

void setup() {
  size(1000, 700);                                            //setting window size to 1000by700
  print("here");
  rectMode(CENTER);                                           //positions for drawing the images will be in relation to the center not corner
  humans = new ArrayList<Human>(2000);                         //Instantiating the ArrayLists for the various vehicles with an initial
  zombies = new ArrayList<Zombie>(400);                       //size of 400 for both the zombies and the humans to make adding more less
  for (int i = 0; i < 700; i++) {                              //loop to instantiate 10 humans and objects by calling the spawn functions
    spawnHuman();
  }
  z = new Zombie(width/2, height/2, 2, 3, 0.1,1);             //create the initial zombie in the center of the screen
  zombies.add(z);                                             //add the zombie to the zombie arrayList
  rightForce = new PVector(1,0);                              //instantiate the two corrective forces as unit vectors or the four cardinal directions
  upForce = new PVector(0,-1);
  buffer = 90;                                                //set the value of the buffer to 90 pixels inside the 'walls'
  
}

void draw() {
  fill(0, 0, 0, 30);
  rect(width/2,height/2,width,height);
  for(int i = 0; i < zombies.size(); i++){                    //call update then display on each zombie then pass it into the debug method to print lines
    zombies.get(i).update().display();}
  //for(int i = 0; i < humans.size(); i++){                     //same as above but with the humans
  //  humans.get(i).update().display();}
}

void spawnHuman(){                                            //adds a new human to a random location on the map
    humans.add(new Human(random(0, width), random(0, height), 20, 4, 0.2, true, 2));}
void keyPressed() {                                          //set the action for clicking any of the keys to spawn a human 
 spawnHuman();
}
class Human extends Vehicle {
  float wanderRadius, wanderDistance, wanderDelta, rotation;                          //These variables are all used for the wandering behavoir that humans have and zombies don't
  Human(float x, float y, float r, float ms, float mf, boolean o, float t){           //contructor takes all of the same params as the vehicle class so they are all passed onto super
    super(x,y,r,ms,mf,t);                                                             //except for the o boolean that decides whether the class will be an obstacle or human
    fill(#ffffff);
    range = 180;                                                                      //set the 'visibility' range to 180 pixels
    wanderRadius = 25;                                                                //set the radius of the wander circle to 25 pixels. A larger circle results in more acute turns
    wanderDistance = 80;                                                              //set the center of the wander circle to be 80 pixels in front of the human. This results in a general forward movement.
    wanderDelta = .2;                                                                 //the random change, in radians, between each frame of the wander angle
    rotation = PI;                                                                    //set the intial rotation to directly ahead
  }
  //getSick is called when a zombie makes contact with this human. It handles spawning a zombie and removing this human
  void getSick(){
      //zombies.add(new Zombie(position.x,position.y,6,3,0.1,1));                        //create a zombie at this position and add it to the zombie list
      humans.remove(this);                        //remove this human object from the human list
      fill(250,0,0);
      ellipse(position.x, position.y, 10,10);
  }
  //the calcSteeringForces is required to be implemented by the abstract class. It handles checking if zombie contact has been made, updates the taget, and all of the physics update
  void calcSteeringForces(){
    findClosest(zombies);
    if(minDist < radius){
      getSick();
      return;}
    if(minDist < range)
      target = PVector.add(position, PVector.sub(position, target));
    else
      target = wander();
    steeringForce.mult(0);
    steeringForce.add(seek(target)).add(correctiveForce.mult(5)).limit(maxForce);
    applyForce(steeringForce);
  }
  //this method is called so that the humans wander when there is no zombie threat in range
  PVector wander(){
    rotation += random(wanderDelta*-1, wanderDelta);                                    //increment the rotation
    return copy(position)                                                              //move from current position to the center of the circle to the position on the circle based on the rotation
      .add(copy(velocity).normalize().mult(wanderDistance))
      .add(wanderRadius*cos(rotation+velocity.heading()), 
           wanderRadius*sin(rotation+velocity.heading()));
  }
}
PVector copy(PVector target){
 return new PVector(target.x, target.y); 
}
abstract class Vehicle {
  //declaring all of the PVectors, floats, and the PShape that will be used in all of the vehicles. 
  PVector position, acceleration, velocity, forward, right, desired, target, steeringForce, correctiveForce, vecToCenter;
  float radius, maxSpeed, maxForce, range, minDist, type, mass = 1;
  //The vehicle contructor that takes the position, radius, maxium speed, maximum force and the type float.
  //The radius is used in collision calculations both for obstacles and for human, zombie collisions. The
  //maximum speed sets the top velocity for the vehicle. The maximum force is similar however, increasing
  //this value will essentially increase the acceleration of the vehicle not the top speed. 
  Vehicle(float x, float y, float r, float ms, float mf, float t) {
    acceleration = new PVector(0, 0);                                    //instantiate the acceleration vector as zero 
    velocity = new PVector(0, 0);                                        //instantiate the velocity vector as zero
    position = new PVector(x, y);                                        //the position vector is created based on the passed in values
    desired = copy(position);                                           //creating the desired velocity as a zero
    steeringForce = new PVector(0,0);                                    //creating the steeringForce as a zero vector
    correctiveForce = new PVector(0,0);                                  //creating the corrective force as a zero vector
    target = copy(position);
    radius = r;                                                          //set the radius as the passed in value
    maxSpeed = ms;                                                       //set the maxSpeed and maxForce as the passed in values
    maxForce = mf;
    forward = new PVector(0, 0);
    right = new PVector(0, 0);
    type = t;                                                            //set the type as the value passed in 
  }
  
  abstract void calcSteeringForces();                                    //requiring the calcSteeringForces in all child classes
  //The display method handles drawing the PShap to the screen however it does not handle the debug lines
  Vehicle display(){
    pushMatrix();                                                        //push a matrix onto the stack so translation can be reversed
    translate(position.x, position.y);                                   //translate and rotate based on the vehicle's position
    rotate(velocity.heading());
    fill(255);
    noStroke();
    ellipse(0,0,3,3);
    popMatrix();                                                         //remove the matrix from the stack to bring the origin back
    return this;                                                         //return the vehicle object for chained dot operators
  }
  //Handles updating the physics of the vehicle object and keeps it in bounds
  Vehicle update() {
    forward = copy(velocity).normalize();                               //set the forward to the normal of the velocity
    right.x = forward.y;                                                //set the right vector orthogonal to the forward vector
    right.y = forward.x;
    correctiveForce.mult(0);                                             //reset the corrective force
    if(position.x < buffer)                                              //four if statements to check for the four bounding sides
      correctiveForce.x = 1;
    if(position.x > width - buffer)
      correctiveForce.x = -1;
    if(position.y < buffer)
      correctiveForce.y = 1;
    if(position.y > height - buffer)
      correctiveForce.y = -1;
    avoidObject();                                                        //call avoidObjects which will add corrective forces for objects
    calcSteeringForces();                                                 //call calcSteeringForces which converts the corrective forces to steering vectors
    velocity.add(acceleration).limit(maxSpeed);                           //add acceleration to velocity then limit it to maxSpeed
    position.add(velocity);                                               //add the limited velocity to position
    acceleration.mult(0);                                                 //zero out the acceleration vector
    return this;                                                          //return the vehicle object for chained dot operators
  }
  //Given an array of vehicles as a parameter it will set the target as the future position of the closest vehicle
  void findClosest(ArrayList subjects){
    float tempDist;
    minDist = width;
    //loop through all of the vehicles in the arraylist (after casting it because passing it in as an abstract
    //type didn't really work)
    for(Vehicle v : (ArrayList<Vehicle>)subjects){
      //set and check the distance between the vehicle and the subject
      if((tempDist = dist(v.position.x, v.position.y, position.x, position.y)) < minDist){
        //set target if the distance is the shortest yet and add that vehicle velocity times 7 frames for the future pos
        target = copy(v.position).add(PVector.mult(v.velocity, 7));
        //show an ellipse at the future target position if debug mode is enabled
        if(showDebug)ellipse(target.x, target.y, 5,5);
        //set the new minDist to tempDist since it is now the lowest value
        minDist = tempDist;
      }
    }
  }
  //Using the safeDistance set, loop through all of the obstacles and apply a corrective force for all 
  //of them that are in front of the vehicle, within the safe distance, and on a collision course. 
  void avoidObject(){
    float tempDist, safeDistance = 30;
    for(Vehicle v : objects){                                              //loop through all of the objects
      //set and check that the difference between the positions is greater than the safe distance and continue
      //through the loop to the next obstacle
      if((vecToCenter = PVector.sub(v.position, position)).mag() > safeDistance)
        {continue;}                          
      //check that the obstacle is in front of the vehicle with thr forward vector and the dot product. Continue
      //with the loop if it is not
      if(vecToCenter.dot(forward) < 0)
        continue;
      //set and check that the side distance from the object and the vehicle is not going to cause a collision.
      //Continue with the loop if it is not on a collision course.
      if(Math.abs(tempDist = vecToCenter.dot(right)) > 45)
        continue;
      //At this point, there is a collision course. Using the tempDist, determine, based on the sign, if the object
      //is on the left or the right and apply a corrective course based on this info
      if(tempDist < 0)
        applyForce(copy(right).mult(maxSpeed *.5));
      else
        applyForce(copy(right).mult(maxSpeed * -.5));
    }
     
  }
  //this method converts a force to acceleration by dividing it by the mass and return the vehicle object for
  //chained dot operators
  Vehicle applyForce(PVector force) {
    acceleration.add(PVector.div(force, mass));
    return this;
  }
  //takes the target vector and returns the difference between the desired velocity and the current velocity
  PVector seek(PVector target) {
    desired = PVector.sub(target, position).normalize().mult(maxSpeed);
    return PVector.sub(desired, velocity);
  }
}
class Zombie extends Vehicle {
  //The contructor that takes all the same parameters that the vehicle class takes so it passes them all onto super
  Zombie(float x, float y, float r, float ms, float mf, float t){
    super(x,y,r,ms,mf,t);
    fill(#333333);
    range = 120;                                                                   //the 'visibility' range is set to 120 pixels
  }
  void calcSteeringForces(){                                                       //calcSteeringForces is required to be overridden by the abstract class
    findClosest(humans);                                                           //The target is set by calling findClosest on all of the humans
    steeringForce.mult(0);                                                         //reset the steeringForce
    steeringForce.add(seek(target)).add(correctiveForce.mult(5)).limit(maxForce);  //set the steering force to the result of seeking the future position and any bounds and obstacle avoidance forces
    applyForce(steeringForce);                                                     //apply the updated steering force
  }
}

