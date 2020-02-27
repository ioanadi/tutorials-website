<template>
    <div id="app">
        <!-- <Nav v-if="$route.path!='/'"/> -->
        <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'home',
})
</script>

<style lang="scss">
#app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #3c3939;
}
.fixed-full-width {
    position: fixed;
    right: 0;
    left: 0;
}
.custom-text-style {
    text-transform: capitalize;
    letter-spacing: 0.2rem;
    @media (min-width: 769px) {
        letter-spacing: 0.5rem;
    }
}
.huey-colors {
    background-image: -webkit-linear-gradient(75deg, #ff25be, #fd63b8);
    animation: hue 7.5s infinite linear;
    
    @keyframes hue {
        from { filter: hue-rotate(0deg); }
        to   { filter: hue-rotate(-360deg); }
    }
}
.control-panel {
    display: flex;
    flex-direction: column;
    padding: 2rem 5rem;
}
.credits {
    position: absolute;
    bottom: 1rem;
    right: 0;
    font-size: .5rem;
    letter-spacing: .15rem;
    @media (min-width: 769px) {
        font-size: .75rem;
        letter-spacing: .25rem;
    }
}
a {
    text-decoration: none;
    color: hotpink;
    &:hover {
       color: hotpink;
       text-decoration: underline;
    }
}


</style>
