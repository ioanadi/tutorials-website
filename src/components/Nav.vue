<template>
    <div id="nav">
        <div class="nav__hamburger" :class="{'expanded': expand}"
            @mouseenter="expand=true" @mouseleave="expand=false" 
        >
            <div class="nav__content" >
                <router-link class="nav__item"
                    v-for="(link,i) in links" :key="i"
                    :to="link.path"
                >{{link.name}}</router-link>
            </div>
            <div v-for="n in [1,2,3]" :key="n" :class="'ham_bar-' + n" ></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    name: 'Nav',
    props: { 
        links: Array as PropType<{path: String, name: String}[]>,
    },
    data: function() {
        return {
            expand: false,
        }
    }
})
</script>
<style scoped lang="scss">

#nav {
    position: fixed;
    top: 0; left: 0;
    z-index: 10;
    padding: 1rem;
    cursor: pointer;
    a {
        margin: .5rem 0;
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #e07dc8;
        }
    }
}
.nav__hamburger {
    width: 15rem;
    opacity: .75;
    transition: all .5s cubic-bezier(0.29, 0.13, 0, 1.87);
    &:hover {
        opacity: 1;
    }
    .ham_bar-1, .ham_bar-2, .ham_bar-3 {
        width: 30px;
        height: 4px;
        margin: 5px 0px;
        border-radius: 4px;
        background-color: #df1b3c; 
        transition: all .5s cubic-bezier(0.29, 0.13, 0, 1.87);
        animation: changecolor 6s infinite linear alternate;
    }
    .ham_bar-1 { animation-delay: .5s; }
    .ham_bar-2 { animation-delay: 1s; }
    .nav__content {
        position: absolute;
        display: flex;
        flex-direction: column;
        transition: all .5s cubic-bezier(0.29, 0.13, 0, 1.87);
        transform: translate3d(0px, -200px, 0);
    }
    &.expanded {
        height: 60px;
        .ham_bar-1 { transform: translate3d(0, 155px, 0); }
        .ham_bar-2 { transform: translate3d(0, 150px, 0); }
        .ham_bar-3 { transform: translate3d(0, 145px, 0); }
        .nav__content { transform: translate3d(0, 0px, 0); }
    }
}

@keyframes changecolor {
    25%   { background-color: #8ceb3e; }
    50%   { background-color: #ec5c23; }
    75%   { background-color: #6147c2; }
    100%  { background-color: #ffbb00; }
}
</style>
