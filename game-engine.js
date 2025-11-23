class GameEngine {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.dices = [];
        this.isRolling = false;
        this.initScene();
    }

    initScene() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f0f1e);
        this.scene.fog = new THREE.Fog(0x0f0f1e, 100, 1000);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 8);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        this.setupLighting();

        // Background
        this.createBackground();

        // Dices
        this.createDices();

        // Animation loop
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Main light
        const mainLight = new THREE.DirectionalLight(0xffd700, 0.8);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);

        // Point light
        const pointLight = new THREE.PointLight(0x00d4ff, 0.5);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }

    createBackground() {
        // Waterfall particles
        const geometry = new THREE.BufferGeometry();
        const count = 500;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = Math.random() * 15;
            positions[i + 2] = -10;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0xffd700,
            size: 0.15,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(geometry, material);
        this.particles = particles;
        this.scene.add(particles);
    }

    createDices() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        
        // Glass material
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.2,
            metalness: 0.1,
            transparent: true,
            opacity: 0.9
        });

        for (let i = 0; i < 3; i++) {
            const dice = new THREE.Mesh(geometry, material);
            dice.position.x = (i - 1) * 3;
            dice.castShadow = true;
            dice.receiveShadow = true;
            dice.userData = {
                velocity: new THREE.Vector3(),
                angularVelocity: new THREE.Euler(),
                isRolling: false
            };
            this.dices.push(dice);
            this.scene.add(dice);
        }

        this.addDiceNumbers();
    }

    addDiceNumbers() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        for (let num = 1; num <= 6; num++) {
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 200px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(num.toString(), 256, 256);
        }

        const texture = new THREE.CanvasTexture(canvas);
        // In real implementation, apply texture to each face
    }

    rollDices(result = null) {
        if (this.isRolling) return;
        
        this.isRolling = true;

        this.dices.forEach((dice, index) => {
            dice.userData.velocity.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );
            dice.userData.angularVelocity.set(
                Math.random() * Math.PI * 4,
                Math.random() * Math.PI * 4,
                Math.random() * Math.PI * 4
            );
            dice.userData.isRolling = true;
        });

        // Stop rolling after 2 seconds
        setTimeout(() => this.stopDices(result), 2000);
    }

    stopDices(result = null) {
        const targetRotations = result ? this.getTargetRotations(result) : null;

        this.dices.forEach((dice, index) => {
            dice.userData.isRolling = false;
            dice.userData.velocity.set(0, 0, 0);

            if (targetRotations) {
                dice.rotation.copy(targetRotations[index]);
            }
        });

        this.isRolling = false;
    }

    getTargetRotations(result) {
        // Map result to dice rotations
        // result: 'TAI', 'XIU', or 'BAA' (3 of a kind)
        const rotations = [
            new THREE.Euler(),
            new THREE.Euler(),
            new THREE.Euler()
        ];
        // Implementation based on game logic
        return rotations;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update dices
        this.dices.forEach(dice => {
            if (dice.userData.isRolling) {
                dice.position.add(dice.userData.velocity.clone().multiplyScalar(0.016));
                dice.rotation.x += dice.userData.angularVelocity.x * 0.016;
                dice.rotation.y += dice.userData.angularVelocity.y * 0.016;
                dice.rotation.z += dice.userData.angularVelocity.z * 0.016;

                // Damping
                dice.userData.velocity.multiplyScalar(0.98);
                dice.userData.angularVelocity.x *= 0.98;
                dice.userData.angularVelocity.y *= 0.98;
                dice.userData.angularVelocity.z *= 0.98;
            }
        });

        // Update particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 0.05;
                if (positions[i + 1] < 0) {
                    positions[i + 1] = 15;
                }
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}
