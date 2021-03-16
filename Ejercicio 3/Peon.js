import * as THREE from '../libs/three.module.js'
 
class Peon extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.points = [
      new THREE.Vector2(0.0,-1.4),
      new THREE.Vector2(1.0,-1.4),
      new THREE.Vector2(1.0,-1.1),
      new THREE.Vector2(0.5,-0.7),
      new THREE.Vector2(0.4,-0.4),
      new THREE.Vector2(0.4,0.5),
      new THREE.Vector2(0.5,0.6),
      new THREE.Vector2(0.3,0.6),
      new THREE.Vector2(0.5,0.8),
      new THREE.Vector2(0.55,1.0),
      new THREE.Vector2(0.5,1.2),
      new THREE.Vector2(0.3,1.4),
      new THREE.Vector2(0.0,1.4)
    ]
    
    // Un Mesh se compone de geometría y material
    var perfilGeometry = new THREE.LatheBufferGeometry(this.points,1,0,0.1);
    var peonGeometry = new THREE.LatheBufferGeometry(this.points,3,0,Math.PI/2);
    var modeloGeometry = new THREE.LatheBufferGeometry(this.points,4,0,2*Math.PI);
    // Como material se crea uno a partir de un color
    var material = new THREE.MeshNormalMaterial();
    // var material = new THREE.MeshPhongMaterial({color: 0xCF0000});
    material.side = THREE.DoubleSide;
    material.flatShading = true;
    
    // Ya podemos construir el Mesh
    this.perfil = new THREE.Mesh (perfilGeometry, material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.perfil);

    // Ya podemos construir el Mesh
    this.peon = new THREE.Mesh (peonGeometry, material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.peon);

    // Ya podemos construir el Mesh
    this.modelo = new THREE.Mesh (modeloGeometry, material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.modelo);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.perfil.position.x = -4;
    this.modelo.position.x = 4;

    this.perfil.position.y = 1.4;
    this.peon.position.y = 1.4;
    this.modelo.position.y = 1.4;
  }
  
  createGUI (gui,titleGui) {
    var that = this;
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.segmentos = 3;
      this.angulo = Math.PI/2;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.segmentos = 3;
        this.angulo = Math.PI/2;

        that.updateGeometry();
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'segmentos', 3, 30, 1).name ('Segmentos : ').listen().onChange(() => { this.updateGeometry() });
    folder.add (this.guiControls, 'angulo', 0.1, 2*Math.PI, 0.1).name ('Ángulo : ').listen().onChange(() => { this.updateGeometry() });
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  updateGeometry(){
    var newGeometry = new THREE.LatheBufferGeometry(this.points, this.guiControls.segmentos, 0, this.guiControls.angulo);
    this.peon.geometry = newGeometry;
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    // this.updateGeometry();

    // Lo posicionamos a ras del suelo
    // this.mesh.position.y = this.mesh.geometry.parameters.height/2;

    // Imprescindible para que el material sea smoth en vez de flat
    // this.peon.geometry.computeVertexNormals();
  }
}

export { Peon };
