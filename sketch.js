////////// Super Cool Peeps 2021
////////// By db-db
console.log("-----  Super Cool Peeps 2022 v0.7.3----");
let isDebug=1;
let isDemo=false;
let isSaveFrame=false; 
let isSlideshow=false;
let saveID=0;
let stopSaveID=499;
let waitTimeMax=5; //20
let waitTime=0;


let seed=document.URL.split('?s=')[1];
if (!seed) { 
  isDemo=isSlideshow=true;
  if (!isDebug && !htmlMsg.length) document.getElementById("intro").style.display = "block";
}

isDemo=false;//debug


///scp init///
let genderID=0;

let LBody=0, LHead=1, LFace=2, LTopStart=3, LTopEnd=11, LBeard=12,  LHair=13, LHairS=14, LGoodieStart=15, LGoodieHat=16, LGoodieSpecial=LGoodieEnd=18;

/*
const showChance=[1,1,1, //body,head,face (3)
                  0.99,0.5,0.3,0.3,0.2,0.2,0.2,0.1,0.1, //tops (9)
                  1,1,1, //beard, hair, hairS (3)
                  0.2,0.4,0.4,0.05, //mouth, hat, eye, special (4)
                  ];
*/
let totalLayers=LGoodieEnd+1; 




let SKUZombie=3, SKUSkull=4, SKUApe=7; //sku
const maxTopLayers=LTopEnd-LTopStart+1;
const maxGoodieLayers=LGoodieEnd-LGoodieStart+1;

let scp=[];
let itemSKUs= new Array(totalLayers);
let itemColors= new Array(totalLayers);

let imgLoaded=0;
let isLoadingImg=false;



const skinColor=[[250,245,239],[255,224,189],[234,192,134],[131,108,79],[85,70,52],
                 [134,166,212],[99,132,54]];
const hairColor=[[112,112,112],[145,102,40],[88,51,34],[247,206,96],[0,0,0],
                  [161,138,104],[219,83,60],[218,90,139],[56,114,192],[111,180,89],[136,61,139],[255,255,255]];


const topColor=[[219,86,95],[219,90,139],[136,62,139],[96,51,140],[46,48,140],
                [36,84,161],[57,113,182],[97,175,235],[102,166,93],[111,179,88],
                [153,197,85],[255,243,95],[230,152,72],[223,110,64],[219,83,60],
                [134,101,64],[51,51,51],[255,255,255]];


/*
const bgColorPal=[[93,65,94],[77,61,94],[59,60,93],[55,74,101],
                  [68,89,114],[80,136,177],[86,110,83],[106,124,82],
                  [151,145,91],[151,110,126]
                  ];
*/

const bgColorPal=[[220,220,220]];

const apeColor=[0,255,0];
const zombieColor=[255,0,255];
const skullColor=[0,0,0];


let bgC;
let currTopID,myMaxTopID;
let currGoodieID,myMaxGoodieID;

let butPlay,butPause;
function preload(){

  //preloadFrames();
  butPause = loadImage("lib/pause.png");
  butPlay = loadImage("lib/play.png");

  ///preloading all wardrobe
  transImg = loadImage("lib/c/trans.png");
}



function setup() {   

  this.canvas.addEventListener("click",handleClick,false);

  //randomSeed(int(seed)); //deterministic



  createCanvas(windowWidth, windowHeight);

  pixelDensity(displayDensity());
  imageMode(CENTER);
  frameRate(24);
  noStroke();  
  noSmooth(); 
  fill(0);
  //seed="11111111111111111111111111111111111111111111111111111111111111111111";
  let intSeed=int(seed);
  console.log("seed:"+seed+" intSeed:"+intSeed); //total seed need: 68
  
  
  if (!seed || isNaN(seed) || intSeed<0 || seed.length<68) randomizePeep();
  else generatePeepFromSeed(); 
  
  loadPeep();

}




function loadingImg(){
  
  imgLoaded++;

  if (imgLoaded==totalLayers){

     showPeep();
    imgLoaded=0;
    isLoadingImg=false;
    waitTime=waitTimeMax;


    if (isSaveFrame && saveID<=stopSaveID){
      saveCanvas(saveID.toString(),'png'); 
      saveID++;
    }

  }
}



function draw(){
   if (isDemo){ 

             if (isSlideshow) {
                    
                    if (!isLoadingImg && waitTime<=0) {
                    
                      randomizePeep(); 
                      loadPeep(); 


                    } else if (!isLoadingImg) waitTime--;

                    if (!isLoadingImg) {
                        noTint();
                        image(butPause,25, 25); 
                    }
            }
            else if (!isLoadingImg) {
                
                noTint();
                image(butPlay,25, 25);
            }
  }

}


function isTop(i){

   if (i>=LTopStart && i<=LTopEnd) return(true);

   return(false);
}

function isGoodie(i){

   if (i>=LGoodieStart && i<=LGoodieEnd) return(true);

   return(false);
}


function getRanFromSeed(s,startID,len,isP){
  let p=1;
  if (isP) for (let i=0; i<len; i++) p*=10;
  return( int(s.substr(startID,len)) / p );
}

function getResultFromChance(r,chance){
  for (let j=0; j<chance.length; j++) if (r<chance[j]) return(j)
  return(0);
}

