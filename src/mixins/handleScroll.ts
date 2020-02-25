import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            minPosition: 5,
            maxPosition: 500,
            scrolled: false,
            lastPosition: 0,
        }
    },
    computed: {
        scrollPercentage(): number {
            // Calculates the distace in percentage between minPosition and maxPosition //
            return this.lastPosition < this.minPosition ?
                1 : (
                    this.lastPosition - this.minPosition > this.maxPosition ? 0 : 1 - this.lastPosition / this.maxPosition
                )
        },
        scrollPercentageInversed(): number {
            return 1 - this.scrollPercentage
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            if (this.lastPosition < window.scrollY) {
                this.scrolled = true
            }
            if (window.scrollY <= this.minPosition) {
                this.scrolled = false
            } 
            this.lastPosition = window.scrollY
        }
    },
})
