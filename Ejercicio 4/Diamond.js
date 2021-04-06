import * as THREE from '../libs/three.module.js'
 
class Diamond extends THREE.Object3D {
  constructor() {
    super();
    
    // Un Mesh se compone de geometría y material
    var diamondShape = new THREE.Shape();

    diamondShape.moveTo( 0, 0 );
    diamondShape.lineTo(-1.5, 2.75);
    diamondShape.lineTo(0, 5.5);
    diamondShape.lineTo(1.5, 2.75);
    diamondShape.lineTo(0, 0);
    
    var options = { depth:0.5, bevelThickness:1, bevelSize:1, bevelSegments:15, curveSegments:20 }
    var geom = new THREE.ExtrudeBufferGeometry(diamondShape, options);
    // var geom = new THREE.ShapeBufferGeometry(diamondShape);

    geom.scale(0.5, 0.5, 0.5);

    // Como material se crea uno a partir de un color
    // var mat = new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    // mat.side = THREE.DoubleSide;
    // mat.flatShading = true;
    // mat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.mesh = new THREE.Mesh (geom, mat);
    this.padre = new THREE.Object3D();
    this.abuelo = new THREE.Object3D();

    this.abuelo.position.set(0,0,0);
    this.padre.position.set(-5,-5,0);
    
    // Y añadirlo como hijo del Object3D (el this)
    this.padre.add(this.mesh);
    this.abuelo.add(this.padre);
    this.add (this.abuelo);
    
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

    if(animacion) {
      this.abuelo.rotation.z += 0.005;
      this.padre.rotation.z -= 0.005;
      this.mesh.rotation.y += 0.01;
    }
    // this.rotateOnAxis(new THREE.Vector3(0,1,0), 0.01);

    // Para que se mantenga a ras de suelo
    // this.mesh.position.y = this.mesh.geometry.parameters.height/2;

    // Imprescindible para que el material sea smoth en vez de flat
    // this.mesh.geometry.computeVertexNormals();
  }
}

export { Diamond };
