const {response} = require('express');
const jwt = require('jsonwebtoken');
 

const validarJWT = (req, res=response, next )=>{
 
    // Leer el token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        });
    }

    // Validar token existente
    try {
        const {uid, email,companiaID } = jwt.verify(token, process.env.JWT_SECRET);
     
        // La req ahora tiene un nuevo elemento y es el uid del token
        req.uid = uid,
        req.email = email
        req.companiaID = companiaID
  
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no Válido'
        });
    }

}

module.exports = {
    validarJWT
}