const fs = require('fs')

class Ticket {
    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor(){
        let data = require('../data/data.json');
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
        }else{
            this.reiniciarConteo()
        }

    }

    siguiente(){
        this.ultimo = this.ultimo + 1;
        let ticket = new Ticket(this.getUltimo(),null);
        this.tickets.push(ticket)
        this.saveData();
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio){
        if(this.tickets.lenght===0){
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let ticket = new Ticket(numeroTicket,escritorio);
        this.ultimos4.unshift(ticket)

        if(this.ultimos4.length>4){
            this.ultimos4.pop();
        }
        console.log('ultimos 4')
        console.log(this.ultimos4);

        this.saveData();
        return ticket
    }

    getUltimo(){
        return this.ultimo;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    saveData(){
        let jsonData = {
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets:this.tickets,
            ultimos4:this.ultimos4
        }
        let jsonStr = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json',jsonStr);
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.saveData();
        console.log("Sistema iniciado");
    }

}

module.exports = {TicketControl}