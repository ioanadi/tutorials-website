<template>
    <div>
        <Nav :links='links'/>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from '@/components/Nav.vue'

const LINKS = [
    { path: '/vue-gl/repulsion',   name: 'ThreeJS Repulsion' },
    { path: '/vue-gl/cube',        name: 'ThreeJS Cube' },
    { path: '/vue-gl/lights',      name: 'ThreeJS Lights' },
    { path: '/',                   name: 'Home' }
] 

export default Vue.extend({
    name: 'VGLExmaples',
    components: { Nav },
    data: function() {
        return { links: LINKS }
    }
})
</script>

<style lang="scss">

</style>
