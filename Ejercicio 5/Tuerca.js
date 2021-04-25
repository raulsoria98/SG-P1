import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Tuerca extends THREE.Object3D {
	constructor() {
		super();

		// Un Mesh se compone de geometría y material
		var mat = new THREE.MeshNormalMaterial();

		var cilindro = new THREE.CylinderGeometry(2, 2, 1, 6);
		var esfera = new THREE.SphereGeometry(2.01, 40, 40);
		cilindro.translate(0, cilindro.parameters.height / 2, 0);
		esfera.translate(0, cilindro.parameters.height / 2, 0);

		var points = [
			new THREE.Vector3(0, -0.5, 0),
			new THREE.Vector3(1.2, -0.4, 0),
			new THREE.Vector3(1.1, -0.3, 0),
			new THREE.Vector3(1.2, -0.2, 0),
			new THREE.Vector3(1.1, -0.1, 0),
			new THREE.Vector3(1.2, 0, 0),
			new THREE.Vector3(1.1, 0.1, 0),
			new THREE.Vector3(1.2, 0.2, 0),
			new THREE.Vector3(1.1, 0.3, 0),
			new THREE.Vector3(1.2, 0.4, 0),
			new THREE.Vector3(1.1, 0.5, 0),
			new THREE.Vector3(1.2, 0.6, 0),
			new THREE.Vector3(1.1, 0.7, 0),
			new THREE.Vector3(1.2, 0.8, 0),
			new THREE.Vector3(1.1, 0.9, 0),
			new THREE.Vector3(1.2, 1, 0),
			new THREE.Vector3(1.1, 1.1, 0),
			new THREE.Vector3(1.2, 1.2, 0),
			new THREE.Vector3(1.1, 1.3, 0),
			new THREE.Vector3(1.2, 1.4, 0),
			new THREE.Vector3(1.1, 1.5, 0),
			new THREE.Vector3(1.2, 1.6, 0),
			new THREE.Vector3(0.0, 1.6, 0)
		];

		var tornillo = new THREE.LatheGeometry(points, 25, 0, Math.PI * 2);

		var BSP_esfera = new ThreeBSP(esfera);
		var BSP_cilindro = new ThreeBSP(cilindro);
		var BSP_tornillo = new ThreeBSP(tornillo);

		var parcial = BSP_cilindro.intersect(BSP_esfera);
		var final = parcial.subtract(BSP_tornillo);

		var geometry = final.toGeometry();
		var buffer_geom = new THREE.BufferGeometry().fromGeometry(geometry);

		// Ya podemos construir el Mesh
		this.tuerca = new THREE.Mesh(buffer_geom, mat);

		// Y añadirlo como hijo del Object3D (el this)
		this.add(this.tuerca);
	}

	update(animacion) {

		if (animacion)
			this.tuerca.rotation.y += 0.01;

	}
}

export { Tuerca };