const chanceBody=[0.36,0.66,0.86,0.94,0.98,1]; //normal (36%), skinny(30%), tattoo(20%), ape(8%),zombie(4%), skull(2%)
const chanceSkin=[0.18,0.36,0.54,0.72,0.9,0.95,1]; //normal color x5 (18%), blue (5%), green (5%)
const chanceHair=[0.12,0.25,0.37,0.50,0.62,0.76,0.80,0.84,0.88,0.92,0.96,1]; //total 12 (~13%), 6 normal (4%)
const chanceShowTop=[0.99,0.5,0.3,0.3,0.2,0.2,0.2,0.1,0.1]; //tops (9) //individually tested
const chanceShowGoodie=[0.1,0.4,0.4,0.04]; //mouth, hat, eye, special (4) //individually tested
const allItemTotal=[[6,8,12,12,39,22,35,4, 6, 5,5,3,1, 36,0,5,25,19,8],
                    [6,8,12, 8,18,20,18,12,10,9,9,4,26,35,0,6,21,19,8]]; //remember to update for all wardrobe changes

//let LBody=0, LHead=1, LFace=2, LTopStart=3, LTopEnd=11, LBeard=12,  
//LHair=13, LHairS=14, LGoodieStart=15, LGoodieHat=16, LGoodieSpecial=LGoodieEnd=18;


//let chanceCrazyHair=0.2;
//const crazyHairStart=6;

function getTopSeed(i){ return(seed.substr(8+i*4,4)); }                           //8-43 4digit for 9 layers
function getGoodieSeed(i){ return(seed.substr(44+i*4,4)); }                       //44-59 4digit for 4 layers
function r_topID(i){ return(getRanFromSeed(getTopSeed(i),0,2,false)); }           //0,1 > ID
function r_showTop(i){ return(getRanFromSeed(getTopSeed(i),2,2,true)); }          //2,3 > show
function r_topColor(i){ return(getRanFromSeed(getTopSeed(i),1,2,false)); }        //1,2 > color
function r_goodieID(i){ return(getRanFromSeed(getGoodieSeed(i),0,2,false)); }     
function r_showGoodie(i){ return(getRanFromSeed(getGoodieSeed(i),2,2,true)); }    
function r_goodieColor(i){ return(getRanFromSeed(getGoodieSeed(i),1,2,false)); }  


function randomizePeep(){
  seed="";
  for (let i=0; i<78; i++) seed+= (Math.floor(random(10)) % 10).toString();
  console.log("gen seed:"+seed+" length:"+seed.length);
  generatePeepFromSeed();
}

