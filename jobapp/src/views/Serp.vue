<template>
  <b-container>
    <Joblist />
    <BreadCrumbTail />
  </b-container>
</template>

<script lang="ts">
  import Joblist from '@/components/Joblist.vue'
  import BreadCrumbTail from '@/components/Breadcrumb.vue'
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
      components: {
          Joblist,
          BreadCrumbTail
      }
  })

  export default class Serp extends Vue{
  }
</script>