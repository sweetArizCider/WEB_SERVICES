const express = require('express');
const router = express.Router();
const Prestamos = require('../../models/prestamos')
const PrestamosMultas = require('../../models/prestamos_multas')
const User = require('../../models/user')

router.post('/', async (req, res)=>{
    const { username, isbn } = req.body;

    const user = await User.findOne({where: {username: username}})
    if(!user){
        return res.status(404).send({message: "User not found"});
    }
    const isNotAvailable = await Prestamos.findOne({where: {libro_isbn: isbn, entregado: false}})
    if(isNotAvailable){
        return res.status(400).send({message: "This book is not available"});
    }

    const userLoans = await Prestamos.findAll({where: {user_id: user.id}})
    if(userLoans){
        userLoans.forEach(loan => {
            PrestamosMultas.findOne({where: {id_prestamos: loan.id_prestamos}})
            .then(multa => {
                if(!multa.pagado){
                    return res.status(400).send({message: "You have an unpaid fine"});
                }
            })
        })
    }
    const initialDate = new Date().toUTCString();
    const returnDate = new Date(new Date().setDate(new Date().getDate() + 7)).toUTCString();

    const loanData = {
        user_id: user.id,
        libro_isbn: isbn,
        fecha_inicio: initialDate,
        fecha_devolucion: returnDate,
        entregado: false
    }
    Prestamos.create(loanData)
    .then(loan => {
        res.status(201).send({ok: loan})
    })
    .catch(error => {
        res.status(500).send({error: error})
    })
})

router.post('/:isbn', async(req,res)=> {})

module.exports = router;