function generatePeepFromSeed(){


 ///get allItemTotal for solidity sync //
 
 /*
 let output="";
 for (let j=0; j<2; j++){
  output+="[";
  for (let i=0; i<totalLayers; i++) {

        let objTotal = wdb[j].data[i].clothes.length;
        output+=objTotal+",";
    }
  output+="]";
 }
 console.log(output);
 */




 console.log("generate from seed:"+seed+" length:"+seed.length);
   /// seed -------total seed used:68 ---------///0 - check code
  genderID = int(seed.substr(1,1)) % 2;        //1

  let r_bodyID=getRanFromSeed(seed,2,2,true); //2-3
  let r_skin=getRanFromSeed(seed,4,2,true);   //4-5 skin color
  let r_hair=getRanFromSeed(seed,6,2,true);   //6-7 hear color
                                    // tops.  //8-43  4digit for 9 layers
                                    // goodies//44-59 4digit for 4 layers
  let r_hairID=getRanFromSeed(seed,60,2,false); //60-61
  let r_beardID=getRanFromSeed(seed,62,2,false); //62-63
  let r_faceID=getRanFromSeed(seed,64,2,false); //64-65
  let r_headID=getRanFromSeed(seed,66,1,false); //66
  let r_bgID=getRanFromSeed(seed,67,1,false); //67
  
  console.log("Random total Layers:"+totalLayers+ " gender:"+genderID + " total Top:"+maxTopLayers);
  console.log("r_bodyID:"+r_bodyID+" r_skin:"+r_skin+" r_hair:"+r_hair+" r_hairID:"+r_hairID+ " r_beardID:"+r_beardID);
  console.log(" r_faceID:"+r_faceID+ " r_headID:"+r_headID+ " r_bgID:"+r_bgID);


  const totalHair=allItemTotal[genderID][LHair];
  const totalBeard=allItemTotal[genderID][LBeard];
  const totalFace=allItemTotal[genderID][LFace];
  const totalHead=allItemTotal[genderID][LHead];
  const totalBg=bgColorPal.length;


  let validTop=maxTopLayers;
  let validGoodie=maxGoodieLayers;
  currTopID=LTopStart-1;
  currGoodieID=LGoodieStart-1;

  for (let i=0; i<totalLayers; i++) {

        //let objTotal = wdb[genderID].data[i].clothes.length;
        let objTotal = allItemTotal[genderID][i];
        let objSKU=-1;
        let objID; //index of the item

       // let r=random();
       // let showChanceNow=showChance[i];

        if (isTop(i))
          console.log("Top Layer "+ i+"         random: "+r_showTop(i-LTopStart) + " chance:"+chanceShowTop[i-LTopStart]+ 
            " r Top ID:" +r_topID(i-LTopStart)+" % "+objTotal+ 
            " r Top Color:" +r_topColor(i-LTopStart)+" % "+topColor.length+ 
            (r_showTop(i-LTopStart)>=chanceShowTop[i-LTopStart]?"":"**** SHOW"));
        else if (isGoodie(i))
          console.log("----- Goodie Layer "+ i+"        random: "+r_showGoodie(i-LGoodieStart) + " chance:"+chanceShowGoodie[i-LGoodieStart]+ 
            " r Goodie ID:" +r_goodieID(i-LGoodieStart)+" % "+objTotal+  
            " r Goodie Color:" +r_goodieColor(i-LGoodieStart)+" % "+topColor.length+   
            (r_showGoodie(i-LGoodieStart)>=chanceShowGoodie[i-LGoodieStart]?"":"**** SHOW"));
        ///////////////////

        if (i==LHead && (itemSKUs[LBody]==SKUZombie||itemSKUs[LBody]==SKUSkull||itemSKUs[LBody]==SKUApe)) { //// head follow skill/zombie/ape
          objSKU=itemSKUs[LBody]; //follow if zombie/skull/ape
        }
        else if ( ( i==LFace || i==LBeard) && ( itemSKUs[LBody]==SKUZombie||itemSKUs[LBody]==SKUSkull||itemSKUs[LBody]==SKUApe) ){ 
          ///// no face and no beard if
          //// zombie/skull/ape
        }
        else if (i==LHairS) { // hairSSSSS
          objSKU=itemSKUs[LHair]; ///follow hair SKU
        }
        else if ( isTop(i) && ( r_showTop(i-LTopStart) >= chanceShowTop[i-LTopStart])){ //tops
           /// no item
           //console.log("no tops!");
           validTop--;
        }
        else if ( isGoodie(i) && ( r_showGoodie(i-LGoodieStart) >= chanceShowGoodie[i-LGoodieStart])){ //goodie
           //// no item
           //console.log("   no goodie!");
           validGoodie--;
        }
        else 
        { 
          ///// showing this layer + assign Obj ID ///////

          if (i==LBody) objID=getResultFromChance(r_bodyID,chanceBody);
          else if (isTop(i)){
              currTopID=i;
              objID = r_topID(i-LTopStart) % objTotal;
          }
          else if (isGoodie(i)){
              currGoodieID=i;
              objID = r_goodieID(i-LGoodieStart) % objTotal;
          }
          else if (i==LHair) objID=r_hairID % totalHair;
          else if (i==LBeard) objID=r_beardID % totalBeard;
          else if (i==LFace) objID=r_faceID % totalFace;
          else if (i==LHead) objID=r_headID % (totalHead-3); //exclude zombie /skull /ape


          if (objSKU<0) objSKU=wdb[genderID].data[i].clothes[objID].sku; //assign SKU if not set

          console.log("layer: "+i+ " OBJ ID:"+objID);

          
        }

        itemSKUs[i]=objSKU;
        myMaxTopID=currTopID;
        myMaxGoodieID=currGoodieID;


        /////////// color /////////////////////////////////////////////////////////////////////
        let canColor=-1;

     

        if (i==LBody) {

           itemColors[i]=getResultFromChance(r_skin,chanceSkin);

        }
        else if (i==LHead) itemColors[i]=itemColors[LBody]; //head follows body
        else if (i==LBeard) {

          itemColors[i]=getResultFromChance(r_hair,chanceHair);


        }
        else if (i==LHair) itemColors[i]=itemColors[LBeard];// hair follows beard
        else if (isTop(i)) { //tops

          itemColors[i]=-1; //no tint

          if (objID>=0) { 
            canColor=wdb[genderID].data[i].clothes[objID].color;
            if (canColor=="1") itemColors[i]=r_topColor(i-LTopStart) % topColor.length;
          }
      
        }
        else if (isGoodie(i)) {//goodies
          itemColors[i]=-1; //no tint
          if (objID>=0) { 
            canColor=wdb[genderID].data[i].clothes[objID].color;
            if (canColor=="1") itemColors[i]=r_goodieColor(i-LGoodieStart) % topColor.length; 
          }
         
        }

  }

  bgC=r_bgID % totalBg;

  //testing
  
  //if (genderID==1) {
  
  /*
  
    let layerID=LGoodieEnd;
    itemSKUs[layerID]=37; //king
    itemColors[layerID]=-1;
     
    itemSKUs[LGoodieEnd-2]=10;//hat
    itemColors[LGoodieEnd-2]=-1;

    currTopID=myMaxTopID=LTopEnd;
    currGoodieID=myMaxGoodieID=LGoodieEnd;
    */
  //}
  

  //end testing debug

  console.log("^^^^^^^^^^^^^^^^^^ valid top:"+validTop+" valid Goodie:"+validGoodie+" currTopID:"+currTopID);
}


let manScale=1;

