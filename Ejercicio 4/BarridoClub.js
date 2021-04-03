import * as THREE from '../libs/three.module.js'
 
class BarridoClub extends THREE.Object3D {
  constructor() {
    super();
    
    // Un Mesh se compone de geometría y material
    var clubShape = new THREE.Shape();

    clubShape.moveTo(0,0);
    clubShape.bezierCurveTo(3,-2.5, 4,2.5, 1,1.75);
    clubShape.bezierCurveTo(2.7,5.25, -2.7,5.25, -1,1.75);
    clubShape.bezierCurveTo(-4,2.5, -3,-2.5, 0,0);

    var points = [
      new THREE.Vector3(-2,10,0),
      new THREE.Vector3(0,7,0),
      new THREE.Vector3(-2,0,0),
      new THREE.Vector3(0,-7,0),
      new THREE.Vector3(-2,-10,0)
    ]

    var path = new THREE.CatmullRomCurve3(points);

    // TODO: Pregunnta: Cómo se pone bisel a geometría por barrido?
    var options = { bevelEnabled: true, depth:0.5, bevelThickness:1, bevelSize:1, bevelSegments:15, curveSegments:20, steps: 50, extrudePath: path };
    var geom = new THREE.ExtrudeBufferGeometry(clubShape, options);
    // var geom = new THREE.ShapeBufferGeometry(clubShape);

    geom.scale(0.5, 0.5, 0.5);

    // Como material se crea uno a partir de un color
    // var mat = new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshPhongMaterial({color: 0x37ff00});
    mat.side = THREE.DoubleSide;
    // mat.flatShading = true;
    // mat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.mesh = new THREE.Mesh (geom, mat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.mesh);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    // this.mesh.position.y = this.mesh.geometry.parameters.height/2;
  }
  
  update (animacion) {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    if(animacion)
      this.mesh.rotation.y += 0.01;
    // TODO: Pregunta: Cómo hago que gire sobre un eje concreto, sigue girando sobre sobre si mismo, en la documentacion pone que object3D.rotation son angulos de euler
    // this.rotateOnAxis(new THREE.Vector3(0,0,1), 0.01);

    // Para que se mantenga a ras de suelo
    // this.mesh.position.y = this.mesh.geometry.parameters.height/2;

    // Imprescindible para que el material sea smoth en vez de flat
    // this.mesh.geometry.computeVertexNormals();
  }
}

export { BarridoClub };
