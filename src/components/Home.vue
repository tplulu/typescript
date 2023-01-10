<script setup>
import { useUserStore } from "../userStore"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
let userStore = useUserStore() ;
library.add(faUserPlus)
library.add(faThumbsUp)
</script>
<template>
    <div style="">
    <div class="row">
        <div class="col-sm-9 mx-auto">
            <div class="card" style="background-color: #e3e3e3;">
            <div class="col-sm-10 mx-auto">
        <h1 class="ms-5"><FontAwesomeIcon icon='user-plus' />Nouveau post </h1>
        <form @submit.prevent="submit($event)">
            <textarea class="form-control" placeholder="texte" v-model="texte" rows="3" style=" margin-bottom: 10px;"></textarea>
            <input type="text" v-model="urlimage" placeholder="Url de votre image" class="form-control me-2 " style=" margin-bottom: 10px;">
            
            <div class="text-center mt-3">
                <input type="submit" v-if="(userStore.connected==true)" value="Poster !" class="btn btn-success" style="margin-bottom: 10px;">
                <input type="button" v-if="(userStore.connected==false)" disabled value="Connectez vous pour poster " class="btn btn-success" style="margin-bottom: 10px;">
            </div>
        </form>
    </div>
    </div>
    </div>
    </div>
    <div class="col-sm-11 mx-auto">
    <div class="row" v-for="todo , index in userStore.post" :key="index" style="margin-bottom: 10px;">
        <div class="card" style="background-color: #e3e3e3;">
            <div class="card" style="margin-top: 10px;">
                <div class="card-header">
                    {{ todo.pseudo }}
                    <img :src="userStore.list_pp[todo.pseudo]" style="max-width: 70px;" alt="">
                </div>
                <div class="card-body">    
                    <div> <img :src="todo.urlImgArticle" style="height: 200px;" alt=""> </div>
                    {{ todo.contenu }}
                </div>
                <div v-if="(userStore.connected==true)" class="card-footer">    
                    
                    <button class="btn btn-secondary" v-if="(todo.as_voted.indexOf(userStore.pseudo) === -1)" @click="userStore.jaime(todo.id,userStore.pseudo)"> <FontAwesomeIcon icon='thumbs-up' /> {{ todo.like }} {{todo.as_voted.indexOf(todo.pseudo) }} {{todo.pseudo}}</button>
                    <button class="btn btn-primary" v-if="(todo.as_voted.indexOf(userStore.pseudo) !== -1)" @click="userStore.jaimeplu(todo.id,userStore.pseudo)"> <FontAwesomeIcon icon='thumbs-up' /> {{ todo.like }} </button>
                </div>
                <div v-if="(userStore.connected!=true)" class="card-footer">    
                    
                    <button class="btn btn-secondary"  > <FontAwesomeIcon icon='thumbs-up' /> {{ todo.like }} </button>
                </div>
            </div>
            <h1>Commentaires  :</h1>
            <div class="col-sm-8 ">
            <form @submit.prevent="submit2($event,todo.id)">
                <textarea class="form-control" placeholder="Nouveau commentaire" v-model="text_comment" rows="3" style=" margin-bottom: 10px;"></textarea>
                <div class="text-center mt-3">
                    <input v-if="(userStore.connected==true)" type="submit" value="Envoyer commentaire" class="btn btn-success" style="margin-bottom: 10px;">
                    <input v-if="(userStore.connected==false)" type="button" disabled value="Connectez vous pour commenter" class="btn btn-success" style="margin-bottom: 10px;">
                </div>
            </form>
            <div class="card" v-for="(liste , index2) in todo.commentaires" :key="index2">  
                <div class="card-footer">
                    {{ liste.pseudo }}
                    <div class="card-footer">   
                        {{ liste.contenu }}
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div>

</div>
</template>


<script>
    import Swal from 'sweetalert2'
    import {useUserStore} from "../userStore"

    export default {
        methods : {
            submit : function(){
                if(!this.texte ) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Merci de mettre un texte'
                    })
                }
                else {            
                    const profil = {id : Date.now() , contenu : this.texte , urlImgArticle : this.urlimage, pseudo : this.userStore.pseudo}
                    console.log(profil)
                    this.userStore.new_post(profil); 
                    this.urlimage =""
                    this.texte = ""
                }
            },
            submit2 : function(event, idpost){
                if(!this.text_comment ) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Merci de mettre un commentaire'
                    })
                }
                else {            
                    const profil = {id : Date.now() , contenu : this.text_comment , pseudo : this.userStore.pseudo, dt : Date.now(), idpost : idpost}
                    console.log(profil)
                    this.userStore.new_comment(profil); 
                    this.text_comment=""
                }
            },
            get_image_profil : async function({pseudo}){
                const reponsereq = await fetch(`http://localhost:3400/utilisateurs?pseudo=${pseudo}`)
                const data = await reponsereq.json();
                if (data.length==1) {
                   console.log(data[0]['urlImgProfil'])
                   return data[0]['urlImgProfil']
                }
            },
            
        },
        beforeMount(){

        },
        created: function () {
            
        },
        data : () => {
            return {
                email : "",
                password : "",
                texte : "",
                text_comment :"",
                urlimage : "",
                userStore : useUserStore()
            }
        }
    }
</script>