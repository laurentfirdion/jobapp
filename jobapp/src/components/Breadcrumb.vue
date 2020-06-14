<template>
    <div class="breadcrumb">
        <ul v-if="breadcrumbList.length > 0">
            <li 
                v-for="(breadcrumb, index) in breadcrumbList" :key="index"
                @click="routeTo(index)"
                :class="{'linked': !!breadcrumb.link}"
            >
            {{index !== breadcrumbList.length ? breadcrumb.name + " / " : breadcrumb.name}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Route} from 'vue-router'
    //import BreadCrumb from 'vue-router/types'
    import { Component, Vue } from 'vue-property-decorator'

    class VueWithRoute extends Vue {
        $route: Route
    }

    class RouterBread {
        [index: number]: number;
        link: string;
        name: string
    } 

    @Component
    export default class BreadCrumbTail extends VueWithRoute {
        public breadcrumbList: RouterBread[] = [new RouterBread()]
 
       
        mounted() {
            this.breadcrumbList = this.$route.meta.breadcrumb
        }

        routeTo(routeTo: number) {
            if(this.breadcrumbList[routeTo].link) this.$router.push(this.breadcrumbList[routeTo].link)
        }
    }   
  
</script> 

<style lang="scss" scoped>
    .breadcrumb {
        background-color: transparent;

        ul {
            display: flex;
            list-style: none;

            li {
                margin-right: 15px;

                &.linked {
                    cursor: pointer;
                    color: #007bff;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>