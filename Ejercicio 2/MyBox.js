import * as THREE from '../libs/three.module.js'
 
class MyBox extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var geom = new THREE.BoxBufferGeometry (1,1,1);
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
    this.mesh.position.y = this.mesh.geometry.parameters.height/2;
  }
  
  createGUI (gui,titleGui) {
    var that = this;
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;
      
      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;
      
      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 7.0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
        
        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 7.0;

        that.updateGeometry();
        that.mesh.position.y = that.mesh.geometry.parameters.height/2;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen().onChange(() => { this.updateGeometry() });
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen().onChange(() => { this.updateGeometry() });
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen().onChange(() => { this.updateGeometry() });
    
    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  updateGeometry(){
    var newGeometry = new THREE.BoxBufferGeometry(this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    this.mesh.geometry = newGeometry;
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);

    // Para que se mantenga a ras de suelo
    // this.mesh.position.y = this.mesh.geometry.parameters.height/2;

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;

    // Imprescindible para que el material sea smoth en vez de flat
    this.mesh.geometry.computeVertexNormals();
  }
}

export { MyBox };
