import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Escuadra extends THREE.Object3D {
  constructor() {
    super();

    // Un Mesh se compone de geometría y material
    var shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(0, 3);
    shape.quadraticCurveTo(0, 4, 1, 4);
    shape.lineTo(4, 4);
    shape.lineTo(4, 0);
    shape.lineTo(0, 0);

    var options = { curveSegment: 15, steps: 1, depth: 1, bevelEnabled: false };
    var geom_exterior = new THREE.ExtrudeGeometry(shape, options);
    var geom_interior = new THREE.ExtrudeGeometry(shape, options);
    var geom_cono1 = new THREE.ConeGeometry(0.25, 1, 15);
    var geom_cono2 = new THREE.ConeGeometry(0.25, 1, 15);

    geom_exterior.translate(0, 0, -0.5);
    geom_interior.translate(0.3, -0.3, -0.5);

    geom_cono1.translate(0, geom_cono1.parameters.height / 2, 0);
    geom_cono1.rotateZ(Math.PI / 2);
    geom_cono1.translate(0.5, 0.75, 0);

    geom_cono2.translate(3.25, geom_cono2.parameters.height / 2 + 3.5, 0);
    
    var bsp_exterior = new ThreeBSP(geom_exterior);
    var bsp_interior = new ThreeBSP(geom_interior);
    var bsp_cono1 = new ThreeBSP(geom_cono1);
    var bsp_cono2 = new ThreeBSP(geom_cono2);

    var parcial1 = bsp_exterior.subtract(bsp_interior);
    var parcial2 = parcial1.subtract(bsp_cono1);
    var final = parcial2.subtract(bsp_cono2);

    var geometry = final.toGeometry();
    var buffer_geom = new THREE.BufferGeometry().fromGeometry(geometry);

    // Como material se crea uno a partir de un color
    var mat = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    this.escuadra = new THREE.Mesh(buffer_geom, mat);

    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.escuadra);
  }

  update(animacion) {

    if (animacion)
      this.escuadra.rotation.y += 0.01;

  }
}

export { Escuadra };
