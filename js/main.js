import './three.js';
import Room from './room.js';
import Painting from './painting.js';
import Sculpture from './sculpture.js';
import SpotLight from './spotlight.js';

var renderer = null;
var scene = null;
var keys = {};
var lastTimestamp = 0;

var cameras = [];
var camera = null;

var materials = [];
var material = null;

var dirLight = null;
var spotlights = [];

var room = null;
var painting = null;
var sculpture = null;

function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	addScene();

	materials[0] = new THREE.MeshBasicMaterial();
	materials[1] = new THREE.MeshPhongMaterial();
	materials[2] = new THREE.MeshLambertMaterial();
	material = materials[0];

	room = addRoom(0, 0, 0);
	painting = addPainting(-15, 16, 8);
	sculpture = addSculpture(-8, 12, -15);

	dirLight = addDirLight(100, 100, 0);
	spotlights[0] = addSpotLight(15, 35, 30);
	spotlights[1] = addSpotLight(15, 35, -30);
	spotlights[2] = addSpotLight(-15, 35, 30);
	spotlights[3] = addSpotLight(-15, 35, -30);

	cameras[0] = addCamera(
		painting.position.x + 10,
		painting.position.y,
		painting.position.z,
		0
	); // ortographic camera
	cameras[1] = addCamera(40, 30, 0, 1); // pespective camera
	camera = cameras[1];

	cameras[0].lookAt(painting.position);
	cameras[1].lookAt(0, 15, 0);
	cameras[0].zoom = 5;
	cameras[1].zoom = 1;
	camera.updateProjectionMatrix();
	updateCameras();

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
	window.addEventListener('resize', onResize);

	animate(lastTimestamp);
}

//////////// ADD FUNCTIONS ////////////

function addSpotLight(x, y, z) {
	let light = new SpotLight();
	light.position.set(x, y, z);
	scene.add(light);
	light.lookAt(scene.position);
	return light;
}

function addDirLight(x, y, z) {
	let light = new THREE.DirectionalLight(0xffffff, 0.9);
	light.position.set(x, y, z);
	scene.add(light);
	return light;
}

function addRoom(x, y, z) {
	let room = new Room(x, y, z);
	scene.add(room);
	return room;
}

function addPainting(x, y, z) {
	let painting = new Painting(x, y, z);
	scene.add(painting);
	return painting;
}

function addSculpture(x, y, z) {
	let sculpture = new Sculpture(x, y, z);
	scene.add(sculpture);
	return sculpture;
}

function addCamera(x, y, z, type) {
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

function addScene() {
	scene = new THREE.Scene();
}

//////////// UPDATE FUNCTIONS ////////////

function updateCameras() {
	// Update ortographic camera
	const min_width = 100 * 2;
	const min_height = 100;

	// Calculate new possible values of width and height
	let height = (window.innerHeight / window.innerWidth) * min_height;
	let width = (window.innerWidth / window.innerHeight) * min_width;

	// Height doesn't fit the screen
	if (height < min_height) {
		height = min_height; // Lock height
		width = (window.innerWidth / window.innerHeight) * height; // Adjust width
	}

	// Width doesn't fit the screen
	if (width < min_width) {
		width = min_width; // Lock width
		height = (window.innerHeight / window.innerWidth) * width; // Adjust height
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
		case 53: // 5 - upper_camera
			camera = cameras[1];
			break;
		case 54: // 6 - front_camera
			camera = cameras[0];
			break;
		case 49:
		case 50:
		case 51:
		case 52:
			spotlights[e.keyCode - 49].toggleLight();
			break;

		case 81: // Q - toggle dir_light
			dirLight.visible = !dirLight.visible;
			break;
		case 87: // W - toggle basic/non-basic
			material = materials[materials.indexOf(material) ? 0 : 2];
			break;
		case 69: // E - toggle phong/lambert
			if (materials.indexOf(material)) {
				material = materials[materials.indexOf(material) - 1 ? 1 : 2];
			}
			break;
	}
}

function render() {
	renderer.render(scene, camera);
}

function updateMaterials() {
	room.changeMaterial(material);
	sculpture.changeMaterial(material);
	painting.changeMaterial(material);
}

function update(delta) {
	sculpture.ico.rotateY(delta * 1.2);
	updateMaterials();
}

function animate(ts) {
	let delta = (ts - lastTimestamp) / 1000;
	lastTimestamp = ts;

	update(delta);
	render();

	requestAnimationFrame(animate);
}

init();
