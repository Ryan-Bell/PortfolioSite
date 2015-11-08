ArrayList<Asteroid> asteroids;                            //global variables including object lists, player, and manager
ArrayList<Bullet> bullets;
Ship player;
GameManager manager;

class GameManager{
  int bulletIndex;                                        //index used in the bullet recycling process

  GameManager(){                                          //contructor for variable instantiation
     bulletIndex = 0;
     asteroids = new ArrayList<Asteroid>();
     bullets = new ArrayList<Bullet>();
     for(int i = 0; i < 20; i++)
       {bullets.add(new Bullet());}                       //create all bullet objects ahead of time
     for(int i = 0; i < 10; i++)                          //create and place all asteroids
       {asteroids.add(new Asteroid((int)random(0,width), (int)random(0,height), random(0,1), random(0,1), random(0,360)));}
     player = new Ship();                                //create the plater ship
  }
  
  void drawGame(){                                       //runs once a frame, calls update and handles drawing
    checkCollisions();                                   
    fill(0,50);
    rect(0,0,width,height);                              //draw over image with opacity for trail effects
    fill(255);
    player.drawShip();                                   //call the ship's draw
    for(int i = 0; i < asteroids.size(); i++)
      {asteroids.get(i).drawAsteroid();}                 //call draw on all asteroids
    for(int i = 0; i < bullets.size(); i++)
      {bullets.get(i).drawBullet();}                     //call draw on all bullets
  }
  
  void checkCollisions(){
    Asteroid testHolder;                                 //asteroid and bullet objects to minimize creating new objects
    Bullet bulletHolder;
    for(int i = 0; i < asteroids.size(); i++){
      testHolder = asteroids.get(i);                     //pull and store each asteroid from list for testing
      if(dist(testHolder.asteroidPosition.x, testHolder.asteroidPosition.y, player.shipPosition.x, player.shipPosition.y) < testHolder.asteroidSize)
        {player.destroyShip();}                          //test collision with player using the distance and size of the asteroid
      for(int j = 0; j < bullets.size(); j++){
        bulletHolder = bullets.get(j);                   //pull and store each bullet from the list 
        if(bulletHolder.bulletHidden){continue;}         //don't calculate anything if it is hidden
        if(dist(testHolder.asteroidPosition.x, testHolder.asteroidPosition.y, bulletHolder.bulletPosition.x, bulletHolder.bulletPosition.y) < testHolder.asteroidSize){
          testHolder.split();                            //use distance and asteroid size to detect collision and split if collided
          bulletHolder.bulletHidden = true;              //hide the bullet so it won't go 'through' the asteroids
          j++;                                           //minimize chance of the next bullet immediatly hitting an asteroid
        }
      }
    }
  }
  
  void fireBullet(PVector pos, PVector spe, float dir){
    bullets.get(bulletIndex).reset(pos, spe, dir);       //set attributes of last used bullet
    bulletIndex++;                                       //update index
    bulletIndex %= bullets.size();                       //keep index in range
  }
}

void setup(){
 size(1080,480);                                         
 background(0);
 manager = new GameManager();
}

void draw(){
  manager.drawGame(); 
}