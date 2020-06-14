<template>
  <b-container>
     <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
     </div>
      <BreadCrumbTail />
  </b-container>
</template>

<script lang="ts">
  import BreadCrumbTail from '@/components/Breadcrumb.vue'
   import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
      BreadCrumbTail
  }
})
export default class Home extends Vue{
 
}
</script>
