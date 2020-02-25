<template>
    <div class="home">

        <div class="home__nav">
            <div v-for="(dot,i) in dots" :key="i" :class="['huey-colors nav__dot ' + dot.class]">
                <div class="nav__subdot" v-for="(subD,subI) in dot.subdots" :key="subI" @click="subD.action">
                    <!-- <font-awesome-icon :icon="[i==2 ?'fab':'fa', subD.icon]"/> -->
                    <p>{{subD.title}}</p>
                </div>
                <p class="nav__dot-title">{{dot.content}}</p>
            </div>
        </div>

        <section class="home__section1">
            <div class="home__s1-title custom-text-style">
                <h1>Ioana Dinca <br> web dev  </h1> 
                <h3> &#x25BC; Welcome to my frontend world &#x25BC; </h3>
            </div>
        </section>

        <section class="home__section2">
            <h1 class='home__s2-title custom-text-style'> lighter UI with VueJs </h1>
            
            <div class="home__s2-infobox">
                <p>
                    Fast, easy, clear code = More time for strategy and planning. 
                    Vuejs is a lightweight framework that offers just that.
                    <br>The virtualized DOM, reactivity, component life cycle and easy templating 
                    paves the way to creativity and problem solving thinking. Moreover - the variety of libraries and components on the web makes for a fun dev experience. 
                    <br>
                    Meet some interesting UI examples rewritten with Vue js - even 3D through VGL - and explore fun and impactful libraries such as ScrollMagic in vuejs.
                    
                </p>
            </div>
        </section>

        <section class="home__section3">
            <h1 class="home__s3-title">explore</h1>
            <div class="home__s3-gallery gallery-appear">
                <div class='home__s3-card'>
                    <div class="home__s3-card-content">
                        <h2>Simple UI</h2>
                        <p>
                            An impactful website consists of basic structurs with at least a hint of complexity. Vuejs simplifies writing powerful code for visual complexity. Check out <a href="/#/simple-ui">some examples</a>  and compare the source code. 
                        </p>                        
                    </div>
                </div>
                <div class='home__s3-card'>
                    <div class="home__s3-card-content">
                        <h2>3D animations with VGL</h2>
                        <p>
                            3d effects on simple shapes or on groups of forms have significant potential to enhance the messge of a website. To achieve this, <a href="https://threejs.org/">three.js</a> is a js popular library which uses WebGL. Moreover, for a fast and more structured experience, threejs is integrated in a vue based library - <a href="https://vue-gl.github.io/">VueGl</a>. <a href="/#/vue-gl">Explore some examples!</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="home__section4">
            <h1>contact</h1>
            <div class="home__s4-contact-box">
                <div class="home__s4-contact-section">
                    <font-awesome-icon :icon="['fa', 'envelope']" size="lg"/>
                    <p>ioanamdinca@gmail.com</p>
                </div>
                <div class="home__s4-contact-section">
                    <font-awesome-icon :icon="['fab', 'github']" size="lg"/>
                    <a href="https://github.com/ioanadi">https://github.com/ioanadi</a>
                </div>
                <div class="home__s4-contact-section">
                    <font-awesome-icon :icon="['fab', 'linkedin']" size="lg"/>
                    <a href="https://www.linkedin.com/in/maria-ioana-dinca-7a7352148">www.linkedin.com/in/maria-ioana-dinca-7a7352148'</a>
                </div>
                <div class="home__s4-contact-section">
                    <font-awesome-icon :icon="['fab', 'facebook']" size="lg"/>
                    <a href="https://www.facebook.com/ioana.dinca.7">https://www.facebook.com/ioana.dinca.7</a>
                </div>
                <div class="home__s4-contact-section-img"></div>
            </div>
        </section>

        <span class="credits">Photo by Markus Spiske on Unsplash</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import router from '../router'

const scrollToS2 = function() { document.getElementsByClassName('home__section2')[0].scrollIntoView() }
const scrollToS3 = function() { document.getElementsByClassName('home__section3')[0].scrollIntoView() }
const scrollToS4 = function() { document.getElementsByClassName('home__section4')[0].scrollIntoView() }

