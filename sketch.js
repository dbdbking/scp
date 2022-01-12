////////// Super Cool Peeps 2021
////////// By db-db
console.log("-----  Super Cool Peeps 2021 v0----");
let isDebug=1;

let seed=document.URL.split('?s=')[1];
if (!seed) { 
  if (!isDebug && !htmlMsg.length) document.getElementById("intro").style.display = "block";
  seed="intro";
}

console.log("seed:"+seed+" length:"+seed.length+" htmlMsg:"+htmlMsg);




///scp init///
let scp=[];
let itemID=[];
let wardrobe=[[],[]];
let transImg;
let imgLoaded=0;
let isLoadingImg=false;



const oW=80, oH=142;

let genderID=1;
let totalLayers;




function preload(){

  //preloadFrames();
  fsBut = loadImage("lib/fs.png");

  ///preloading all wardrobe
  transImg = loadImage("lib/scp/trans.png");




  


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

function loadPeep(){

  if (isLoadingImg){
    console.log("can't load.-------------------------------------------..");
    return;
  }

  isLoadingImg=true;

  ////////////////// refresh scp
  let temp=scp.length;
  for (let i=0; i<temp; i++) scp.pop();

  genderID = Math.floor(random(2));
  //genderID=0;
  totalLayers = wdb[genderID].data.length;
  /// 4 + 11 + 2+ 4 , total: 21 layers (0-20)
  /// body (0) + head (1) + face (2) + beard (3) + 11 clothes (4-14) + 2 hairs (15,16) + 4 goodies (17+20) 
  let topTotal=Math.floor(random(12));


  console.log("in loadPeep totalLayers:"+totalLayers+ " gender:"+genderID + "total Top:"+topTotal);
 
  

  for (let i=0; i<totalLayers; i++) {

    let genderName = wdb[genderID].gender;
    let layerName = wdb[genderID].data[i].layer;
    let objTotal = wdb[genderID].data[i].clothes.length;
    let objSKU=-1;
    let imgName="lib/scp_new/textureNumen/";
    let objID;

   

    let r=random(1);
    console.log(r);

   
    if ((i>=4 && i<=14) && (i-4>=topTotal)){ //tops
       imgName+="trans.png";
    }
    else if ((i>=17 && i<=20) && (r<0.9) ) { //goodie
      imgName+="trans.png";
    }
    else 
    if (objTotal>0) { 
      objID=Math.floor(random(objTotal));
      objSKU=wdb[genderID].data[i].clothes[objID].sku;
      let color= wdb[genderID].data[i].clothes[objID].color
      if (layerName=="hairs") imgName+="hair"+genderName+objSKU+"s.png"; //hairSSSS
      else if (layerName=="G") imgName+="G_"+genderName+"_"+objSKU+".png"; //goodie
      else if (color!=undefined) imgName+="T_"+genderName+"_"+objSKU+".png"; //top
      else imgName+=layerName+genderName+objSKU+".png"; //body
    } else 
      imgName+="trans.png";
    


    console.log(i+" : "+imgName);
    scp.push(loadImage(imgName,loadingImg));
  }

}



function showPeep(){
  background(200);
   let pScale=1.0; //2.6;
  let manWidth=pScale*width;
  let manScale=manWidth/oW;
for (let i=0; i<totalLayers; i++) {

   scp[i].pixelate(int(manWidth),int(manWidth*oH/oW));
    image(scp[i],int(width/2-1*manScale),int(height+(8+3*(genderID))*manScale));
  }
   
}



function draw(){
  //loadPeep();
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  //displaySCP();
}

function mousePressed() {


  loadPeep();
}


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
          {"sku":"0","s":0,"name":""},
          {"sku":"1","s":0,"name":""},
          {"sku":"2","s":0,"name":""},
          {"sku":"3","s":0,"name":""},
          {"sku":"4","s":0,"name":""},
          {"sku":"5","s":0,"name":""},
          {"sku":"6","s":0,"name":""},
          {"sku":"7","s":0,"name":""},
          {"sku":"8","s":0,"name":""},
          {"sku":"9","s":0,"name":""},
          {"sku":"10","s":0,"name":""},
          {"sku":"11","s":0,"name":""},
          ]
  
  },


  {
  "layer":"beard",
  "clothes":[
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
                 {"sku":"8","g":1,"color":1,"name":"Bra","rank":"coolpack"},
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
                 {"sku":"149","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
                 {"sku":"150","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
                 
                 
                 {"sku":"179","g":1,"color":0,"name":"Kate Spade New York Metallic Top","rank":"brn_fw","scan":"brn_fw"},
                 
                 
                 {"sku":"174","g":1,"color":0,"name":"Hysteric Glamour","rank":"brn_fw","scan":"brn_fw"},
                 
                 
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
                 
                 {"sku":"151","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
                 {"sku":"152","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
                 {"sku":"153","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
                 {"sku":"154","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
                 {"sku":"155","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
                 {"sku":"156","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
                 {"sku":"157","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
                 {"sku":"158","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
                 {"sku":"159","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
                 {"sku":"160","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
                 {"sku":"161","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
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
                 {"sku":"138","name":"Jourden Navy Varsity Box Tee","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"139","name":"Jourden White Varsity Box Tee","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"140","name":"Jourden Yellow Tee With Black Ring","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"141","name":"Jourden Black Tee With Bubble Gum Eyelets","g":1,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 {"sku":"148","name":"Jourden Black Hunter Jacket With Bubble Gum Eyelets","g":2,"color":0,"rank":"brn_jourden","party":"jourden","scan":"brn_jourden"},
                 
                 {"sku":"180","g":3,"color":0,"name":"LIGER","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"181","g":3,"color":0,"name":"LIGER","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"182","g":3,"color":0,"name":"LIGER","rank":"brn_fw","scan":"brn_fw"},
                 
                 {"sku":"178","g":1,"color":0,"name":"Kate Spade New York Virginia Lace Dress","rank":"brn_fw","scan":"brn_fw"},
                 
                 {"sku":"175","g":1,"color":0,"name":"Hysteric Glamour","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"176","g":1,"color":0,"name":"Hysteric Glamour","rank":"brn_fw","scan":"brn_fw"},
                 
                 
                 {"sku":"171","g":1,"color":0,"name":"H&M Ladies Top","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"172","g":1,"color":0,"name":"H&M Ladies Top","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"173","g":1,"color":0,"name":"H&M Ladies Dress","rank":"brn_fw","scan":"brn_fw"},
                 
                 {"sku":"168","g":1,"color":0,"name":"FRAPBOIS","rank":"brn_fw","scan":"brn_fw"},
                 {"sku":"169","g":1,"color":0,"name":"FRAPBOIS","rank":"brn_fw","scan":"brn_fw"},
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
                 {"sku":"94","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 {"sku":"95","g":2,"color":1,"name":"tee","rank":"coolpack"},
                 
                 ]
      },
      
      {
      "layer":"F 7",
      "clothes":[
                 {"sku":"97","g":2,"color":1,"name":"tee","rank":"coolpack"},
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
      "layer":"F 9 gadgets",
      "clothes":[
                 {"sku":"118","g":1,"color":0,"name":"cam","rank":"prm_photographerpack"},
                 {"sku":"119","g":1,"color":0,"name":"cam","rank":"prm_photographerpack"},
                 {"sku":"120","g":1,"color":1,"name":"cam","rank":"prm_photographerpack"},
                 {"sku":"121","g":1,"color":0,"name":"cam","rank":"prm_photographerpack"},
                 {"sku":"122","g":1,"color":0,"name":"cam","rank":"coolpack"},
                 {"sku":"123","g":1,"color":0,"name":"guitar","rank":"coolpack"},
                 {"sku":"124","g":1,"color":0,"name":"guitar","rank":"prm_musicianpack"},
                 {"sku":"125","g":1,"color":1,"name":"guitar","rank":"prm_musicianpack"},
                 {"sku":"126","g":1,"color":1,"name":"guitar","rank":"prm_musicianpack"},
                 {"sku":"127","g":1,"color":0,"name":"gibson guitar","rank":"prm_musicianpack"},
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
  "layer":"hair",
  "clothes":[
          {"sku":"0","s":0,"name":""},
          {"sku":"1","s":0,"name":""},
          {"sku":"2","s":0,"name":""},
          {"sku":"3","s":0,"name":""},
          {"sku":"4","s":0,"name":""},
          {"sku":"5","s":0,"name":""},
          {"sku":"6","s":0,"name":""},
          {"sku":"7","s":0,"name":""},
          {"sku":"8","s":0,"name":""},
          {"sku":"9","s":0,"name":""},
          {"sku":"10","s":0,"name":""},
          {"sku":"11","s":0,"name":""},
          {"sku":"12","s":0,"name":""},
          {"sku":"13","s":0,"name":""},
          {"sku":"14","s":0,"name":""},
          {"sku":"15","s":0,"name":""},
          {"sku":"16","s":0,"name":""},
          {"sku":"17","s":0,"name":""},
          {"sku":"18","s":0,"name":""},
          {"sku":"19","s":0,"name":""},
          {"sku":"20","s":0,"name":""},
          {"sku":"21","s":0,"name":""},
          {"sku":"22","s":0,"name":""},
          {"sku":"23","s":0,"name":""},
          {"sku":"24","s":0,"name":""},
          {"sku":"25","s":0,"name":""},
          {"sku":"26","s":0,"name":""},
          {"sku":"27","s":0,"name":""},
          {"sku":"28","s":0,"name":""},
          {"sku":"29","s":0,"name":""},
          {"sku":"30","s":0,"name":""},
          {"sku":"31","s":0,"name":""},
          {"sku":"32","s":0,"name":""},
          {"sku":"33","s":0,"name":""},
        ]
  
  },


  {
  "layer":"hairs",
  "clothes":[
          {"sku":"0","s":0,"name":""},
          {"sku":"1","s":0,"name":""},
          {"sku":"2","s":0,"name":""},
          {"sku":"3","s":0,"name":""},
          {"sku":"4","s":0,"name":""},
          {"sku":"5","s":0,"name":""},
          {"sku":"6","s":0,"name":""},
          {"sku":"7","s":0,"name":""},
          {"sku":"8","s":0,"name":""},
          {"sku":"9","s":0,"name":""},
          {"sku":"10","s":0,"name":""},
          {"sku":"11","s":0,"name":""},
          {"sku":"12","s":0,"name":""},
          {"sku":"13","s":0,"name":""},
          {"sku":"14","s":0,"name":""},
          {"sku":"15","s":0,"name":""},
          {"sku":"16","s":0,"name":""},
          {"sku":"17","s":0,"name":""},
          {"sku":"18","s":0,"name":""},
          {"sku":"19","s":0,"name":""},
          {"sku":"20","s":0,"name":""},
          {"sku":"21","s":0,"name":""},
          {"sku":"22","s":0,"name":""},
          {"sku":"23","s":0,"name":""},
          {"sku":"24","s":0,"name":""},
          {"sku":"25","s":0,"name":""},
          {"sku":"26","s":0,"name":""},
          {"sku":"27","s":0,"name":""},
          {"sku":"28","s":0,"name":""},
          {"sku":"29","s":0,"name":""},
          {"sku":"30","s":0,"name":""},
          {"sku":"31","s":0,"name":""},
          {"sku":"32","s":0,"name":""},
          {"sku":"33","s":0,"name":""},
        ]
  
  },

    {
  "layer":"G",
  "clothes":[
             {"sku":"43","name":"mask","g":1,"color":1,"rank":"FREE"},
             {"sku":"69","name":"gas mask","g":1,"color":0,"rank":"coolpack"},
             {"sku":"80","name":"hankerchief","g":1,"color":0,"rank":"FREE", "hide":1},
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
             {"name":"xmas","g":1,"color":0,"sku":"35","rank":"FREE"},
             {"name":"headphones","g":1,"color":1,"sku":"36","rank":"coolpack"},
             {"name":"bike cap","g":1,"color":1,"sku":"42","rank":"coolpack"},
             {"name":"headband thin","g":1,"color":1,"sku":"47","rank":"coolpack"},
             {"name":"headband","g":1,"color":1,"sku":"48","rank":"coolpack"},
             {"name":"rabbit","g":1,"color":1,"sku":"49","rank":"coolpack"},
             {"name":"cat","g":1,"color":1,"sku":"50","rank":"coolpack"},
             {"name":"rat","g":1,"color":1,"sku":"51","rank":"coolpack"},
             {"name":"antler","g":1,"color":1,"sku":"75","rank":"FREE"},
             
             {"name":"crown","g":1,"color":0,"sku":"37","rank":"prm_kingqueenpack"},
             {"sku":"85","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             {"sku":"87","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             
             ]
  
  },
  
  {
  "layer":"G",
  "clothes":[
             {"name":"Black Frames","g":1,"color":1,"sku":"12","rank":"FREE"},
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
             {"name":"eye patch","g":1,"color":1,"sku":"62","rank":"coolpack"},
             {"name":"horse head","g":1,"color":0,"sku":"63","rank":"prm_animalmaskpack"},
             {"name":"pigeon head","g":1,"color":0,"sku":"64","rank":"prm_animalmaskpack"},
             {"name":"rabbit head","g":1,"color":0,"sku":"65","rank":"prm_animalmaskpack"},
             {"name":"panda head","g":1,"color":0,"sku":"66","rank":"prm_animalmaskpack"},
             {"name":"horse white head","g":1,"color":0,"sku":"67","rank":"coolpack"},
            
             ]
  
  },
  
  {
  "layer":"G",
  "clothes":[
             {"sku":"78","name":"necklace short","g":1,"color":0,"rank":"coolpack"},
             {"sku":"79","name":"necklace long","g":1,"color":0,"rank":"coolpack"},
             
             {"sku":"100","g":1,"color":0,"name":"","rank":"coolpack"},
             
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
          {"sku":"0","s":0,"name":""},
          {"sku":"1","s":0,"name":""},
          {"sku":"2","s":0,"name":""},
          {"sku":"3","s":0,"name":""},
          {"sku":"4","s":0,"name":""},
          {"sku":"5","s":0,"name":""},
          {"sku":"6","s":0,"name":""},
          {"sku":"7","s":0,"name":""},
          {"sku":"8","s":0,"name":""},
          {"sku":"9","s":0,"name":""},
          {"sku":"10","s":0,"name":""},
          {"sku":"11","s":0,"name":""},
          ]
  
  },

  {
  "layer":"beard",
  "clothes":[
          {"sku":"0","s":0,"name":""},
          {"sku":"1","s":0,"name":""},
          {"sku":"2","s":0,"name":""},
          {"sku":"3","s":0,"name":""},
          {"sku":"4","s":0,"name":""},
          {"sku":"5","s":0,"name":""},
          {"sku":"6","s":0,"name":""},
          {"sku":"7","s":0,"name":""},
          {"sku":"8","s":0,"name":""},
          {"sku":"9","s":0,"name":""},
          {"sku":"10","s":0,"name":""},
          {"sku":"11","s":0,"name":""},
          {"sku":"12","s":0,"name":""},
          {"sku":"13","s":0,"name":""},
          {"sku":"14","s":0,"name":""},
          {"sku":"15","s":0,"name":""},
          {"sku":"16","s":0,"name":""},
          {"sku":"17","s":0,"name":""},
          {"sku":"18","s":0,"name":""},
          {"sku":"19","s":0,"name":""},
          {"sku":"20","s":0,"name":""},
          {"sku":"21","s":0,"name":""},
          {"sku":"22","s":0,"name":""},
          {"sku":"23","s":0,"name":""},
          {"sku":"24","s":0,"name":""},
          {"sku":"25","s":0,"name":""},
          {"sku":"26","s":0,"name":""},
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
             {"sku":"120","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
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
             {"sku":"121","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             {"sku":"122","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
             {"sku":"123","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             {"sku":"124","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             {"sku":"125","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
             {"sku":"126","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             {"sku":"127","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
             {"sku":"128","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
             {"sku":"129","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             {"sku":"130","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas","scan":"brn_adidas"},
             
             
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
             {"name":"Stripes long sleeved tee","g":1,"color":1,"sku":"42","rank":"coolpack"},
             {"name":"Cardigan ","g":2,"color":1,"sku":"43","rank":"coolpack"},
             
             {"sku":"131","g":1,"color":0,"name":"Comme Des Garcons PLAY Emblem Pastel Stripes","rank":"brn_fw","scan":"brn_fw"},
             ]
  
  },
  
  {
  "layer":"3 ties",
  "clothes":[
             {"name":"Tie","g":5,"color":1,"sku":"60","rank":"coolpack"},
             {"name":"Patterned Tie","g":5,"color":1,"sku":"61","rank":"coolpack"},
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
              {"sku":"133","g":2,"color":0,"name":"A|X LOGO PATCH NYLON BOMBER ABSOLUTE RED","rank":"brn_fw","scan":"brn_fw"},
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
  "layer":"9 gadgets",
  "clothes":[
             {"sku":"106","g":1,"color":0,"name":"cam","rank":"prm_photographerpack"},
             {"sku":"107","g":1,"color":0,"name":"cam","rank":"prm_photographerpack"},
             {"sku":"108","g":1,"color":1,"name":"cam","rank":"prm_photographerpack"},
             {"sku":"109","g":1,"color":0,"name":"cam","rank":"prm_photographerpack"},
             {"sku":"110","g":1,"color":0,"name":"cam","rank":"coolpack"},
             {"sku":"111","g":1,"color":0,"name":"guitar","rank":"coolpack"},
             {"sku":"112","g":1,"color":0,"name":"guitar","rank":"prm_musicianpack"},
             {"sku":"113","g":1,"color":1,"name":"guitar","rank":"prm_musicianpack"},
             {"sku":"114","g":1,"color":1,"name":"guitar","rank":"prm_musicianpack"},
             {"sku":"115","g":1,"color":0,"name":"gibson guitar","rank":"prm_musicianpack"},
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
  "layer":"hair",
  "clothes":[
          {"sku":"0","s":0,"name":""},
          {"sku":"1","s":0,"name":""},
          {"sku":"2","s":0,"name":""},
          {"sku":"3","s":0,"name":""},
          {"sku":"4","s":0,"name":""},
          {"sku":"5","s":0,"name":""},
          {"sku":"6","s":0,"name":""},
          {"sku":"7","s":0,"name":""},
          {"sku":"8","s":0,"name":""},
          {"sku":"9","s":0,"name":""},
          {"sku":"10","s":0,"name":""},
          {"sku":"11","s":0,"name":""},
          {"sku":"12","s":0,"name":""},
          {"sku":"13","s":0,"name":""},
          {"sku":"14","s":0,"name":""},
          {"sku":"15","s":0,"name":""},
          {"sku":"16","s":0,"name":""},
          {"sku":"17","s":0,"name":""},
          {"sku":"18","s":0,"name":""},
          {"sku":"19","s":0,"name":""},
          {"sku":"20","s":0,"name":""},
          {"sku":"21","s":0,"name":""},
          {"sku":"22","s":0,"name":""},
          {"sku":"23","s":0,"name":""},
          {"sku":"24","s":0,"name":""},
          {"sku":"25","s":0,"name":""},
          {"sku":"26","s":0,"name":""},
          {"sku":"27","s":0,"name":""},
          {"sku":"28","s":0,"name":""},
          {"sku":"29","s":0,"name":""},
          {"sku":"30","s":0,"name":""},
          {"sku":"31","s":0,"name":""},
          {"sku":"32","s":0,"name":""},
          {"sku":"33","s":0,"name":""},
          ]
  
  },

  {
  "layer":"hairs",
  "clothes":[
          {"sku":"0","s":0,"name":""},
          {"sku":"1","s":0,"name":""},
          {"sku":"2","s":0,"name":""},
          {"sku":"3","s":0,"name":""},
          {"sku":"4","s":0,"name":""},
          {"sku":"5","s":0,"name":""},
          {"sku":"6","s":0,"name":""},
          {"sku":"7","s":0,"name":""},
          {"sku":"8","s":0,"name":""},
          {"sku":"9","s":0,"name":""},
          {"sku":"10","s":0,"name":""},
          {"sku":"11","s":0,"name":""},
          {"sku":"12","s":0,"name":""},
          {"sku":"13","s":0,"name":""},
          {"sku":"14","s":0,"name":""},
          {"sku":"15","s":0,"name":""},
          {"sku":"16","s":0,"name":""},
          {"sku":"17","s":0,"name":""},
          {"sku":"18","s":0,"name":""},
          {"sku":"19","s":0,"name":""},
          {"sku":"20","s":0,"name":""},
          {"sku":"21","s":0,"name":""},
          {"sku":"22","s":0,"name":""},
          {"sku":"23","s":0,"name":""},
          {"sku":"24","s":0,"name":""},
          {"sku":"25","s":0,"name":""},
          {"sku":"26","s":0,"name":""},
          {"sku":"27","s":0,"name":""},
          {"sku":"28","s":0,"name":""},
          {"sku":"29","s":0,"name":""},
          {"sku":"30","s":0,"name":""},
          {"sku":"31","s":0,"name":""},
          {"sku":"32","s":0,"name":""},
          {"sku":"33","s":0,"name":""},
          ]
  
  },


  {
  "layer":"G",
  "clothes":[
             {"sku":"43","name":"mask","g":1,"color":1,"rank":"FREE"},
             {"sku":"64","name":"gas mask","g":1,"color":0,"rank":"coolpack"},
             {"sku":"75","name":"hankerchief","g":1,"color":0,"rank":"FREE", "hide":1},
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
             {"name":"xmas","g":1,"color":0,"sku":"34","rank":"FREE"},
             {"name":"headphones","g":1,"color":1,"sku":"36","rank":"coolpack"},
             {"name":"bike cap","g":1,"color":1,"sku":"42","rank":"coolpack"},
             {"name":"headband","g":1,"color":1,"sku":"46","rank":"FREE"},
             {"name":"headband","g":1,"color":1,"sku":"47","rank":"coolpack"},
             {"name":"rat","g":1,"color":1,"sku":"48","rank":"coolpack"},
             {"name":"antler","g":1,"color":1,"sku":"70","rank":"FREE"},
             
             {"name":"crown","g":1,"color":0,"sku":"37","rank":"prm_kingqueenpack"},
             {"sku":"80","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             {"sku":"82","g":1,"color":0,"name":"adidas Originals","rank":"brn_adidas"},
             ]
  
  },
  
  {
  "layer":"G",
  "clothes":[
             {"name":"Black Frames","g":1,"color":1,"sku":"12","rank":"FREE"},
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
             {"name":"eye patch","g":1,"color":1,"sku":"57","rank":"coolpack"},
             {"name":"horse head","g":1,"color":0,"sku":"58","rank":"prm_animalmaskpack"},
             {"name":"pigeon head","g":1,"color":0,"sku":"59","rank":"prm_animalmaskpack"},
             {"name":"rabbit head","g":1,"color":0,"sku":"60","rank":"prm_animalmaskpack"},
             {"name":"panda head","g":1,"color":0,"sku":"61","rank":"prm_animalmaskpack"},
             {"name":"horse white head","g":1,"color":0,"sku":"62","rank":"coolpack"},
             ]
  
  },
  
  {
  "layer":"G",
  "clothes":[
             
             {"sku":"73","name":"necklace short","g":1,"color":0,"rank":"coolpack"},
             {"sku":"74","name":"necklace long","g":1,"color":0,"rank":"coolpack"},
             
             {"sku":"100","g":1,"color":0,"name":"","rank":"coolpack"},

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
