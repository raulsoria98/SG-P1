import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Nave } from './Nave.js';

class Recorrido extends THREE.Object3D {
  constructor() {
    super();

    this.spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 1.5),
      new THREE.Vector3(6, 0, 6),
      new THREE.Vector3(10, 0, 7),
      new THREE.Vector3(17, 0, 5),
      new THREE.Vector3(20, 0, 0),
      new THREE.Vector3(17, 0, -5),
      new THREE.Vector3(10, 0, -7),
      new THREE.Vector3(6, 0, -6),
      new THREE.Vector3(1, 0, -1.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-1, 0, 1.5),
      new THREE.Vector3(-6, 0, 6),
      new THREE.Vector3(-10, 0, 7),
      new THREE.Vector3(-17, 0, 5),
      new THREE.Vector3(-20, 0, 0),
      new THREE.Vector3(-17, 0, -5),
      new THREE.Vector3(-10, 0, -7),
      new THREE.Vector3(-6, 0, -6),
      new THREE.Vector3(-1, 0, -1.5),
      new THREE.Vector3(-0, 0, 0),
    ]);

    this.nave = new Nave();
    var tangente = this.spline.getTangentAt(0);
    this.nave.lookAt(tangente);
    this.add(this.nave);

    var geom_linea = new THREE.Geometry();
    geom_linea.vertices = this.spline.getPoints(100);

    var mat_linea = new THREE.LineBasicMaterial({ color: 0xff0000 });
    this.linea = new THREE.Line(geom_linea, mat_linea);
    this.add(this.linea);

    var origen = { pos: 0 };
    var mitad = { pos: 0.5 };
    var final = { pos: 1 };

    this.t = 0;
    var that = this;

    this.movimiento1 = new TWEEN.Tween(origen)
      .to(mitad, 4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => { that.t = origen.pos; })
      .onComplete(() => { origen.pos = 0; });

    this.movimiento2 = new TWEEN.Tween(mitad)
      .to(final, 4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => { that.t = mitad.pos; })
      .onComplete(() => { mitad.pos = 0.5; });

    this.movimiento1.chain(this.movimiento2);
    this.movimiento2.chain(this.movimiento1);

    this.movimiento1.start();
  }

  update(animacion) {
    if (animacion) {
      this.movimiento1.resume();
      this.movimiento2.resume();
      var posicion = this.spline.getPointAt(this.t);

      this.nave.position.copy(posicion);

      var tangente = this.spline.getTangentAt(this.t);
      posicion.add(tangente);

      this.nave.lookAt(posicion);
    }
    else {
      this.movimiento1.pause();
      this.movimiento2.pause();
    }
  }
}

export { Recorrido };
