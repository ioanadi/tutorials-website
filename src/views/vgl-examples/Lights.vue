<template>
  <div class="lights">

  <vgl-renderer antialias style="height: 90vh;">
    <vgl-scene>
        <vgl-plane-geometry name="plane" width=40 height=40 ></vgl-plane-geometry>
        <vgl-texture src="checker.png" name="texture" repeat="20, 20" wrap-s="repeat" wrap-t="repeat" mag-filter="nearest" ></vgl-texture>
        <vgl-mesh-phong-material name="checker" map='texture' side="double"></vgl-mesh-phong-material>
        <vgl-mesh geometry="plane" material='checker' :rotation="'' + Math.PI * -.5 + ' 0'"></vgl-mesh>

        <vgl-box-geometry name="cube" width=4 height=4 depth=4></vgl-box-geometry>
        <vgl-mesh-phong-material name="cubeMaterial" color="#8AC"></vgl-mesh-phong-material>
        <vgl-mesh geometry="cube" material='cubeMaterial' position="5 2 0"></vgl-mesh>

        <vgl-sphere-geometry name="sphere" radius='3' width-segments='32' height-segments='16'></vgl-sphere-geometry>
        <vgl-mesh-phong-material name="spherrMaterial" color="#CA8"></vgl-mesh-phong-material>
        <vgl-mesh geometry="sphere" material='spherrMaterial' position="-4 5 0"></vgl-mesh>

        <vgl-axes-helper size=50></vgl-axes-helper>
        <vgl-directional-light name="light" target-position="-5 0 0" position="0 10 0" color="#fff" intensity=1></vgl-directional-light>
        <vgl-directional-light-helper light="light" :size="1"></vgl-directional-light-helper>
    </vgl-scene>
    
    <vgl-perspective-camera name="pCamera" :orbit-position="cameraPosition" fov=45 aspect=2 near=0.1 far=100></vgl-perspective-camera>
    <OrbitControls camera="pCamera"></OrbitControls>
  </vgl-renderer>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import OrbitControls from '../../components/OrbitControls.vue'

export default Vue.extend({
    name: 'Lights',
    components: { OrbitControls },
    data: function() {
        return {
            rotation: '',
            rotationx: 0,
            cameraPosition: '70 1.15 .7'
        }
    },
    mounted: function() {
        requestAnimationFrame(this.animate)
    },
    methods: {
        animate(time: number) {
            time *= 0.001;  // convert time to seconds
            this.rotation =  '0 ' + time
            // this.cameraPosition = '5  ' + time + '.7'

            requestAnimationFrame(this.animate);
        }
    },
})
</script>

<style lang="scss">
.lights { display: block; height: 100%; }
</style>
