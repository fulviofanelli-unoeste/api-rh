import jwt from 'jsonwebtoken';
var SEGREDO;

export default class AuthMiddleware {

    gerarToken(id, nome, email) {
        return jwt.sign({
            id: id,
            nome: nome,
            email: email,
        }, SEGREDO, { expiresIn: 1 } );
    }

    async validar(req, res, next) {
        //procurar chave no cabeçalho;
        let {token} = req.cookies;
        if(token){
            try {
                let objUsuario = jwt.verify(token, SEGREDO);
                //a fazer: validar no banco de dados;
                next();
            }
            catch(ex) {
                //não foi possível validar o token
                res.status(401).json({msg: "Não autorizado!"});
            }
        }
        else{
            res.status(401).json({msg: "Não autorizado!"});
        }
    }

}