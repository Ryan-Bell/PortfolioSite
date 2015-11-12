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
    //avoidObject();                                                        //call avoidObjects which will add corrective forces for objects
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
        //if(showDebug)ellipse(target.x, target.y, 5,5);
        //set the new minDist to tempDist since it is now the lowest value
        minDist = tempDist;
      }
    }
  }
  /*
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
  */
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