<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'app',
})
</script>

<style lang="scss">

$dot-width: 75px;
$dot-between-distance: 125px;
$first-dot-top-margin: 60px;

#app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #989393;
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
.nav__dot {
    position: fixed;
    top: 1rem;
    width: $dot-width/1.5;
    height: $dot-width/1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 70px;
    cursor: pointer;
    z-index: 100;
    @media (min-width: 769px) {
        top: $first-dot-top-margin; 
        width: $dot-width;
        height: $dot-width;
    }
    &.first { 
        right: $first-dot-top-margin/2;
        @media (min-width: 769px) { top: $first-dot-top-margin; left: 30px; }
    }
    &.second { 
        right: $first-dot-top-margin/2 + $dot-between-distance/2;
        animation-delay: 1.5s; 
        @media (min-width: 769px) { top: $first-dot-top-margin + $dot-between-distance; left: 30px; }
    }
    &.thid { 
        right: $first-dot-top-margin/2 + $dot-between-distance;
        animation-delay: 3s;
        @media (min-width: 769px) { top: $first-dot-top-margin + 2*$dot-between-distance; left: 30px; }
    }

    &.nav__dot--clicked {
        box-shadow: 10px 10px 22px 0px rgba(0,0,0,0.5);
        transition: all .2 linear;
        .nav__subdot {
            visibility: visible;
            transform: translate3d(0, 60px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(40px, -50px, 0) ; }
        }
        .nav__subdot:nth-child(2) {
            animation-delay: 1s;
            transform: translate3d(0, 120px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(80px, 0px, 0) ; }
        }
        .nav__subdot:nth-child(3) {
            animation-delay: 2s;
            transform: translate3d(0, 180px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(40px, 50px, 0); }
        }
        p { display: block; color: white; opacity: 1;}
        svg.nav__dot-title-svg { display: none; }
    }
    
    &:hover { @media (min-width: 769px) { 
        box-shadow: 10px 10px 22px 0px rgba(0,0,0,0.5);
        transition: all .2 linear;
        .nav__subdot {
            visibility: visible;
            transform: translate3d(0, 60px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(40px, -50px, 0) ; }
        }
        .nav__subdot:nth-child(2) {
            animation-delay: 1s;
            transform: translate3d(0, 120px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(80px, 0px, 0) ; }
        }
        .nav__subdot:nth-child(3) {
            animation-delay: 2s;
            transform: translate3d(0, 180px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(40px, 50px, 0); }
        }
        p { display: block; color: white; opacity: 1;}
        svg.nav__dot-title-svg { display: none; }
    } }
    p {
        margin: 0.2rem 0 0 0;
        font-weight: bold;
        color: white;
        text-align: center;
        opacity: .7;
        font-size: .7rem;
        word-wrap: break-word;
        display: none;
    }
    svg { opacity: 1; color: white;}
    .nav__subdot {
        all: inherit;
        position: absolute;
        top: 0; left: 0;
        width: $dot-width/1.5;
        height: $dot-width/1.5;
        visibility: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all .2s linear;
        @media (min-width: 769px) {
            left: 0;
            width: $dot-width/1.2;
            height: $dot-width/1.2;
        }
        svg  { color: white; }
        p {
            width: $dot-width/1.25;
            letter-spacing: 0.02rem;
            font-size: 0.55rem;
            text-align: center;
            word-wrap: break-word;
            color: white;
            -webkit-text-fill-color: rgb(255, 255, 255); 
            -webkit-opacity: 1; 
            @media (min-width: 769px) {
                font-size: 0.7rem;
            }
            
        }
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
