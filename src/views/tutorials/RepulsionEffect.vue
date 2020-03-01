<template>
    <div class="repulsion-effect">
        <h1 class="huey-text">Interactive Repulsion Effect <br> With Vue GL</h1>
        <vgl-renderer ref="renderer" antialias alpha shadow-map-enabled style="height: 70vh;">
            <vgl-scene>
                <!-- GRID -->
                <vgl-box-geometry name="box" width=".5" height=".5" depth=".5" ></vgl-box-geometry>
                <vgl-cone-geometry name="cone" radius=".3" height=".5" radial-segments="50"></vgl-cone-geometry>
                <vgl-torus-geometry name="torus" radius=".3" tube=".12" tubular-segments="70" :radial-segments="200"></vgl-torus-geometry>
                <vgl-mesh-physical-material ref="material" name="material"
                    :color="`#${[phR, phG, phB].map(v => parseInt(v).toString(16)).map(v => v.length < 2 ? '0' + v : v).join('')}`"
                ></vgl-mesh-physical-material>
                <vgl-object3d ref="meshesContainer" v-if="cells.length>0" position="0, 0, 0">
                    <vgl-mesh receive-shadow cast-shadow 
                        v-for="(el,i) in cells.flat()" :key="i"
                        :geometry="el.geometry" material='material'
                        :position='el.positionXYZ' :rotation="el.rotation" :scale="el.scale"
                    ></vgl-mesh>
                </vgl-object3d>

                <!-- SHADOW FLOOR -->
                <vgl-plane-geometry name="floor" width=100 height=100></vgl-plane-geometry>
                <vgl-shadow-material name="shadowMat" opacity=.3></vgl-shadow-material>
                <vgl-mesh ref="floorMesh" geometry="floor" material="shadowMat" receive-shadow :rotation="shadowFloorRotation" visible></vgl-mesh>

                <!-- LIGHTS -->
                <vgl-ambient-light
                    :color="`#${[aR, aG, aB].map(v => parseInt(v).toString(16)).map(v => v.length < 2 ? '0' + v : v).join('')}`"
                    :intensity='aIntensity'
                ></vgl-ambient-light>
                <vgl-rect-area-light
                    :color="`#${[rR, rG, rB].map(v => parseInt(v).toString(16)).map(v => v.length < 2 ? '0' + v : v).join('')}`"
                    :intensity="rIntensity" width=1024 height=1024 position="28, 50, 55"
                ></vgl-rect-area-light>
                <!-- <vgl-point-light color="#e000ff" distance="65" intentisyt=1 position="13, 27, 5" cast-shadow ></vgl-point-light> -->
                
                <!-- CAMERA & HELPERS -->
                <vgl-perspective-camera
                    ref="camera" name="camera" 
                    :position="'18 60 7'" fov=20 :aspect="width/height" near=0.1 far=100 rotation="-1.57"
                ></vgl-perspective-camera>
                <vgl-axes-helper size=50 v-if="showAxes"></vgl-axes-helper>
            </vgl-scene>
        </vgl-renderer>
        
        <div class="control-panel">
            <a href='https://github.com/ioanadi/tutorials-website/blob/master/src/views/tutorials/RepulsionEffect.vue'> Source code  </a>
            <h3>Control Panel</h3>
            <div class="panel__item">
                <input type="checkbox" v-model="showAxes">&nbsp;
                <label for="checkbox">Show Axes Helper</label>
            </div>
            <div class="panel__item">
                <p>Ambient Light Color</p>
                <label>R &nbsp;<input type="range" max="255" v-model="aR"></label>&nbsp;
                <label>G &nbsp;<input type="range" max="255" v-model="aG"></label>&nbsp;
                <label>B &nbsp;<input type="range" max="255" v-model="aB"></label>
            </div>
            <div class="panel__item">
                <p>React Area Light Color</p>
                <label>R &nbsp;<input type="range" max="255" v-model="rR"></label>&nbsp;
                <label>G &nbsp;<input type="range" max="255" v-model="rG"></label>&nbsp;
                <label>B &nbsp;<input type="range" max="255" v-model="rB"></label>
            </div>
            <div class="panel__item">
                <p>Physical Material Color</p>
                <label>R &nbsp;<input type="range" max="255" v-model="phR"></label>&nbsp;
                <label>G &nbsp;<input type="range" max="255" v-model="phG"></label>&nbsp;
                <label>B &nbsp;<input type="range" max="255" v-model="phB"></label>
            </div>
            <p>Inspired by <a href="https://tympanus.net/codrops/2018/12/06/interactive-repulsion-effect-with-three-js/">Interactive Repulsion Effect with Three.js</a> </p>
        </div>

        <span class="credits">Photo by Annie Spratt on Unsplash</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as THREE from 'three'

const radians = (degrees: number) => {
  return degrees * Math.PI / 180
}
const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
}
const vector3 = (x: number, y: number, z: number) => {
    return '' + x + ' ' + y + ' ' + z
}
const gutter = 2