function showPeep(){
  if (itemSKUs[LBody]==SKUZombie) background(zombieColor[0],zombieColor[1],zombieColor[2]);
  else if (itemSKUs[LBody]==SKUSkull) background(skullColor[0],skullColor[1],skullColor[2]);
  else if (itemSKUs[LBody]==SKUApe) background(apeColor[0],apeColor[1],apeColor[2]);
  else background(bgColorPal[bgC][0], bgColorPal[bgC][1], bgColorPal[bgC][2]);

  let pScale=2.0; //don't touch this
  let maxScale=28.0; //e.g maxScale=7, max width = 80*7/2=280px
  const ow=80, oh=142;
  let shortSide = width<height?width:height;
  let manWidth=int(pScale*shortSide);

  if (manWidth>maxScale*ow) manWidth=maxScale*ow;  /// ow=80 

  manScale=manWidth/ow;

  //console.log("showing layer: ------------------------");

  for (let i=0; i<totalLayers; i++) {

    
    if (isTop(i) && i>currTopID){ 
      // skip item tops if not showing
    } else if (isGoodie(i) && i>currGoodieID){ 
      // skip item goodies if not showing
    } else if (i==LGoodieHat && itemSKUs[LGoodieSpecial]>=0 && itemSKUs[LGoodieSpecial]!=1000 && currGoodieID==LGoodieSpecial){ 
      // when curr=special layer: skip hat if has special (but not laser)
    } 
    else 

    if (itemSKUs[i]>=0) { ///has stuff

      let cid=itemColors[i];

      if ((i==LBody || i==LHead) && itemSKUs[LBody]!=SKUZombie && itemSKUs[LBody]!=SKUSkull && itemSKUs[LBody]!=SKUApe) //body & head & not zombie/skull/ape 
        tint(skinColor[cid][0], skinColor[cid][1], skinColor[cid][2]); 
      else if (i==LHair || i==LBeard) //hair + beard
        tint(hairColor[cid][0], hairColor[cid][1], hairColor[cid][2]); 
      else if (i==LHairS) //hair highlight
        tint(255,60);
      else if (isTop(i) && cid>=0) //tops
        tint(topColor[cid][0], topColor[cid][1], topColor[cid][2]); 
      else if (isGoodie(i) && cid>=0) //goodies 
        tint(topColor[cid][0], topColor[cid][1], topColor[cid][2]); 
      else 
        noTint();

      scp[i].pixelate(int(manWidth),int(manWidth*oh/ow));
      image(scp[i],int(width/2-1*manScale),int(height+(5+3*(genderID))*manScale));

      console.log("showing layer: "+i+" item sku:"+itemSKUs[i]+" color:"+cid);
    }
  }
}

