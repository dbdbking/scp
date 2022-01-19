////////// Super Cool Peeps 2021
////////// By db-db
console.log("-----  Super Cool Peeps 2021 v0.5.9----");
let isDebug=1;
let isDemo=false;
let isSlideshow=false;
let isSaveFrame=false;
let saveID=0;
let stopSaveID=499;
let waitTime=0;
let waitTimeMax=20;



let seed=document.URL.split('?s=')[1];
if (!seed) { 

  isDemo=isSlideshow=true;



  if (!isDebug && !htmlMsg.length) document.getElementById("intro").style.display = "block";
  seed="intro";
  //seed="109609623391740374088498902610575257344877981381652601288471797813119799813824";

}

console.log("seed:"+seed+" length:"+seed.length+" htmlMsg:"+htmlMsg);

///scp init///
let genderID=0;

let LBody=0, LHead=1, LFace=2, LTopStart=3, LTopEnd=11, LBeard=12,  LHair=13, LHairS=14, LGoodieStart=15, LGoodieEnd=17;
const showChance=[1,1,1, //body,head,face
                  0.99,0.5,0.3,0.3,0.2,0.2,0.2,0.1,0.1, //tops
                  1,1,1, //beard, hair
                  0.2,0.4,0.4, //mouth, eye, hat/face
                  ];

const normalTotals=[[],[]];
const specialTotals=[[],[]];
const rareChance=[[],[]];

let totalLayers=showChance.length;
let chanceCrazySkin=0.1;
let chanceCrazyHair=0.2;
let chanceSpecial=0.15;

let chanceSkull=0.02;   // =0.02 chance
let chanceZombie=0.06; // = 0.04 chance
let chanceApe=0.14;   // = 0.08 chance
let chanceTatoo=0.34; //= 0.20 chance
let chanceSexy=0.64; //= 0.30 chance  
                    //normal: 0.36 chacne


let SKUZombie=3, SKUSkull=4, SKUApe=7; //sku
const maxTopLayers=LTopEnd-LTopStart+1;
const maxGoodieLayers=LGoodieEnd-LGoodieStart+1;

let scp=[];
let itemSKUs= new Array(totalLayers);
let itemColors= new Array(totalLayers);

let imgLoaded=0;
let isLoadingImg=false;

const oW=80, oH=142;

const skinColor=[[250,245,239],[255,224,189],[234,192,134],[131,108,79],[85,70,52],
                 [134,166,212],[99,132,54]];
const hairColor=[[112,112,112],[145,102,40],[88,51,34],[247,206,96],[0,0,0],
                  [161,138,104],[219,83,60],[218,90,139],[56,114,192],[111,180,89],[136,61,139],[255,255,255]];

const crazyHairStart=6;
const crazySkinStart=5;
const specialStart=[26,22] //woman and man's special items in head (layer=LGoodieEnd)


const topColor=[[219,86,95],[219,90,139],[136,62,139],[96,51,140],[46,48,140],
                [36,84,161],[57,113,182],[97,175,235],[102,166,93],[111,179,88],
                [153,197,85],[255,243,95],[230,152,72],[223,110,64],[219,83,60],
                [134,101,64],[51,51,51],[255,255,255]];

const bgColorPal=[[93,65,94],[77,61,94],[59,60,93],[55,74,101],
                  [68,89,114],[80,136,177],[86,110,83],[106,124,82],
                  [151,145,91],[151,110,126]
                  ];

const zombieColor=[255,0,255];
const skullColor=[0,255,255];
const apeColor=[0,255,0];

let bgC;
let currTopID,myMaxTopID;

let butPlay,butPause;
function preload(){

  //preloadFrames();
  butPause = loadImage("lib/pause.png");
  butPlay = loadImage("lib/play.png");

  ///preloading all wardrobe
  transImg = loadImage("lib/scp_new/textureNumen/trans.png");
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
  

  randomizePeep();
  loadPeep();

}




function loadingImg(){
  
  imgLoaded++;

  if (imgLoaded==totalLayers){

     showPeep();
    imgLoaded=0;
    isLoadingImg=false;
    waitTime=waitTimeMax;

  }
}



