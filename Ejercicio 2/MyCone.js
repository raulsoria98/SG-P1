import * as THREE from '../libs/three.module.js'
 
class MyCone extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var geom = new THREE.ConeGeometry (1,1,6);
    // Como material se crea uno a partir de un color
    var mat = new THREE.MeshNormalMaterial();
    // mat.flatShading = true;
    // mat.needsUpdate = false;
    
    // Ya podemos construir el Mesh
    this.mesh = new THREE.Mesh (geom, mat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.mesh);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.mesh.position.y = this.mesh.geometry.parameters.height/2;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.radio = 1.0;
      this.altura = 1.0;
      this.segmentos = 5.0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.radio = 1.0;
        this.altura = 1.0;
        this.segmentos = 5.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 0.5, 5.0, 0.1).name ('Radio : ').listen().onChange(() => { this.updateGeometry() });
    folder.add (this.guiControls, 'altura', 0.5, 5.0, 0.1).name ('Altura : ').listen().onChange(() => { 
      this.updateGeometry()
      this.mesh.position.y = this.mesh.geometry.parameters.height/2; // Es necesario para que se mantenga a ras del suelo
    });
    folder.add (this.guiControls, 'segmentos', 5, 20, 1).name ('Segmentos : ').listen().onChange(() => { this.updateGeometry() });
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  updateGeometry(){
    var newGeometry = new THREE.ConeGeometry(this.guiControls.radio,this.guiControls.altura,this.guiControls.segmentos);
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

export { MyCone };
