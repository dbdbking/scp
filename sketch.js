////////// Super Cool Peeps 2021
////////// By db-db
console.log("-----  Super Cool Peeps 2021 v0.4.0----");
let isDebug=1;

let seed=document.URL.split('?s=')[1];
if (!seed) { 
  if (!isDebug && !htmlMsg.length) document.getElementById("intro").style.display = "block";
  seed="intro";
}

console.log("seed:"+seed+" length:"+seed.length+" htmlMsg:"+htmlMsg);




///scp init///
let genderID=0;
const totalLayers=20;
const maxTopLayers=10;
let scp=[];
let itemSKUs= new Array(totalLayers);
let itemColors= new Array(totalLayers);


let imgLoaded=0;
let isLoadingImg=false;

const oW=80, oH=142;

const skinColor=[[250,245,239],[255,224,189],[234,192,134],[184,152,112],[131,108,79],[85,70,52]];
const hairColor=[[226,226,226],[145,102,40],[88,51,34],[247,206,96],[17,17,17],
                  [161,138,104],[219,83,60],[218,90,139],[56,114,192],[111,180,89],[136,61,139]];
const topColor=[[219,86,95],[219,90,139],[136,62,139],[96,51,140],[46,48,140],
                [36,84,161],[57,113,182],[97,175,235],[102,166,93],[111,179,88],
                [153,197,85],[255,243,95],[230,152,72],[223,110,64],[219,83,60],
                [134,101,64],[70,70,70],[255,255,255]];

const bgColorPal=[[153,61,97],[95,41,98],[66,33,98],[33,34,99],[23,58,113],
                  [38,79,128] /*,[77,126,62],[108,139,59],[161,106,48],[156,76,42]*/];

const zombieColor=[0,255,0];
const skullColor=[18,18,18];


let bgC=0;


let currTopTotal=0;
let topTotal=0;
//let totalLayers;




function preload(){

  //preloadFrames();
  fsBut = loadImage("lib/fs.png");

  ///preloading all wardrobe
  transImg = loadImage("lib/scp_new/textureNumen/trans.png");
}

function setup() {   


  //randomSeed(int(seed)); //deterministic
  createCanvas(windowWidth, windowHeight);

  pixelDensity(displayDensity());
  imageMode(CENTER);
  frameRate(24);
  noStroke();  
  noSmooth(); 
  fill(0);
  
  console.log(itemSKUs.length);

  randomizePeep();
  loadPeep();

}


function loadingImg(){
  
  imgLoaded++;

  if (imgLoaded==totalLayers){

     showPeep();
    imgLoaded=0;
    isLoadingImg=false;
  }
}


let LBody=0, LHead=1, LFace=2, LTopStart=3, LTopEnd=12, LBeard=13,  LHair=14, LHairS=15, LGoodieStart=16, LGoodieEnd=19;
let IZombie=3, ISkull=4;

function randomizePeep(){

  genderID = Math.floor(random(2));

  currTopTotal=topTotal=Math.floor(random(maxTopLayers+1)); ///0 - 10, 

  //topTotal=0;  //debugging
  console.log("Random total Layers:"+totalLayers+ " gender:"+genderID + " total Top:"+topTotal);

  for (let i=0; i<totalLayers; i++) {

        let objTotal = wdb[genderID].data[i].clothes.length;
        let objSKU=-1;
        let objID;

        let r=random(1);
       
        if (i==LHead){ //// head
          if (itemSKUs[LBody]==IZombie||itemSKUs[LBody]==ISkull) objSKU=itemSKUs[LBody]; //follow if zombie of skull
          else {
            objID=Math.floor(random(objTotal-2)); //exclude zombie and skull
            objSKU=wdb[genderID].data[i].clothes[objID].sku;
          }
        }
        else if ( ( i==LFace || i==LBeard) && ( itemSKUs[LBody]==IZombie||itemSKUs[LBody]==ISkull) ){ 
          ///// no face and no beard if
          //// zombie or skull
         
        }
        else if ((i>=LTopStart && i<=LTopEnd) && (i-LTopStart>=topTotal)){ //tops
           /// no item
        }
        else if ((i>=LGoodieStart && i<=LGoodieEnd) && (r<0.9) ) { //goodie
           //// no item
        }
     
        else if (i==LHairS) { // hairSSSSS
          objSKU=itemSKUs[LHair]; ///follow hair SKU
        }
        else 
        { 
          objID=Math.floor(random(objTotal));
          objSKU=wdb[genderID].data[i].clothes[objID].sku;
        }
        itemSKUs[i]=objSKU;

        /////////// color /////
        let canColor=-1;

        if (i==LBody) itemColors[i]=Math.floor(random(skinColor.length)); //body 
        else if (i==LHead) itemColors[i]=itemColors[LBody]; //head follows body
        else if (i==LBeard) itemColors[i]=Math.floor(random(hairColor.length)); // beard
        else if (i==LHair) itemColors[i]=itemColors[LBeard];// hair follows beard
        else if (i>=LTopStart && i<=LTopEnd) { //tops

          itemColors[i]=-1; //no tint

          if (objID>=0) { 
            canColor=wdb[genderID].data[i].clothes[objID].color;
            if (canColor=="1") itemColors[i]=Math.floor(random(topColor.length)); 
          }
      
        }
        else if (i>=LGoodieStart && i<=LGoodieEnd) {//goodies
          itemColors[i]=-1; //no tint
          if (objID>=0) { 
            canColor=wdb[genderID].data[i].clothes[objID].color;
            if (canColor=="1") itemColors[i]=Math.floor(random(topColor.length)); 
          }
         
        }
  }

  bgC=Math.floor(random(bgColorPal.length)); 

  //debug debug
 // itemSKUs[LGoodieEnd-1]=12; //glasses 
 // itemColors[LGoodieEnd-1]=-1;
    //itemSKUs[LGoodieStart]=1001; //glasses 
    //itemColors[LGoodieStart]=-1;


 // if (genderID==1) itemSKUs[LBeard]=11; //beard
  //end debug

  console.log(itemSKUs);
}

