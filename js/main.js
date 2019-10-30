import './three.js';
import Room from './room.js';
import Painting from './painting.js';
import Sculpture from './sculpture.js';

var renderer = null;
var scene = null;
var keys = {};
var lastTimestamp = 0;

var cameras = [];
var camera = null;

var painting = null;
var sculpture = null;

function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	createScene();

	createRoom(0, 0, 0);

	painting = createPainting(0, 20, 0);
	sculpture = createSculpture(0, 20, 20);

	cameras[0] = createCamera(10, 20, 0, 0); // ortographic camera
	cameras[1] = createCamera(60, 40, 20, 1); // pespective camera

	camera = cameras[0];
	camera.lookAt(painting.position);
	camera.zoom = 5;
	camera.updateProjectionMatrix();

	cameras[1].lookAt(sculpture.position);
	cameras[1].zoom = 2;
	updateCameras();

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
	window.addEventListener('resize', onResize);

	animate(lastTimestamp);
}

function createScene() {
	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));
}

function createRoom(x, y, z) {
	let room = new Room(x, y, z);
	scene.add(room);
}

function createPainting(x, y, z) {
	let painting = new Painting(x, y, z);
	scene.add(painting);
	return painting;
}

function createSculpture(x, y, z) {
	let sculpture = new Sculpture(x, y, z);
	scene.add(sculpture);
	return sculpture;
}

function updateCameras() {
	// Update ortographic camera
	const min_width = 100 * 2;
	const min_height = 100;

	// Calculate new possible values of width and height
	let height = (window.innerHeight / window.innerWidth) * min_height;
	let width = (window.innerWidth / window.innerHeight) * min_width;

	// Height doesn't fit the screen
	if (height < min_height) {
		// Lock height
		height = min_height;
		// Adjust width
		width = (window.innerWidth / window.innerHeight) * height;
	}

	// Width doesn't fit the screen
	if (width < min_width) {
		// Lock width
		width = min_width;
		// Adjust height
		height = (window.innerHeight / window.innerWidth) * width;
	}

	Object.assign(cameras[0], {
		left: -width / 2,
		right: width / 2,
		top: height / 2,
		bottom: -height / 2,
	});

	// Update perspective camera

	const new_ar = window.innerWidth / window.innerHeight;
	cameras[1].aspect = new_ar;

	cameras.forEach(camera => camera.updateProjectionMatrix());
}

function createCamera(x, y, z, type) {
	let camera;
	if (type === 0) {
		camera = new THREE.OrthographicCamera();
		camera.near = -200;
		camera.far = 500;
	} else if (type === 1) {
		camera = new THREE.PerspectiveCamera();
		camera.fov = 70;
		camera.near = 1;
		camera.far = 1000;
	}

	camera.position.set(x, y, z);
	camera.lookAt(scene.position);
	return camera;
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	updateCameras();
}

function onKeyUp(e) {
	keys[e.keyCode] = false;
}

function onKeyDown(e) {
	keys[e.keyCode] = true;

	switch (e.keyCode) {
		case 49: // 1 upper_camera
			camera = cameras[0];
			break;
		case 50:
			camera = cameras[1];
			break;
	}
}

function render() {
	renderer.render(scene, camera);
}

function update(delta) {
	sculpture.children[2].rotateY(delta * 1.2);
}

function animate(ts) {
	let delta = (ts - lastTimestamp) / 1000;
	lastTimestamp = ts;

	update(delta);
	render();

	requestAnimationFrame(animate);
}

init();
