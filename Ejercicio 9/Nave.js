import * as THREE from '../libs/three.module.js'
 
class Nave extends THREE.Object3D {
  constructor() {
    super();
    
    var geom = new THREE.ConeBufferGeometry(1, 3, 3);
    
    var texture = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});

    this.nave = new THREE.Mesh(geom, material);

    this.nave.rotation.x = -Math.PI / 2;
    this.nave.rotation.z = Math.PI;

    this.add(this.nave);
  }
}

export { Nave };
