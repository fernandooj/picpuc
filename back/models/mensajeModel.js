//////////////////////////////////////////////////////////////////////
////////***********     llamo a las librerias        ****////////////
//////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose')
let Schema   = mongoose.Schema;
let moment   = require('moment');


 

//////////////////////////////////////////////////////////////////////////////
////////***********     creo el esquema / ciudad        ****//////////////
//////////////////////////////////////////////////////////////////////////////
let Mensaje = new Schema({
	mensaje: String,
	creado: String,
	usuarioId: {type: Schema.ObjectId, ref:'User'},
	eventoId:  {type: Schema.ObjectId, ref:'Evento'},
})


//////////////////////////////////////////////////////////////////////////////
////////***********    exporto el esquema        ****/////////////////////////
//////////////////////////////////////////////////////////////////////////////


module.exports = mongoose.model('Mensaje', Mensaje)