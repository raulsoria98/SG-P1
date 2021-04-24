import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Porsche extends THREE.Object3D {
  constructor() {
    super();

    var that = this;
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('../models/porsche911/911.mtl', (materials) => {
      objectLoader.setMaterials(materials);
      objectLoader.load('../models/porsche911/Porsche_911_GT2.obj', (object) => {
        that.modelo = object;
        that.add(that.modelo);
      }, null, null);
    })

    this.rotation.y = Math.PI
  }

  update(animacion) {

    if (animacion)
      this.modelo.rotation.y += 0.01;

  }
}

export { Porsche };
