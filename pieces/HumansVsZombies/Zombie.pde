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
