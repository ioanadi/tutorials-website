<template>
    <div>
        <div class="nav">
            <div class='huey-colors nav__dot first' @click="$router.push('/')">
                <font-awesome-icon class="nav__dot-title-svg" :icon="['fa', 'arrow-left']" size="lg"/>
                <p class="nav__dot-title"> Back to Homepage </p>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VGLExmaples',
})
</script>