function showPeep(){

 
  if (itemSKUs[LBody]==IZombie) background(zombieColor[0],zombieColor[1],zombieColor[2]);
  else if (itemSKUs[LBody]==ISkull) background(skullColor[0],skullColor[1],skullColor[2]);
  else background(bgColorPal[bgC][0], bgColorPal[bgC][1], bgColorPal[bgC][2]);

  let pScale=2.0; 
  let shortSide = width<height?width:height;
  let manWidth=pScale*shortSide;

  if (manWidth>1000) manWidth=1000;

  let manScale=manWidth/oW;

  
  console.log("showing layer: ------------------------");

  for (let i=0; i<totalLayers; i++) {

    
    if ((i>=LTopStart && i<=LTopEnd) && (i-LTopStart >= currTopTotal)){ 
      // skip item tops if not showing
    } else if (itemSKUs[i]>=0) {

      let cid=itemColors[i];

      if ((i==LBody || i==LHead) && itemSKUs[LBody]!=IZombie && itemSKUs[LBody]!=ISkull) //body & head &no zombie & no skull 
        tint(skinColor[cid][0], skinColor[cid][1], skinColor[cid][2]); 
      else if (i==LHair || i==LBeard) //hair + beard
        tint(hairColor[cid][0], hairColor[cid][1], hairColor[cid][2]); 
      else if (i==LHairS) //hair highlight
        tint(255,60);
      else if (i>=LTopStart && i<=LTopEnd && cid>=0) //tops
        tint(topColor[cid][0], topColor[cid][1], topColor[cid][2]); 
      else if (i>=LGoodieStart && i<=LGoodieEnd && cid>=0) //goodies 
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
      else if (i>=LGoodieStart && i<=LGoodieEnd) imgName+="G_"+genderName+"_"+objSKU+".png"; //goodie
      else if (i>=LTopStart && i<=LTopEnd) imgName+="T_"+genderName+"_"+objSKU+".png"; //top
      else imgName+=layerName+genderName+objSKU+".png"; //body


      scp.push(loadImage(imgName,loadingImg));
    }
    
    console.log(i+" : "+imgName);
    
  }

}







function draw(){
  //loadPeep();
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
   showPeep();
}


let lastPressedTime=0;

