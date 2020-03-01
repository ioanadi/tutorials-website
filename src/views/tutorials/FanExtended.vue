<template>
    <div class="fan">
        <div class="fan__items" :style="fanContainerStyle">
            <div
                v-for="(item,i) in links" :key="i"
                class="fan__item"  
                :class="{ 'selected-item': activeItem == i }"
                :style="active ? itemStyleActive(i) : itemStyleStatic(i)"
                @click="cardAction(i)"
            >
                <p>{{item.name}}</p>
            </div>
        </div>

        <p class="fan__link">
            <a href='/tutorials/fan'> Check out the version with picker cards </a>
        </p>
        <p class="fan__link">
            Inspired by: <a href="https://tympanus.net/Tutorials/SwatchBook/index3.html">Swatch Book</a>
        </p>
        <p class="fan__link fan__link-upper">
            <a href='https://github.com/ioanadi/tutorials-website/blob/master/src/views/tutorials/FanExtended.vue'> Source code </a>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

const LINKS = [
    { name: 'Card', color: '#ea2a28' },
    { name: 'Card', color: '#f16629' },
    { name: 'Card', color: '#f89322' },
    { name: 'Card', color: '#dcb722' },
    { name: 'Card', color: '#87b11c' },
    { name: 'Card', color: '#008253' },
    { name: 'Card', color: '#3277b5' },
    { name: 'Card', color: '#4b549f' },
    { name: 'Card', color: '#764394' },
    { name: 'Card', color: '#ca0c86' },
    { name: 'Open', color: '#1c1c1c' },
]
const MAX_ROTATION_ACTIVE = 180
const MAX_ROTATION_STATIC = 20

export default Vue.extend({
    name: 'FanExtended',
    data: function() {
        return {
            maxRotationActive: MAX_ROTATION_ACTIVE,
            maxRotationStatic: MAX_ROTATION_STATIC,
            links: LINKS,
            active: false,
            activeItem: -1,
        }
    },
    computed: {
        fanContainerStyle(): object {
            return {
                'transform': 
                    (this.active ? 'rotate(15deg)' : 'rotate(90deg)') +
                    ' translate3d(' + -170 + 'px, ' +  40 + 'px, 0)'
            }
        },
    },
    methods: {
        itemStyleStatic(i: number) {
            let percentage = i/this.links.length          // item position relative to total items, as percentage
            let rotation = this.maxRotationStatic * percentage

            return {
                'transform': 'rotate(' + rotation +'deg)',
                'background-color': this.links[i].color
            }
        },
        itemStyleActive(i: number) {
            let percentage = i/this.links.length        // item position relative to total items, as percentage
            let rotation = this.maxRotationActive * percentage

            return {
                'transform': 'rotate(' + rotation +'deg)',
                'background-color': this.links[i].color
            }
        },
        cardAction(i: number) {
            if ( i == this.links.length - 1 ) {
                this.active = !this.active
                this.activeItem = -1

            } else {
                this.activeItem = this.activeItem == i ? -1 : i
            }
        }
    },
})
</script>

<style lang="scss">
$card-width : 480px;
$card-height: 120px;

.fan {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    .fan__items {
        position: relative;
        width: $card-width;
        height: $card-height;
        margin-top: 10rem;
        transition: all .5s cubic-bezier(0.33, 0.41, 0.22, 0.83);
        transform: rotate(90deg);
        .fan__item {
            position: absolute;
            top: 0;
            width: $card-width;
            height: $card-height;
            transform-origin: 90% 40%;
            border-radius: 3px;
            box-shadow: -1px -1px 3px rgba(0,0,0,0.1), 11px 11px 18px rgba(0,0,0,0.4), inset 0 3px 0 rgba(255, 255, 255, 0.2);
            transition: all .5s cubic-bezier(0.33, 0.41, 0.22, 0.83);
            &.selected-item {
                transform: translate3d(-200px, -50px, 0) rotate(75deg) !important;
                z-index: 10;
                animation: expand .75s forwards ;

                @keyframes expand {
                    0% { height: $card-height; }
                    100% { height: 500px; }
                }
            }
            p {
                position: absolute;
                bottom: .75rem;
                left: $card-width/3;
                padding: .25rem;
                border: 2px solid pink;
                transform: rotate(-90deg);
                font-size: 1.5rem;
                letter-spacing: .5rem;
                color: pink;
                opacity: 0.6;
            }
        }
    }
    .fan__link {
        position: absolute;
        bottom: 0rem;
        right: 5rem;
        &:nth-child(2) { bottom: 2.5rem; }
        &.fan__link-upper { bottom: unset; top: 0; }
    }
}
</style>
