var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var lbl = $('small');
if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio')

$('h1').text('Escritorio '+escritorio);

$('button').on('click',function(e){
    socket.emit('atenderTicket',{escritorio:escritorio},function(res){

        if(res.err==true){
            alert(res.msg);
            lbl.text(res.msg);
            return;
        }

        lbl.text('ticket '+res.numero)
    })
})