function loadPeep(){

  if (isLoadingImg){
    console.log("can't load.-------------------------------------------..");
    return;
  }

  isLoadingImg=true;

  ////////////////// empty scp
  let temp=scp.length;
  for (let i=0; i<temp; i++) scp.pop();

  //// load items from itemSKUs[]
  for (let i=0; i<totalLayers; i++) {

    let genderName = wdb[genderID].gender;
    let layerName = wdb[genderID].data[i].layer;
    let objSKU=itemSKUs[i];
    let imgName="lib/c/";

    if (objSKU==undefined || objSKU<0) { 
      imgName="transImg";
      scp.push(transImg);
      imgLoaded++;
    }
    else 
    { 
      if (i==LHairS) imgName+="hair"+genderName+objSKU+"s.png"; //hairSSSS
      else if (isGoodie(i)) imgName+="G_"+genderName+"_"+objSKU+".png"; //goodie
      else if (isTop(i)) imgName+="T_"+genderName+"_"+objSKU+".png"; //top
      else imgName+=layerName+genderName+objSKU+".png"; //body
      scp.push(loadImage(imgName,loadingImg));

      console.log(i+" : "+imgName);
    }
    
    
    
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
   showPeep();
}


function undress(region){

      //console.log("take off region: "+region);

      if (region==1) { //top
        if (currTopID==LTopStart && itemSKUs[LTopStart]>=0) currTopID=myMaxTopID; //at underwear and has underwear then reset
        else if (currTopID<LTopStart) currTopID=myMaxTopID; //naked then reset
        else do { currTopID--; } while (itemSKUs[currTopID]<0 && currTopID>=LTopStart);
      }
      else if (region==2) { //goodie
        if (currGoodieID<LGoodieStart) currGoodieID=myMaxGoodieID; //naked then reset
        else do { currGoodieID--; } while (itemSKUs[currGoodieID]<0 && currGoodieID>=LGoodieStart);
      }


      
     // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>curr Top ID:"+currTopID);
      showPeep();

}



function checkRegion(x,y){

    if (x>width/2-manScale*20 && x<width/2+manScale*20 ){

      if (y>height-manScale*14) return(1);
      else if (y>height-manScale*40) return(2);
    }
      
    return(0);
}



function handleClick(evt) {

  evt.preventDefault();

  let region=checkRegion(mouseX,mouseY);

  if (isDemo){

          showPeep(); //otherwise the pause but won't go away
          if (isSlideshow) {
            isSlideshow=false;

          }
          else {
            ///wwhen not playing slideshow

            if (mouseX<50 && mouseY<50) {
              //clicked play button
              isSlideshow=true;
              waitTime=0;      
            } else {
              //clicked elsewhere
              if (region==1 || region==2) undress(region);
            }
           
          }

  } else if (!isLoadingImg){

      //not in demo mode (loading seed)
       if (region==1 || region==2) undress(region);
  }
  

  
}




/*

function touchStarted(){
  //empty function needed
}

function touchEnded() {

  //empty function needed
  
}

*/

//// wardrobe db

let wdb=[
 {
 "gender":"F",
 "data":
 [
  {
  "layer":"body",
  "clothes":[
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"2"},
          {"sku":"7"},
          {"sku":"3"},
          {"sku":"4"},
         ]
  
  },
  
  {
  "layer":"head",
  "clothes":[
          {"sku":"2"},
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"5"},
          {"sku":"6"},
          {"sku":"3"},
          {"sku":"4"},
          {"sku":"7"},
          
          ]
  },
  
  {
  "layer":"face",
  "clothes":[
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"2"},
          {"sku":"3"},
          {"sku":"4"},
          {"sku":"5"},
          {"sku":"6"},
          {"sku":"7"},
          {"sku":"8"},
          {"sku":"9"},
          {"sku":"10"},
          {"sku":"11"},
          ]
  
  },


  {
      "layer":"3 bra F",
      "clothes":[
                 {"sku":"0","color":1 },
                 {"sku":"1","color":1 },
                 {"sku":"2","color":1 },
                 {"sku":"3","color":1 },
                 {"sku":"4","color":1 },
                 {"sku":"5","color":1 },
                 {"sku":"6","color":1 },
                 {"sku":"7","color":1 },
                 {"sku":"8","color":1 },
                 {"sku":"9","color":1 },
                 {"sku":"10","color":1},
                 {"sku":"63","color":0 },
                 ]
  },

  {
      "layer":"4 innerwear F",
      "clothes":[

                 {"sku":"12","color":1},
                 {"sku":"13","color":1},
                 {"sku":"14","color":1},
                 {"sku":"15","color":1},
                 {"sku":"16","color":1},
                 {"sku":"17","color":1},
                 {"sku":"18","color":1},
                 {"sku":"19","color":1},
                 {"sku":"20","color":1},
                 {"sku":"21","color":1},
                 {"sku":"22","color":1},
                 {"sku":"23","color":1},
                 {"sku":"24","color":1},
                 {"sku":"25","color":1},
                 {"sku":"26","color":1},
                 {"sku":"27","color":1},
                 {"sku":"28","color":1},
                 {"sku":"29","color":1},
                 {"sku":"30","color":1},
                 {"sku":"31","color":1},
                 {"sku":"32","color":1},
                 {"sku":"34","color":1},
                 {"sku":"35","color":1},
                 {"sku":"36","color":1},
                 {"sku":"37","color":1},
                 {"sku":"38","color":1},
                 {"sku":"40","color":1},
                 {"sku":"41","color":1},
                 {"sku":"43","color":1},
                 {"sku":"45","color":0},
                 {"sku":"64","color":1},
                 {"sku":"49","color":1},
                 {"sku":"133","color":1},
                 {"sku":"135","color":0},
                 {"sku":"136","color":0},
                 {"sku":"137","color":0},
                 {"sku":"150","color":0},
                 {"sku":"179","color":0},                 
                 {"sku":"165","color":0},
                 
                

                 
                 ]
      },
      
      
      {
      "layer":"F 5 shirt",
      "clothes":[
                 {"sku":"47","color":1},
                 {"sku":"51","color":1},
                 {"sku":"52","color":1},
                 {"sku":"53","color":1},
                 {"sku":"54","color":1},
                 {"sku":"55","color":1},
                 {"sku":"56","color":1},
                 {"sku":"57","color":1},
                 {"sku":"58","color":1},
                 {"sku":"59","color":1},
                 {"sku":"60","color":1},
                 {"sku":"61","color":1},
                 {"sku":"62","color":1},
                 {"sku":"107","color":1},    
                 {"sku":"142","color":0},
                 {"sku":"143","color":0},
                 {"sku":"144","color":0},
                 {"sku":"145","color":0},
                 {"sku":"146","color":0},
                 {"sku":"147","color":0},
                 {"sku":"162","color":0},               
                 {"sku":"177","color":0},
                 
                 ]
      },

      {
      "layer":"F 6 jacket",
      "clothes":[
                 {"sku":"65","color":1},
                 {"sku":"66","color":1},
                 {"sku":"67","color":1},
                 {"sku":"68","color":1},
                 {"sku":"69","color":1},
                 {"sku":"70","color":1},
                 {"sku":"71","color":1},
                 {"sku":"72","color":1},
                 {"sku":"73","color":0},
                 {"sku":"74","color":1},
                 {"sku":"75","color":1},
                 {"sku":"76","color":1},
                 {"sku":"77","color":1},
                 {"sku":"78","color":1},
                 {"sku":"108","color":1},
                 {"sku":"109","color":1},
                 {"sku":"110","color":1},
                 {"sku":"111","color":1},
                 {"sku":"112","color":1},
                 {"sku":"113","color":1},
                 {"sku":"114","color":1},
                 {"sku":"115","color":1},
                 {"sku":"132","color":0},
                 {"sku":"140","color":0},
                 {"sku":"141","color":0},
                 {"sku":"148","color":0},
                 {"sku":"178","color":0},
                 {"sku":"175","color":0},
                 {"sku":"172","color":0},
                 {"sku":"173","color":0},
                 {"sku":"170","color":0},
                 {"sku":"166","color":0},
                 {"sku":"167","color":0},
                 {"sku":"163","color":0},
                 {"sku":"1004","color":0},
                 ]
      },
      
      {
      "layer":"F 7",
      "clothes":[
                 {"sku":"79","color":1},
                 {"sku":"80","color":1},
                 {"sku":"81","color":1},
                 {"sku":"82","color":1},
                 ]
      },
      
      {
      "layer":"F 8",
      "clothes":[
                 {"sku":"83","color":1},
                 {"sku":"84","color":1},
                 {"sku":"85","color":1},
                 {"sku":"86","color":1},
                 {"sku":"87","color":1},
                 {"sku":"131","color":0},
                 ]
      },
      {
      "layer":"F 9",
      "clothes":[
                 {"sku":"93","color":1},
                 {"sku":"95","color":1},
                  {"sku":"130","color":1},
                  {"sku":"129","color":0},
                  {"sku":"128","color":0},
                 
                 ]
      },
      
      {
      "layer":"F 10",
      "clothes":[
                 
                 {"sku":"98","color":1},
                 {"sku":"99","color":1},
                 {"sku":"100","color":1},
                 {"sku":"1078","color":0},
                 {"sku":"1079","color":0},
                 
                 ]
      },
      
      
      {
      "layer":"F 11 big scarf",
      "clothes":[
                 {"sku":"102","g":5,"color":1},
                 {"sku":"103","g":5,"color":1},
                 {"sku":"117","g":5,"color":1},
                 ]
      },

  {
  "layer":"beard",
  "clothes":[
        {"sku":"0"},
        ]
  
  },
  
  {
  "layer":"hair",
  "clothes":[
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"2"},
          {"sku":"3"},
          {"sku":"4"},
          {"sku":"5"},
          {"sku":"6"},
          {"sku":"7"},
          {"sku":"8"},
          {"sku":"9"},
          {"sku":"10"},
          {"sku":"11"},
          {"sku":"12"},
          {"sku":"13"},
          {"sku":"14"},
          {"sku":"15"},
          {"sku":"16"},
          {"sku":"17"},
          {"sku":"18"},
          {"sku":"19"},
          {"sku":"20"},
          {"sku":"21"},
          {"sku":"22"},
          {"sku":"23"},
          {"sku":"24"},
          {"sku":"25"},
          {"sku":"26"},
          {"sku":"27"},
          {"sku":"28"},
          {"sku":"29"},
          {"sku":"30"},
          {"sku":"31"},
          {"sku":"32"},
          {"sku":"33"},
          {"sku":"34"},
          {"sku":"35"},
        ]
  
  },


  {
  "layer":"hairs",
  "clothes":[]
  
  },

    {
  "layer":"G 15 mouth",
  "clothes":[
             {"color":1,"sku":"1005"},
             {"color":1,"sku":"1004"},
             {"color":0,"sku":"80"},
             {"color":0,"sku":"1001"},
             {"color":0,"sku":"1003"},
             ]
  
  },
  
  
  
  {
  "layer":"G 16 hat",
  "clothes":[
             {"color":1,"sku":"0"},
             {"color":1,"sku":"1"},
             {"color":1,"sku":"2"},
             {"color":1,"sku":"3"},
             {"color":1,"sku":"4"},
             {"color":1,"sku":"5"},
             {"color":1,"sku":"6"},
             {"color":1,"sku":"7"},
             {"color":1,"sku":"8"},
             {"color":1,"sku":"9"},
             {"color":1,"sku":"10"},
             {"color":1,"sku":"11"},
             {"color":1,"sku":"26"},
             {"color":1,"sku":"27"},
             {"color":1,"sku":"28"},
             {"color":1,"sku":"29"},
             {"color":1,"sku":"30"},
             {"color":0,"sku":"34"},
             {"color":1,"sku":"36"},
             {"color":1,"sku":"42"},
             {"color":1,"sku":"47"},
             {"color":1,"sku":"48"},
             {"color":0,"sku":"49"},
             {"color":0,"sku":"50"},
             {"color":0,"sku":"51"},
             

             

             ]
  
  },

   {
  "layer":"G 17 eye",
  "clothes":[
             {"color":0,"sku":"12"},
             {"color":1,"sku":"13"},
             {"color":1,"sku":"14"},
             {"color":1,"sku":"15"},
             {"color":1,"sku":"16"},
             {"color":1,"sku":"33"},
             {"color":1,"sku":"17"},
             {"color":1,"sku":"31"},
             {"color":1,"sku":"18"},
             {"color":1,"sku":"19"},
             {"color":1,"sku":"20"},
             {"color":1,"sku":"21"},
             {"color":1,"sku":"22"}, 
             {"color":1,"sku":"23"},
             {"color":1,"sku":"32"},
             {"color":0,"sku":"62"},
             {"color":0,"sku":"1006"},
             {"color":1,"sku":"1008"},
             {"color":0,"sku":"1007"},
             ]
  
  },


  {
  "layer":"G 18 face/special",
  "clothes":[
             {"color":0,"sku":"63"},
             {"color":0,"sku":"64"},
             {"color":0,"sku":"65"},
             {"color":0,"sku":"66"},
             {"color":0,"sku":"67"},
             {"color":0,"sku":"1002"},
             {"color":0,"sku":"1000"},
             {"color":0,"sku":"37"},
             ]
  
  },



  ]
 },










 {
 "gender":"M",
 "data":
 [
  {
  "layer":"body",
  "clothes":[
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"2"},
          {"sku":"7"},
          {"sku":"3"},
          {"sku":"4"},
          ]
  
  },
  
  {
  "layer":"head",
  "clothes":[
          
          {"sku":"2"},
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"5"},
          {"sku":"6"},
          {"sku":"3"},
          {"sku":"4"},
          {"sku":"7"},
          
          ]
  },
  
  {
  "layer":"face",
  "clothes":[
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"2"},
          {"sku":"3"},
          {"sku":"4"},
          {"sku":"5"},
          {"sku":"6"},
          {"sku":"7"},
          {"sku":"8"},
          {"sku":"9"},
          {"sku":"10"},
          {"sku":"11"},
          ]
  
  },



  {
  "layer":"M 3 underwear 0",
  "clothes":[
             {"sku":"0","color":1},
             {"sku":"1","color":1},
             {"sku":"2","color":1},
             {"sku":"4","color":1},
             {"sku":"6","color":1},
             {"sku":"7","color":1},
             {"sku":"9","color":1},
             {"sku":"11","color":1}, 
            
             ]
  
  },
  
  {
  "layer":"M 4",
  "clothes":[
             {"sku":"5","color":1,"name":"Mid length"},
             {"sku":"8","color":1,"name":"Stripes long"},
             {"sku":"10","color":1,"name":"Turtle neck"}, 
             {"name":"Tee","color":1,"sku":"12"},
             {"name":"V-neck Tee","color":1,"sku":"13"},
             {"name":"Pocket Tee","color":1,"sku":"14"},
             {"name":"Stripes Tee","color":1,"sku":"15"},
             {"name":"Vest","color":1,"sku":"16"},
             {"name":"Long Tee","color":1,"sku":"17"},
             {"name":"Polo","color":1,"sku":"18"},
             {"name":"Ash Polo","color":1,"sku":"19"},
             {"name":"Fred Perry","color":1,"sku":"20"},
             {"name":"Two tone tee","color":1,"sku":"21"},
             {"name":"Thick stripes","color":1,"sku":"22"},
             {"name":"Circle Tee","color":1,"sku":"23"},
             {"name":"Three color Polo","color":0,"sku":"24"},
             {"name":"db-db Tee","color":1,"sku":"25"},
             {"name":"flash tee","color":1,"sku":"118" , "scan":"QR_supercoolstyle"},
             
             ]
  
  },
  
  {
  "layer":"M 5 shirts 2",
  "clothes":[
             {"color":1,"sku":"27"},
             {"color":0,"sku":"28"},
             {"color":1,"sku":"29"},
             {"color":1,"sku":"30"},
             {"color":0,"sku":"31"},
             {"color":1,"sku":"32"},
             {"color":0,"sku":"33"},
             {"color":1,"sku":"34"},
             {"color":1,"sku":"35"},
             {"color":1,"sku":"36"},
             {"color":1,"sku":"37"},
             {"color":1,"sku":"38"},
             {"color":1,"sku":"39"},
             {"color":1,"sku":"40"},
             {"color":1,"sku":"41"},
             {"color":0,"sku":"42"},
             {"color":1,"sku":"43"},
             {"sku":"131","color":0},
             {"color":0,"sku":"1000"},
             {"color":0,"sku":"1001"},
             ]
  
  },
  
  {
  "layer":"6M 3",
  "clothes":[
             {"color":1,"sku":"44"},
             {"color":1,"sku":"45"},
             {"color":1,"sku":"46"},
             {"color":0,"sku":"47"},
             {"color":1,"sku":"48"},
             {"color":1,"sku":"49"},
             {"color":1,"sku":"50"},
             {"color":0,"sku":"51"},
             {"color":1,"sku":"52"},
             {"color":1,"sku":"53"},
             {"color":1,"sku":"54"},
             {"color":0,"sku":"55"},
             {"color":1,"sku":"56"},
             {"color":1,"sku":"57"},
             {"color":1,"sku":"58"},
             {"color":0,"sku":"59"},
             {"sku":"132","color":0},
             {"color":0,"sku":"1004"},
             ]
  
  },
  
  {
  "layer":"7M 4",
  "clothes":[
             {"color":1,"sku":"62"},
             {"color":1,"sku":"63"},
             {"color":0,"sku":"64"},
             {"color":0,"sku":"65"},
             {"color":1,"sku":"66"},
             {"color":1,"sku":"67"},
             {"color":1,"sku":"68"},
             {"color":0,"sku":"69"},
             {"color":1,"sku":"70"},
             {"color":1,"sku":"71"},
             {"color":1,"sku":"72"},
             {"color":1,"sku":"73"},
             
             ]
  
  },
  
  {
  "layer":"8M 5",
  "clothes":[
             {"color":1,"sku":"74"},
             {"color":0,"sku":"75"},
             {"color":1,"sku":"76"},
             {"color":1,"sku":"77"},
             {"color":1,"sku":"78"},
             {"color":1,"sku":"79"},
             {"color":1,"sku":"80"},
             {"color":1,"sku":"81"},
             {"color":1,"sku":"82"},
             {"color":1,"sku":"83"},
             ]
  
  },
  
  {
  "layer":"9M 6",
  "clothes":[
             {"color":1,"sku":"84"},
             {"color":1,"sku":"85"},
             {"color":0,"sku":"86"},
             {"color":1,"sku":"87"},
             {"color":1,"sku":"88"},
             {"color":1,"sku":"89"},
             {"color":1,"sku":"90"},
             {"sku":"117","color":0},
             {"sku":"116","color":0},

             ]
  
  },
  

  {
  "layer":"10M 7",
  "clothes":[
             {"color":1,"sku":"93"},
             {"color":1,"sku":"94"},
             {"color":0,"sku":"95"},
             {"color":0,"sku":"96"},
             {"color":1,"sku":"97"},
             {"color":0,"sku":"98"},
             {"color":1,"sku":"99"},
             {"sku":"1073","color":0},
             {"sku":"1074","color":0},
             ]
  
  },
  
  
  {
  "layer":"11 M big scarf 8",
  "clothes":[
             {"color":1,"sku":"100"},
             {"color":1,"sku":"101"},
             {"color":1,"sku":"102"},
             {"color":0,"sku":"103"},
         
             ]
  
  },


  {
  "layer":"beard",
  "clothes":[
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"2"},
          {"sku":"3"},
          {"sku":"4"},
          {"sku":"5"},
          {"sku":"6"},
          {"sku":"7"},
          {"sku":"8"},
          {"sku":"9"},
          {"sku":"10"},
          {"sku":"11"},
          {"sku":"12"},
          {"sku":"13"},
          {"sku":"14"},
          {"sku":"15"},
          {"sku":"16"},
          {"sku":"19"},
          {"sku":"20"},
          {"sku":"21"},
          {"sku":"22"},
          {"sku":"23"},
          {"sku":"24"},
          {"sku":"25"},
          {"sku":"26"},
          {"sku":"27"},
          ]
  
  },

  
  {
  "layer":"hair",
  "clothes":[
          {"sku":"0"},
          {"sku":"1"},
          {"sku":"2"},
          {"sku":"3"},
          {"sku":"4"},
          {"sku":"5"},
          {"sku":"7"},
          {"sku":"8"},
          {"sku":"9"},
          {"sku":"10"},
          {"sku":"11"},
          {"sku":"12"},
          {"sku":"13"},
          {"sku":"14"},
          {"sku":"15"},
          {"sku":"16"},
          {"sku":"17"},
          {"sku":"18"},
          {"sku":"19"},
          {"sku":"20"},
          {"sku":"21"},
          {"sku":"22"},
          {"sku":"23"},
          {"sku":"24"},
          {"sku":"25"},
          {"sku":"26"},
          {"sku":"27"},
          {"sku":"28"},
          {"sku":"29"},
          {"sku":"30"},
          {"sku":"31"},
          {"sku":"32"},
          {"sku":"33"},
          {"sku":"34"},
          {"sku":"35"},
          ]
  
  },

  {
  "layer":"hairs",
  "clothes":[]
  
  },


  {
  "layer":"G",
  "clothes":[

             {"color":1,"sku":"1005"},
             {"color":1,"sku":"1004"},
             {"sku":"64","color":0},
             {"sku":"75","color":0},
             {"color":0,"sku":"1001"},
             {"color":0,"sku":"1003"},
             ]
  
  },

 
  {
  "layer":"G 16 M hat",
  "clothes":[
             {"color":1,"sku":"0"},
             {"color":1,"sku":"1"},
             {"color":1,"sku":"2"},
             {"color":1,"sku":"3"},
             {"color":1,"sku":"4"},
             {"color":1,"sku":"5"},
             {"color":1,"sku":"6"},
             {"color":1,"sku":"7"},
             {"color":1,"sku":"8"},
             {"color":1,"sku":"9"},
             {"color":1,"sku":"10"},
             {"color":1,"sku":"11"},
             {"color":1,"sku":"26"},
             {"color":1,"sku":"27"},
             {"color":1,"sku":"28"},
             {"color":1,"sku":"29"},
             {"color":1,"sku":"30"},
             {"color":1,"sku":"36"},
             {"color":1,"sku":"42"},
             {"color":1,"sku":"46"},
             {"color":1,"sku":"47"},
             
             
             
             
             ]
  
  },


   {
  "layer":"G eyes M 17",
  "clothes":[
             {"color":0,"sku":"12"},
             {"color":1,"sku":"13"},
             {"color":1,"sku":"14"},
             {"color":1,"sku":"15"},
             {"color":1,"sku":"16"},
             {"color":1,"sku":"33"},
             {"color":1,"sku":"17"},
             {"color":1,"sku":"31"},
             {"color":1,"sku":"18"},
             {"color":1,"sku":"19"},
             {"color":1,"sku":"20"},
             {"color":1,"sku":"21"},
             {"color":1,"sku":"22"},
             {"color":1,"sku":"23"},
             {"color":1,"sku":"32"},
             {"color":0,"sku":"57"},
             {"color":0,"sku":"1006"},
             {"color":1,"sku":"1008"},
             {"color":0,"sku":"1007"},

             ]
  
  },

    {
  "layer":"G face 18",
  "clothes":[
             {"color":0,"sku":"58"},
             {"color":0,"sku":"59"},
             {"color":0,"sku":"60"},
             {"color":0,"sku":"61"},
             {"color":0,"sku":"62"},             
             {"color":0,"sku":"1002"},
             {"color":0,"sku":"1000"},
             {"color":0,"sku":"37"},
             ]
  
  },

  ]
 },
];


