const socket = io()

//DOM ELEMENTOS
let message = document.getElementById('message')
let file = document.getElementById('file')
let username = document.getElementById('username')
let respuesta = document.getElementById('respuesta')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

btn.addEventListener('click',()=>{
    console.log(file.value)
    const archivo = file.files;
    // if(!file || !file.length){
    //   file.src = "";
    //   return;
    // }
    //Si se ha seleccionado una imagen entonces
    const arc = archivo[0];//obtener la imagen en BLOB
    const ruta = URL.createObjectURL(arc);//transformar el blob a url
    console.log(ruta)
    //imgLoaded.src = ruta; //guardar la ruta en el src donde se quiere mostrar la img seleccionada
    socket.emit('chat:message',{message:message.value, respuesta:respuesta.value, file:ruta, username:username.value})
})

message.addEventListener('keypress',()=>{
    socket.emit('chat:typing', username.value)
})

socket.on('chat:messages',(data)=>{
    console.log(data)
    actions.innerHTML='';
output.innerHTML += `<p>
<strong>${data.username}</strong>:${data.message},
<img style="max-width:100px" src="${data.file}" alt="imagen-archivo"> 
</p>`
})

socket.on('chat:user-typing',(user)=>{
actions.innerHTML  = `<p><em>${user} is typing a message</em></p>`
})
