import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface TabletShowcaseProps {
  screenImagePath?: string;
}

export default function TabletShowcase({ screenImagePath }: TabletShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const tabletRef = useRef<THREE.Group | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera - positioned for better mobile view
    const camera = new THREE.PerspectiveCamera(
      40, // Wider FOV for larger appearance
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3); // Closer camera
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - Cyber luxe aesthetic
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Cyan key light
    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Violet fill light
    const fillLight = new THREE.DirectionalLight(0xb026ff, 1.0);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    // Blue rim light
    const rimLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
    rimLight.position.set(0, -3, -5);
    scene.add(rimLight);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      '/models/tablet.gltf',
      (gltf: any) => {
        const tablet = gltf.scene;
        tabletRef.current = tablet;

        // Scale and position - LARGER for better visibility
        const box = new THREE.Box3().setFromObject(tablet);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.8 / maxDim; // Much larger!
        
        tablet.scale.set(scale, scale, scale);
        
        // Center the model properly
        const center = box.getCenter(new THREE.Vector3());
        tablet.position.set(
          -center.x * scale,
          -center.y * scale,
          -center.z * scale
        );
        
        // REVERSED: Start facing the user (0 degrees), will rotate away
        tablet.rotation.y = 0;

        // Debug: List all meshes
        console.log('🔍 TABLET MODEL LOADED - Listing all meshes:');
        tablet.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            console.log('  📦 Mesh:', child.name, '| Material:', child.material?.name || 'unnamed');
          }
        });

        // Replace screen material with custom image
        if (screenImagePath) {
          console.log('🖼️ Attempting to load screen image:', screenImagePath);
          
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(
            screenImagePath,
            (texture) => {
              console.log('✅ Screen texture loaded successfully!');
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.flipY = true; // Changed from false to true
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(1, 1); // Flip horizontally (mirror image)

              let screenFound = false;
              
              tablet.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                  const name = child.name.toLowerCase();
                  const matName = child.material?.name?.toLowerCase() || '';
                  
                  // Enhanced detection - check name and material
                  if (name.includes('ekran') || 
                      name.includes('screen') || 
                      name.includes('display') ||
                      matName.includes('ekran') ||
                      matName.includes('screen') ||
                      matName.includes('display')) {
                    
                    // Create bright emissive screen material
                    const newMaterial = new THREE.MeshStandardMaterial({
                      map: texture,
                      emissive: new THREE.Color(0xffffff),
                      emissiveMap: texture,
                      emissiveIntensity: 0.8, // Very bright
                      roughness: 0.05,
                      metalness: 0.0,
                      toneMapped: false
                    });
                    
                    child.material = newMaterial;
                    screenFound = true;
                    console.log('✅ Screen texture applied to:', child.name);
                  }
                }
              });

              if (!screenFound) {
                console.warn('⚠️ No screen mesh found by name. Trying ALL meshes with "tablet" in name...');
                
                let appliedCount = 0;
                tablet.traverse((child: any) => {
                  if (child instanceof THREE.Mesh) {
                    const name = child.name.toLowerCase();
                    if (name.includes('tablet')) {
                      console.log('🔧 Applying texture to:', child.name);
                      child.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        emissive: new THREE.Color(0xffffff),
                        emissiveMap: texture,
                        emissiveIntensity: 0.8,
                        roughness: 0.05,
                        metalness: 0.0,
                        toneMapped: false
                      });
                      appliedCount++;
                      screenFound = true;
                    }
                  }
                });
                
                // NUCLEAR OPTION: If still nothing found, apply to ALL meshes
                if (!screenFound || appliedCount === 0) {
                  console.error('🚨 NUCLEAR OPTION: Applying texture to ALL meshes!');
                  tablet.traverse((child: any) => {
                    if (child instanceof THREE.Mesh) {
                      console.log('💥 Forcing texture on:', child.name);
                      child.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        emissive: new THREE.Color(0xffffff),
                        emissiveMap: texture,
                        emissiveIntensity: 1.0, // Maximum brightness
                        roughness: 0.0,
                        metalness: 0.0,
                        toneMapped: false
                      });
                    }
                  });
                  console.log('💥 Texture applied to ALL meshes - you should see it now!');
                }
              }
            },
            (progress: any) => {
              console.log('Loading texture:', Math.round((progress.loaded / progress.total) * 100) + '%');
            },
            (error: any) => {
              console.error('❌ Error loading screen texture:', error);
              console.log('Make sure image exists at:', screenImagePath);
            }
          );
        } else {
          console.log('⚠️ No screenImagePath provided');
        }

        scene.add(tablet);
        setIsLoaded(true);
      },
      (xhr: any) => {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(`Model loading: ${percentComplete.toFixed(2)}%`);
      },
      (error: any) => {
        console.error('❌ Error loading model:', error);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // REVERSED Scroll handler - rotate tablet AWAY from camera
    const handleScroll = () => {
      if (!containerRef.current || !tabletRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when section is in view
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Progress from when section enters bottom to when it's centered
      let scrollProgress = 0;
      
      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        // Section is visible
        const visibleAmount = Math.min(windowHeight - sectionTop, sectionHeight);
        scrollProgress = visibleAmount / sectionHeight;
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      }
      
      setProgress(scrollProgress);

      // REVERSED: Rotate from 0° (facing camera) to 90° (side view)
      const targetRotation = scrollProgress * (Math.PI / 2);
      
      // Smooth interpolation
      if (tabletRef.current.rotation.y !== targetRotation) {
        tabletRef.current.rotation.y += (targetRotation - tabletRef.current.rotation.y) * 0.1;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [screenImagePath]);

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Background gradient effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/30 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - 3D Model */}
          <div className="relative order-2 lg:order-1">
            <div 
              ref={containerRef} 
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] relative mx-auto"
              style={{ 
                touchAction: 'pan-y',
                maxWidth: '100%',
                overflow: 'hidden'
              }}
            />
            
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                  <span className="font-body text-sm text-gray-500">Loading 3D model...</span>
                </div>
              </div>
            )}
            
            {/* Glow effect behind tablet */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-3xl -z-10" />
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-sm tracking-wider text-cyan-400 uppercase">
                See It In Action
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black mb-6">
              <span className="text-white">Your Brand,</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                Perfectly Showcased
              </span>
            </h2>

            <p className="font-body text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed">
              We create stunning digital experiences that capture attention and drive results. 
              Every pixel is crafted to convert visitors into customers.
            </p>

            {/* Feature points */}
            <div className="space-y-4">
              {[
                'Mobile-responsive design',
                'Lightning-fast performance',
                'Conversion-optimized layouts',
                'Custom animations & interactions'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-body text-gray-300 text-base sm:text-lg">{feature}</span>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-12">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-body text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                  Scroll to explore
                </span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden max-w-xs">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <span className="font-body text-xs sm:text-sm text-cyan-400 font-bold min-w-[3ch]">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}