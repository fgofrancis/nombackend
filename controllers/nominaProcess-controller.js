
const { response } = require('express');
const res = require('express/lib/response');
const Deduccion = require('../models/deduccion');
const Nomina = require('../models/nomina');
const NominaResumen = require('../models/nominaResumen');


const getNominaResumen = async(req, res=response)=>{

    const nominaresumen = await NominaResumen.find();

    try {
        res.json({
            ok:true,
            resul:nominaresumen
        })
        
    } catch (error) {
        console.log(error),
        res.json({
            ok:false,
            msg:' Error, favor hablar con el Administrador'
        })
        
    }
}
const borrarNominaByProcessID = async(req, res=response)=>{

    const IdProcess = req.params.IdProcess;

    try {
        const IdProcessDB = await Nomina.find({IdProcess});
        
        if(!IdProcessDB || IdProcessDB.length === 0){
            return res.json({
                ok:false,
                msg:'Proceso de Nomina no Existe!!'
            })
        }

        await Nomina.deleteMany({IdProcess});
        await NominaResumen.deleteMany({IdProcess});

        return res.json({
            ok:true,
            msg:'Proceso borrado Exitosamente!!'
        })

    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg:'Error borrando proceso de Nómina!!'
        })
        
    }
}
const getNominaByProcessID = async(req, res=response)=>{

    const IdProcess = req.params.IdProcess;
    // console.log('getNominaProcessByID IdProcess..: ', IdProcess);

    try {
        const IdProcessDB = await Nomina.find({IdProcess})
                                            .populate('empleadoID','identificacion name1 apell1 salario')
                                            .populate('asignacionID','salarioCotizableTSS.salario salarioCotizableTSS.comisiones salarioCotizableTSS.vacaciones otrasRemuneraciones.horasExtraDiasFeriados otrasRemuneraciones.otrosIngresos otrasRemuneraciones.bonosTrimestrales ingresosExentoISR.regaliaPascual ingresosExentoISR.indemnizacionesLaborales ingresosExentoISR.preavisoYCesantia reembolsos fechaRegistro')
                                            // .populate('asignacionID','otrasRemuneraciones.horasExtraDiasFeriados otrasRemuneraciones.otrosIngresos otrasRemuneraciones.bonosTrimestrales')
                                            // .populate('asignacionID','ingresosExentoISR.regaliaPascual ingresosExentoISR.indemnizacionesLaborales ingresosExentoISR.preavisoYCesantia')
                                            // .populate('asignacionID','reembolsos')
                                            .populate('deduccionID','retencionesLey.sfs retencionesLey.afp retencionesLey.adicTSS retencionesLey.retISR otrasDeducciones.cxcEmpleado otrasDeducciones.otrosDescuentos fechaRegistro');
                                            
        if(!IdProcessDB || IdProcessDB.length === 0){
            return res.json({
                ok:false,
                msg:'Proceso de Nómina no Existe, revisa idProcess!!'
            })
        }
        // console.log('getNominaProcessID IdProcessDB...: ', IdProcessDB);

        return res.json({
            ok:true,
            nomina:IdProcessDB
        })

    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg:'Error Buscando proceso de Nómina!!'
        })
        
    }
}
const getNominaByProcessIDByidEmpleado = async(req, res=response)=>{

    const IdProcess = req.params.IdProcess;
    const idEmpleado = req.params.idEmpleado;

    // console.log('getNominaProcessID IdProcess..: ', IdProcess);
    // console.log('getNominaProcessID idEmpleado..: ', idEmpleado);

    try {
        const IdProcessDB = await Nomina.findOne({IdProcess, identificacion:idEmpleado})
                                            // .populate({path:'empleadoID', select:['name1','apell1','salario' ] })
                                            .populate('empleadoID','name1 apell1 salario') //tambien funciona, = a la anterior
                                            .populate('asignacionID','salarioCotizableTSS.salario salarioCotizableTSS.comisiones salarioCotizableTSS.vacaciones otrasRemuneraciones.horasExtraDiasFeriados otrasRemuneraciones.otrosIngresos otrasRemuneraciones.bonosTrimestrales ingresosExentoISR.regaliaPascual ingresosExentoISR.indemnizacionesLaborales ingresosExentoISR.preavisoYCesantia reembolsos fechaRegistro')
                                            // .populate('asignacionID','otrasRemuneraciones.horasExtraDiasFeriados otrasRemuneraciones.otrosIngresos otrasRemuneraciones.bonosTrimestrales')
                                            // .populate('asignacionID','ingresosExentoISR.regaliaPascual ingresosExentoISR.indemnizacionesLaborales ingresosExentoISR.preavisoYCesantia')
                                            // .populate('asignacionID','reembolsos')
                                            .populate('deduccionID','retencionesLey.sfs retencionesLey.afp retencionesLey.adicTSS retencionesLey.retISR otrasDeducciones.cxcEmpleado otrasDeducciones.otrosDescuentos fechaRegistro');
                                            
        if(!IdProcessDB || IdProcessDB.length === 0){
            return res.json({
                ok:false,
                msg:'Proceso de Nomina no Existe!!'
            })
        }
        // Podria yo desestrucutar el array IdProcessDB?
        // const {salario, ...data} = IdProcessDB;
        // data.sal = salario
             
        // console.log('getNominaByProcessIDByIdProcessDB...: ', data);
        console.log('getNominaByProcessIDByIdProcessDB...: ', IdProcessDB);

        return res.json({
            ok:true,
            nomina:IdProcessDB
            // nomina:data
        })

    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg:'Error Buscando proceso de Nómina!!'
        })
        
    }
}
module.exports = {
    getNominaResumen,
    borrarNominaByProcessID,
    getNominaByProcessID,
    getNominaByProcessIDByidEmpleado
}