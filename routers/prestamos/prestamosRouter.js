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
                if(!multa){
                    
                }
                else if(!multa.pagado){
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

router.post('/:isbn', async(req,res)=> {
    const { isbn } = req.params;

    Prestamos.findOne({where: {libro_isbn: isbn, entregado: false}})
    .then(loan => {
        if(!loan){
            return res.status(404).send({message: "Loan not found"});
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

router.get('/multas', async (req, res) => {
        const { username } = req.query;
        const query = {};
        if (username) {
            const user = await User.findOne({ where: { username: username } });
            if(!user){
                return res.status(404).send({message: "User not found"});
            }
            query.user_id = user.id;
        }
        const prestamos = await Prestamos.findAll({ where: query });
        if (!prestamos || prestamos.length === 0) {
            return res.status(404).send({ message: "No loans found" });
        }
        const multas = await Promise.all(
            prestamos.map(async (loan) => {
                const multa = await PrestamosMultas.findOne({ where: { id_prestamos: loan.id_prestamos } });
                return multa || null;
            })
        );
        const filteredMultas = multas.filter((multa) => multa !== null);
        return res.status(200).json(filteredMultas);
});

module.exports = router;