//// helper functions ////

p5.Image.prototype.pixelate = function (w, h) {
  "use strict";

  // Locally cache current image's canvas' dimension properties:
  const {width, height} = this.canvas;

  // Sanitize dimension parameters:
  w = ~~Math.abs(w), h = ~~Math.abs(h);

  // Quit prematurely if both dimensions are equal or parameters are both 0:
  if (w === width && h === height || !(w | h))  return this;

  // Scale dimension parameters:
  w || (w = h*width  / height | 0); // when only parameter w is 0
  h || (h = w*height / width  | 0); // when only parameter h is 0

  const img = new p5.Image(w, h), // creates temporary image
        sx = w / width, sy = h / height; // scaled coords. for current image

  this.loadPixels(), img.loadPixels(); // initializes both 8-bit RGBa pixels[]

  // Create 32-bit viewers for current & temporary 8-bit RGBa pixels[]:
  const pixInt = new Int32Array(this.pixels.buffer),
        imgInt = new Int32Array(img.pixels.buffer);

  // Transfer current to temporary pixels[] by 4 bytes (32-bit) at once:
  for (let y = 0; y < h; ) {
    const curRow = width * ~~(y/sy), tgtRow = w * y++;

    for (let x = 0; x < w; ) {
      const curIdx = curRow + ~~(x/sx), tgtIdx = tgtRow + x++;
      imgInt[tgtIdx] = pixInt[curIdx];
    }
  }

  img.updatePixels(); // updates temporary 8-bit RGBa pixels[] w/ its current state

  // Resize current image to temporary image's dimensions:
  this.canvas.width = this.width = w, this.canvas.height = this.height = h;
  this.drawingContext.drawImage(img.canvas, 0, 0, w, h, 0, 0, w, h);

  return this;
};
