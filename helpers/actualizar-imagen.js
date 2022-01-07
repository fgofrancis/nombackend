const fs = require('fs');

const { response } = require('express');
const Compania = require('../models/compania')
const Empleado = require('../models/empleado')
const Usuario = require('../models/usuario')

const borrarImagen = (path)=>{
    if(fs.existsSync(path) ){
        //borrar imagen
        fs.unlinkSync(path)
    }
};

const actualizarImagen = async(tipo, id, nombreArchivo ) =>{
  
 let pathViejo = '';   
 switch (tipo) {
     case 'empleados':
         const empleado = await Empleado.findById(id);

         if( !empleado){
            console.log('Empleado no existe por id');
            flash = false;
            return false
         };

         pathViejo = `./uploads/empleados/${ empleado.img }`;
         borrarImagen(pathViejo);

         empleado.img = nombreArchivo;
         await empleado.save();
        return true;

    break;

    case 'companias':
        const compania = await Compania.findById(id);
         console.log(compania);

        if( !compania){
           console.log('Compania no existe por id');
           flash = false;
           return false
        };
       
        pathViejo = `./uploads/companias/${ compania.img }`;
        borrarImagen(pathViejo);

        compania.img = nombreArchivo;
        await compania.save();
       return true;
    break;

    case 'usuarios':
        const usuario = await Usuario.findById(id);

        if( !usuario){
           console.log('Usuario no existe por id');
           return false
        };

        pathViejo = `./uploads/usuarios/${ usuario.img }`;
        borrarImagen(pathViejo);

        usuario.img = nombreArchivo;
        await usuario.save();
       return true;
    break;
 
     default:
    break;
 }

}
module.exports = {
    actualizarImagen
}