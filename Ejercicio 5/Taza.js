import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Taza extends THREE.Object3D {
  constructor() {
    super();

    // Un Mesh se compone de geometría y material
    var geom_cilindro1 = new THREE.CylinderGeometry(1.5, 1.5, 3.5, 30, 1);
    var geom_cilindro2 = new THREE.CylinderGeometry(1.25, 1.25, 3.5, 30, 1);
    var geom_asa = new THREE.TorusGeometry(1.25, 0.25, 15, 30);

    geom_cilindro1.translate(0, geom_cilindro1.parameters.height / 2, 0);
    geom_cilindro2.translate(0, geom_cilindro2.parameters.height / 2 + 0.25, 0);
    geom_asa.translate(geom_asa.parameters.radius + 0.25, geom_asa.parameters.radius + 0.5, 0);

    var bsp_cilindro1 = new ThreeBSP(geom_cilindro1);
    var bsp_cilindro2 = new ThreeBSP(geom_cilindro2);
    var bsp_asa = new ThreeBSP(geom_asa);

    var parcial = bsp_cilindro1.union(bsp_asa);
    var final = parcial.subtract(bsp_cilindro2);

    var geometry = final.toGeometry();
    var buffer_geom = new THREE.BufferGeometry().fromGeometry(geometry);

    // Como material se crea uno a partir de un color
    var mat = new THREE.MeshNormalMaterial();

    // Ya podemos construir el Mesh
    this.taza = new THREE.Mesh(buffer_geom, mat);

    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.taza);
  }

  update(animacion) {

    if (animacion)
      this.taza.rotation.y += 0.01;

  }
}

export { Taza };
