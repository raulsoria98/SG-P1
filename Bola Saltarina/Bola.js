import * as THREE from '../libs/three.module.js'

class Bola extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    this.subiendo = true;
    this.radio = 1;
    this.altura = 7;

    var geom_cilindro = new THREE.CylinderGeometry(this.radio, this.radio, this.altura, 32);
    var mat_cilindro = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 });
    this.cilindro = new THREE.Mesh(geom_cilindro, mat_cilindro);
    this.cilindro.position.y = this.altura / 2;
    this.add(this.cilindro);

    var geom_bola = new THREE.SphereGeometry(0.5, 32, 32);
    var mat_bola = new THREE.MeshNormalMaterial();
    this.bola = new THREE.Mesh(geom_bola, mat_bola);

    this.bolaPadre = new THREE.Object3D();
    this.bolaPadre.add(this.bola);

    this.bola.position.z = this.radio;
    this.add(this.bolaPadre);
  }

  createGUI(gui, titleGui) {
    var that = this;

    this.guiControls = new function () {
      this.escalado = 1;

      this.reset = function () {
        this.escalado = 1;

        that.cilindro.scale.x = this.escalado;
        that.cilindro.scale.z = this.escalado;
      }
    }

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, "escalado", 1, 8, 1).name("Radio: ").listen().onChange((value) => {
      that.cilindro.scale.x = value;
      that.cilindro.scale.z = value;
    });

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  update() {
    this.bolaPadre.rotation.y += 0.009;
    this.bola.position.z = this.radio * this.guiControls.escalado;

    if(this.subiendo){
      this.bola.position.y += 0.07;
      
      if(this.bola.position.y >= this.altura)
        this.subiendo = false;
    }
    else {
      this.bola.position.y -= 0.07;

      if(this.bola.position.y <= 0)
        this.subiendo = true;
    }
  }

}

export { Bola };