const tfmotor = require('./tfmotor.js');

const sintomas = [ 19, 27, 28, 29 ];

async function obtenerEnfermedad(sintomas) {
    const enfermedad = await tfmotor.predictDiseases(sintomas);
    console.log("La enfermedad pronosticada es: "+enfermedad);
    //alert("Es propable que usted padezca de "+enfermedad); //ejemplo para disparar un alert
    return enfermedad;
}

obtenerEnfermedad(sintomas);