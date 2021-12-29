const jwt = require('jsonwebtoken');

const generarJWT = (uid, email)=>{

    return new Promise( (resolve, reject)=>{

        // puedo agregar mas contenido al payload(ej. name, email, etc)
        const payload ={
             uid,
             email
         };
     
         jwt.sign(payload, process.env.JWT_SECRET,{
             expiresIn:'12h'
         }, (err, token)=>{
     
             if(err){
                 console.log(err);
                 reject('No se pudo generar el JWT');
             }else{
                 resolve(token);
             }
         });
    });


}

module.exports ={
    generarJWT
}