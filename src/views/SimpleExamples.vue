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
    { path: '/simples/fan',             name: 'Fan' },
    { path: '/simples/fan-extended',    name: 'Fan Extended' },
    { path: '/simples/explosion',       name: 'Explosion' },
    { path: '/',                        name: 'Home' }
]

export default Vue.extend({
    name: 'SimpleExamples',
    components: { Nav },
    data: function() {
        return { links: LINKS }
    }
})
</script>

<style lang="scss">

</style>
