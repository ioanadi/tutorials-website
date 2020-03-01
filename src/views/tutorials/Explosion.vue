<template>
    <div ref="explosion" class="explosion-page">
        <div class="explosion-link"> <a href='https://github.com/ioanadi/tutorials-website/blob/master/src/views/tutorials/Explosion.vue'> Source code  </a></div>
        <div class="explosion-container">
            <h1>Scroll down</h1>
            <div class="explosion">
                <div 
                    v-for="n in blocks" :key="n" 
                    :class="'explosion__' + n"
                    :style="blockStyle(n)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
    name: 'Explosion',
    data: function() {
        return {
            blocks: [1,2,3,4,5,6,7,8,9],
            progress: 0,
        }
    },
    mounted() {
        const scene = this.$scrollmagic.scene({
            triggerElement: '.explosion-container',
            triggerHook: 'onLeave',
            duration: '400%'
        })
            .setPin(".explosion-container")
            .on("progress", (event: any) => { 
                this.progress = event.progress 
            });
        this.$scrollmagic.addScene(scene)
    },
    methods: {
        blockStyle(n: number) {
            let rate = 220
            let movementDistance = (this as any).progress * rate
            let orientationX = [1,4,7].includes(n) ? movementDistance * -1 : 
                ( [2,8,5].includes(n) ? 0 : movementDistance )
            let orientationY = [1,2,3].includes(n) ? movementDistance * -1 :
                ( [4,6,5].includes(n) ? 0 : movementDistance )

            return {
                transform:
                    'translate3d(' + orientationX.toFixed(1) + 'px, ' +  orientationY.toFixed(1) + 'px, 0)' +
                    'rotateY(' + 90*(this as any).progress + 'deg)'
            }
        }
    }
})
</script>

<style lang="scss">

$explosion-width: 500px;
$explosion-height: 390px;
// $explosion-width-mobile: 135px;

.explosion-page { 
    background-image: linear-gradient(-45deg, #07101b, #bbc5cc);
    background-attachment: fixed;
    position: relative;
    .explosion-container {
        width: 100%;
        min-height: 100vh;
        padding: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h1 {
            color: white;
            letter-spacing: 1.2rem;
            opacity: .7;
        }
    }
    .explosion-link { 
        position: absolute;
        right: 2rem; top: 2rem;
        z-index: 1000;
    }
}
.explosion {
    width: $explosion-width;
    height: $explosion-height;
    display: flex;
    flex-wrap: wrap;
    z-index: 100;
    div {
        width: $explosion-width/3;
        height: $explosion-height/3;
        background-image: url("../../../public/bubu.jpg");
        background-size: $explosion-width $explosion-height;
        box-shadow: '10px 10px 22px 0px rgba(0,0,0,0.5)';
        &.explosion__1 { background-position: left top; }
        &.explosion__2 { background-position: center top; }
        &.explosion__3 { background-position: right top; }
        &.explosion__4 { background-position: left center; }
        &.explosion__5 { background-position: center center; }
        &.explosion__6 { background-position: right center; }
        &.explosion__7 { background-position: left bottom; }
        &.explosion__8 { background-position: center bottom; }
        &.explosion__9 { background-position: right bottom; }
    }
}
</style>
