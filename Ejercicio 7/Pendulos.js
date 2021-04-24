import * as THREE from '../libs/three.module.js'

class Pendulos extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    var rojo = new THREE.MeshPhongMaterial({ color: 0xCF0000 });
    var verde = new THREE.MeshPhongMaterial({ color: 0x00CF00 });
    var azul = new THREE.MeshPhongMaterial({ color: 0x0000CF });
    this.subiendoGrande = true;
    this.subiendoPeque = true;

    var geom_centro = new THREE.BoxBufferGeometry(2, 1, 1);
    geom_centro.translate(0, geom_centro.parameters.height / 2, 0);
    this.centro = new THREE.Mesh(geom_centro, rojo);
    this.centro.scale.y = this.guiControls.largoGrande;

    var geom_arriba = new THREE.BoxBufferGeometry(2, 2, 1);
    geom_arriba.translate(0, geom_arriba.parameters.height / 2, 0);
    this.arriba = new THREE.Mesh(geom_arriba, verde);
    this.arriba.position.y = this.guiControls.largoGrande;

    var geom_abajo = new THREE.BoxBufferGeometry(2, 2, 1);
    geom_abajo.translate(0, -geom_abajo.parameters.height / 2, 0);
    this.abajo = new THREE.Mesh(geom_abajo, verde);

    this.base = new THREE.Object3D();
    this.base.add(this.centro, this.arriba, this.abajo);
    this.base.position.y = -this.guiControls.largoGrande - 1;

    var geom_cilindro1 = new THREE.CylinderBufferGeometry(0.5, 0.5, 1.5);
    geom_cilindro1.rotateX(Math.PI / 2);
    this.cilindro1 = new THREE.Mesh(geom_cilindro1, azul);

    this.pendulo1 = new THREE.Object3D();
    this.pendulo1.add(this.cilindro1, this.base);

    var geom_peque = new THREE.BoxBufferGeometry(1.5, 1, 1);
    geom_peque.translate(0, geom_peque.parameters.height / 2, 0);
    this.peque = new THREE.Mesh(geom_peque, azul);
    this.peque.scale.y = this.guiControls.largoPeque;
    this.peque.position.y = -this.guiControls.largoPeque + 0.5;

    var geom_cilindro2 = new THREE.CylinderBufferGeometry(0.25, 0.25, 1.5);
    geom_cilindro2.rotateX(Math.PI / 2);
    this.cilindro2 = new THREE.Mesh(geom_cilindro2, verde);

    this.pendulo2 = new THREE.Object3D();
    this.pendulo2.add(this.peque, this.cilindro2);
    this.pendulo2.rotation.z = this.guiControls.rotPeque;
    this.pendulo2.position.y = -1 - this.guiControls.posRelat * this.guiControls.largoGrande;
    this.pendulo2.position.z = this.peque.geometry.parameters.depth / 2 + this.centro.geometry.parameters.depth / 2;

    this.final = new THREE.Object3D();
    this.final.add(this.pendulo1, this.pendulo2);
    this.final.rotation.z = this.guiControls.rotGrande;

    this.add(this.final);
  }

  degToRad(deg) {
    return deg * (Math.PI / 180);
  }
  createGUI(gui, titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    var that = this;
    this.guiControls = new function () {
      this.largoGrande = 5.0;
      this.largoPeque = 10.0;
      this.rotPeque = 0.0;
      this.posRelat = 0.1;
      this.rotGrande = 0.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.largoGrande = 5.0;
        this.largoPeque = 10.0;
        this.rotPeque = 0.0;
        this.posRelat = 0.1;
        this.rotGrande = 0.0;
        that.subiendoGrande = true;
        that.subiendoPeque = true;
      }
    }

    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'largoGrande', 5.0, 10.0, 0.2).name('Largo Grande : ').listen();
    folder.add(this.guiControls, 'largoPeque', 10.0, 20.0, 0.2).name('Largo Pequeño : ').listen();
    folder.add(this.guiControls, 'rotPeque', this.degToRad(-45), this.degToRad(45), 0.1).name('Rotación Pequeño : ').listen();
    folder.add(this.guiControls, 'rotGrande', this.degToRad(-45), this.degToRad(45), 0.1).name('Rotación Grande : ').listen();
    folder.add(this.guiControls, 'posRelat', 0.1, 0.9, 0.05).name('Posición Pequeño : ').listen();

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  update(animacion) {
    this.centro.scale.y = this.guiControls.largoGrande;
    this.arriba.position.y = this.guiControls.largoGrande;
    this.base.position.y = -this.guiControls.largoGrande - 1;
    this.peque.scale.y = this.guiControls.largoPeque;
    this.peque.position.y = -this.guiControls.largoPeque + 0.5;
    this.pendulo2.rotation.z = this.guiControls.rotPeque;
    this.pendulo2.position.y = -1 - this.guiControls.posRelat * this.guiControls.largoGrande;
    this.final.rotation.z = this.guiControls.rotGrande;

    if (animacion) {
      if(this.guiControls.rotGrande >= this.degToRad(45))
        this.subiendoGrande = false;
      else if(this.guiControls.rotGrande <= this.degToRad(-45))
        this.subiendoGrande = true;
      
      if(this.subiendoGrande)
        this.guiControls.rotGrande += 0.005;
      else
        this.guiControls.rotGrande -= 0.005;

      if(this.guiControls.rotPeque >= this.degToRad(45))
        this.subiendoPeque = false;
      else if(this.guiControls.rotPeque <= this.degToRad(-45))
        this.subiendoPeque = true;
      
      if(this.subiendoPeque)
        this.guiControls.rotPeque += 0.005;
      else
        this.guiControls.rotPeque -= 0.005;
    }
  }
}

export { Pendulos };
