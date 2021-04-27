import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Comecocos } from './Comecocos.js';

class Recorrido extends THREE.Object3D {
  constructor() {
    super();

    this.spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(3, 0, 8),
      new THREE.Vector3(2, 0, 9),
      new THREE.Vector3(0, 0, 9),
      new THREE.Vector3(-2, 0, 9),
      new THREE.Vector3(-3, 0, 8),
      new THREE.Vector3(-3, 0, -5),
      new THREE.Vector3(-2, 0, -6),
      new THREE.Vector3(8, 0, -6),
      new THREE.Vector3(10, 0, -5),
      new THREE.Vector3(10, 0, -2),
      new THREE.Vector3(8, 0, -1),
      new THREE.Vector3(4, 0, -1),
      new THREE.Vector3(3, 0, -1),
      new THREE.Vector3(3, 0, 0)
    ]);

    this.comecocos = new Comecocos();
    var tangente = this.spline.getTangentAt(0);
    this.comecocos.lookAt(tangente);
    this.comecocos.position.x = 3;
    this.add(this.comecocos);

    var geom_linea = new THREE.Geometry();
    geom_linea.vertices = this.spline.getPoints(100);

    var mat_linea = new THREE.LineBasicMaterial({ color: 0xff0000 });
    this.linea = new THREE.Line(geom_linea, mat_linea);
    this.add(this.linea);

    var origen = { pos: 0 };
    var mitad = { pos: 0.45 };
    var final = { pos: 1 };

    this.t = 0;
    var that = this;

    this.movimiento1 = new TWEEN.Tween(origen)
      .to(mitad, 4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => { that.t = origen.pos; })
      .onComplete(() => { origen.pos = 0; });

    this.movimiento2 = new TWEEN.Tween(mitad)
      .to(final, 6000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => { that.t = mitad.pos; })
      .onComplete(() => { mitad.pos = 0.5; });

    this.movimiento1.chain(this.movimiento2);
    this.movimiento2.chain(this.movimiento1);

    this.movimiento1.start();
  }

  update(animacion) {
    this.comecocos.update(animacion);
    if (animacion) {
      this.movimiento1.resume();
      this.movimiento2.resume();
      var posicion = this.spline.getPointAt(this.t);

      this.comecocos.position.copy(posicion);

      var tangente = this.spline.getTangentAt(this.t);
      posicion.add(tangente);

      this.comecocos.lookAt(posicion);
    }
    else {
      this.movimiento1.pause();
      this.movimiento2.pause();
    }
  }
}

export { Recorrido };
