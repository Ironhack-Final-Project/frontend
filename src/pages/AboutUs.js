import mapboxgl from "mapbox-gl";

function AboutUs() {

   <link href='https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css' rel='stylesheet' />
   
  mapboxgl.accessToken = 'pk.eyJ1IjoidmFsZXdhbGQiLCJhIjoiY2w1MmdoYnBpMGZkYTNtcWl4cjl5bWo3MiJ9.dlNqXwgqNGwCR35-1qBgyA';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});

map.on('style.load', () => {
  map.setFog({}); 
});

  return (
    <div className="about-us">
   
      <h1>About Us</h1>
      <p style={{ width: 40 + "%", margin: "auto" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a mauris
        vel massa consequat semper. Nam consequat non quam in dapibus. Aenean in
        lorem efficitur, iaculis leo sed, pulvinar urna. Curabitur quis nulla
        dolor. Morbi a lorem eget ligula pretium tincidunt sit amet vel lectus. Ut
        sodales pulvinar sapien a ultricies. Aliquam ullamcorper mollis varius. Ut
        a nibh ligula. Morbi tempor ante at velit condimentum rhoncus. Etiam
        malesuada eu dui quis tincidunt. Nam eu dui elit. Nam in ligula nunc. Ut
        quis neque et ipsum sodales mattis. Duis et leo accumsan, venenatis orci
        sed, tristique sapien. Suspendisse ex ligula, condimentum non nibh non,
        tincidunt cursus tortor. Integer laoreet ante id viverra sodales. Mauris
        est neque, imperdiet a lacus eget, faucibus hendrerit purus. In accumsan,
        quam ut consectetur consectetur, ante ex ornare metus, eget mollis erat
        ipsum a est. Cras ut scelerisque elit, ut vehicula ex. Vivamus ultricies
        dapibus odio, id eleifend sem congue in. Proin luctus in est ut mattis.
        Phasellus id lobortis quam, non fermentum dui.
      </p>







    </div>
  );
}

export default AboutUs;