
var socket = io();
var lbl = $("#lblNuevoTicket");
socket.on('connect',function(){
    console.log("Conexion al socket");
})

socket.on('disconnect',function(){
    console.log("Se ha perdido la conexion al socket");
})

socket.on('estadoActual',function(estado){
    lbl.text(estado.actual)
})

$('button').on('click',function(e){
    socket.emit('siguienteTicket',null,function(ticket){
        lbl.text(ticket);
    })
})

