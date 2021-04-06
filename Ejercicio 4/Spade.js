import * as THREE from '../libs/three.module.js'
 
class Spade extends THREE.Object3D {
  constructor() {
    super();
    
    // Un Mesh se compone de geometría y material
    var spadeShape = new THREE.Shape();

    spadeShape.moveTo( 0, 0 );
    spadeShape.quadraticCurveTo(-0.3,0.3, -0.7,1);
    spadeShape.quadraticCurveTo(-1,1.5, -1.5,3);
    spadeShape.quadraticCurveTo(-2,5.5, 0,3.4);
    spadeShape.quadraticCurveTo(2,5.5, 1.5,3);
    spadeShape.quadraticCurveTo(1,1.5, 0.7,1);
    spadeShape.quadraticCurveTo(0.3,0.3, 0,0);

    var options = { depth:0.5, bevelThickness:1, bevelSize:1, bevelSegments:15, curveSegments:20 }
    var geom = new THREE.ExtrudeBufferGeometry(spadeShape, options);
    // var geom = new THREE.ShapeBufferGeometry(spadeShape);

    geom.scale(-0.5, -0.5, -0.5);
    geom.translate(0, 3, 0);
    geom.computeVertexNormals();

    // Como material se crea uno a partir de un color
    // var mat = new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshPhongMaterial({color: 0x0000c7});
    mat.side = THREE.BackSide;
    // mat.flatShading = true;
    // mat.needsUpdate = true;
    
    var putnosPie = [
      new THREE.Vector2(0,0),
      new THREE.Vector2(0.35,0),
      new THREE.Vector2(0.1,0.25),
      new THREE.Vector2(0.1,1),
      new THREE.Vector2(0,1)
    ]
    
    var geomPie = new THREE.LatheBufferGeometry(putnosPie, 15, 0, 2*Math.PI);
    this.pie = new THREE.Mesh(geomPie, mat);

    // Ya podemos construir el Mesh
    this.spade = new THREE.Mesh (geom, mat);
    this.spade.add(this.pie);
    this.padre = new THREE.Object3D();
    this.abuelo = new THREE.Object3D();

    this.abuelo.position.set(0,0,0);
    this.padre.position.set(-5,5,0);
    
    // Y añadirlo como hijo del Object3D (el this)
    this.padre.add(this.spade);
    this.abuelo.add(this.padre);
    this.add (this.abuelo);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    // this.mesh.position.y = this.mesh.geometry.parameters.height/2;
    // this.scale.set(0.5, 0.5, 0.5);
  }
  
  update (animacion) {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    if(animacion) {
      this.abuelo.rotation.z += 0.005;
      this.padre.rotation.z -= 0.005;
      this.spade.rotation.y += 0.01;
    }
    // this.rotateOnAxis(new THREE.Vector3(0,0,1), 0.01);

    // Para que se mantenga a ras de suelo
    // this.mesh.position.y = this.mesh.geometry.parameters.height/2;

    // Imprescindible para que el material sea smoth en vez de flat
    // this.mesh.geometry.computeVertexNormals();
  }
}

export { Spade };
