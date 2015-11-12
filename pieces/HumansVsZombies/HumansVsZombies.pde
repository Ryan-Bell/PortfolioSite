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
  for(int i = 0; i < humans.size(); i++){                     //same as above but with the humans
    humans.get(i).update().display();}
}

void spawnHuman(){                                            //adds a new human to a random location on the map
    humans.add(new Human(random(0, width), random(0, height), 20, 4, 0.2, true, 2));}
void keyPressed() {                                          //set the action for clicking any of the keys to spawn a human 
 spawnHuman();
}
