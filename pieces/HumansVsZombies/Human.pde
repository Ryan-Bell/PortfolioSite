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
