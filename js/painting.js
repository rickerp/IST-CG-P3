import './three.js';

export default class Painting extends THREE.Object3D {
	constructor(x, y, z) {
		super();
		this.createBackground();
		this.createGrid();
		this.createDots();
		this.createFrame();
		this.position.set(x, y, z);
	}

	createBackground() {
		let material = new THREE.MeshPhongMaterial({
			color: 0x666666,
		});
		let geometry = new THREE.CubeGeometry(0, 19, 25);
		this.add(new THREE.Mesh(geometry, material));
	}

	createGrid() {
		let material = new THREE.MeshPhongMaterial({
			color: 0x000000,
		});
		let geometry = new THREE.CubeGeometry(0, 1.5, 1.5);
		let mesh;
		for (let z = 12; z >= -12; z -= 2) {
			for (let y = 9; y >= -9; y -= 2) {
				mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(0.1, y, z); // 0.1 is to make the squares closer than the background
				this.add(mesh);
			}
		}
	}

	createDots() {
		let material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
		});
		let geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32, 32);
		let mesh;
		for (let z = 10; z >= -12; z -= 2) {
			for (let y = 7; y >= -9; y -= 2) {
				mesh = new THREE.Mesh(geometry, material);
				mesh.rotateZ(Math.PI / 2);
				mesh.position.set(0.6, y + 1, z + 1); // 0.6 is to make the circles closer than background and squares
				this.add(mesh);
			}
		}
	}

	createFrame() {
		let material = new THREE.MeshPhongMaterial({
			color: 0x5c3705,
		});

		let geometry, mesh;

		// top and bottom
		geometry = new THREE.CubeGeometry(0, 1, 27);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(1, 10, 0);
		this.add(mesh);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(1, -10, 0);
		this.add(mesh);

		// left and right
		geometry = new THREE.CubeGeometry(0, 20, 1);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(1, 0, -13);
		this.add(mesh);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(1, 0, 13);
		this.add(mesh);
	}
}
