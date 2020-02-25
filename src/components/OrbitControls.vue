
<script lang="ts">
import Vue from 'vue'
import * as VueGL from 'vue-gl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { string } from 'vue-gl/src/validators.js'

export default Vue.extend({
    inject: ['vglNamespace'],
    name: 'OrbitControls',
    props: {
        camera: string,
    },
    computed: {
        cmr () {
            return this.vglNamespace.cameras[this.camera];
        }
    },
    watch: {
        cmr: {
            handler(cmr) {
                const controls = new OrbitControls(cmr)
                controls.addEventListener('change', () => {
                    this.vglNamespace.update();
                });
            },
            immediate: true,
        }
    },
    render(h) {
        return h('div');
    },
})
</script>

<style lang="scss">
.tank { display: block; height: 100%; }
</style>
