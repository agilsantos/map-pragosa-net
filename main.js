import './style.css';
import {Feature, Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, BingMaps, Stamen, Vector as VectorSource} from 'ol/source.js';
import {getCenter} from 'ol/extent';
import {WKT} from 'ol/format';
import {Point} from 'ol/geom.js';

//import {BingMaps, Stamen} from 'ol/source.js';
//import {addEquivalentProjections, Projection, get as getProjection} from 'ol/proj';
//import Projection from 'ol/proj/projection';

// useGeographic();

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

/*
( => %28
, => %2C
  => %20
) => %29

dimension aUrlEncode(4,2)

aUrlEncode(1,1)="("
aUrlEncode(1,2)="%28"

aUrlEncode(2,1)=","
aUrlEncode(2,2)="%2C"

aUrlEncode(2,1)=" "
aUrlEncode(3,2)="%20"

aUrlEncode(4,1)=")"
aUrlEncode(4,2)="%29"

*/

// portugal
// https://arthur-e.github.io/Wicket/sandbox-gmaps3.html
// https://www.urlencoder.org/
// ?wkt=POLYGON((-9.132103406736126+41.96953209704133,-8.154320203611126+42.295427473782574,-7.934593641111127+41.99403240624561,-7.110619031736127+42.12454148032519,-6.462425672361127+42.148982067477974,-6.345283328258994+41.85507269256023,-5.927802859508994+41.64196087815455,-6.191474734508994+41.263185011425215,-6.652900515758994+40.98179972311613,-6.652900515758994+40.39868267311199,-6.850654422008994+39.59069847519147,-7.224189578258994+39.57376390996413,-6.696845828258994+39.01260480633194,-7.114326297008994+38.48136658739858,-6.718818484508994+38.22289873181423,-6.894599734508994+37.87684173567333,-7.224189578258994+37.75533563053257,-7.356025515758994+37.476857175164874,-7.246162234508994+37.127294688548176,-7.487861453258994+36.79370784069251,-8.322822390758995+36.84647657207317,-9.311591922008995+36.881635508991565,-8.960029422008995+38.32639657345195,-9.597236453258995+38.36086306506085,-9.970771609508995+38.9613675060604,-9.531318484508995+39.64147733908875,-9.069892703258995+40.11361513189615,-9.025947390758995+40.782448821652736,-9.113838015758995+41.32921792196841,-9.132103406736126+41.96953209704133))

let wktPTRect ={ 
    wkt: 'POLYGON((-9.6 42.2,-6.10 42.2,-6.10 36.9,-9.6 36.9))',
    invert: false
}

/*
let wktPT ={ 
  wkt: 'POLYGON((-9.132103406736126 41.96953209704133,-8.154320203611126 42.295427473782574,-7.934593641111127 41.99403240624561,-7.110619031736127 42.12454148032519,-6.462425672361127 42.148982067477974,-6.345283328258994 41.85507269256023,-5.927802859508994 41.64196087815455,-6.191474734508994 41.263185011425215,-6.652900515758994 40.98179972311613,-6.652900515758994 40.39868267311199,-6.850654422008994 39.59069847519147,-7.224189578258994 39.57376390996413,-6.696845828258994 39.01260480633194,-7.114326297008994 38.48136658739858,-6.718818484508994 38.22289873181423,-6.894599734508994 37.87684173567333,-7.224189578258994 37.75533563053257,-7.356025515758994 37.476857175164874,-7.246162234508994 37.127294688548176,-7.487861453258994 36.79370784069251,-8.322822390758995 36.84647657207317,-9.311591922008995 36.881635508991565,-8.960029422008995 38.32639657345195,-9.597236453258995 38.36086306506085,-9.970771609508995 38.9613675060604,-9.531318484508995 39.64147733908875,-9.069892703258995 40.11361513189615,-9.025947390758995 40.782448821652736,-9.113838015758995 41.32921792196841,-9.132103406736126 41.96953209704133))',
  invert: false
}

let wktAlenquer ={ 
  wkt: 'POLYGON((39.078083753145904 -9.010545820021635, 39.07828364075783 -9.011725991988186, 39.079233099181124 -9.011725991988186, 39.080332456130265 -9.011768907332424, 39.081731612926774 -9.011425584578518, 39.08243118091943 -9.010663837218289, 39.08211471054395 -9.009483665251736, 39.07931638439817 -9.009226173186308, 39.078083753145904 -9.010545820021635))',
  invert: true
}

let wktTojal ={ 
  wkt: 'POLYGON((39.61809644580728 -8.837712407112122, 39.618034461655554 -8.837583661079407, 39.61794355146597 -8.837138414382936, 39.617902228613076 -8.8369882106781, 39.61785677344636 -8.836918473243713, 39.61779892137281 -8.836854100227358, 39.617662555579585 -8.83699357509613, 39.6176129679518 -8.837057948112488, 39.61745594022943 -8.83722424507141, 39.61707989870945 -8.837690949440002, 39.617009648968235 -8.837782144546507, 39.616757575780554 -8.838050365447996, 39.61669145807113 -8.838125467300415, 39.61658401665866 -8.83821129798889, 39.6165302958899 -8.838248848915098, 39.61646831033565 -8.838291764259337, 39.616426986601965 -8.838329315185545, 39.614947580685765 -8.839353919029236, 39.61489799111294 -8.839412927627565, 39.61486906384573 -8.83948802947998, 39.61484840150462 -8.839579224586485, 39.61482360668714 -8.839675784111023, 39.61478228197157 -8.839777708053587, 39.61472029485199 -8.839842081069946, 39.614621115345216 -8.839895725250244, 39.61450540574103 -8.839901089668272, 39.61445168335905 -8.839895725250244, 39.614414490916346 -8.839911818504333, 39.61350120355314 -8.841161727905272, 39.61445994834361 -8.842964172363281, 39.61450189664177 -8.842987530516544, 39.61527489750489 -8.842498346620838, 39.61571293511719 -8.841489836031236, 39.61599466920799 -8.841747315256729, 39.616298399971754 -8.841564925043716, 39.61648848929548 -8.841280610888138, 39.6166331221269 -8.841235013334886, 39.61672816639438 -8.841409356920854, 39.6173328043368 -8.84107049890538, 39.617578676971135 -8.840981986007888, 39.618219181413195 -8.84088542648335, 39.61816752804887 -8.839732076606948, 39.618029096842434 -8.839514817676742, 39.618084945323915 -8.839100922676698, 39.61823783935287 -8.839122380348817, 39.618303955585134 -8.83902045640625, 39.61835560884768 -8.838392819496764, 39.618241075278775 -8.837932348251345, 39.61809644580728 -8.837712407112122))',
  invert: true
}
*/