function draw(){

   if (isDemo){ 

             if (isSlideshow) {
                    
                    if (!isLoadingImg && waitTime<=0) {
                    
                      randomizePeep(); 
                      loadPeep(); 

                      if (isSaveFrame && saveID<=stopSaveID){
                        saveCanvas(saveID.toString(),'png'); 
                        saveID++;
                      }

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

function randomizePeep(){

  genderID = Math.floor(random(2));

 
  console.log("Random total Layers:"+totalLayers+ " gender:"+genderID + " total Top:"+maxTopLayers);


  let validTop=maxTopLayers;
  let validGoodie=maxGoodieLayers;
  currTopID=LTopStart-1;

  for (let i=0; i<totalLayers; i++) {

        let objTotal = wdb[genderID].data[i].clothes.length;
        let objSKU=-1;
        let objID;

        let r=random();
        let ch=showChance[i];

        if (isGoodie(i) || isTop(i))
          console.log("Layer "+ i+" - "+wdb[genderID].data[i].layer+" random: "+r + " chance:"+ch+ (r>ch?" XXXXXX ":""));


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
        else if ( isTop(i) && (r>ch)){ //tops
           /// no item
           //console.log("no tops!");
           validTop--;
        }
        else if ( isGoodie(i) && (r>ch) ) { //goodie
           //// no item
           //console.log("   no goodie!");
           validGoodie--;
        }
        else 
        { 
          ///// assign SKU ///////

          if (i==LBody){
            
            if (r<chanceSkull) objSKU=SKUSkull; //skull
            else if (r<chanceZombie) objSKU=SKUZombie; //zombie
            else if (r<chanceApe) objSKU=SKUApe; //Ape
            else if (r<chanceTatoo) objSKU=2; //tatoo
            else if (r<chanceSexy) objSKU=1; //sexy
            else objSKU=0; //normal
          }
          else if (i==LHead) {
            objID=Math.floor(random(objTotal-3)); //exclude zombie/skull/ape
          } 
          else if (i==LGoodieEnd) { //// Goodie Head with special items

            let itemR=random();
            let specialTot=objTotal- specialStart[genderID]; 
            console.log("special total:"+specialTot+" special R:"+itemR);
            if (itemR<chanceSpecial) {

              objID=specialStart[genderID]+Math.floor(random(specialTot)); //only special total

              console.log("Got Special item ID:"+objID);
            } else {

              objID=Math.floor(random(specialStart[genderID])); //exclude special item
              console.log("Normal item ID:"+objID);
            }


          }

          else {
            //equally distributed
            objID=Math.floor(random(objTotal));
          }

          if (isTop(i)) currTopID=i;
          if (objSKU<0) objSKU=wdb[genderID].data[i].clothes[objID].sku;
        }

        itemSKUs[i]=objSKU;
        myMaxTopID=currTopID;


        /////////// color /////////////////////////////////////////////////////////////////////
        let canColor=-1;

        r=random(); ///for hair & skin color 

        if (i==LBody) {

          if (r<chanceCrazySkin)
               itemColors[i]=crazySkinStart+Math.floor(random(skinColor.length-crazySkinStart)); //crazy 
            else 
               itemColors[i]=Math.floor(random(crazySkinStart)); //normal
          
            
        }
        else if (i==LHead) itemColors[i]=itemColors[LBody]; //head follows body
        else if (i==LBeard) {

            if (r<chanceCrazyHair)
               itemColors[i]=crazyHairStart+Math.floor(random(hairColor.length-crazyHairStart)); // crazy
            else 
               itemColors[i]=Math.floor(random(crazyHairStart)); // normal
        }
        else if (i==LHair) itemColors[i]=itemColors[LBeard];// hair follows beard
        else if (isTop(i)) { //tops

          itemColors[i]=-1; //no tint

          if (objID>=0) { 
            canColor=wdb[genderID].data[i].clothes[objID].color;
            if (canColor=="1") itemColors[i]=Math.floor(random(topColor.length)); 
          }
      
        }
        else if (isGoodie(i)) {//goodies
          itemColors[i]=-1; //no tint
          if (objID>=0) { 
            canColor=wdb[genderID].data[i].clothes[objID].color;
            if (canColor=="1") itemColors[i]=Math.floor(random(topColor.length)); 
          }
         
        }



  }

  bgC=Math.floor(random(bgColorPal.length)); 

  


  //testing
  /*
  //if (genderID==1) {
  
    let layerID=LHair;
    itemSKUs[layerID]=itemSKUs[LHairS]=35;
    //itemColors[layerID]=-1;
    currTopID=myMaxTopID=LGoodieEnd;
  //}
  */

  //end testing debug







  //console.log(itemSKUs);

  console.log("^^^^^^^^^^^^^^^^^^ valid top:"+validTop+" valid Goodie:"+validGoodie+" currTopID:"+currTopID);
}



function showPeep(){
  if (itemSKUs[LBody]==SKUZombie) background(zombieColor[0],zombieColor[1],zombieColor[2]);
  else if (itemSKUs[LBody]==SKUSkull) background(skullColor[0],skullColor[1],skullColor[2]);
  else if (itemSKUs[LBody]==SKUApe) background(apeColor[0],apeColor[1],apeColor[2]);
  else background(bgColorPal[bgC][0], bgColorPal[bgC][1], bgColorPal[bgC][2]);

  let pScale=2.0; 
  let shortSide = width<height?width:height;
  let manWidth=int(pScale*shortSide);

  if (manWidth>560) manWidth=560;  /// ow=80 

  let manScale=manWidth/oW;

  
  console.log("showing layer: ------------------------");

  for (let i=0; i<totalLayers; i++) {

    
    if (isTop(i) && i>currTopID){ 
      // skip item tops if not showing
    } else 

    if (itemSKUs[i]>=0) {

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

      scp[i].pixelate(int(manWidth),int(manWidth*oH/oW));
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

  ////////////////// refresh scp
  let temp=scp.length;
  for (let i=0; i<temp; i++) scp.pop();

  //// load items from itemSKUs[]
  for (let i=0; i<totalLayers; i++) {

    let genderName = wdb[genderID].gender;
    let layerName = wdb[genderID].data[i].layer;
    let objSKU=itemSKUs[i];
    let imgName="lib/scp_new/textureNumen/";

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
    }
    
    console.log(i+" : "+imgName);
    
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
   showPeep();
}


function undress(){
///take off clothes
    if (currTopID==LTopStart) { //underwear
        if (itemSKUs[LTopStart]>=0) currTopID=myMaxTopID; //has underwear then reset  
      } 
      else if (currTopID<LTopStart) { //naked
        currTopID=myMaxTopID; // reset  
      } 

      else {
          do {
            currTopID--;
          } while (itemSKUs[currTopID]<0 && currTopID>=LTopStart);
      }
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>curr Top ID:"+currTopID);
      showPeep();

}



function handleClick(evt) {

  evt.preventDefault();

  

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
                           undress();
                        }
                        
                       
                      }

              } else if (!isLoadingImg){

                  //not in demo mode (loading seed)
                  undress();
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
          {"sku":"0","s":0,"name":"normal"},
          {"sku":"1","s":0,"name":"sexy"},
          {"sku":"2","s":0,"name":"tattoo"},
          {"sku":"3","s":0,"name":"zombie"},
          {"sku":"4","s":0,"name":"skeleton"},
          {"sku":"7","s":0,"name":"ape"},
         ]
  
  },
  
  {
  "layer":"head",
  "clothes":[
          {"sku":"2","s":0,"name":"S"},
          {"sku":"0","s":0,"name":"M"},
          {"sku":"1","s":0,"name":"L"},
          {"sku":"5","s":0,"name":"XL"},
          {"sku":"6","s":0,"name":"XS"},
          {"sku":"3","s":0,"name":"zombie"},
          {"sku":"4","s":0,"name":"skeleton"},
          {"sku":"7","s":0,"name":"ape"},
          
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
                 {"sku":"0","g":1,"color":1,"name":"Bra"},
                 {"sku":"1","g":1,"color":1,"name":"Bra"},
                 {"sku":"2","g":1,"color":1,"name":"Bra"},
                 {"sku":"3","g":1,"color":1,"name":"Bra"},
                 {"sku":"4","g":1,"color":1,"name":"Bra"},
                 {"sku":"5","g":1,"color":1,"name":"Bra"},
                 {"sku":"6","g":1,"color":1,"name":"Bra"},
                 {"sku":"7","g":1,"color":1,"name":"Bra"},
                 {"sku":"8","g":1,"color":1,"name":"Bra"},
                 {"sku":"9","g":1,"color":1,"name":"Bra"},
                 {"sku":"10","g":1,"color":1,"name":"Bra","party":"basic"},
                 {"sku":"63","g":1,"color":0,"name":"Bra"},
                 ]
  },

  {
      "layer":"4 innerwear F",
      "clothes":[

                 {"sku":"12","g":1,"color":1,"name":"tee"},
                 {"sku":"13","g":1,"color":1,"name":"tee"},
                 {"sku":"14","g":1,"color":1,"name":"tee"},
                 {"sku":"15","g":1,"color":1,"name":"tee"},
                 {"sku":"16","g":1,"color":1,"name":"tee"},
                 {"sku":"17","g":1,"color":1,"name":"tee"},
                 {"sku":"18","g":1,"color":1,"name":"tee"},
                 {"sku":"19","g":1,"color":1,"name":"tee"},
                 {"sku":"20","g":1,"color":1,"name":"tee"},
                 {"sku":"21","g":1,"color":1,"name":"tee"},
                 {"sku":"22","g":1,"color":1,"name":"tee"},
                 {"sku":"23","g":1,"color":1,"name":"tee"},
                 {"sku":"24","g":1,"color":1,"name":"tee"},
                 {"sku":"25","g":1,"color":1,"name":"tee"},
                 {"sku":"26","g":1,"color":1,"name":"tee"},
                 {"sku":"27","g":2,"color":1,"name":"shirt"},
                 {"sku":"28","g":1,"color":1,"name":"tee"},
                 {"sku":"29","g":1,"color":1,"name":"tee"},
                 {"sku":"30","g":1,"color":1,"name":"tee"},
                 {"sku":"31","g":2,"color":1,"name":"shirt"},
                 {"sku":"32","g":2,"color":1,"name":"shirt"},
                 {"sku":"34","g":1,"color":1,"name":"tee"},
                 {"sku":"35","g":1,"color":1,"name":"tee"},
                 {"sku":"36","g":1,"color":1,"name":"tee"},
                 {"sku":"37","g":1,"color":1,"name":"tee"},
                 {"sku":"38","g":1,"color":1,"name":"tee"},
                 {"sku":"40","g":1,"color":1,"name":"tee"},
                 {"sku":"41","g":1,"color":1,"name":"tee"},
                 {"sku":"43","g":1,"color":1,"name":"tee"},
                 {"sku":"45","g":1,"color":0,"name":"tee"},
                 {"sku":"64","g":1,"color":1,"name":"tee"},
                 {"sku":"49","g":1,"color":1,"name":"tee"},
                 {"sku":"133","g":1,"color":1,"name":"flash tee" ,"scan":"QR_supercoolstyle"},
                 {"sku":"135","name":"Jourden Navy Paws Bralette","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"136","name":"Jourden Black Bralette With Bubble Gum Eyelets","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"137","name":"Jourden Red Bralette With Robin Egg Eyelets","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"150","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
                 {"sku":"179","g":1,"color":0,"name":"Kate Spade New York Metallic Top","rank":"brn_fw","scan":"brn_fw"},                 
                 {"sku":"165","g":1,"color":0,"name":"Comme Des Garcons PLAY Emblem Pastel Stripes","rank":"brn_fw","scan":"brn_fw"},
                 
                

                 
                 ]
      },
      
      
      {
      "layer":"F 5 shirt",
      "clothes":[
                 {"sku":"47","g":2,"color":1,"name":"tee"},
                 {"sku":"51","g":3,"color":1,"name":"tee"},
                 {"sku":"52","g":2,"color":1,"name":"tee"},
                 {"sku":"53","g":2,"color":1,"name":"tee"},
                 {"sku":"54","g":2,"color":1,"name":"tee"},
                 {"sku":"55","g":2,"color":1,"name":"tee"},
                 {"sku":"56","g":2,"color":1,"name":"tee"},
                 {"sku":"57","g":2,"color":1,"name":"tee"},
                 {"sku":"58","g":1,"color":1,"name":"tee"},
                 {"sku":"59","g":1,"color":1,"name":"tee"},
                 {"sku":"60","g":2,"color":1,"name":"tee"},
                 {"sku":"61","g":2,"color":1,"name":"tee"},
                 {"sku":"62","g":2,"color":1,"name":"tee"},
                 {"sku":"107","g":2,"color":1,"name":"shirt"},    
                 {"sku":"142","name":"Jourden Emerald Striped Ribbed Tunic","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"143","name":"Jourden Yellow Sheer Tunic","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"144","name":"Jourden Black Gathered Dress With Bubble Gum Eyelets","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"145","name":"Jourden Red Gathered Dress With Robin Egg Eyelets","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"146","name":"Jourden Navy Paws Bateau Midi Dress","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"147","name":"Jourden White Paws Bateau Midi Dress","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"162","g":3,"color":0,"name":"adidas Originals","rank":"brn_adidas"},               
                 {"sku":"177","g":1,"color":0,"name":"Kate Spade New York Multi KiteBow Dress","rank":"brn_fw","scan":"brn_fw"},
                 
                 ]
      },

      {
      "layer":"F 6 jacket",
      "clothes":[
                 {"sku":"65","g":3,"color":1,"name":"tee"},
                 {"sku":"66","g":2,"color":1,"name":"tee"},
                 {"sku":"67","g":3,"color":1,"name":"tee"},
                 {"sku":"68","g":1,"color":1,"name":"tee"},
                 {"sku":"69","g":1,"color":1,"name":"tee"},
                 {"sku":"70","g":2,"color":1,"name":"tee"},
                 {"sku":"71","g":2,"color":1,"name":"tee"},
                 {"sku":"72","g":2,"color":1,"name":"tee"},
                 {"sku":"73","g":3,"color":0,"name":"tee"},
                 {"sku":"74","g":2,"color":1,"name":"tee"},
                 {"sku":"75","g":1,"color":1,"name":"tee"},
                 {"sku":"76","g":3,"color":1,"name":"tee"},
                 {"sku":"77","g":2,"color":1,"name":"tee"},
                 {"sku":"78","g":2,"color":1,"name":"tee"},
                 {"sku":"108","g":1,"color":1,"name":"tee"},
                 {"sku":"109","g":1,"color":1,"name":"tee"},
                 {"sku":"110","g":1,"color":1,"name":"tee"},
                 {"sku":"111","g":1,"color":1,"name":"tee"},
                 {"sku":"112","g":2,"color":1,"name":"tee"},
                 {"sku":"113","g":1,"color":1,"name":"tee"},
                 {"sku":"114","g":1,"color":1,"name":"tee"},
                 {"sku":"115","g":2,"color":1,"name":"tee"},
                 {"sku":"132","g":1,"color":0,"name":"leopard tee"},
                 {"sku":"140","name":"Jourden Yellow Tee With Black Ring","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"141","name":"Jourden Black Tee With Bubble Gum Eyelets","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"148","name":"Jourden Black Hunter Jacket With Bubble Gum Eyelets","g":2,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"178","g":1,"color":0,"name":"Kate Spade New York Virginia Lace Dress","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"175","g":1,"color":0,"name":"Hysteric Glamour","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"172","g":1,"color":0,"name":"H&M Ladies Top","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"173","g":1,"color":0,"name":"H&M Ladies Dress","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"170","g":1,"color":0,"name":"FRAPBOIS","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"166","g":1,"color":0,"name":"DKNY Red Top","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"167","g":1,"color":0,"name":"DKNY Lace Top","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"163","g":2,"color":0,"name":"A|X TEXTURED JACKET WHITE","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"1004","name":"skull tee","g":1,"color":0,"rank":"peep"},
                 ]
      },
      
      {
      "layer":"F 7",
      "clothes":[
                 {"sku":"79","g":2,"color":1,"name":"tee"},
                 {"sku":"80","g":2,"color":1,"name":"tee"},
                 {"sku":"81","g":2,"color":1,"name":"tee"},
                 {"sku":"82","g":3,"color":1,"name":"tee"},
                 ]
      },
      
      {
      "layer":"F 8",
      "clothes":[
                 {"sku":"83","g":2,"color":1,"name":"tee"},
                 {"sku":"84","g":2,"color":1,"name":"tee"},
                 {"sku":"85","g":2,"color":1,"name":"tee"},
                 {"sku":"86","g":2,"color":1,"name":"tee"},
                 {"sku":"87","g":3,"color":1,"name":"tee"},
                 {"sku":"131","g":3,"color":0,"name":"leopard jacket"},
                 ]
      },
      {
      "layer":"F 9",
      "clothes":[
                 {"sku":"93","g":2,"color":1,"name":"tee"},
                 {"sku":"95","g":2,"color":1,"name":"tee"},
                  {"sku":"130","g":2,"color":1,"name":"necklace"},
                  {"sku":"129","g":2,"color":0,"name":"necklace"},
                  {"sku":"128","g":2,"color":0,"name":"necklace"},
                 
                 ]
      },
      
      {
      "layer":"F 10",
      "clothes":[
                 
                 {"sku":"98","g":2,"color":1,"name":"tee"},
                 {"sku":"99","g":2,"color":1,"name":"tee"},
                 {"sku":"100","g":2,"color":1,"name":"tee"},
                 {"sku":"1078","name":"necklace short","g":1,"color":0,"rank":"peep"},
                 {"sku":"1079","name":"necklace long","g":1,"color":0,"rank":"peep"},
                 
                 ]
      },
      
      
      {
      "layer":"F 11 big scarf",
      "clothes":[
                 {"sku":"102","g":5,"color":1,"name":"tee"},
                 {"sku":"103","g":5,"color":1,"name":"tee"},
                 {"sku":"117","g":5,"color":1,"name":"tee"},
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
  "layer":"G 15",
  "clothes":[
             {"name":"mask","g":1,"color":1,"sku":"1005","rank":"peep"},
             {"name":"cloth","g":1,"color":1,"sku":"1004","rank":"peep"},
             {"sku":"80","name":"hankerchief","g":1,"color":0 , "hide":1},
             {"name":"cig","g":1,"color":0,"sku":"1001","rank":"peep"},
             {"name":"rainbow","g":1,"color":0,"sku":"1003","rank":"peep"},
             ]
  
  },
  
   {
  "layer":"G 17",
  "clothes":[
             {"name":"3D","g":1,"color":0,"sku":"12"},
             {"name":"Glasses","g":1,"color":1,"sku":"13"},
             {"name":"Sun-Glasses","g":1,"color":1,"sku":"14"},
             {"name":"Rounded Frames","g":1,"color":1,"sku":"15"},
             {"name":"Retro Frames","g":1,"color":1,"sku":"16"},
             {"name":"Retro Frames color lens","g":1,"color":1,"sku":"33"},
             {"name":"Rounded Shades","g":1,"color":1,"sku":"17"},
             {"name":"Rounded Shades","g":1,"color":1,"sku":"31"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"18"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"19"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"20"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"21"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"22"}, 
             {"name":"Cool Shades","g":1,"color":1,"sku":"23"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"32"},
             {"name":"eye patch","g":1,"color":0,"sku":"62"},
             {"name":"laser blue","g":1,"color":0,"sku":"1006","rank":"peep"},
            
             
             ]
  
  },
  
  {
  "layer":"G 16",
  "clothes":[
             {"name":"Trucker Cap","g":1,"color":1,"sku":"0"},
             {"name":"Headdband","g":1,"color":1,"sku":"1"},
             {"name":"Fedora","g":1,"color":1,"sku":"2"},
             {"name":"Beanie","g":1,"color":1,"sku":"3"},
             {"name":"Beanie","g":1,"color":1,"sku":"4"},
             {"name":"Beanie","g":1,"color":1,"sku":"5"},
             {"name":"Beanie","g":1,"color":1,"sku":"6"},
             {"name":"Beanie","g":1,"color":1,"sku":"7"},
             {"name":"Beanie","g":1,"color":1,"sku":"8"},
             {"name":"Beanie","g":1,"color":1,"sku":"9"},
             {"name":"Beanie","g":1,"color":1,"sku":"10"},
             {"name":"Beanie","g":1,"color":1,"sku":"11"},
             {"name":"Beanie","g":1,"color":1,"sku":"26"},
             {"name":"Beanie","g":1,"color":1,"sku":"27"},
             {"name":"Beanie","g":1,"color":1,"sku":"28"},
             {"name":"Beanie","g":1,"color":1,"sku":"29"},
             {"name":"Beanie","g":1,"color":1,"sku":"30"},
             {"name":"panda","g":1,"color":0,"sku":"34"},
             {"name":"headphones","g":1,"color":1,"sku":"36"},
             {"name":"bike cap","g":1,"color":1,"sku":"42"},
             {"name":"headband thin","g":1,"color":1,"sku":"47"},
             {"name":"headband","g":1,"color":1,"sku":"48"},
             {"name":"rabbit","g":1,"color":0,"sku":"49"},
             {"name":"cat","g":1,"color":0,"sku":"50"},
             {"name":"rat","g":1,"color":0,"sku":"51"},
             {"name":"vr","g":1,"color":0,"sku":"1007","rank":"peep"},

             {"name":"SP horse head","g":1,"color":0,"sku":"63","rank":"prm_animalmaskpack"},
             {"name":"SP pigeon head","g":1,"color":0,"sku":"64","rank":"prm_animalmaskpack"},
             {"name":"SP rabbit head","g":1,"color":0,"sku":"65","rank":"prm_animalmaskpack"},
             {"name":"SP panda head","g":1,"color":0,"sku":"66","rank":"prm_animalmaskpack"},
             {"name":"SP horse white head","g":1,"color":0,"sku":"67"},
             {"name":"SP daft","g":1,"color":0,"sku":"1002","rank":"peep"},
             {"name":"SP laser","g":1,"color":0,"sku":"1000","rank":"peep"},
             {"name":"SP crown","g":1,"color":0,"sku":"37","rank":"prm_kingqueenpack"},

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
          {"sku":"0","s":0,"name":"normal"},
          {"sku":"1","s":0,"name":"sexy"},
          {"sku":"2","s":0,"name":"tattoo"},
          {"sku":"3","s":0,"name":"zombie"},
          {"sku":"4","s":0,"name":"skeleton"},
          {"sku":"7","s":0,"name":"ape"},
          
          ]
  
  },
  
  {
  "layer":"head",
  "clothes":[
          
          {"sku":"2","s":0,"name":"S"},
          {"sku":"0","s":0,"name":"M"},
          {"sku":"1","s":0,"name":"L"},
          {"sku":"5","s":0,"name":"XL"},
          {"sku":"6","s":0,"name":"XS"},
          {"sku":"3","s":0,"name":"zombie"},
          {"sku":"4","s":0,"name":"skeleton"},
          {"sku":"7","s":0,"name":"ape"},
          
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
             {"sku":"0","g":1,"color":1,"name":"Tank Top"},
             {"sku":"1","g":1,"color":1,"name":"Inner Tee"},
             {"sku":"2","g":1,"color":1,"name":"Long tank top"},
             {"sku":"4","g":1,"color":1,"name":"short shoulder"},
             {"sku":"6","g":1,"color":1,"name":"Stripes Tank"},
             {"sku":"7","g":1,"color":1,"name":"Dots Tank"},
             {"sku":"9","g":1,"color":1,"name":"Dots Tee"},
             {"sku":"11","g":1,"color":1,"name":"Sports Tank"}, 
            
             ]
  
  },
  
  {
  "layer":"M 4",
  "clothes":[
             {"sku":"5","g":1,"color":1,"name":"Mid length"},
             {"sku":"8","g":1,"color":1,"name":"Stripes long"},
             {"sku":"10","g":1,"color":1,"name":"Turtle neck"}, 
             {"name":"Tee","g":1,"color":1,"sku":"12"},
             {"name":"V-neck Tee","g":1,"color":1,"sku":"13"},
             {"name":"Pocket Tee","g":1,"color":1,"sku":"14"},
             {"name":"Stripes Tee","g":1,"color":1,"sku":"15"},
             {"name":"Vest","g":2,"color":1,"sku":"16"},
             {"name":"Long Tee","g":1,"color":1,"sku":"17"},
             {"name":"Polo","g":1,"color":1,"sku":"18"},
             {"name":"Ash Polo","g":1,"color":1,"sku":"19"},
             {"name":"Fred Perry","g":1,"color":1,"sku":"20"},
             {"name":"Two tone tee","g":1,"color":1,"sku":"21"},
             {"name":"Thick stripes","g":1,"color":1,"sku":"22"},
             {"name":"Circle Tee","g":1,"color":1,"sku":"23"},
             {"name":"Three color Polo","g":1,"color":0,"sku":"24"},
             {"name":"db-db Tee","g":1,"color":1,"sku":"25"},
             {"name":"flash tee","g":1,"color":1,"sku":"118" , "scan":"QR_supercoolstyle"},
             
             ]
  
  },
  
  {
  "layer":"M 5 shirts 2",
  "clothes":[
             {"name":"Shirt","g":2,"color":1,"sku":"27"},
             {"name":"Denim Shirt","g":2,"color":0,"sku":"28"},
             {"name":"Cardigan","g":2,"color":1,"sku":"29"},
             {"name":"Long Sleeved Tee","g":1,"color":1,"sku":"30"},
             {"name":"Shirt","g":2,"color":0,"sku":"31"},
             {"name":"Oxford shirt","g":2,"color":1,"sku":"32"},
             {"name":"Denim shirt special","g":2,"color":0,"sku":"33"},
             {"name":"checkered shirt","g":2,"color":1,"sku":"34"},
             {"name":"checkered shirt two","g":2,"color":1,"sku":"35"},
             {"name":"Stripes shirt","g":2,"color":1,"sku":"36"},
             {"name":"Two tone shirt","g":2,"color":1,"sku":"37"},
             {"name":"Two tone shirt","g":2,"color":1,"sku":"38"},
             {"name":"Two tone shirt","g":2,"color":1,"sku":"39"},
             {"name":"Open shirt","g":2,"color":1,"sku":"40"},
             {"name":"Short sleeved shirt","g":2,"color":1,"sku":"41"},
             {"name":"Stripes long sleeved tee","g":1,"color":0,"sku":"42"},
             {"name":"Cardigan ","g":2,"color":1,"sku":"43"},
             {"sku":"131","g":1,"color":0,"name":"Comme Des Garcons PLAY Emblem Pastel Stripes","rank":"brn_fw","scan":"brn_fw"},
             {"name":"black tie","g":2,"color":0,"sku":"1000","rank":"peep"},
             {"name":"black bowtie","g":2,"color":0,"sku":"1001","rank":"peep"},
             ]
  
  },
  
  {
  "layer":"6M 3",
  "clothes":[
             {"name":"Dark jacket","g":2,"color":1,"sku":"44"},
             {"name":"Big Tee","g":1,"color":1,"sku":"45"},
             {"name":"Mid Tee","g":1,"color":1,"sku":"46"},
             {"name":"Sweatshirt","g":1,"color":0,"sku":"47"},
             {"name":"Hoodie","g":3,"color":1,"sku":"48"},
             {"name":"Open Hoodie","g":3,"color":1,"sku":"49"},
             {"name":"Blazer","g":2,"color":1,"sku":"50"},
             {"name":"Sports sweatshirt","g":1,"color":0,"sku":"51"},
             {"name":"Knitted vest","g":1,"color":1,"sku":"52"},
             {"name":"Large vest","g":2,"color":1,"sku":"53"},
             {"name":"Hood shirt","g":1,"color":1,"sku":"54"},
             {"name":"Vneck sweater","g":1,"color":0,"sku":"55"},
             {"name":"cardigan long","g":2,"color":1,"sku":"56"},
             {"name":"thick cardigan","g":2,"color":1,"sku":"57"},
             {"name":"wide cardigan","g":2,"color":1,"sku":"58"},
             {"name":"MIT Sweatshirt","g":1,"color":0,"sku":"59"},
              {"sku":"132","g":2,"color":0,"name":"Comme Des Garcons PLAY Cardigan","rank":"brn_fw","scan":"brn_fw"},
              {"name":"Skull Tee","g":1,"color":0,"sku":"1004"},
             ]
  
  },
  
  {
  "layer":"7M 4",
  "clothes":[
             {"name":"School Jacket","g":2,"color":1,"sku":"62"},
             {"name":"Long blazer","g":2,"color":1,"sku":"63"},
             {"name":"Long camo","g":2,"color":0,"sku":"64"},
             {"name":"Denim Jacket","g":2,"color":0,"sku":"65"},
             {"name":"Tight Jacket","g":2,"color":1,"sku":"66"},
             {"name":"Coat","g":2,"color":1,"sku":"67"},
             {"name":"Leather Jacket","g":3,"color":1,"sku":"68"},
             {"name":"Two tone","g":2,"color":0,"sku":"69"},
             {"name":"Double","g":2,"color":1,"sku":"70"},
             {"name":"Sweater","g":1,"color":1,"sku":"71"},
             {"name":"Patterned Sweater","g":1,"color":1,"sku":"72"},
             {"name":"Pocket Sweater","g":1,"color":1,"sku":"73"},
             
             ]
  
  },
  
  {
  "layer":"8M 5",
  "clothes":[
             {"name":"Coat","g":2,"color":1,"sku":"74"},
             {"name":"Coat Camel","g":2,"color":0,"sku":"75"},
             {"name":"Big Coat","g":2,"color":1,"sku":"76"},
             {"name":"Trench Coat","g":2,"color":1,"sku":"77"},
             {"name":"Big F Sweater","g":1,"color":1,"sku":"78"},
             {"name":"Checkered Jacket","g":3,"color":1,"sku":"79"},
             {"name":"Baseball Jacket","g":2,"color":1,"sku":"80"},
             {"name":"Military Jacket","g":2,"color":1,"sku":"81"},
             {"name":"Pattern sweater","g":1,"color":1,"sku":"82"},
             {"name":"Dots sweater","g":1,"color":1,"sku":"83"},
             ]
  
  },
  
  {
  "layer":"9M 6",
  "clothes":[
             {"name":"Jumper","g":1,"color":1,"sku":"84"},
             {"name":"Stripes knit","g":1,"color":1,"sku":"85"},
             {"name":"Camo Jumper","g":1,"color":0,"sku":"86"},
             {"name":"Flash Jumper","g":1,"color":1,"sku":"87"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"88"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"89"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"90"},
             {"sku":"117","g":2,"color":0,"name":"necklace"},
             {"sku":"116","g":2,"color":0,"name":"necklace"},

             ]
  
  },
  

  {
  "layer":"10M 7",
  "clothes":[
             {"name":"Down vest","g":3,"color":1,"sku":"93"},
             {"name":"Outdoor Jacket","g":3,"color":1,"sku":"94"},
             {"name":"Outdoor Jacket","g":3,"color":0,"sku":"95"},
             {"name":"Outdoor Jacket Camo","g":3,"color":0,"sku":"96"},
             {"name":"Down Jacket","g":3,"color":1,"sku":"97"},
             {"name":"Down Jacket Golden","g":3,"color":0,"sku":"98"},
             {"name":"Big coat","g":2,"color":1,"sku":"99"},
             {"sku":"1073","name":"necklace short","g":1,"color":0,"rank":"peep"},
             {"sku":"1074","name":"necklace long","g":1,"color":0,"rank":"peep"},
             ]
  
  },
  
  
  {
  "layer":"11 M big scarf 8",
  "clothes":[
             {"name":"Scarf------------","g":5,"color":1,"sku":"100"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"101"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"102"},
             {"name":"Scarf camo------------","g":5,"color":0,"sku":"103"},
         
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

             {"name":"mask","g":1,"color":1,"sku":"1005","rank":"peep"},
             {"name":"cloth","g":1,"color":1,"sku":"1004","rank":"peep"},
             {"sku":"64","name":"gas mask","g":1,"color":0},
             {"sku":"75","name":"hankerchief","g":1,"color":0 , "hide":1},
             {"name":"cig","g":1,"color":0,"sku":"1001","rank":"peep"},
             {"name":"rainbow","g":1,"color":0,"sku":"1003","rank":"peep"},
             ]
  
  },

  {
  "layer":"G",
  "clothes":[
             {"name":"3D","g":1,"color":0,"sku":"12"},
             {"name":"Glasses","g":1,"color":1,"sku":"13"},
             {"name":"Sun-Glasses","g":1,"color":1,"sku":"14"},
             {"name":"Rounded Frames","g":1,"color":1,"sku":"15"},
             {"name":"Retro Frames","g":1,"color":1,"sku":"16"},
             {"name":"Retro Frames color lens","g":1,"color":1,"sku":"33"},
             {"name":"Rounded Shades","g":1,"color":1,"sku":"17"},
             {"name":"Rounded Shades","g":1,"color":1,"sku":"31"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"18"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"19"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"20"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"21"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"22"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"23"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"32"},
             {"name":"eye patch","g":1,"color":0,"sku":"57"},
             {"name":"laser blue","g":1,"color":0,"sku":"1006","rank":"peep"},

             ]
  
  },


  {
  "layer":"G",
  "clothes":[
             {"name":"Trucker Cap","g":1,"color":1,"sku":"0"},
             {"name":"FL Cap","g":1,"color":1,"sku":"1"},
             {"name":"Fedora","g":1,"color":1,"sku":"2"},
             {"name":"Beanie","g":1,"color":1,"sku":"3"},
             {"name":"Beanie","g":1,"color":1,"sku":"4"},
             {"name":"Beanie","g":1,"color":1,"sku":"5"},
             {"name":"Beanie","g":1,"color":1,"sku":"6"},
             {"name":"Beanie","g":1,"color":1,"sku":"7"},
             {"name":"Beanie","g":1,"color":1,"sku":"8"},
             {"name":"Beanie","g":1,"color":1,"sku":"9"},
             {"name":"Beanie","g":1,"color":1,"sku":"10"},
             {"name":"Beanie","g":1,"color":1,"sku":"11"},
             {"name":"Beanie","g":1,"color":1,"sku":"26"},
             {"name":"Beanie","g":1,"color":1,"sku":"27"},
             {"name":"Beanie","g":1,"color":1,"sku":"28"},
             {"name":"Beanie","g":1,"color":1,"sku":"29"},
             {"name":"Beanie","g":1,"color":1,"sku":"30"},
             {"name":"headphones","g":1,"color":1,"sku":"36"},
             {"name":"bike cap","g":1,"color":1,"sku":"42"},
             {"name":"headband","g":1,"color":1,"sku":"46"},
             {"name":"headband","g":1,"color":1,"sku":"47"},
             {"name":"vr","g":1,"color":0,"sku":"1007","rank":"peep"},
             {"name":"sb","g":1,"color":1,"sku":"1008","rank":"peep"},
             
             {"name":"SP horse head","g":1,"color":0,"sku":"58","rank":"prm_animalmaskpack"},
             {"name":"SP pigeon head","g":1,"color":0,"sku":"59","rank":"prm_animalmaskpack"},
             {"name":"SP rabbit head","g":1,"color":0,"sku":"60","rank":"prm_animalmaskpack"},
             {"name":"SP panda head","g":1,"color":0,"sku":"61","rank":"prm_animalmaskpack"},
             {"name":"SP horse white head","g":1,"color":0,"sku":"62"},             
             {"name":"SP daft","g":1,"color":0,"sku":"1002","rank":"peep"},
             {"name":"SP laser","g":1,"color":0,"sku":"1000","rank":"peep"},
             {"name":"SP crown","g":1,"color":0,"sku":"37","rank":"prm_kingqueenpack"},
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
