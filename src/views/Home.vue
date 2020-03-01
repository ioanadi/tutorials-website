<template>
    <div class="home">

        <div class="nav">
            <div v-for="(dot,i) in dots" :key="i" :class="['huey-colors nav__dot ' + dot.class]">
                <div class="nav__subdot" v-for="(subD,subI) in dot.subdots" :key="subI" @click="subD.action">
                    <font-awesome-icon v-if="i==2" :icon="['fab', subD.icon]" size="lg"/>
                    <p v-else>{{subD.title}}</p>
                </div>
                <p class="nav__dot-title"> {{dot.content}} </p>
                <font-awesome-icon class="nav__dot-title-svg" :icon="['fa', dot.icon]" size="lg"/>
            </div>
        </div>

        <section class="home__section1">
            <div class="home__s1-title custom-text-style">
                <h1>Ioana Dinca <br> web dev  </h1> 
                <h3>  <span>&#x25BC;</span>  Welcome to my frontend world <span>&#x25BC;</span> </h3>
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
                    Meet some interesting UI examples rewritten with Vue js - even 3D through VGL - and explore fun and impactful libraries such as ScrollMagic.
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
                            A mere hint of complexity could lie at the heart of a website. Vuejs simplifies writing powerful code for complex structures. 
                            Check out some examples: <a href="/tutorials/fan"> swatch book</a> or <a href="/tutorials/explosion"> image exploding effect</a>.
                        </p>                        
                    </div>
                </div>
                <div class='home__s3-card'>
                    <div class="home__s3-card-content">
                        <h2>3D with VGL</h2>
                        <p>
                            3d effects engage the user and enhances the messge of a website. 
                            <a href="https://threejs.org/">Three.js</a> is a js popular library which uses WebGL and it's been integrated
                             in a vue based library - <a href="https://vue-gl.github.io/">VueGl</a>.
                            To discover it better,<a href="/tutorials/repulsion"> check out a repulsion 3D effect.</a>
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
function openInNewTab(url: string) {
    var win = window.open(url, '_blank')
    if(win) win.focus()
}
const NAV_DOTS = [
    { 
        content: 'Contents', class: 'first', icon: 'bars',
        subdots: [
            { icon: 'circle', title: 'Intro',   action: scrollToS2 },
            { icon: 'shapes', title: 'Explore', action: scrollToS3 },
            { icon: 'play',   title: 'Contact', action: scrollToS4 }
        ]
    },
    {
        content: 'Tutorials', class: 'second', icon: 'book-open',
        subdots: [
            { icon: 'circle', title: 'Fan',          action: function() { router.push('/tutorials/fan') } },
            { icon: 'shapes', title: 'Repulsion',    action: function() { router.push('/tutorials/repulsion') } },
            { icon: 'cube',   title: 'Explosion',    action: function() { router.push('/tutorials/explosion') } }
        ]
    },
    { 
        content: 'Connect', class: 'thid', icon: 'envelope',
        subdots: [
            { icon: 'github',   title: 'Github',    action: function() { openInNewTab("https://github.com/ioanadi") }},
            { icon: 'linkedin', title: 'Linkedin',  action: function() { openInNewTab("https://github.com/ioanadi") }},
            { icon: 'facebook', title: 'Facebook',  action: function() { openInNewTab("https://github.com/ioanadi") }},
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
            duration: '100%'
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
            duration: '100%'
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
        onResize(event: any) {
            let innerWidth = event ? event.srcElement.innerWidth : window.innerWidth

            if(innerWidth < 600) {
                this.scenes[0].enabled(false)
                this.scenes[1].enabled(false)
                this.scenes[2].enabled(false)
                this.scenes[3].enabled(false)
            } else {
                this.scenes[0].enabled(true)
                this.scenes[1].enabled(true)
                this.scenes[2].enabled(true)
                this.scenes[3].enabled(true)
            }
        },
    }
})
</script>
<style lang="scss">

$max-content-width: 900px;
$galery-img-width: 400px;
$dot-width: 75px;

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
            letter-spacing: .5rem;
        }
    }
}
.home__section1 {
    .home__s1-title {
        width: 100%;
        margin-top: 20vh;
        color: white;
        h1 {
            margin: 0;
            text-align:  center;
            line-height: 1.2;
            font-size: 2.5rem;
            letter-spacing: 1.25rem;
            text-transform: uppercase;
            opacity: 1; 
            @media (min-width: 769px) {
                font-size: 4.5rem;
            }
        }
        h3 { text-align:  center; }
        span { @media (max-width: 769px) { display: none;} }
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
        @media (min-width: 769px) { margin: 0 2.5*$dot-width; }
        p {
            margin: 0;
            padding: 2rem;
            max-width: $max-content-width;
            box-shadow: 10px 10px 22px 0px rgba(0, 0, 0, 0.5);
            background: #ffffffde;
            font-size: 14px;
            line-height: 2rem;
            text-align: center;
            @media (min-width: 769px) { margin: 1rem 2rem; font-size: 17px; }
        }
    }
}
.home__section3 {
    padding: 3rem 1rem;
    flex-direction: column;
    @media (min-width: 769px) { padding: 3rem 1.5*$dot-width; }
    h1 { margin-left: .5*$dot-width; }
    .home__s3-gallery {
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        @media (min-width: 769px) { 
            flex-direction: row; 
        }
        .home__s3-card {
            width: 100%;
            max-width: $galery-img-width/1.4;
            margin-top: 1rem;
            @media (min-width: 900px) { 
                width: $galery-img-width;
                max-width: unset;
                height: $galery-img-width;
            }
            &:nth-child(2) { @media (min-width: 769px) { margin-top: -5rem;  } }

            .home__s3-card-content {
                height: 100%;
                box-shadow: 10px 10px 22px 0px rgba(0, 0, 0, 0.5);
                margin: 0;
                padding: 1.5rem;
                background: #ffffffde;
                @media (min-width: 769px) { margin: 1.5rem; }
                h2, p { text-align: center;}
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
    padding: 2rem 1rem;
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

@keyframes appear {
    to { opacity: 1; }
}
</style>
