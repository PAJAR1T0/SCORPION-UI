import * as THREE from 'three';
import { OrbitControls, GLTFLoader, DRACOLoader, arm } from '.';


export class ModelView {
    canvasContainer: HTMLCanvasElement;
    scene!: THREE.Scene;
    renderer!: THREE.WebGLRenderer;
    camera!: THREE.OrthographicCamera;
    ambientLight!: THREE.AmbientLight;
    dracoLoader!: DRACOLoader;
    gltfLoader!: GLTFLoader;
    windowHeight: number;
    windowWidth: number;
    cameraFov!: number;
    cameraAspect!: number;
    cameraNear!: number;
    cameraFar!: number;
    lights!: {x: number, y: number, z: number, intensity: number}[];

    constructor(private hostDiv: HTMLElement) {
        this.canvasContainer = document.createElement('canvas');
        this.canvasContainer.id = 'canvasContainer';
        this.hostDiv.appendChild(this.canvasContainer);
        this.windowWidth = window.innerWidth * .3;
        this.windowHeight = window.innerHeight * .9;
    };

    startThreeJs() {
        this.lights = [{x:3, y:1, z: 0, intensity: 10}, {x:0, y:2, z: 0, intensity: 5},
                       {x:-3, y:1, z: 0, intensity: 10}, {x:0, y:-2, z: 0, intensity: 5}
        ]

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvasContainer,
            antialias: true,
            alpha : true
        });
        this.renderer.setSize(this.windowWidth, this.windowHeight);
        this.scene = new THREE.Scene();
        this.scene.background = null;

        this.lights.forEach((properties) => {
            const light = new THREE.PointLight(0xffffff, properties.intensity);
            light.position.set(properties.x, properties.y, properties.z);
            this.scene.add(light);
        });
        this.ambientLight = new THREE.AmbientLight(0xffffff, 5);
        this.scene.add(this.ambientLight);

        this.cameraFov = 75;
        this.cameraAspect = this.windowWidth / this.windowHeight;
        this.cameraNear = .1;
        this.cameraFar = 1000;
        this.camera = new THREE.OrthographicCamera(-.4*this.cameraAspect, .4*this.cameraAspect, .4, -.4, this.cameraNear, this.cameraFar);
        this.camera.position.z = 1;
        this.camera.position.y = .3;

        this.addCameraRotation();
        this.resizeEventListeners();
    };

    resizeEventListeners() {
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth * .3;
            this.windowHeight = window.innerHeight * .9;
            this.renderer.setSize(this.windowWidth, this.windowHeight);
            this.camera.updateProjectionMatrix();
            this.renderer.render(this.scene, this.camera);
        })
    }

    addCameraRotation() {
        const control = new OrbitControls(this.camera, this.canvasContainer);
        control.addEventListener('change', () => this.renderer.render(this.scene, this.camera));
    }

    loadModel() {
        this.startThreeJs();
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath('/draco/');
        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.setDRACOLoader(this.dracoLoader);
        this.gltfLoader.load(arm, (gltf) => {
            gltf.scene.position.set(-.03,-.21,0);
            gltf.scene.rotateY(-60 * (Math.PI) / 180);
            this.scene.add(gltf.scene);
            this.renderer.render(this.scene, this.camera);
        });
    };
};