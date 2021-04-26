import * as THREE from '../libs/three.module.js'

class Reloj extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    var rojo = new THREE.MeshPhongMaterial({ color: 0xCF0000 });
    var azul = new THREE.MeshPhongMaterial({ color: 0x0000CF });

    var geom_semiesfera = new THREE.SphereBufferGeometry(1, 15, 15, 0, Math.PI * 2, 0, Math.PI / 2);
    geom_semiesfera.translate(0, 0, -15);

    this.puntos = [];
    for (let i = 0; i < 12; i++) {
      let aux = new THREE.Mesh(geom_semiesfera, rojo);
      aux.rotation.y = -((Math.PI * 2) / 12) * i;

      this.puntos.push(aux);
      this.add(this.puntos[i]);
    }

    var geom_aguja = new THREE.SphereBufferGeometry(1, 15, 15, 0, Math.PI * 2, 0, Math.PI / 2);
    geom_aguja.translate(0, 0, -13);

    this.aguja = new THREE.Mesh(geom_aguja, azul);

    this.add(this.aguja);

    this.tiempoAnterior = Date.now();
  }

  createGUI(gui, titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.velocidad = 1.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.velocidad = 1.0;
      }
    }

    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'velocidad', -12.0, 12.0, 1).name('Velocidad (marcas / s): ').listen();

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  update() {
      var tiempoActual = Date.now();
  
      var segundos = (tiempoActual - this.tiempoAnterior) / 1000;
  
      this.aguja.rotation.y += -((Math.PI * 2) / 12) * this.guiControls.velocidad * segundos;

      this.tiempoAnterior = tiempoActual;
  }
}

export { Reloj };
