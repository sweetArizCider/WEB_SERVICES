const { Datos } = require('../models/datos');
 


class DatosActions{
    async agregarDatos(x, y , z){
        try{
            await Datos.create({
                x: x,
                y: y,
                z: z
            })
        }catch(err){
            console.log(err);
        }
    }
    
    borrarDato(){

    }
}

module.exports = DatosActions;