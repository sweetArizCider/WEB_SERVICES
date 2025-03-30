const express = require('express');
const router = express.Router();
const Prestamos = require('../../models/prestamos')
const User = require('../../models/user')
const { BASE_URL } = process.env;

// crear un prestamo
router.post('/', async (req, res)=>{
    const { username, isbn } = req.body;

    const user = await User.findOne({where: {username: username}})
    if(!user){
        return res.status(404).send({message: "User not found"});
    }

    const isAvailableResponse = await fetch(`${BASE_URL}/prestamos/${isbn}`);
    const isAvailableData = await isAvailableResponse.json();
    const isAvailable = isAvailableData.disponible;

    if (!isAvailable) {
        return res.status(400).send({ message: "This book is not available" });
    }

    const hasDebtResponse = await fetch(`${BASE_URL}/multas?username=${username}`);
    const hasDebtData = await hasDebtResponse.json();
    const hasDebt = hasDebtData.Deuda;

    if (hasDebt) {
        return res.status(400).send({ message: "This user has a debt" });
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

// obtener disponibilidad de un libro
router.get('/:isbn', async (req, res)=>{
    const { isbn } = req.params;
    const prestamos = await Prestamos.findAll({where: {libro_isbn: isbn}});
    if(prestamos.length === 0){
        return res.status(200).json({disponible: true});
    }
    let disponible = false;
    prestamos.forEach(loan => {
        if(loan.entregado){
            return disponible = true;
        }
        if(!loan.entregado){
            return disponible = false;
        }
    })
    return res.status(200).json({disponible: disponible});
})

// devolver un prestamo
router.post('/:isbn', async(req,res)=> {
    const { isbn } = req.params;

    Prestamos.findOne({where: {libro_isbn: isbn, entregado: false}})
    .then(loan => {
        if(!loan){
            return res.status(404).send({message: "Loan not found or already returned"});
        }

        Prestamos.update({entregado: true}, {where: {id_prestamos: loan.id_prestamos}})
        .then(() => {
            return res.status(200).send({message: "Book returned"});
        })
        .catch(error => {
            return res.status(500).send({errorReturning: error});
        })
    })
    .catch(error => {
        return res.status(500).send({errorFindingLoan: error});
    })
})

module.exports = router;