const NAV_DOTS = [
    { 
        content: 'Contents', class: 'first', 
        subdots: [
            { icon: 'circle', title: 'Intro',   action: scrollToS2 },
            { icon: 'shapes', title: 'Explore', action: scrollToS3 },
            { icon: 'play',   title: 'Contact', action: scrollToS4 }
        ]
    },
    {
        content: '2D', class: 'second', 
        subdots: [
            { icon: 'circle', title: 'Fan',          action: function() { router.push('/simples/fan') } },
            { icon: 'shapes', title: 'Extended Fan', action: function() { router.push('/simples/fan-extended') } },
            { icon: 'cube',   title: 'Explosion',    action: function() { router.push('/simples/explosion') } }
        ]
    },
    { 
        content: '3D', class: 'thid', 
        subdots: [
            { icon: 'linkedin', title: 'repulsion', action: function() { router.push('/vue-gl/repulsion') } },
            { icon: 'facebook', title: 'cube',      action: function() { router.push('/vue-gl/cube') } },
            { icon: 'github',   title: 'lights',    action: function() { router.push('/vue-gl/lights') } }
        ]
    }
] as Array<any>

export default Vue.extend({
    name: 'home',
    data: function() {
        return {
            dots: NAV_DOTS,
            scenes: [] as Array<any>,
        }
    },
    mounted() {
        this.scenes[0] = this.$scrollmagic.scene({
            triggerElement: 'section.home__section2',
            triggerHook: 'onLeave',
            duration: '150%'
        })
            .setPin("section.home__section2")
            .setTween('.home__s2-infobox p', { 
                css: { 'transform': 'translateX(-1rem) translateY(-3rem)' }
            })
        this.$scrollmagic.addScene(this.scenes[0])

        this.scenes[1] = this.$scrollmagic.scene({
            triggerElement: 'section.home__section2',
            triggerHook: 'onLeave',
            duration: '150%'
        })
            .setTween('.home__s2-infobox', { 
                css: { 'transform': 'translateX(1rem) translateY(2rem)' }
            })
        this.$scrollmagic.addScene(this.scenes[1])

        this.scenes[2] = this.$scrollmagic.scene({
            triggerElement: 'section.home__section2',
            triggerHook: 'onCenter',
        })
            .setClassToggle(".home__s2-title", "animate-text") 
        this.$scrollmagic.addScene(this.scenes[2])
        
        this.scenes[3] = this.$scrollmagic.scene({
            triggerElement: 'section.home__section3',
            triggerHook: 'onLeave',
            duration: '200%'
        })
            .setPin("section.home__section3")
            .setTween('.home__s3-title', { 
                css: { 
                    'transform': 'translateX(-1rem) translateY(-3rem)',
                    'letter-spacing': '2rem',
                    'opacity': 0.2,
                }
            })
        this.$scrollmagic.addScene(this.scenes[3])
        
        this.onResize(null)
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    methods: {
        onResize(event) {
            let innerWidth = event ? event.srcElement.innerWidth : window.innerWidth

            if(innerWidth < 769) {
                console.log('DISABLE')
                this.scenes[0].enabled(false)
                this.scenes[1].enabled(false)
                this.scenes[2].enabled(false)
                this.scenes[3].enabled(false)
            } else {
                console.log('ENABLE')
                this.scenes[0].enabled(true)
                this.scenes[1].enabled(true)
                this.scenes[2].enabled(true)
                this.scenes[3].enabled(true)
            }
        }
    }
})
</script>
<style lang="scss">


$max-content-width: 900px;

$galery-img-width: 375px;

$dot-width: 75px;
$dot-between-distance: 125px;
$first-dot-top-margin: 75px;
$dot-between-distance-mobile: 120px;


.home {
    background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
    @media (min-width: 769px) {
        background: linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), url('../../public/markus-spiske-colors.jpg');
        background-size: cover;
        background-attachment: fixed;
    }

    .credits { 
        display: none;
        position: fixed; bottom: 10px;
        @media (min-width: 769px) { display: block; }
    }
    section { 
        min-height: 100vh; 
        display: flex;
        h1 { 
            color: white; 
            font-size: 50px; 
            opacity: .8; 
            letter-spacing: .45rem;
        }
    }
}
.home__section1 {
    .home__s1-title {
        width: 100%;
        margin-top: 20vh;
        text-align: center;
        color: white;
        h1 {
            margin: 0;
            line-height: 1.2;
            font-size: 2.5rem;
            text-transform: uppercase;
            opacity: 1; 
            @media (min-width: 769px) {
                font-size: 5rem;
            }
        }
    }
}
.home__section2 {
    flex-direction: column;
    h1.home__s2-title {
        width: 20rem;
        padding: 2rem;
        font-size: 1.5rem;
        @media (min-width: 769px) {
            visibility: hidden;
            width: 30rem;
            margin-left: 2*$dot-width;
            font-size: 2rem;
        }
        &.animate-text {
            visibility: visible;
            overflow: hidden;
            border-right: .15em solid #ffaa85;
            white-space: nowrap;
            z-index: 110;
            animation: 
                typing 2s steps(30, end),
                blinking-cursor .75s step-end infinite;
        }
        @keyframes typing {
            from { width: 0 }
            to { 
                width: 20rem;
                @media (min-width: 769px) { width: 30rem; }
            }
        }
        @keyframes blinking-cursor {
            from, to { border-color: transparent }
            50% { border-color: #ffaa85; }
        }
    }
    .home__s2-infobox {
        margin: 0 1rem;
        display: flex;
        justify-content: center;
        background: rgba(241, 241, 241, 0.61);
        @media (min-width: 769px) { margin: 0 2.5*$dot-width; }
        p {
            margin: 0;
            padding: 2rem;
            max-width: $max-content-width;
            box-shadow: 10px 10px 22px 0px rgba(0, 0, 0, 0.5);
            background: rgb(241, 241, 241);
            font-size: 14px;
            color: #717171;
            line-height: 2rem;
            text-align: center;
            @media (min-width: 769px) { margin: 2rem 4rem; font-size: 17px; }
        }
    }
}
.home__section3 {
    padding: 3rem 1rem;
    flex-direction: column;
    @media (min-width: 769px) { padding: 3rem 2*$dot-width; }
    .home__s3-gallery {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        opacity: 0;
        @media (min-width: 769px) { 
            flex-direction: row; 
            flex-wrap: wrap;
        }
        &.gallery-appear { animation: appear .75s forwards 0.3s; }
        .home__s3-card {
            width: 100%;
            margin-top: 1rem;
            background: rgba(241, 241, 241, 0.61);
            background-size: cover;
            @media (min-width: 769px) { 
                width: $galery-img-width;
                height: $galery-img-width*1.15;
            }
            &:nth-child(2) { @media (min-width: 769px) { margin-top: -5rem;  } }

            .home__s3-card-content {
                height: 100%;
                box-shadow: 10px 10px 22px 0px rgba(0, 0, 0, 0.5);
                margin: 0;
                padding: 1rem;
                background: white;
                @media (min-width: 769px) { margin: 2rem; }
                h2, p { color: #717171; text-align: center;}
                p {
                    font-size: 14px;
                    line-height: 2rem;
                    @media (min-width: 769px) { font-size: 17px; }
                }
            }
        }
    }
}
.home__section4 {
    padding: 3rem 1rem;
    flex-direction: column;
    @media (min-width: 769px) { padding: 3rem 2*$dot-width; }
    .home__s4-contact-box {
        padding: 0;
        @media (min-width: 769px) { padding: 4rem; }
        .home__s4-contact-section { 
            padding: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            @media (min-width: 769px) { flex-direction: row; align-items: flex-start; }
            a, p { 
                margin-left: 1rem; 
                display: flex;
                align-items: center;
                font-size: 15px;
                font-weight: bold;
                color: white; 
                @media (min-width: 769px) {  font-size: 17px; }
            }
            svg { 
                height: 2rem; 
                width: 2rem; 
                color: white; 
                @media (min-width: 769px) {
                    height: 3rem; 
                    width: 3rem; 
                }
            }
        }
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
    z-index: 5;
    opacity: .7;
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

    &:hover {
        box-shadow: 10px 10px 22px 0px rgba(0,0,0,0.5);
        opacity: 1;
        transition: all .2 linear;
        .nav__subdot {
            visibility: visible;
            transform: translate3d(0, 50px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(40px, -50px, 0) ; }
        }
        .nav__subdot:nth-child(2) {
            animation-delay: 1s;
            transform: translate3d(0, 130px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(80px, 0px, 0) ; }
        }
        .nav__subdot:nth-child(3) {
            animation-delay: 2s;
            transform: translate3d(0, 210px, 0) rotate(360deg);
            @media (min-width: 769px) { transform: translate3d(40px, 50px, 0); }
        }
        p { opacity: 1 !important; }
    }
    &.rectangle { border-radius: 0; }
    p {
        width: $dot-width/1.75;
        margin: 0.2rem 0 0 0;
        font-weight: bold;
        color: white;
        text-align: center;
        opacity: .7;
        font-size: .7rem;
        word-wrap: break-word;
        opacity: 0;
        @media (min-width: 769px) { width: $dot-width/1.1; }
    }
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
        svg, p { color: white; }
        p {
            width: $dot-width/1.5;
            letter-spacing: 0.02rem;
            font-size: 0.55rem;
            text-align: center;
            word-wrap: break-word;
            @media (min-width: 769px) {
                font-size: 0.7rem;
            }
            
        }
    }
    
}


@keyframes appear {
    to { opacity: 1; }
}
</style>
