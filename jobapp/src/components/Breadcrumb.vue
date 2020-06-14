<template>
    <div class="breadcrumb">
        <ul v-if="breadcrumbList.length > 0">
            <li 
                v-for="(breadcrumb, index) in breadcrumbList" :key="index"
                @click="routeTo(index)"
                :class="{'linked': !!breadcrumb.link}"
            >
            {{ breadcrumb.name}}
            <span v-if="index < (breadcrumbList.length - 1)">/</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Route} from 'vue-router'
    //import BreadCrumb from 'vue-router/types'
    import { Component, Prop, Vue } from 'vue-property-decorator'

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
 
        @Prop() bus: Vue
       
        mounted() {
            this.breadcrumbList = this.$route.meta.breadcrumb
            this.checkBreadName()
        }
        updated() {
            this.checkBreadName()
        }

        checkBreadName() {
            const last: number = this.breadcrumbList.length - 1;
            for(let i= 0; i < this.breadcrumbList.length; i++) {
               
               if(this.bus !== undefined) {
                    this.bus.$on('detailoaded',(data: string) => {
                         this.breadcrumbList[last].name = data
                    })  
               }
                   
                
            }
        }

        routeTo(routeTo: number) {
            if(this.breadcrumbList[routeTo].link) this.$router.push(this.breadcrumbList[routeTo].link)
        }
    }   
  
</script> 

<style lang="scss" scoped>
    .breadcrumb {
        background-color: transparent;
        padding-left: 0;
        padding-right: 0;

        ul {
            display: flex;
            list-style: none;
            padding: 0;

            li {
                margin-right: 6px;

                &.linked {
                    cursor: pointer;
                    color: #007bff;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                span {
                    color: #303030;
                    cursor: default;

                    &:hover {
                        color: #303030;
                        text-decoration: none;
                    }
                }
            }
        }
    }
</style>