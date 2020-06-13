<template>
  <b-container>
    <Joblist />
  </b-container>
</template>

<script lang="ts">
  import Joblist from '@/components/Joblist.vue'
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
      components: {
          Joblist
      }
  })

  export default class Serp extends Vue{
     
  }
</script>