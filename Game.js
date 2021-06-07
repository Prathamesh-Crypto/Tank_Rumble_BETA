class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){   
      if(gameState === 0){
        background(backgroundImage)
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form();
        form.display();
      }
  
      Tank1 = createSprite(displayWidth/2+40,displayHeight/4-140);
      Tank1.addImage(TankImage1);
      Tank1.scale = 0.5
      Tank1.rotation = 270
      Tank2 = createSprite(displayWidth/1-140,displayHeight/2);
      Tank2.addImage(TankImage2);
      Tank2.scale = 0.5
      Tank3 = createSprite(displayWidth/4-350,displayHeight/2);
      Tank3.addImage(TankImage3);
      Tank3.scale = 0.5
      Tank3.rotation = 180
      Tank4 = createSprite(displayWidth/2+40,displayHeight/1-140);
      Tank4.addImage(TankImage4);
      Tank4.scale = 0.5
      Tank4.rotation = 90
       Tanks = [Tank1, Tank2, Tank3, Tank4];
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(backgroundImage);

        //var display_position = 100;
        
        //index of the array
        var index = 0;
      
      
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        
        //use data form the database to display the cars in y direction
        var x = Tanks[index-1].x
        var y = Tanks[index-1].y

       // console.log(index, player.index)
  
       //find out active player
        if(index === player.index){
        textSize(50);
        fill("Red"); 
        text(allPlayers[plr].name, Tanks[index-1].x-85,Tanks[index-1].y-60)
        stroke(10); 
        fill("black"); 
        ellipse(x,y,150,120); 
        Tanks[index - 1].shapeColor = "red";






        if(keyIsDown(UP_ARROW)){
          Tanks[index-1].y = y-5;
          Tanks[index-1].rotation = 90;

            if (keyWentDown("space")) { 
           var bullet = createSprite(Tanks[index-1].x , Tanks[index-1].y - 100 );
           bullet.addImage(bulletImage);
           bullet.velocityX = 0;
           bullet.velocityY = -7;
           bulletGroup.add(bullet); 
           bullet.scale = 0.1
            }
         }

         if(keyIsDown(DOWN_ARROW)){
          Tanks[index-1].y = y+5;
          Tanks[index-1].rotation = 270;
          if (keyWentDown("space")) { 
            var bullet = createSprite(Tanks[index-1].x , Tanks[index-1].y + 100 );
            bullet.addImage(bulletImage);
            bullet.velocityX = 0;
            bullet.velocityY = +7;
            bulletGroup.add(bullet); 
            bullet.scale = 0.1
             }
         }

         if(keyIsDown(LEFT_ARROW)){
          Tanks[index-1].x = x-5;
          Tanks[index-1].rotation = 360;
          if (keyWentDown("space")) { 
            var bullet = createSprite(Tanks[index-1].x -100 , Tanks[index-1].y );
            bullet.addImage(bulletImage);
            bullet.velocityX = -7;
            bullet.velocityY = 0;
            bulletGroup.add(bullet); 
            bullet.scale = 0.1
             }
         }

         if(keyIsDown(RIGHT_ARROW)){
          Tanks[index-1].x = x+5;
          Tanks[index-1].rotation = 180;
          if (keyWentDown("space")) { 
            var bullet = createSprite(Tanks[index-1].x +100 , Tanks[index-1].y );
            bullet.addImage(bulletImage);
            bullet.velocityX = +7;
            bullet.velocityY = 0;
            bulletGroup.add(bullet); 
            bullet.scale = 0.1
             }
         }

         if(keyIsDown(87)){
          Tanks[index-1].y = y-5;
          Tanks[index-1].rotation = 90;
         }

         if(keyIsDown(83)){
          Tanks[index-1].y = y+5;
          Tanks[index-1].rotation = 270;
         }

         if(keyIsDown(65)){
          Tanks[index-1].x = x-5;
          Tanks[index-1].rotation = 360;
         }

         if(keyIsDown(68)){
          Tanks[index-1].x = x+5;
          Tanks[index-1].rotation = 180;
         }

         if(bulletGroup.isTouching(Tanks[index-1])){
          player.distance -=1;
          player.update();
          //bulletGroup.destroyEach();
        }

         if(player.distance == 0){
           Tanks[index-1].destroy();
           console.log("You LOST BETTER LUCK NEXT TIME :)")
         }








        }
      }
    }
        /*  // controls
         if(keyIsDown(UP_ARROW)){
          Tanks[index-1].y = y-5;
          Tanks[index-1].rotation = 90;

            if (keyWentDown("space")) { 
           var bullet = createSprite(Tanks[index-1].x , Tanks[index-1].y - 100 );
           bullet.addImage(bulletImage);
           bullet.velocityX = 0;
           bullet.velocityY = -7;
           bulletGroup.add(bullet); 
           bullet.scale = 0.1
            }
         }

         if(keyIsDown(DOWN_ARROW)){
          Tanks[index-1].y = y+5;
          Tanks[index-1].rotation = 270;
          if (keyWentDown("space")) { 
            var bullet = createSprite(Tanks[index-1].x , Tanks[index-1].y + 100 );
            bullet.addImage(bulletImage);
            bullet.velocityX = 0;
            bullet.velocityY = +7;
            bulletGroup.add(bullet); 
            bullet.scale = 0.1
             }
         }

         if(keyIsDown(LEFT_ARROW)){
          Tanks[index-1].x = x-5;
          Tanks[index-1].rotation = 360;
          if (keyWentDown("space")) { 
            var bullet = createSprite(Tanks[index-1].x -100 , Tanks[index-1].y );
            bullet.addImage(bulletImage);
            bullet.velocityX = -7;
            bullet.velocityY = 0;
            bulletGroup.add(bullet); 
            bullet.scale = 0.1
             }
         }

         if(keyIsDown(RIGHT_ARROW)){
          Tanks[index-1].x = x+5;
          Tanks[index-1].rotation = 180;
          if (keyWentDown("space")) { 
            var bullet = createSprite(Tanks[index-1].x +100 , Tanks[index-1].y );
            bullet.addImage(bulletImage);
            bullet.velocityX = +7;
            bullet.velocityY = 0;
            bulletGroup.add(bullet); 
            bullet.scale = 0.1
             }
         }

         if(keyIsDown(87)){
          Tanks[index-1].y = y-5;
          Tanks[index-1].rotation = 90;
         }

         if(keyIsDown(83)){
          Tanks[index-1].y = y+5;
          Tanks[index-1].rotation = 270;
         }

         if(keyIsDown(65)){
          Tanks[index-1].x = x-5;
          Tanks[index-1].rotation = 360;
         }

         if(keyIsDown(68)){
          Tanks[index-1].x = x+5;
          Tanks[index-1].rotation = 180;
         }

         if(bulletGroup.isTouching(Tanks[index-1])){
          player.distance -=1;
          player.update();
          //bulletGroup.destroyEach();
        }

         if(player.distance == 0){
           Tanks[index-1].destroy();
           console.log("You LOST BETTER LUCK NEXT TIME :)")
         }*/

         /*if (keyWentDown("space")) { 
           var bullet = createSprite(Tanks[index-1].x , Tanks[index-1].y );
           bullet.addImage(bulletImage);
           bullet.velocityX = -10;
           bullet.velocityY = 10;
           bulletGroup.add(bullet); 
           bullet.scale = 0.1
            }*/

        
      
    

      drawSprites();
  }
}