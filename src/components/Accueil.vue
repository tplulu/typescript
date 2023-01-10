
<script setup>
import { RouterLink } from "vue-router"
import { useUserStore } from "../userStore"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSignIn } from '@fortawesome/free-solid-svg-icons'
import router from "../router"; 
library.add(faUserPlus)
library.add(faSignIn)

let userStore = useUserStore() ;
//$cookies.set('session', 'coucou')

var lecookie1 = $cookies.get('session_connected')
var lecookie2 = $cookies.get('session_pseudo')
var lecookie3 = $cookies.get('session_id')
var lecookie4 = $cookies.get('session_image')

$cookies.remove('session')
</script>
<template>
    <div class="bg-primary">
        <nav class="navbar navbar-expand navbar-dark container">
            <RouterLink :to="{name : 'Home'}" class="navbar-brand">MyNetWork</RouterLink>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <RouterLink :to="{name:'Home'}" class="nav-link">Fils d'actualités</RouterLink>
                </li>
            </ul>
            <div v-if="(userStore.connected==false)"  class="ms-auto">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                     <RouterLink  :to="{name:'Inscription'}" class="nav-link"> <FontAwesomeIcon icon='user-plus' /> Inscription </RouterLink>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <RouterLink :to="{name:'Connection'}" class="nav-link"><FontAwesomeIcon icon='sign-in' /> Connection </RouterLink>
                    
                </li>
            </ul>
            </div>
            <div v-if="(userStore.connected==true)"  class="ms-auto">
            <ul class="navbar-nav ms-auto">
                <img :src="userStore.image" style="max-width: 60px;margin-left: 40px;" alt="">
            </ul>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <button class=" btn btn-dark" @click="deco()"><FontAwesomeIcon icon='sign-in' /> Deconnection </button> 
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    
    import {useUserStore} from "../userStore"

    export default {
        methods : {
            deco : function(){
                this.userStore.deconnection();
                router.push("Connection")
            },
        },
        beforeMount(){
            this.userStore.get_cookie()
            this.userStore.load_accueil()
        },
        data : () => {
            return {
                email : "",
                password : "",
                userStore : useUserStore()
            }
        }
    }
</script>