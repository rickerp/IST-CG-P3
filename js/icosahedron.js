import './three.js';

export default class Icosahedron extends THREE.Object3D {
	constructor(x, y, z) {
		super();
		this.material = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true,
		});

		this.geometry = new THREE.Geometry();
		this.createGeometry();

		this.add(new THREE.Mesh(this.geometry, this.material));
		this.position.set(x, y, z);
	}

	createGeometry() {
		let a = (1 + Math.sqrt(5)) / 2; // golden number

		let v0 = new THREE.Vector3(0, 1, a);
		let v1 = new THREE.Vector3(a, 0, 1);
		let v2 = new THREE.Vector3(1, a, 0);

		let v3 = new THREE.Vector3(0, -1, a);
		let v4 = new THREE.Vector3(a, 0, -1);
		let v5 = new THREE.Vector3(-1, a, 0);

		let v6 = new THREE.Vector3(0, -1, -a);
		let v7 = new THREE.Vector3(-a, 0, -1);
		let v8 = new THREE.Vector3(-1, -a, 0);

		let v9 = new THREE.Vector3(0, 1, -a);
		let v10 = new THREE.Vector3(-a, 0, 1);
		let v11 = new THREE.Vector3(1, -a, 0);

		this.geometry.vertices.push(v0);
		this.geometry.vertices.push(v1);
		this.geometry.vertices.push(v2);
		this.geometry.vertices.push(v3);
		this.geometry.vertices.push(v4);
		this.geometry.vertices.push(v5);
		this.geometry.vertices.push(v6);
		this.geometry.vertices.push(v7);
		this.geometry.vertices.push(v8);
		this.geometry.vertices.push(v9);
		this.geometry.vertices.push(v10);
		this.geometry.vertices.push(v11);

		// Icosahedron top
		this.geometry.faces.push(new THREE.Face3(5, 10, 0));
		this.geometry.faces.push(new THREE.Face3(5, 0, 2));
		this.geometry.faces.push(new THREE.Face3(5, 2, 9));
		this.geometry.faces.push(new THREE.Face3(5, 9, 7));
		this.geometry.faces.push(new THREE.Face3(5, 7, 10));

		// Icosahedron middle part top side
		this.geometry.faces.push(new THREE.Face3(2, 0, 1));
		this.geometry.faces.push(new THREE.Face3(0, 10, 3));
		this.geometry.faces.push(new THREE.Face3(10, 7, 8));
		this.geometry.faces.push(new THREE.Face3(7, 9, 6));
		this.geometry.faces.push(new THREE.Face3(9, 2, 4));

		// Icosahedron middle part bottom side
		this.geometry.faces.push(new THREE.Face3(3, 1, 0));
		this.geometry.faces.push(new THREE.Face3(8, 3, 10));
		this.geometry.faces.push(new THREE.Face3(6, 8, 7));
		this.geometry.faces.push(new THREE.Face3(4, 6, 9));
		this.geometry.faces.push(new THREE.Face3(1, 4, 2));

		// Icosahedron bottom
		this.geometry.faces.push(new THREE.Face3(11, 1, 3));
		this.geometry.faces.push(new THREE.Face3(11, 3, 8));
		this.geometry.faces.push(new THREE.Face3(11, 8, 6));
		this.geometry.faces.push(new THREE.Face3(11, 6, 4));
		this.geometry.faces.push(new THREE.Face3(11, 4, 1));
	}
}