export default Vue.extend({
    name: 'RepulsionEffect',
    data: function() {
        return {
            geometries: ['box', 'cone', 'torus'],
            width: window.innerWidth ,
            height: window.innerHeight - 3*window.innerHeight/10,     // because the height is set as 90vh
            mouse3D: { x: 0, y: 0 },
            shadowFloorRotation: vector3(- Math.PI / 2, 0, 0),
            raycaster: new THREE.Raycaster(),

            // Grid //
            grid: { cols: 14, rows: 6 },
            cells: [] as Array<Array<any>>,
            gutter: gutter,
            focusRadius: gutter * 3,

            // Animation //
            rotation: '',
            defaultY: 0,
            focusedY: 10,
            defaultScale: vector3(1, 1, 1),
            focusedScale: vector3(1.5, 1.5, 1.5),
            focusedCenterScale: vector3(2.25, 2.25, 2.25),

            // Control panel //
            showAxes: false,
            aR: 255, aG: 255, aB: 255, aIntensity: 1,    // Ambient light //
            rR: 255, rG: 255, rB: 255, rIntensity: 1,    // Rect area light //
            phR: 255, phG: 255, phB: 255,                // Phisical material //
        }
    },
    computed: {
        gridWidth(): number {
            return this.gutter * this.grid.cols
        },
        gridHeight(): number {
            return this.gutter * this.grid.rows
        }
    },
    mounted: function() {
        this.cells = this.createCells();
        (this as any).$refs.material.inst.emissive = { r: 0, b: 0, g: 0 };
        (this as any).$refs.material.inst.roughness = .18;
        (this as any).$refs.material.inst.metalness = .58;
        (this as any).$refs.renderer.inst.shadowMap.type = THREE.PCFSoftShadowMap
        window.addEventListener('mousemove', this.onMouseMove, { passive: true })
        requestAnimationFrame(this.animate)
    },
    methods: {
        animate(time: any) {
            time *= 0.001;  // convert time to seconds
            this.rotation =  vector3(time, time, time)
            this.draw()
            requestAnimationFrame(this.animate)
        },
        createCells() {
            let cells = []

            for (let row = 0; row < this.grid.rows; row++) {
                let cellsPerRow = []
                for (let col = 0; col < this.grid.cols; col++) {
                    let x = col + col * this.gutter
                    let y = 0
                    let z = row + row * this.gutter
                    let geometry = this.getRandomGeometry()
                    let el = {
                        geometry: geometry,
                        position: { x: x, z: z, y: 0 },
                        positionXYZ: vector3(x, y, z),
                        rotation: this.getDefaultGeometryRotation(geometry),
                        scale: this.defaultScale,
                    }
                    cellsPerRow.push(el)
                }
                cells.push(cellsPerRow)
            }

            return cells
        },
        onMouseMove({ clientX, clientY }: {clientX: number, clientY: number}) {
            this.mouse3D.x = (clientX / this.width) * 2 - 1
            this.mouse3D.y = -(clientY / this.height) * 2 + 1
        },
        draw() {
            this.raycaster.setFromCamera(this.mouse3D, (this as any).$refs.camera.inst)
            const intersects = this.raycaster.intersectObjects([(this as any).$refs.floorMesh.inst])

            if (intersects.length) {
                const { x, z } = intersects[0].point

                for (let row = 0; row < this.grid.rows; row++) {
                    for (let col = 0; col < this.grid.cols; col++) {
                        const mesh = this.cells[row][col]
                        const distanceCursorMesh = distance(x, z, mesh.position.x,  mesh.position.z)

                        if (this.isPointInFocusedArea(distanceCursorMesh)) {
                            const progressionInversed = 1 - distanceCursorMesh/this.focusRadius
                            const focusedScale = 4.5*progressionInversed < 1 ? 1 : 4.5*progressionInversed

                            mesh.scale = vector3(focusedScale, focusedScale, focusedScale)
                            mesh.positionXYZ = vector3(mesh.position.x, 6*progressionInversed, mesh.position.z)
                            mesh.rotation = this.getFocusedGeometryRotation(mesh.geometry, 3*progressionInversed)
                        
                        } else {
                            mesh.positionXYZ = vector3(mesh.position.x, this.defaultY, mesh.position.z)
                            mesh.scale = this.defaultScale
                            mesh.rotation = this.getDefaultGeometryRotation(mesh.geometry)
                        }
                    }
                }
            }
        },

        // HELPERS //
        getDefaultGeometryRotation(geometry: string) {
            let rotationZ = geometry  == 'cone' ? radians(-180) : 0

            return vector3(0, 0, rotationZ)
        },
        getFocusedGeometryRotation(geometry: string, progression: number) {
            return vector3(radians(45)*progression, radians(-90)*progression, radians(90)*progression)
        },
        isPointInFocusedArea(distanceCursorMesh: number) {
            return distanceCursorMesh < this.focusRadius
        },
        getRandomGeometry() {
            return this.geometries[Math.floor(Math.random() * Math.floor(this.geometries.length))]
        },
    },
})
</script>

<style lang="scss">
.repulsion-effect {
    display: block;
    height: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), url('../../../public/annie-spratt.jpg');
    background-attachment: fixed;
    background-position: bottom;
    position: relative;
    h1 {
        position: absolute;
        top: 12rem;
        width: 100%;
        text-align: center;
        margin: 0 auto;
        font-size: 4rem;
        color: rgb(241, 56, 0);
        opacity: .7;
    }
    a { text-align: right; }
}
</style>
