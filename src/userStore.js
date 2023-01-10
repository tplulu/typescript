import {defineStore} from "pinia"
import Swal from 'sweetalert2'
import router from "./router"; 
export const useUserStore = defineStore("userStore" , {
    state : () => {
        return {
            post : [],
            connected : false,
            pseudo :"",
            id : 0,
            image :"",
            list_pp : []
        }
    },
    actions : {
        authentification : async function({email, password}){
            const reponsereq = await fetch(`http://localhost:3400/utilisateurs?email=${email}&password=${password}`)
            const data = await reponsereq.json();
            if (data.length==1) {
                this.connected=true
                this.pseudo=data[0]['pseudo']
                this.id=data[0]['id']
                this.image=data[0]['urlImgProfil']
                $cookies.set('session_connected', true)
                $cookies.set('session_pseudo', data[0]['pseudo'])
                $cookies.set('session_id', data[0]['id'])
                $cookies.set('session_image', data[0]['urlImgProfil'])
            }
        },
        get_cookie : async function() {
            if ($cookies.isKey('session_id')) {
                var cookies_pseudo = $cookies.get('session_pseudo')
                var cookies_id = $cookies.get('session_id')
                var cookies_image = $cookies.get('session_image')
                this.connected=true
                this.pseudo=cookies_pseudo
                this.id=cookies_id
                this.image=cookies_image
            }
        },
        create : async function({email, password, pseudo, image }){
            if (image=='' ) {
                image = "https://thispersondoesnotexist.com/image"
            }
            const newuser = { id : Date.now() , pseudo : pseudo, email : email, password : password, urlImgProfil : image }
            const options = {
                method : "POST",
                body : JSON.stringify(newuser),
                headers : {
                    "content-type" : "application/json"
                }
            }
            await fetch("http://localhost:3400/utilisateurs" , options);
            Swal.fire({
                icon: 'success',
                title: 'Merci !',
                text: "Le compte à bien été crée"
            })
            router.push("Connection")
        },
        used : async function({v_email}, {v_pseudo}, email, password, pseudo, image){
            const reponsereq = await fetch(`http://localhost:3400/utilisateurs?pseudo=${v_pseudo}`)
            const data = await reponsereq.json();
            const reponsereq2 = await fetch(`http://localhost:3400/utilisateurs?email=${v_email}`)
            const data2 = await reponsereq2.json();
            if (data.length==1 && v_pseudo !="") {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: "Le pseudo est déjà utilisé"
                })
            }
            else if (data2.length==1 && v_email !="") {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: "Le mail est déjà utilisé"
                })
            }
            else {
                Swal.mixin({
                    toast: true,
                    icon: 'success',
                    title: 'Compte crée avec succès !',
                    animation: false,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
                var profil = {email : email , password : password , pseudo : pseudo, image : image}
                this.create(profil)
            }
        },
        deconnection : async function(){
            this.connected=false
            this.pseudo=""
            this.id=""
            this.image=""
            $cookies.remove('session_connected')
            $cookies.remove('session_pseudo')
            $cookies.remove('session_id')
            $cookies.remove('session_image')
        },
        load_accueil : async function() {
            const reponsereq = await fetch(`http://localhost:3400/articles`)
            const data = await reponsereq.json();
            this.post = data;
            this.post.forEach(async (item,index) => {
                const reponsereq2 = await fetch(`http://localhost:3400/utilisateurs?pseudo=${item.pseudo}`)
                const data2 = await reponsereq2.json();
                this.list_pp[item.pseudo] = data2[0]['urlImgProfil']
            })
            
        },
        new_post : async function({id_post, contenu, urlImgArticle, pseudo }){
            if (urlImgArticle=='' ) {
                urlImgArticle = "https://source.unsplash.com/random/1000x300"
            }
            const newPoste = { id : id_post, contenu : contenu, urlImgArticle : urlImgArticle, like : 0, pseudo : pseudo, as_voted : [], date :  Date.now(), commentaires : [] }
            const options = {
                method : "POST",
                body : JSON.stringify(newPoste),
                headers : {
                    "content-type" : "application/json"
                }
            }
            await fetch("http://localhost:3400/articles" , options);
            this.load_accueil()
        },
        new_comment : async function({id_comment, contenu, pseudo, date , idpost }){
            const reponsereq = await fetch("http://localhost:3400/articles/"+idpost)
            const data = await reponsereq.json();
            var old_comment = data['commentaires']
            var comment_add = { id :  Date.now(), contenu : contenu, pseudo : pseudo, date :  Date.now()}
            old_comment.push(comment_add)
            const newCOmment = { commentaires :old_comment }
            const options = {
                method : "PATCH",
                body : JSON.stringify(newCOmment),
                headers : {
                    "content-type" : "application/json"
                }
            }
            await fetch("http://localhost:3400/articles/"+idpost, options);
            this.load_accueil()
        },
        jaime : async function( idpost , pseudo){
            const reponsereq = await fetch("http://localhost:3400/articles/"+idpost)
            const data = await reponsereq.json();
            var old_value = data['like']
            var new_value = old_value+1
            const newjaime = { like : new_value }
            const options = {
                method : "PATCH",
                body : JSON.stringify(newjaime),
                headers : {
                    "content-type" : "application/json"
                }
            }
            await fetch("http://localhost:3400/articles/"+idpost, options);
            const reponsereq2 = await fetch("http://localhost:3400/articles/"+idpost)
            const data2 = await reponsereq2.json();
            var old_voted = data2['as_voted']
            old_voted.push(pseudo)
            const newvoted = { as_voted : old_voted }
            const options2 = {
                method : "PATCH",
                body : JSON.stringify(newvoted),
                headers : {
                    "content-type" : "application/json"
                }
            }
            await fetch("http://localhost:3400/articles/"+idpost, options2);
            this.load_accueil()
        },
        jaimeplu : async function( idpost , pseudo){
            const reponsereq = await fetch("http://localhost:3400/articles/"+idpost)
            const data = await reponsereq.json();
            var old_value = data['like']
            var new_value = old_value-1
            const newjaime = { like : new_value }
            const options = {
                method : "PATCH",
                body : JSON.stringify(newjaime),
                headers : {
                    "content-type" : "application/json"
                }
            }
            await fetch("http://localhost:3400/articles/"+idpost, options);
            const reponsereq2 = await fetch("http://localhost:3400/articles/"+idpost)
            const data2 = await reponsereq2.json();
            var old_voted = data2['as_voted']
            old_voted.splice(old_voted.indexOf(pseudo), 1)
            const newvoted = { as_voted : old_voted }
            const options2 = {
                method : "PATCH",
                body : JSON.stringify(newvoted),
                headers : {
                    "content-type" : "application/json"
                }
            }
            await fetch("http://localhost:3400/articles/"+idpost, options2);

            this.load_accueil()
        },
        get : async function(){
            await fetch()
        }
    }
})