function mousePressed(){

  /// fix Chrome's double trigger bug for mobile
  
  let date = new Date();
  let currPressedTime=date.getTime();
  let diff=currPressedTime-lastPressedTime;
  console.log("mousePressed---------------------- "+random(1)+" diff:"+diff);

  if (diff>200) {
      lastPressedTime=currPressedTime;
      currTopTotal--;
      if (currTopTotal<1) currTopTotal=topTotal;

      showPeep();

      console.log(event);
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
          
          ]
  },
  
  {
  "layer":"face",
  "clothes":[
          {"sku":"0" },
          {"sku":"1" },
          {"sku":"2" },
          {"sku":"3" },
          {"sku":"4" },
          {"sku":"5" },
          {"sku":"6" },
          {"sku":"7" },
          {"sku":"8" },
          {"sku":"9" },
          {"sku":"10" },
          {"sku":"11" },
          ]
  
  },


  {
      "layer":"0 bra F",
      "clothes":[
                 {"sku":"0","g":1,"color":1,"name":"Bra","rank":"FREE"},
                 {"sku":"1","g":1,"color":1,"name":"Bra","rank":"coolpack"},
                 {"sku":"2","g":1,"color":1,"name":"Bra","rank":"FREE"},
                 {"sku":"3","g":1,"color":1,"name":"Bra","rank":"coolpack"},
                 {"sku":"4","g":1,"color":1,"name":"Bra","rank":"coolpack"},
                 {"sku":"5","g":1,"color":1,"name":"Bra","rank":"coolpack"},
                 {"sku":"6","g":1,"color":1,"name":"Bra","rank":"coolpack"},
                 {"sku":"7","g":1,"color":1,"name":"Bra","rank":"coolpack"},
                 {"sku":"8","g":1,"color":0,"name":"Bra","rank":"coolpack"},
                 {"sku":"9","g":1,"color":1,"name":"Bra","rank":"coolpack"},
                 {"sku":"10","g":1,"color":1,"name":"Bra","rank":"coolpack","party":"basic"},
                 {"sku":"63","g":1,"color":0,"name":"Bra","rank":"coolpack"},
                 ]
  },

  {
      "layer":"1 innerwear F",
      "clothes":[

                 {"sku":"12","g":1,"color":1,"name":"tee","rank":"FREE"},
                 {"sku":"13","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"14","g":1,"color":1,"name":"tee","rank":"FREE"},
                 {"sku":"15","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"16","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"17","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"18","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"19","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"20","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"21","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"22","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"23","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"24","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"25","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"26","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"27","g":2,"color":1,"name":"shirt","rank":"coolpack"},
                 {"sku":"28","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"29","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"30","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"31","g":2,"color":1,"name":"shirt","rank":"coolpack"},
                 {"sku":"32","g":2,"color":1,"name":"shirt","rank":"coolpack"},
                 {"sku":"34","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"35","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"36","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"37","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"38","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"40","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"41","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"43","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"45","g":1,"color":0,"name":"tee","rank":"coolpack"},
                 {"sku":"64","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"49","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"133","g":1,"color":1,"name":"flash tee","rank":"FREE","scan":"QR_supercoolstyle"},
                 {"sku":"135","name":"Jourden Navy Paws Bralette","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"136","name":"Jourden Black Bralette With Bubble Gum Eyelets","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"137","name":"Jourden Red Bralette With Robin Egg Eyelets","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 
                 {"sku":"150","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
                 
                 
                 {"sku":"179","g":1,"color":0,"name":"Kate Spade New York Metallic Top","rank":"brn_fw","scan":"brn_fw"},
                 
                 
                 
                 
                 
                 {"sku":"165","g":1,"color":0,"name":"Comme Des Garcons PLAY Emblem Pastel Stripes","rank":"brn_fw","scan":"brn_fw"},
                 
                

                 
                 ]
      },
      
      
      {
      "layer":"F 2 shirt",
      "clothes":[
                 {"sku":"47","g":2,"color":1,"name":"tee","rank":"FREE"},
                 {"sku":"51","g":3,"color":1,"name":"tee","rank":"FREE"},
                 {"sku":"52","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"53","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"54","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"55","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"56","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"57","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"58","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"59","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"60","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"61","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"62","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"107","g":2,"color":1,"name":"shirt","rank":"coolpack"},
                 
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
      "layer":"F 3 jacket",
      "clothes":[
                 {"sku":"65","g":3,"color":1,"name":"tee","rank":"FREE"},
                 {"sku":"66","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"67","g":3,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"68","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"69","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"70","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"71","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"72","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"73","g":3,"color":0,"name":"tee","rank":"coolpack"},
                 {"sku":"74","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"75","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"76","g":3,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"77","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"78","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"108","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"109","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"110","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"111","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"112","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"113","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"114","g":1,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"115","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"132","g":1,"color":0,"name":"leopard tee","rank":"coolpack"},
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
               
                 
                 
                 
                 
                 ]
      },
      
      {
      "layer":"F 4",
      "clothes":[
                 {"sku":"79","g":2,"color":1,"name":"tee","rank":"FREE"},
                 {"sku":"80","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"81","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"82","g":3,"color":1,"name":"tee","rank":"coolpack"},
                 
                 
                 ]
      },
      
      {
      "layer":"F 5",
      "clothes":[
                 {"sku":"83","g":2,"color":1,"name":"tee","rank":"FREE"},
                 {"sku":"84","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"85","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"86","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"87","g":3,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"131","g":3,"color":0,"name":"leopard jacket","rank":"coolpack"},
                 ]
      },
      {
      "layer":"F 6",
      "clothes":[
                 {"sku":"93","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"95","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 
                 ]
      },
      
      {
      "layer":"F 7",
      "clothes":[
                 
                 {"sku":"98","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"99","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"100","g":2,"color":1,"name":"tee","rank":"coolpack"},

                 
                 ]
      },
      
      {
      "layer":"F 8",
      "clothes":[
                 {"sku":"101","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"116","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 ]
      },
      
     
      
      
      
      {
      "layer":"F 10 big scarf",
      "clothes":[
                 {"sku":"102","g":5,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"103","g":5,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"117","g":5,"color":1,"name":"tee","rank":"coolpack"},
                 ]
      },

  {
  "layer":"beard",
  "clothes":[
        {"sku":"0" },
        ]
  
  },
  
  {
  "layer":"hair",
  "clothes":[
          {"sku":"0" },
          {"sku":"1" },
          {"sku":"2" },
          {"sku":"3" },
          {"sku":"4" },
          {"sku":"5" },
          {"sku":"6" },
          {"sku":"7" },
          {"sku":"8" },
          {"sku":"9" },
          {"sku":"10" },
          {"sku":"11" },
          {"sku":"12" },
          {"sku":"13" },
          {"sku":"14" },
          {"sku":"15" },
          {"sku":"16" },
          {"sku":"17" },
          {"sku":"18" },
          {"sku":"19" },
          {"sku":"20" },
          {"sku":"21" },
          {"sku":"22" },
          {"sku":"23" },
          {"sku":"24" },
          {"sku":"25" },
          {"sku":"26" },
          {"sku":"27" },
          {"sku":"28" },
          {"sku":"29" },
          {"sku":"30" },
          {"sku":"31" },
          {"sku":"32" },
          {"sku":"33" },
          {"sku":"34" },
        ]
  
  },


  {
  "layer":"hairs",
  "clothes":[
          {"sku":"0" },
          {"sku":"1" },
          {"sku":"2" },
          {"sku":"3" },
          {"sku":"4" },
          {"sku":"5" },
          {"sku":"6" },
          {"sku":"7" },
          {"sku":"8" },
          {"sku":"9" },
          {"sku":"10" },
          {"sku":"11" },
          {"sku":"12" },
          {"sku":"13" },
          {"sku":"14" },
          {"sku":"15" },
          {"sku":"16" },
          {"sku":"17" },
          {"sku":"18" },
          {"sku":"19" },
          {"sku":"20" },
          {"sku":"21" },
          {"sku":"22" },
          {"sku":"23" },
          {"sku":"24" },
          {"sku":"25" },
          {"sku":"26" },
          {"sku":"27" },
          {"sku":"28" },
          {"sku":"29" },
          {"sku":"30" },
          {"sku":"31" },
          {"sku":"32" },
          {"sku":"33" },
          {"sku":"34" },
        ]
  
  },

    {
  "layer":"G",
  "clothes":[
             
             {"sku":"80","name":"hankerchief","g":1,"color":0,"rank":"FREE", "hide":1},
             {"name":"cig","g":1,"color":0,"sku":"1001","rank":"peep"},
             ]
  
  },
  
  
  {
  "layer":"G",
  "clothes":[
             {"name":"Trucker Cap","g":1,"color":1,"sku":"0","rank":"coolpack"},
             {"name":"Headdband","g":1,"color":1,"sku":"1","rank":"coolpack"},
             {"name":"Fedora","g":1,"color":1,"sku":"2","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"3","rank":"FREE"},
             {"name":"Beanie","g":1,"color":1,"sku":"4","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"5","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"6","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"7","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"8","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"9","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"10","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"11","rank":"FREE"},
             {"name":"Beanie","g":1,"color":1,"sku":"26","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"27","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"28","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"29","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"30","rank":"coolpack"},
             {"name":"panda","g":1,"color":0,"sku":"34","rank":"coolpack"},
             {"name":"headphones","g":1,"color":1,"sku":"36","rank":"coolpack"},
             {"name":"bike cap","g":1,"color":1,"sku":"42","rank":"coolpack"},
             {"name":"headband thin","g":1,"color":1,"sku":"47","rank":"coolpack"},
             {"name":"headband","g":1,"color":1,"sku":"48","rank":"coolpack"},
             {"name":"rabbit","g":1,"color":0,"sku":"49","rank":"coolpack"},
             {"name":"cat","g":1,"color":1,"sku":"50","rank":"coolpack"},
             {"name":"rat","g":1,"color":1,"sku":"51","rank":"coolpack"},
             {"name":"crown","g":1,"color":0,"sku":"37","rank":"prm_kingqueenpack"},
             ]
  
  },
  
  {
  "layer":"G",
  "clothes":[
             {"name":"3D","g":1,"color":0,"sku":"12","rank":"FREE"},
             {"name":"Glasses","g":1,"color":1,"sku":"13","rank":"coolpack"},
             {"name":"Sun-Glasses","g":1,"color":1,"sku":"14","rank":"coolpack"},
             {"name":"Rounded Frames","g":1,"color":1,"sku":"15","rank":"coolpack"},
             {"name":"Retro Frames","g":1,"color":1,"sku":"16","rank":"coolpack"},
             {"name":"Retro Frames color lens","g":1,"color":1,"sku":"33","rank":"coolpack"},
             {"name":"Rounded Shades","g":1,"color":1,"sku":"17","rank":"coolpack"},
             {"name":"Rounded Shades","g":1,"color":1,"sku":"31","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"18","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"19","rank":"FREE"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"20","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"21","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"22","rank":"coolpack"}, 
             {"name":"Cool Shades","g":1,"color":1,"sku":"23","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"32","rank":"coolpack"},
             {"name":"eye patch","g":1,"color":0,"sku":"62","rank":"coolpack"},
             {"name":"horse head","g":1,"color":0,"sku":"63","rank":"prm_animalmaskpack"},
             {"name":"pigeon head","g":1,"color":0,"sku":"64","rank":"prm_animalmaskpack"},
             {"name":"rabbit head","g":1,"color":0,"sku":"65","rank":"prm_animalmaskpack"},
             {"name":"panda head","g":1,"color":0,"sku":"66","rank":"prm_animalmaskpack"},
             {"name":"horse white head","g":1,"color":0,"sku":"67","rank":"coolpack"},
             {"name":"laser","g":1,"color":0,"sku":"1000","rank":"peep"},
             ]
  
  },
  
  {
  "layer":"G",
  "clothes":[
             {"sku":"78","name":"necklace short","g":1,"color":0,"rank":"coolpack"},
             {"sku":"79","name":"necklace long","g":1,"color":0,"rank":"coolpack"},
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
          
          ]
  },
  
  {
  "layer":"face",
  "clothes":[
          {"sku":"0" },
          {"sku":"1" },
          {"sku":"2" },
          {"sku":"3" },
          {"sku":"4" },
          {"sku":"5" },
          {"sku":"6" },
          {"sku":"7" },
          {"sku":"8" },
          {"sku":"9" },
          {"sku":"10" },
          {"sku":"11" },
          ]
  
  },



  {
  "layer":"M 0 underwear",
  "clothes":[
             {"sku":"0","g":1,"color":1,"name":"Tank Top","rank":"coolpack"},
             {"sku":"1","g":1,"color":1,"name":"Inner Tee","rank":"coolpack"},
             {"sku":"2","g":1,"color":1,"name":"Long tank top","rank":"coolpack"},
             {"sku":"3","g":1,"color":1,"name":"long sleeved","rank":"FREE"},
             {"sku":"4","g":1,"color":1,"name":"short shoulder","rank":"coolpack"},
             {"sku":"5","g":1,"color":1,"name":"Mid length","rank":"coolpack"},
             {"sku":"6","g":1,"color":1,"name":"Stripes Tank","rank":"coolpack"},
             {"sku":"7","g":1,"color":1,"name":"Dots Tank","rank":"coolpack"},
             {"sku":"8","g":1,"color":1,"name":"Stripes long","rank":"coolpack"},
             {"sku":"9","g":1,"color":1,"name":"Dots Tee","rank":"coolpack"},
             {"sku":"10","g":1,"color":1,"name":"Turtle neck","rank":"coolpack"},
             {"sku":"11","g":1,"color":1,"name":"Sports Tank","rank":"coolpack"},
            
             ]
  
  },
  
  {
  "layer":"M 1",
  "clothes":[
             {"name":"Tee","g":1,"color":1,"sku":"12","rank":"FREE"},
             {"name":"V-neck Tee","g":1,"color":1,"sku":"13","rank":"coolpack"},
             {"name":"Pocket Tee","g":1,"color":1,"sku":"14","rank":"coolpack"},
             {"name":"Stripes Tee","g":1,"color":1,"sku":"15","rank":"coolpack"},
             {"name":"Vest","g":2,"color":1,"sku":"16","rank":"coolpack"},
             {"name":"Long Tee","g":1,"color":1,"sku":"17","rank":"coolpack"},
             {"name":"Polo","g":1,"color":1,"sku":"18","rank":"FREE"},
             {"name":"Ash Polo","g":1,"color":1,"sku":"19","rank":"coolpack"},
             {"name":"Fred Perry","g":1,"color":1,"sku":"20","rank":"coolpack"},
             {"name":"Two tone tee","g":1,"color":1,"sku":"21","rank":"coolpack"},
             {"name":"Thick stripes","g":1,"color":1,"sku":"22","rank":"coolpack"},
             {"name":"Circle Tee","g":1,"color":1,"sku":"23","rank":"coolpack"},
             {"name":"Three color Polo","g":1,"color":0,"sku":"24","rank":"coolpack"},
             {"name":"db-db Tee","g":1,"color":1,"sku":"25","rank":"FREE"},
             {"name":"MIT Tee","g":1,"color":1,"sku":"26","rank":"coolpack"},
             {"name":"flash tee","g":1,"color":1,"sku":"118","rank":"FREE", "scan":"QR_supercoolstyle"},
             
             ]
  
  },
  
  {
  "layer":"M 2 shirts",
  "clothes":[
             {"name":"Shirt","g":2,"color":1,"sku":"27","rank":"FREE"},
             {"name":"Denim Shirt","g":2,"color":0,"sku":"28","rank":"coolpack"},
             {"name":"Cardigan","g":2,"color":1,"sku":"29","rank":"coolpack"},
             {"name":"Long Sleeved Tee","g":1,"color":1,"sku":"30","rank":"FREE"},
             {"name":"Shirt","g":2,"color":1,"sku":"31","rank":"coolpack"},
             {"name":"Oxford shirt","g":2,"color":1,"sku":"32","rank":"coolpack"},
             {"name":"Denim shirt special","g":2,"color":0,"sku":"33","rank":"coolpack"},
             {"name":"checkered shirt","g":2,"color":1,"sku":"34","rank":"coolpack"},
             {"name":"checkered shirt two","g":2,"color":1,"sku":"35","rank":"coolpack"},
             {"name":"Stripes shirt","g":2,"color":1,"sku":"36","rank":"coolpack"},
             {"name":"Two tone shirt","g":2,"color":1,"sku":"37","rank":"coolpack"},
             {"name":"Two tone shirt","g":2,"color":1,"sku":"38","rank":"coolpack"},
             {"name":"Two tone shirt","g":2,"color":1,"sku":"39","rank":"coolpack"},
             {"name":"Open shirt","g":2,"color":1,"sku":"40","rank":"coolpack"},
             {"name":"Short sleeved shirt","g":2,"color":1,"sku":"41","rank":"coolpack"},
             {"name":"Stripes long sleeved tee","g":1,"color":0,"sku":"42","rank":"coolpack"},
             {"name":"Cardigan ","g":2,"color":1,"sku":"43","rank":"coolpack"},
             {"sku":"131","g":1,"color":0,"name":"Comme Des Garcons PLAY Emblem Pastel Stripes","rank":"brn_fw","scan":"brn_fw"},
             ]
  
  },
  
  {
  "layer":"3 ties",
  "clothes":[
             {"name":"Tie","g":5,"color":1,"sku":"60","rank":"coolpack"},
             {"name":"Bowtie big","g":5,"color":1,"sku":"104","rank":"coolpack"},
             {"name":"Bowtie small","g":5,"color":1,"sku":"105","rank":"coolpack"},
             ]
   
  },
  
  
  
  {
  "layer":"4",
  "clothes":[
             {"name":"Dark jacket","g":2,"color":1,"sku":"44","rank":"coolpack"},
             {"name":"Big Tee","g":1,"color":1,"sku":"45","rank":"coolpack"},
             {"name":"Mid Tee","g":1,"color":1,"sku":"46","rank":"coolpack"},
             {"name":"Sweatshirt","g":1,"color":0,"sku":"47","rank":"FREE"},
             {"name":"Hoodie","g":3,"color":1,"sku":"48","rank":"coolpack"},
             {"name":"Open Hoodie","g":3,"color":1,"sku":"49","rank":"coolpack"},
             {"name":"Blazer","g":2,"color":1,"sku":"50","rank":"coolpack"},
             {"name":"Sports sweatshirt","g":1,"color":0,"sku":"51","rank":"coolpack"},
             {"name":"Knitted vest","g":1,"color":1,"sku":"52","rank":"coolpack"},
             {"name":"Large vest","g":2,"color":1,"sku":"53","rank":"coolpack"},
             {"name":"Hood shirt","g":1,"color":1,"sku":"54","rank":"coolpack"},
             {"name":"Vneck sweater","g":1,"color":0,"sku":"55","rank":"coolpack"},
             {"name":"cardigan long","g":2,"color":1,"sku":"56","rank":"coolpack"},
             {"name":"thick cardigan","g":2,"color":1,"sku":"57","rank":"coolpack"},
             {"name":"wide cardigan","g":2,"color":1,"sku":"58","rank":"coolpack"},
             {"name":"MIT Sweatshirt","g":1,"color":0,"sku":"59","rank":"coolpack"},
              {"sku":"132","g":2,"color":0,"name":"Comme Des Garcons PLAY Cardigan","rank":"brn_fw","scan":"brn_fw"},
             ]
  
  },
  
  {
  "layer":"5",
  "clothes":[
             {"name":"School Jacket","g":2,"color":1,"sku":"62","rank":"FREE"},
             {"name":"Long blazer","g":2,"color":1,"sku":"63","rank":"coolpack"},
             {"name":"Long camo","g":2,"color":0,"sku":"64","rank":"coolpack"},
             {"name":"Denim Jacket","g":2,"color":0,"sku":"65","rank":"coolpack"},
             {"name":"Tight Jacket","g":2,"color":1,"sku":"66","rank":"coolpack"},
             {"name":"Coat","g":2,"color":1,"sku":"67","rank":"coolpack"},
             {"name":"Leather Jacket","g":3,"color":1,"sku":"68","rank":"coolpack"},
             {"name":"Two tone","g":2,"color":1,"sku":"69","rank":"coolpack"},
             {"name":"Double","g":2,"color":1,"sku":"70","rank":"coolpack"},
             {"name":"Sweater","g":1,"color":1,"sku":"71","rank":"coolpack"},
             {"name":"Patterned Sweater","g":1,"color":1,"sku":"72","rank":"coolpack"},
             {"name":"Pocket Sweater","g":1,"color":1,"sku":"73","rank":"coolpack"},
             
             ]
  
  },
  
  {
  "layer":"6",
  "clothes":[
             {"name":"Coat","g":2,"color":1,"sku":"74","rank":"coolpack"},
             {"name":"Coat Camel","g":2,"color":0,"sku":"75","rank":"coolpack"},
             {"name":"Big Coat","g":2,"color":1,"sku":"76","rank":"coolpack"},
             {"name":"Trench Coat","g":2,"color":1,"sku":"77","rank":"coolpack"},
             {"name":"Big F Sweater","g":1,"color":1,"sku":"78","rank":"FREE"},
             {"name":"Checkered Jacket","g":3,"color":1,"sku":"79","rank":"coolpack"},
             {"name":"Baseball Jacket","g":2,"color":1,"sku":"80","rank":"coolpack"},
             {"name":"Military Jacket","g":2,"color":1,"sku":"81","rank":"coolpack"},
             {"name":"Pattern sweater","g":1,"color":1,"sku":"82","rank":"coolpack"},
             {"name":"Dots sweater","g":1,"color":1,"sku":"83","rank":"coolpack"},
             ]
  
  },
  
  {
  "layer":"7M",
  "clothes":[
             {"name":"Jumper","g":1,"color":1,"sku":"84","rank":"coolpack"},
             {"name":"Stripes knit","g":1,"color":1,"sku":"85","rank":"coolpack"},
             {"name":"Camo Jumper","g":1,"color":0,"sku":"86","rank":"coolpack"},
             {"name":"Flash Jumper","g":1,"color":1,"sku":"87","rank":"coolpack"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"88","rank":"coolpack"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"89","rank":"coolpack"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"90","rank":"coolpack"},

             ]
  
  },
  

  {
  "layer":"8",
  "clothes":[
             {"name":"Down vest","g":3,"color":1,"sku":"93","rank":"coolpack"},
             {"name":"Outdoor Jacket","g":3,"color":1,"sku":"94","rank":"coolpack"},
             {"name":"Outdoor Jacket","g":3,"color":0,"sku":"95","rank":"FREE"},
             {"name":"Outdoor Jacket Camo","g":3,"color":0,"sku":"96","rank":"coolpack"},
             {"name":"Down Jacket","g":3,"color":1,"sku":"97","rank":"coolpack"},
             {"name":"Down Jacket Golden","g":3,"color":0,"sku":"98","rank":"coolpack"},
             {"name":"Big coat","g":2,"color":1,"sku":"99","rank":"coolpack"},
             ]
  
  },
  
  
  {
  "layer":"10 big scarf",
  "clothes":[
             {"name":"Scarf------------","g":5,"color":1,"sku":"100","rank":"coolpack"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"101","rank":"coolpack"},
             {"name":"Scarf------------","g":5,"color":1,"sku":"102","rank":"coolpack"},
             {"name":"Scarf camo------------","g":5,"color":0,"sku":"103","rank":"coolpack"},
             ]
  
  },


  {
  "layer":"beard",
  "clothes":[
          {"sku":"0" },
          {"sku":"1" },
          {"sku":"2" },
          {"sku":"3" },
          {"sku":"4" },
          {"sku":"5" },
          {"sku":"6" },
          {"sku":"7" },
          {"sku":"8" },
          {"sku":"9" },
          {"sku":"10" },
          {"sku":"11" },
          {"sku":"12" },
          {"sku":"13" },
          {"sku":"14" },
          {"sku":"15" },
          {"sku":"16" },
          {"sku":"19" },
          {"sku":"20" },
          {"sku":"21" },
          {"sku":"22" },
          {"sku":"23" },
          {"sku":"24" },
          {"sku":"25" },
          {"sku":"26" },
          {"sku":"27" },
          ]
  
  },

  
  {
  "layer":"hair",
  "clothes":[
          {"sku":"0" },
          {"sku":"1" },
          {"sku":"2" },
          {"sku":"3" },
          {"sku":"4" },
          {"sku":"5" },
          {"sku":"7" },
          {"sku":"8" },
          {"sku":"9" },
          {"sku":"10" },
          {"sku":"11" },
          {"sku":"12" },
          {"sku":"13" },
          {"sku":"14" },
          {"sku":"15" },
          {"sku":"16" },
          {"sku":"17" },
          {"sku":"18" },
          {"sku":"19" },
          {"sku":"20" },
          {"sku":"21" },
          {"sku":"22" },
          {"sku":"23" },
          {"sku":"24" },
          {"sku":"25" },
          {"sku":"26" },
          {"sku":"27" },
          {"sku":"28" },
          {"sku":"29" },
          {"sku":"30" },
          {"sku":"31" },
          {"sku":"32" },
          {"sku":"33" },
          {"sku":"34" },
          ]
  
  },

  {
  "layer":"hairs",
  "clothes":[
          {"sku":"0" },
          {"sku":"1" },
          {"sku":"2" },
          {"sku":"3" },
          {"sku":"4" },
          {"sku":"5" },
          {"sku":"7" },
          {"sku":"8" },
          {"sku":"9" },
          {"sku":"10" },
          {"sku":"11" },
          {"sku":"12" },
          {"sku":"13" },
          {"sku":"14" },
          {"sku":"15" },
          {"sku":"16" },
          {"sku":"17" },
          {"sku":"18" },
          {"sku":"19" },
          {"sku":"20" },
          {"sku":"21" },
          {"sku":"22" },
          {"sku":"23" },
          {"sku":"24" },
          {"sku":"25" },
          {"sku":"26" },
          {"sku":"27" },
          {"sku":"28" },
          {"sku":"29" },
          {"sku":"30" },
          {"sku":"31" },
          {"sku":"32" },
          {"sku":"33" },
          {"sku":"34" },
          ]
  
  },


  {
  "layer":"G",
  "clothes":[
            
             {"sku":"64","name":"gas mask","g":1,"color":0,"rank":"coolpack"},
             {"sku":"75","name":"hankerchief","g":1,"color":0,"rank":"FREE", "hide":1},
             {"name":"cig","g":1,"color":0,"sku":"1001","rank":"peep"},
             ]
  
  },
  
  
  {
  "layer":"G",
  "clothes":[
             {"name":"Trucker Cap","g":1,"color":1,"sku":"0","rank":"coolpack"},
             {"name":"FL Cap","g":1,"color":1,"sku":"1","rank":"FREE"},
             {"name":"Fedora","g":1,"color":1,"sku":"2","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"3","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"4","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"5","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"6","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"7","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"8","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"9","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"10","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"11","rank":"FREE"},
             {"name":"Beanie","g":1,"color":1,"sku":"26","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"27","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"28","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"29","rank":"coolpack"},
             {"name":"Beanie","g":1,"color":1,"sku":"30","rank":"coolpack"},
             {"name":"headphones","g":1,"color":1,"sku":"36","rank":"coolpack"},
             {"name":"bike cap","g":1,"color":1,"sku":"42","rank":"coolpack"},
             {"name":"headband","g":1,"color":1,"sku":"46","rank":"FREE"},
             {"name":"headband","g":1,"color":1,"sku":"47","rank":"coolpack"},
             ]
  
  },
  
  {
  "layer":"G",
  "clothes":[
             {"name":"3D","g":1,"color":0,"sku":"12","rank":"FREE"},
             {"name":"Glasses","g":1,"color":1,"sku":"13","rank":"coolpack"},
             {"name":"Sun-Glasses","g":1,"color":1,"sku":"14","rank":"coolpack"},
             {"name":"Rounded Frames","g":1,"color":1,"sku":"15","rank":"coolpack"},
             {"name":"Retro Frames","g":1,"color":1,"sku":"16","rank":"coolpack"},
             {"name":"Retro Frames color lens","g":1,"color":1,"sku":"33","rank":"coolpack"},
             {"name":"Rounded Shades","g":1,"color":1,"sku":"17","rank":"coolpack"},
             {"name":"Rounded Shades","g":1,"color":1,"sku":"31","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"18","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"19","rank":"FREE"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"20","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"21","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"22","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"23","rank":"coolpack"},
             {"name":"Cool Shades","g":1,"color":1,"sku":"32","rank":"coolpack"},
             {"name":"eye patch","g":1,"color":0,"sku":"57","rank":"coolpack"},
             {"name":"horse head","g":1,"color":0,"sku":"58","rank":"prm_animalmaskpack"},
             {"name":"pigeon head","g":1,"color":0,"sku":"59","rank":"prm_animalmaskpack"},
             {"name":"rabbit head","g":1,"color":0,"sku":"60","rank":"prm_animalmaskpack"},
             {"name":"panda head","g":1,"color":0,"sku":"61","rank":"prm_animalmaskpack"},
             {"name":"horse white head","g":1,"color":0,"sku":"62","rank":"coolpack"},
             {"name":"laser","g":1,"color":0,"sku":"1000","rank":"peep"},

             ]
  
  },
  
  {
  "layer":"G",
  "clothes":[
             
             {"sku":"73","name":"necklace short","g":1,"color":0,"rank":"coolpack"},
             {"sku":"74","name":"necklace long","g":1,"color":0,"rank":"coolpack"},
             
            

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
