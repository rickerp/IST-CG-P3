import './three.js';
import Icosahedron from './icosahedron.js';

export default class Sculpture extends THREE.Object3D {
	constructor(x, y, z) {
		super();

		this.createPedestal(0, 0, 0);
		this.createIcosahedron(0, 14, 0);

		this.position.set(x, y, z);
	}

	createPedestal(x, y, z) {
		let material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
		});

		let geometry = new THREE.CylinderGeometry(3, 3, 20, 32);

		let mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		this.add(mesh);

		geometry = new THREE.CubeGeometry(8, 1, 8);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y + 10, z);
		this.add(mesh);
	}

	createIcosahedron(x, y, z) {
		let icosahedron = new Icosahedron(0, 0, 0);
		icosahedron.position.set(x, y, z);
		this.add(icosahedron);
	}
}
