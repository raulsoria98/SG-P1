import * as THREE from '../libs/three.module.js'
 
class MySphere extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var geom = new THREE.SphereBufferGeometry (1,2,2);
    // Como material se crea uno a partir de un color
    var mat = new THREE.MeshNormalMaterial();
    // var mat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    // mat.flatShading = true;
    // mat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.mesh = new THREE.Mesh (geom, mat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.mesh);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.mesh.position.y = this.mesh.geometry.parameters.radius;
  }
  
  createGUI (gui,titleGui) {
    var that = this;
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radio = 1.0;
      this.segmentosAncho = 2;
      this.segmentosAlto = 2;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radio = 1.0;
        this.segmentosAncho = 2;
        this.segmentosAlto = 2;

        that.updateGeometry();
        that.mesh.position.y = that.mesh.geometry.parameters.radius; 
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 0.5, 5.0, 0.1).name ('Radio : ').listen().onChange(() => { 
      this.updateGeometry();
      this.mesh.position.y = this.mesh.geometry.parameters.radius; 
    });
    folder.add (this.guiControls, 'segmentosAncho', 2, 30, 1).name ('Segmentos Ancho : ').listen().onChange(() => { this.updateGeometry() });
    folder.add (this.guiControls, 'segmentosAlto', 2, 30, 1).name ('Segmentos Alto : ').listen().onChange(() => { this.updateGeometry() });
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  updateGeometry(){
    var newGeometry = new THREE.SphereBufferGeometry(this.guiControls.radio,this.guiControls.segmentosAncho,this.guiControls.segmentosAlto);
    this.mesh.geometry = newGeometry;
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

    // Ponemos movimiento
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;

    // Imprescindible para que el material sea smoth en vez de flat
    this.mesh.geometry.computeVertexNormals();
  }
}

export { MySphere };
