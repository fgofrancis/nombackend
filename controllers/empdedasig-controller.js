
const {response} = require('express');

const Empleado = require('../models/empleado');
const Deduccion = require('../models/deduccion');
const Asignacion = require('../models/asignacion');
const Nomina = require('../models/nomina');
const NominaResumen = require('../models/nominaResumen');
const { v4: uuidv4 } = require('uuid');


const getempDedAsig = async(req, res=response)=>{

    const resultado = await Empleado.aggregate(
        [
            {
                $lookup:
                {
                    from:'deduccion',
                    localField:'_id',
                    foreignField:'empleado',
                    as:'resulDed'
                }
            },
            { $unwind:"$resulDed"},
            {
              $lookup:
                {
                    from:'asignacion',
                    localField:'resulDed.empleado',
                    foreignField:'empleado',
                    as:'resulAsig'
                }
            },
            { $unwind:"$resulAsig"}
        ]
    );
    
    //Generar un numero alfanumerico aleatorio
    const IdProcess = uuidv4() ;
    
    resultado.forEach(async (data)=>{
      const nominaData = {
        identificacion:data.identificacion,
        empleadoID:data._id,
        asignacionID:data.resulAsig._id,
        deduccionID:data.resulDed._id,
        IdProcess: IdProcess
      };

      const nomina = new Nomina(nominaData);
      await nomina.save();

      /**
       * asignacion
       */
      const salarioCotizableTSS = data.resulAsig.salarioCotizableTSS.salario  + 
                                  data.resulAsig.salarioCotizableTSS.comisiones +
                                  data.resulAsig.salarioCotizableTSS.vacaciones;

      const otrasRemuneraciones = data.resulAsig.otrasRemuneraciones.horasExtraDiasFeriados +
                                  data.resulAsig.otrasRemuneraciones.otrosIngresos +
                                  data.resulAsig.otrasRemuneraciones.bonosTrimestrales;

      const ingresosExentoISR   = data.resulAsig.ingresosExentoISR.regaliaPascual +
                                  data.resulAsig.ingresosExentoISR.indemnizacionesLaborales +
                                  data.resulAsig.ingresosExentoISR.preavisoYCesantia;

      const reembolsos = data.resulAsig.reembolsos;
      const totalAsignacion = salarioCotizableTSS + 
                              otrasRemuneraciones +
                              ingresosExentoISR   +
                              reembolsos

      /**
       * deduccion
       */
      const retencionesLey = data.resulDed.retencionesLey.sfs     +
                             data.resulDed.retencionesLey.afp     +
                             data.resulDed.retencionesLey.adicTSS + 
                             data.resulDed.retencionesLey.retISR;

      const otrasDeducciones = data.resulDed.otrasDeducciones.cxcEmpleado +
                               data.resulDed.otrasDeducciones.otrosDescuentos;
      const totalDeduccion = retencionesLey + otrasDeducciones;

      const netoapagar = totalAsignacion - totalDeduccion;

      const nominaResumenData = {
        identificacion:data.identificacion,
        nombre:data.name1 +' '+ data.name2 +' '+ data.apell1 +' '+ data.apell2,
        asignacion: totalAsignacion,
        deduccion:totalDeduccion,
        netoapagar,
        IdProcess: IdProcess
      };

      const nominaResumen = new NominaResumen(nominaResumenData);
      await nominaResumen.save();

    })    


    try {
   
      res.json({
        ok:true,
        result:resultado
        // nomResumen
      })
      
    } catch (error) {
        console.log(error);
        res.json({
          ok:false,
          msg:'Hable con el Administrador....'
        })
    }
}

module.exports = {
  getempDedAsig
}