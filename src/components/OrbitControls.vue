
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
            return (this as any).vglNamespace.cameras[(this as any).camera];
        }
    },
    watch: {
        cmr: {
            handler(cmr) {
                const controls = new OrbitControls(cmr)
                controls.addEventListener('change', () => {
                    (this as any).vglNamespace.update();
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