let localPTCenter = {
  long: -7.85,
  lat: 39.55
};

let wkt = wktPTRect;
let local = localPTCenter;

let useWkt  = false;
let useLocal  = false;

if(params.wkt) {
  console.log("Parameter wkt found...");

  let wktStr = params.wkt;
  let wktInvert = false;
  
  if(params.invert) {   
    console.log("Parameter Invert found ...");
    if(params.invert=="true")
    {
       wktInvert=true;
    }
    else{
      wktInvert=false;
    }
  }

  wkt = {
    wkt: wktStr,
    invert: wktInvert
  }
  useWkt  = true;
}

if(params.lat && params.long) {
  console.log("Parameter Long or Lat found ...");
  local = {
    long : parseFloat(params.long),
    lat : parseFloat(params.lat)
  };

  if(isNaN(local.long) || isNaN(local.lat)){
    console.log("Parameter Long or Lat not a number ...");
    useLocal = false;
  }
  else {
    useLocal  = true;
  }
}
var layers = [];

const styles = [
  'RoadOnDemand',
  'Aerial',
  'AerialWithLabelsOnDemand',
  //'CanvasDark',
  //'OrdnanceSurvey',
];

let i;
for ( i=0; i<styles.length; i++){
  layers.push(
    new TileLayer({
      visible: false,
      preload: Infinity,
      source: new BingMaps({
        key: 'AteGu1x0N9OLBvehqeDT1k1xoau6fdYqxxe7o8bCyj7FNZdgXSXBvIShUs1HZKeU',
        imagerySet: styles[i]
      })
    })
  );
}

styles.push("OSM")

layers.push(new TileLayer({
    visible: false,
    source: new OSM(),
  })
);

// styles.push("StamenWaterColor")

// layers.push(new TileLayer({
//     visible: false,
//     source: new Stamen({
//       layer: 'watercolor',
//     }),
//   })
// );

styles.push("StamenTerrain")

layers.push(new TileLayer({
    visible: false,
    source: new Stamen({
      layer: 'terrain',
    }),
  })
);

styles.push("StamenToner")

layers.push(new TileLayer({
    visible: false,
    source: new Stamen({
      layer: 'toner',
    }),
  })
);

var coord;
var geometry;
var zoomOut;

if(useWkt) 
{
  console.log(wkt);

  console.log("Setting Polygon");

  const feature = new WKT().readFeature(wkt.wkt);
  geometry = feature.getGeometry();
 
  if(wkt.invert)
  {
    var oldCord = geometry.getCoordinates();
    var newCord = [];

    for(let i=0; i<oldCord.length;i++){
        newCord.push([]);
        oldCord[i].forEach(element => {
          newCord[i].push([element[1],element[0]]);
        });
    }

    geometry.setCoordinates(newCord);
  }

  console.log("Setting Polygon Projection");
  geometry.transform('EPSG:4326','EPSG:3857');
  
  const vectorWkt = new VectorLayer({
    source: new VectorSource({
      features: [new Feature({geometry:geometry})],
    }),
  });

  coord = getCenter(geometry.getExtent());
  layers.push(vectorWkt);
  zoomOut = -2
}

if(useLocal){

  console.log("Setting Point to local");
  console.log(local);

  geometry = new Point([local.long, local.lat]);

  console.log("Setting Point Projection");

  geometry.transform('EPSG:4326','EPSG:3857');

  const vectorLocal = new VectorLayer({
    source:new VectorSource({
      features: [new Feature({geometry:geometry})]
    }),
  });

  coord = getCenter(geometry.getExtent());
  layers.push(vectorLocal);
  zoomOut = -20.5
}
// console.log(layers);

const view = new View({
  center: [0, 0],
  zoom: 0
});

const map = new Map({
  target: 'map',
  layers: layers,  
  view: view
});

const size = map.getSize();
const position = [size[0]/2, size[1]/2];

// console.log(coord);
// console.log(size);
// console.log(position);

if(useLocal || useWkt){
  view.centerOn(coord, size, position);
  view.fit(geometry);
  view.adjustZoom(zoomOut);
}


const select = document.getElementById('layer-select');
function onChange() {
  const style = select.value;
  for (let i = 0; i < styles.length; i++) {
    layers[i].setVisible(styles[i] === style);
  }
}

select.addEventListener('change', onChange);
onChange();