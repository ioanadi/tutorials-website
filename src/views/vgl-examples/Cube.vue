<template>
    <div class="tank">

        <vgl-renderer antialias alpha style="height: 80vh;">
            <vgl-scene>
                <vgl-box-geometry name="box" width=1 height=1 depth=1></vgl-box-geometry>
                <vgl-texture src="bence-dots.jpg"           name="texture1"></vgl-texture>
                <vgl-texture src="barballis-fence.jpg"      name="texture2"></vgl-texture>
                <vgl-texture src="harper-window.jpg"        name="texture3"></vgl-texture>
                <vgl-texture src="jasmin-sky.jpg"           name="texture4"></vgl-texture>
                <vgl-texture src="jon-tyson-flowers.jpg"    name="texture5"></vgl-texture>
                <vgl-texture src="webb-rocks.jpg"           name="texture6"></vgl-texture>
                <vgl-mesh-basic-material name="basic1" map='texture1'></vgl-mesh-basic-material>
                <vgl-mesh-basic-material name="basic2" map='texture2'></vgl-mesh-basic-material>
                <vgl-mesh-basic-material name="basic3" map='texture3'></vgl-mesh-basic-material>
                <vgl-mesh-basic-material name="basic4" map='texture4'></vgl-mesh-basic-material>
                <vgl-mesh-basic-material name="basic5" map='texture5'></vgl-mesh-basic-material>
                <vgl-mesh-basic-material name="basic6" map='texture6'></vgl-mesh-basic-material>
                <vgl-mesh geometry="box" :material='["basic1", "basic2", "basic3", "basic4", "basic5", "basic6"]' :rotation="rotation"></vgl-mesh>

                <vgl-axes-helper size=2></vgl-axes-helper>
            </vgl-scene>
            
            <vgl-perspective-camera ref="camera" name="camera" orbit-position="4 1 .7" fov=75 aspect=2 near=0.1 far=10></vgl-perspective-camera>
            <OrbitControls camera="camera"></OrbitControls>
        </vgl-renderer>

        <div class="control-panel">
            <p>Rotation</p>
            <div class="panel__item"><input type="checkbox" v-model="rotationX">&nbsp;<label for="checkbox">X</label></div>
            <div class="panel__item"><input type="checkbox" v-model="rotationY">&nbsp;<label for="checkbox">Y</label></div>
            <div class="panel__item"><input type="checkbox" v-model="rotationZ">&nbsp;<label for="checkbox">Z</label></div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import OrbitControls from '../../components/OrbitControls.vue'

const vector3 = (x: number, y: number, z: number) => {
    return '' + x + ' ' + y + ' ' + z
}

export default Vue.extend({
    name: 'Tank',
    components: { OrbitControls },
    data: function() {
        return {
            rotation: '',
            rotationX: 0,
            rotationY: 1,
            rotationZ: 0
        }
    },

    mounted: function() {
        requestAnimationFrame(this.animate)
    },
    methods: {
        animate(time: number) {
            time *= 0.001;  // convert time to seconds
            this.rotation = vector3(this.rotationX*time, this.rotationY*time, this.rotationZ*time)

            requestAnimationFrame(this.animate);
        }
    },
})
</script>

<style lang="scss">
.tank { display: block; height: 100%; }
</style>
