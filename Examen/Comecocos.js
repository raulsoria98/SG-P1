import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Comecocos extends THREE.Object3D {
  constructor() {
    super();

    this.bajando = true;

    var geom_arriba = new THREE.SphereGeometry(1, 30, 30, 0, 2 * Math.PI, 0, Math.PI / 2);
    var geom_ojo1 = new THREE.SphereGeometry(0.1, 15, 15);
    geom_ojo1.translate(0.4, 0.6, 0.7);
    var geom_ojo2 = new THREE.SphereGeometry(0.1, 15, 15);
    geom_ojo2.translate(-0.4, 0.6, 0.7);

    var bsp_arriba = new ThreeBSP(geom_arriba);
    var bsp_ojo1 = new ThreeBSP(geom_ojo1);
    var bsp_ojo2 = new ThreeBSP(geom_ojo2);

    var parcial = bsp_arriba.subtract(bsp_ojo1);
    var final = parcial.subtract(bsp_ojo2);

    var geometry = final.toGeometry();
    var buffer_geom = new THREE.BufferGeometry().fromGeometry(geometry);

    var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    material.side = THREE.DoubleSide;

    this.arriba = new THREE.Mesh(buffer_geom, material);

    var geom_abajo = new THREE.SphereGeometry(1, 15, 15, 0, 2 * Math.PI, 0, Math.PI / 2);
    geom_abajo.rotateZ(degToRad(180));

    this.abajo = new THREE.Mesh(geom_abajo, material);

    this.add(this.arriba, this.abajo);
  }

  update(animacion) {
    if (animacion) {
      if (this.bajando) {
        this.abajo.rotation.x += 0.01;

        if (this.abajo.rotation.x >= degToRad(45))
          this.bajando = false;
      }
      else {
        this.abajo.rotation.x -= 0.01;

        if (this.abajo.rotation.x <= 0.0)
          this.bajando = true;
      }
    }
  }
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
};

export { Comecocos };
