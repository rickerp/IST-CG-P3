import './three.js';

export default class Room extends THREE.Object3D {
	constructor(x, y, z) {
		super();
		this.material = new THREE.MeshBasicMaterial({
			color: 0xaaaaaa,
		});

		this.createFloor(0, 0, 0);
		this.createWall(-15, 15, 0);
		this.createDivision(-14.9, 0.1, 0);
		this.position.set(x, y, z);
	}

	createFloor(x, y, z) {
		let geometry = new THREE.CubeGeometry(50, 0, 75, 50, 50, 50);
		let floor = new THREE.Mesh(geometry, this.material);
		floor.position.set(x, y, z);
		this.add(floor);
	}

	createWall(x, y, z) {
		let geometry = new THREE.CubeGeometry(1, 35, 75, 50, 50, 50);
		let wall = new THREE.Mesh(geometry, this.material);
		wall.position.set(x, y, z);
		this.add(wall);
	}

	createDivision(x, y, z) {
		let geo = new THREE.CubeGeometry(0, 0, 75, 10, 10, 10);
		let mat = this.material.clone();
		mat.color = new THREE.Color(0x888888);
		let line = new THREE.Mesh(geo, mat);
		line.position.set(x, y, z);
		this.add(line);
	}

	changeMaterial(material) {
		this.children.map(child => {
			var childMat = material.clone();
			childMat.color = child.material.color.clone();
			child.material = childMat;
		});
	}
}
