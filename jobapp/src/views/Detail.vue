<template>
  <b-container>
      <DetailOffre v-bind:id="id" />
  </b-container>
</template>

<script lang="ts">
    import {Route} from 'vue-router'
    import { Component, Vue } from 'vue-property-decorator'
    import DetailOffre from '@/components/DetailOffre.vue'
      
    class VueWithRoute extends Vue {
        $route: Route
    }

    @Component({
        components: {
            DetailOffre,
        }
    })

    export default class Jobitem extends VueWithRoute {
        public id: string = ""
        mounted(){
            this.id = this.$route.params.id
        }
    
    } 
  
</script> 