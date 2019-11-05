import './three.js';

export default class SpotLight extends THREE.Object3D {
	constructor() {
		super();
		this.addCone();
		this.ball = this.addBall();

		this.light = new THREE.SpotLight(0xffffee, 0.4);
		this.add(this.light);
		this.light.position.z = 5;

		this.add(new THREE.AxesHelper(10));
	}

	addCone() {
		let coneGeo = new THREE.CylinderGeometry(3, 0, 10);
		let coneMat = new THREE.MeshBasicMaterial({ color: 0x37aa98 });
		let cone = new THREE.Mesh(coneGeo, coneMat);
		cone.rotateX(Math.PI / 2);

		this.add(cone);
		return cone;
	}

	addBall() {
		let ballGeo = new THREE.SphereGeometry(2, 32, 32);
		let ballMat = new THREE.MeshBasicMaterial({ color: 0xffff99 });
		let ball = new THREE.Mesh(ballGeo, ballMat);
		ball.position.z = 5;

		this.add(ball);
		return ball;
	}

	toggleLight(state = !this.light.visible) {
		this.light.visible = state;
		let color = state ? 0xffff99 : 0x444444;
		this.ball.material.color = new THREE.Color(color);
	}
}
