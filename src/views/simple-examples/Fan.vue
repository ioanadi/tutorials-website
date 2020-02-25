<template>
    <div class="fan">
        <div class="fan__container" :style="fanContainerStyle">
            <div class="fan__item"  v-for="(item,i) in links" :key="i"
                :style="active ? itemStyleActive(i) : itemStyleStatic(i)"
                @click="cardAction(i)"
            >
                <div :class="{ 'selected-item': activeItem == i }"
                    :style="{'background-color': item.color}"
                ><p>{{item.name}}</p></div>
            </div>
        </div>

        <p class="fan__link">
            Inspired by: <a href="https://tympanus.net/Tutorials/SwatchBook/index3.html">Swatch Book</a>
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
    name: 'Fan',
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
    mounted: function() {},
    methods: {
        itemStyleStatic(i: number) {
            let percentage = i/this.links.length          // item position relative to total items, as percentage
            let rotation = this.maxRotationStatic * percentage

            return {
                'transform': 'rotate(' + rotation +'deg)',
            }
        },
        itemStyleActive(i: number) {
            let percentage = i/this.links.length        // item position relative to total items, as percentage
            let rotation = this.maxRotationActive * percentage

            return {
                'transform': 'rotate(' + rotation +'deg)',
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
    .fan__container {
        position: relative;
        width: $card-width;
        height: $card-height;
        margin-top: 15rem;
        transition: all .85s cubic-bezier(0.29, 0.13, 0, 1.87);
        transform: rotate(90deg);
        .fan__item {
            position: absolute;
            top: 0;
            width: $card-width;
            height: $card-height;
            transition: all .85s cubic-bezier(0.29, 0.13, 0, 1.87);
            transform-origin: 90% 40%;
            div {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 3px;
                box-shadow: -1px -1px 3px rgba(0,0,0,0.1), 11px 11px 18px rgba(0,0,0,0.4), inset 0 3px 0 rgba(255, 255, 255, 0.2);
                transition: all .5s cubic-bezier(0.33, 0.41, 0.22, 0.83);
                &.selected-item {
                    transform: translate3d(-140px, 10px, 0);
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
    }
    .fan__link {
        position: absolute;
        bottom: 5rem;
        right: 5rem;
    }
}
</style>
