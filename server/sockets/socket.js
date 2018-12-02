const {
    io
} = require('../server');
const {
    TicketControl
} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let ticket = ticketControl.siguiente();
        console.log(ticket);
        callback(ticket);
    })

    let getEstadoActual = () => {
        return {
            actual: `Ticket ${ticketControl.getUltimo()}`,
            ultimos4: ticketControl.getUltimos4()
        };
    }

    client.emit('estadoActual', getEstadoActual());

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            callback({
                err: true,
                msg: "Escritorio es nesesario"
            });
            return;
        }
        let ticket = ticketControl.atenderTicket(data.escritorio);
        console.log('broadcast');
        client.broadcast.emit('estadoActual', getEstadoActual())
        callback(ticket);
    });
});