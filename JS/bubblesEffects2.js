window.onload= function(){
    var canvas = document.getElementById("BackgroundCanvas");
    var c = canvas.getContext("2d");
    canvas.style="border: 1px solid black";
    canvas.width = 1000;
    canvas.height = 500;
    var infiniteLoop =0;
    var randomX;
    var randomY;
    var arrayRandomsX=[];
    var arrayRandomsY=[];
    var quantity =10;
    var arraycolor=["blue","green","red","yellow","pink","orange"];
   /*
    function collisionDect(object1,arrayObjects){
        this.holderDistances;
        for(var counter =0;counter<arrayObjects.length;counter++){
            holderDistances=getDistanceCir(object1.bubblesX,object1.bubblesY,arrayObjects[counter].bubblesX,arrayObjects[counter].bubblesY);
            if((holderDistances <100)&&(holderDistances !=0)){
               // alert(object1,arrayObjects[counter]);
                object1.speedX=object1.speedX*-1;
                object1.speedY=object1.speedY*-1;

                arrayObjects[counter].speedX=object1.speedX*-1;
                arrayObjects[counter].speedY=object1.speedY*-1;
            }
        }

    }*/
    
    function getRandomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    
    
    
    }
    function checking (arrayX,arrayY, valueX,valueY,howFar){

    
        for(var ck = 0; ck < arrayX.length-1; ck++  ){
    
            if(getDistanceCir(arrayX[ck],arrayY[ck],valueX,valueY)<=howFar){
                //console.log(getDistanceCir(arrayX[ck],arrayY[ck],valueX,valueY),howFar);
                return true;
            }
        }
        return false;
    
    }
   function getDistanceCir(x,y,x2,y2){
       //this.xT= Math.pow((x2-x),2);
       //this.yT= Math.pow((y2-y),2);
       this.distance= Math.sqrt((Math.pow((x2-x),2)+Math.pow((y2-y),2)));
       //console.log(this.distance,x,y,x2,y2,this.xT,this.y2);
        
       return this.distance; 
   }
    function Bubbles(x,y,radius,speedX,speedY,color){
        this.bubblesX = x;
        this.bubblesY = y;
        this.bubblesRadius = radius;
        this.speedX=speedX;
        this.speedY=speedY;
        this.color=color;
        var arrayDis=[];
        
        this.bubblesShow = function(){
            c.beginPath();
            c.arc(this.bubblesX,this.bubblesY,this.bubblesRadius,0,Math.PI *2,false);
            c.fillStyle= this.color;
            c.fill();
            c.stroke();
        }
    
        this.update= function(arraybubbles){
            var stuck=0;
            this.bubblesX+=this.speedX;
            this.bubblesY+=this.speedY;
           
           
            for(var rt =0;rt< arraybubbles.length;rt++){
                if((getDistanceCir(this.bubblesX,this.bubblesY,arraybubbles[rt].bubblesX,arraybubbles[rt].bubblesY)<100)
                    &&((getDistanceCir(this.bubblesX,this.bubblesY,arraybubbles[rt].bubblesX,arraybubbles[rt].bubblesY)!=0))){
                        this.speedX=this.speedX*-1;
                        this.speedY=this.speedY*-1;
                        arraybubbles[rt].speedX=this.speedX*-1;
                        arraybubbles[rt].speedY=this.speedY*-1;
                       stuck++;


                        if((getDistanceCir(this.bubblesX,this.bubblesY,arraybubbles[rt].bubblesX,arraybubbles[rt].bubblesY)<97)||stuck >1){
                            //alert("error");
                            location.reload();
                        }
                }
            
        
        }
        // while((getDistanceCir(this.bubblesX,this.bubblesY,arraybubbles[rt].bubblesX,arraybubbles[rt].bubblesY)<100)
        //             &&((getDistanceCir(this.bubblesX,this.bubblesY,arraybubbles[rt].bubblesX,arraybubbles[rt].bubblesY)!=0))){
        //                 infiniteLoop++;


        //             }
            this.bubblesShow();
        }
    
    };
    var arraybubbles=[];

        for(var i =0; i < quantity;i++){

            var speedX= getRandomRange(-1,1);
            var speedY= getRandomRange(-1,1);
            while((speedX===0)||(speedY===0)){
                speedX= getRandomRange(-1,1);
                speedY= getRandomRange(-1,1);
            }
           // arraybubbles.push(new Bubbles(Math.random()*canvas.width,Math.random()*canvas.height,50));
           randomX=getRandomRange(50,canvas.width-50);
           randomY=getRandomRange(50,canvas.height-50);

           arrayRandomsX[i]=randomX;
           arrayRandomsY[i]=randomY;
           if(i > 0){
               for(var x=0;x<i;x++){

                  // console.log(checking(arrayRandomsX,arrayRandomsY,randomX,randomY,100));
                while(checking(arrayRandomsX,arrayRandomsY,randomX,randomY,100)){
                   // alert("ff");
                    randomX=getRandomRange(50,canvas.width-50);
                    randomY=getRandomRange(50,canvas.height-50);
                    arrayRandomsX[i]=randomX;
                    arrayRandomsY[i]=randomY;
                }
            }
            }



            
           arraybubbles.push(new Bubbles(randomX,randomY,50,speedX,speedY,"rgba(210,254,255, 0.1)"));
       
        }

        for(var i =0; i <quantity;i++){
            arraybubbles[i].bubblesShow();       
        }
        //console.log(arraybubbles[0],arraybubbles[2],arraybubbles[3],arraybubbles[4])
        //alert("fg");     
    
    
   
    var iw =0;
        function frames(){
           // var infiniteLoop=0;
            requestAnimationFrame(frames);
            c.clearRect(0,0,innerWidth,innerHeight);
            if(iw ===quantity)    iw=0;
            

            for(var i =0; i< quantity;i++){
            if((arraybubbles[i].bubblesX>=canvas.width-arraybubbles[i].bubblesRadius)||(arraybubbles[i].bubblesX<=arraybubbles[i].bubblesRadius)){
                //alert("sdsd");
                arraybubbles[i].speedX=arraybubbles[i].speedX*-1;
            }
            if((arraybubbles[i].bubblesY<=arraybubbles[i].bubblesRadius)||(arraybubbles[i].bubblesY>=canvas.height-arraybubbles[i].bubblesRadius)){
                
                arraybubbles[i].speedY=arraybubbles[i].speedY*-1;  
            }
            
        }


        //CHECKING FOR TOUCHING ALL THE BALL INSIDE
        //for(var i =0;i<quantity-1;i++){
        
            
        
        
         for(var g =0; g<quantity;g++){
            if((getDistanceCir(arraybubbles[iw].bubblesX,arraybubbles[iw].bubblesY,arraybubbles[g].bubblesX,arraybubbles[g].bubblesY)<100)
                && getDistanceCir(arraybubbles[iw].bubblesX,arraybubbles[iw].bubblesY,arraybubbles[g].bubblesX,arraybubbles[g].bubblesY) != 0){
               
                // while(getDistanceCir(arraybubbles[iw].bubblesX,arraybubbles[iw].bubblesY,arraybubbles[g].bubblesX,arraybubbles[g].bubblesY)<100){
                //     arraybubbles[iw].bubblesX+=arraybubbles[iw].speedX*-1;
                //     arraybubbles[iw].bubblesY+=arraybubbles[iw].speedY*-1;
                //     arraybubbles[g].bubblesX+=arraybubbles[g].speedX*-1;
                //     arraybubbles[g].bubblesY+=arraybubbles[g].speedY*-1;
                    
                    
                // console.log("fgfg",getDistanceCir(arraybubbles[iw].bubblesX,arraybubbles[iw].bubblesY,arraybubbles[g].bubblesX,arraybubbles[g].bubblesY));
                
                // //infiniteLoop++;
                // }
               
     
                
            }
            }
        //}
            // console.log(getDistanceCir(arraybubbles[0].bubblesX,arraybubbles[0].bubblesY,arraybubbles[1].bubblesX,arraybubbles[1].bubblesY));
        //}

        for(var i =0; i<quantity;i++){
        if(arraybubbles[i].bubblesX<arraybubbles[i].bubblesRadius)arraybubbles[i].bubblesX=arraybubbles[i].bubblesRadius+1;
        if(arraybubbles[i].bubblesX>canvas.width-arraybubbles[i].bubblesRadius)arraybubbles[i].bubblesX=canvas.width-arraybubbles[i].bubblesRadius-1;
        if(arraybubbles[i].bubblesY<arraybubbles[i].bubblesRadius)arraybubbles[i].bubblesY=arraybubbles[i].bubblesRadius+1;
        if(arraybubbles[i].bubblesY>canvas.height-arraybubbles[i].bubblesRadius)arraybubbles[i].bubblesY=canvas.height-arraybubbles[i].bubblesRadius-1;
        arraybubbles[i].update(arraybubbles);
        }
        
            iw++;
        
        }
        frames();
}