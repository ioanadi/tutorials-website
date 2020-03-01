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
    { path: '/tutorials/repulsion',   name: 'Repulsion - Vue-GL' },
    { path: '/tutorials/fan',         name: 'Fan - Vue ' },
    { path: '/tutorials/explosion',   name: 'Explosion - Vue-scrollmagic' },
    { path: '/',                      name: 'Home' }
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
