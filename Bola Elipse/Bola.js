import * as THREE from '../libs/three.module.js'

class Bola extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    this.radio = 2;
    this.altura = 2;

    var geom_cilindro = new THREE.CylinderGeometry(this.radio, this.radio, this.altura, 32);
    var mat_cilindro = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 });
    this.cilindro = new THREE.Mesh(geom_cilindro, mat_cilindro);
    this.cilindro.position.y = this.altura / 2;
    this.add(this.cilindro);

    this.spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, this.altura / 2, this.radio),
      new THREE.Vector3(Math.sin(degToRad(20)) * this.radio, this.altura / 2, Math.cos(degToRad(20)) * this.radio),
      new THREE.Vector3(Math.sin(degToRad(40)) * this.radio, this.altura / 2, Math.cos(degToRad(40)) * this.radio),
      new THREE.Vector3(Math.sin(degToRad(60)) * this.radio, this.altura / 2, Math.cos(degToRad(60)) * this.radio),
      new THREE.Vector3(Math.sin(degToRad(80)) * this.radio, this.altura / 2, Math.cos(degToRad(80)) * this.radio),
      new THREE.Vector3(Math.sin(degToRad(90)) * this.radio, this.altura / 2, Math.cos(degToRad(90)) * this.radio),
      new THREE.Vector3(Math.sin(degToRad(80)) * this.radio, this.altura / 2, -Math.cos(degToRad(80)) * this.radio),
      new THREE.Vector3(Math.sin(degToRad(60)) * this.radio, this.altura / 2, -Math.cos(degToRad(60)) * this.radio),
      new THREE.Vector3(Math.sin(degToRad(40)) * this.radio, this.altura / 2, -Math.cos(degToRad(40)) * this.radio),
      new THREE.Vector3(Math.sin(degToRad(20)) * this.radio, this.altura / 2, -Math.cos(degToRad(20)) * this.radio),
      new THREE.Vector3(0, this.altura / 2, -this.radio),
      new THREE.Vector3(-Math.sin(degToRad(20)) * this.radio, this.altura / 2, -Math.cos(degToRad(20)) * this.radio),
      new THREE.Vector3(-Math.sin(degToRad(40)) * this.radio, this.altura / 2, -Math.cos(degToRad(40)) * this.radio),
      new THREE.Vector3(-Math.sin(degToRad(60)) * this.radio, this.altura / 2, -Math.cos(degToRad(60)) * this.radio),
      new THREE.Vector3(-Math.sin(degToRad(80)) * this.radio, this.altura / 2, -Math.cos(degToRad(80)) * this.radio),
      new THREE.Vector3(-Math.sin(degToRad(90)) * this.radio, this.altura / 2, -Math.cos(degToRad(90)) * this.radio),
      new THREE.Vector3(-Math.sin(degToRad(80)) * this.radio, this.altura / 2, Math.cos(degToRad(80)) * this.radio),
      new THREE.Vector3(-Math.sin(degToRad(60)) * this.radio, this.altura / 2, Math.cos(degToRad(60)) * this.radio),
      new THREE.Vector3(-Math.sin(degToRad(40)) * this.radio, this.altura / 2, Math.cos(degToRad(40)) * this.radio),
      new THREE.Vector3(-Math.sin(degToRad(20)) * this.radio, this.altura / 2, Math.cos(degToRad(20)) * this.radio),
      new THREE.Vector3(0, this.altura / 2, this.radio)
    ]);

    var geom_bola = new THREE.SphereGeometry(0.5, 32, 32);
    var mat_bola = new THREE.MeshNormalMaterial();

    this.bola = new THREE.Mesh(geom_bola, mat_bola);

    this.bola.position.y = this.altura / 2;
    this.add(this.bola);
  }

  createGUI(gui, titleGui) {
    var that = this;

    this.guiControls = new function () {
      this.escalado = 1;

      this.reset = function () {
        this.escalado = 1;

        that.cilindro.scale.x = this.escalado;
        that.cambiarEscalado(this.escalado, that);
      }
    }

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, "escalado", 1, 8, 1).name("Escalado: ").listen().onChange((value) => {
      that.cilindro.scale.x = value;
      this.cambiarEscalado(value, that);
    });

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  cambiarEscalado(escalado, that) {
    that.spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, that.altura / 2, that.radio),
      new THREE.Vector3(Math.sin(degToRad(20)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(20)) * that.radio),
      new THREE.Vector3(Math.sin(degToRad(40)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(40)) * that.radio),
      new THREE.Vector3(Math.sin(degToRad(60)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(60)) * that.radio),
      new THREE.Vector3(Math.sin(degToRad(80)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(80)) * that.radio),
      new THREE.Vector3(Math.sin(degToRad(90)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(90)) * that.radio),
      new THREE.Vector3(Math.sin(degToRad(80)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(80)) * that.radio),
      new THREE.Vector3(Math.sin(degToRad(60)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(60)) * that.radio),
      new THREE.Vector3(Math.sin(degToRad(40)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(40)) * that.radio),
      new THREE.Vector3(Math.sin(degToRad(20)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(20)) * that.radio),
      new THREE.Vector3(0, that.altura / 2, -that.radio),
      new THREE.Vector3(-Math.sin(degToRad(20)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(20)) * that.radio),
      new THREE.Vector3(-Math.sin(degToRad(40)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(40)) * that.radio),
      new THREE.Vector3(-Math.sin(degToRad(60)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(60)) * that.radio),
      new THREE.Vector3(-Math.sin(degToRad(80)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(80)) * that.radio),
      new THREE.Vector3(-Math.sin(degToRad(90)) * that.radio * escalado, that.altura / 2, -Math.cos(degToRad(90)) * that.radio),
      new THREE.Vector3(-Math.sin(degToRad(80)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(80)) * that.radio),
      new THREE.Vector3(-Math.sin(degToRad(60)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(60)) * that.radio),
      new THREE.Vector3(-Math.sin(degToRad(40)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(40)) * that.radio),
      new THREE.Vector3(-Math.sin(degToRad(20)) * that.radio * escalado, that.altura / 2, Math.cos(degToRad(20)) * that.radio),
      new THREE.Vector3(0, that.altura / 2, that.radio)
    ]);
  }

  update() {
    var time = Date.now();
    var looptime = 3000;
    var t = (time % looptime) / looptime;

    var posicion = this.spline.getPointAt(t);

    this.bola.position.copy(posicion);

    var tangente = this.spline.getTangentAt(t);
    posicion.add(tangente);

    this.bola.lookAt(posicion);
  }

}

function degToRad(deg) {
  return deg * (Math.PI / 180);
};

export { Bola };