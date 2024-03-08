const socket = io('https://socte-chate.vercel.app/')

let user = null;


document.addEventListener('DOMContentLoaded',()=>{ //quando a pagina carregar 
    //referente ao formulario de menssagem
    const form = document.querySelector('#mensagen_form_id')// pegar o formulario 
    form.addEventListener('submit', (e)=>{ // adicona um evento no formulario botao submit
        e.preventDefault(); // o evento previni que quando clicar no botao submit não apareça os dados na url
        if (!user) { // se inpute user for vazio 
            alert("defina um usuario") //acione o alerta 
            return; // return
        }
        const menssagen = document.forms['mensagen_form_name']['msg'].value// pegar o formulario e o valor do input pelo name
        document.forms['mensagen_form_name']['msg'].value = "" // apos isso coloar o input como vazio novamente
        socket.emit('new_menssage',{msg:menssagen,user:user}) // envia pro back-and os valores  dos formulario user e menssagem

    })
    //  referente ao formulario de usuario
    const userForm = document.querySelector('#user_form')// pegar o formulario 
    userForm.addEventListener('submit', (e)=>{ // adicona um evento no formulario botao submit
        e.preventDefault(); // o evento previni que quando clicar no botao submit não apareça os dados na url
        user = document.forms['user_form_name']['user'].value// pegar o formulario e o valor do input pelo name
        userForm.parentNode.removeChild(userForm) //remover input de usuario
    })
})


// atualizar as menssagens na div 
socket.on('update_mensagens',(arreyMenssagens)=>{ // recebe o arrey de menssagens
    updateMenssagensOnScren(arreyMenssagens) // ativa a funçao com parametro de  arrey de menssagens
    
})

function updateMenssagensOnScren(arreyMenssagens){ //funçao atualizar as mensagens na dive no fronte-end
    const div_mensagem = document.querySelector('#menssagens'); // pega a div menssagens
    let list_menssagen = '' //cria uma lista ul


    arreyMenssagens.forEach(arreyMenssagens => { // pega do o arrey de menssagens todas menssagens
        
        if (arreyMenssagens.user == user) {
            console.log("ok");
            list_menssagen += `<div id="msgEu">( ${arreyMenssagens.user} ): ${arreyMenssagens.msg}</div>`   
        }else{
            list_menssagen += `<div id="msgEle">( ${arreyMenssagens.user} ): ${arreyMenssagens.msg}</div>`
        };
    });
   

 // fecha a lista

    div_mensagem.innerHTML = list_menssagen // coloca a lista com as menssagens dentro da div
    

}