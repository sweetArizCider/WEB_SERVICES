const express = require('express');
const router = express.Router();
const Prestamos = require('../../models/prestamos')
const PrestamosMultas = require('../../models/prestamos_multas')
const User = require('../../models/user')
const Sequelize = require('../../utils/database');
const sequelize = Sequelize.getSequelize;

// crear una multa

router.post('/', async (req, res) => {
    const { id_prestamos, multa } = req.body;

    const prestamo = await Prestamos.findOne({where: {id_prestamos: id_prestamos}});
    if(!prestamo){
        return res.status(404).send({message: "Loan not found"});
    }

    if(prestamo.entregado){
        return res.status(400).send({message: "This loan has already been returned"});
    }

    const multaExistente = await PrestamosMultas.findOne({where: {id_prestamos: id_prestamos}});
    if(multaExistente){
        return res.status(400).send({message: "This loan already has a fine"});
    }
    
    const fechaMulta = new Date().toUTCString();

    const multaData = {
        id_prestamos: id_prestamos,
        fecha_multa: fechaMulta,
        multa: multa,
        pagado: false
    }

    PrestamosMultas.create(multaData)
    .then(multa => {
        res.status(201).send({ok: multa})
    })
    .catch(error => {
        res.status(500).send({error: error})
    })
})

// obtener si un usuario tiene deuda
router.get('/', async (req, res)=>{
    const { username } = req.query;
    const user = await User.findOne({where: {username: username}});
    if(!user){
        return res.status(404).send({message: "User not found"});
    }
    let deuda = false;
    const prestamos = await Prestamos.findAll({where: {user_id: user.id}});
    if(!prestamos){
        return res.status(404).send({message: "No loans found"});
    }

    const multas  = await Promise.all( prestamos.map(async (loan) => {
        const multa = await PrestamosMultas.findOne({where: {id_prestamos: loan.id_prestamos}});
        return multa || null;
    }));

    const multasFiltradas = multas.filter(multa => multa !== null);
    console.log(multasFiltradas);
    multasFiltradas.forEach(multa => {
        if(!multa.pagado){
            return deuda = true;
        }
    })
    return res.status(200).json({Deuda: deuda});    
})

// obtener total de deudas de un usuario
router.get('/:username/total', async (req, res)=>{
    const { username } = req.params;
    const user = await User.findOne({where: {username: username}});
    if(!user){
        return res.status(404).send({message: "User not found"});
    }
    let total = 0;
    const prestamos = await Prestamos.findAll({where: {user_id: user.id}});
    if(!prestamos){
        return res.status(404).send({message: "No loans found"});
    }

    const multas  = await Promise.all( prestamos.map(async (loan) => {
        const multa = await PrestamosMultas.findOne({where: {id_prestamos: loan.id_prestamos}});
        return multa || null;
    }));

    const multasFiltradas = multas.filter(multa => multa !== null);
    multasFiltradas.forEach(multa => {
        if(!multa.pagado){
            total += Number(multa.multa);
        }
    })
    return res.status(200).json({Total: total});    
})

// obtener todos los usuarios con deuda y su total de deuda
router.get('/all', async (req, res) => {
    const [results, metadata] = await sequelize.query('SELECT * FROM get_users_fines()')
    const groupedResults = results.reduce((acc, fine) => {
        if (!acc[fine.username]) {
            acc[fine.username] = {
                username: fine.username,
                total: 0,
            };
        }
        if (!fine.pagado) {
            acc[fine.username].total += parseFloat(fine.multa);
        }
        return acc;
    }, {});

    const uniqueResults = Object.values(groupedResults);

    // check if the total is 0
    const filteredResults = uniqueResults.filter(result => result.total > 0);
    if(filteredResults.length === 0){
        return res.status(404).send({message: "There's no fines :)"});
    }

    res.status(200).json(filteredResults);
});

// obtener deuda de un usuario en especifico con su total de deuda
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    const [results, metadata] = await sequelize.query(`SELECT * FROM get_user_fines('${username}')`)
    const groupedResults = results.reduce((acc, fine) => {
        if (!acc[fine.username]) {
            acc[fine.username] = {
                username: fine.username,
                total: 0,
            };
        }
        if (!fine.pagado) {
            acc[fine.username].total += parseFloat(fine.multa);
        }
        return acc;
    }, {});

    const uniqueResults = Object.values(groupedResults);

    // check if the total is 0
    const filteredResults = uniqueResults.filter(result => result.total > 0);
    if(filteredResults.length === 0){
        return res.status(404).send({message: "There's no fines :)"});
    }
    res.status(200).json(uniqueResults);
});

// obtener todas las multas de un usuario en especifico
router.get('/:username/all', async (req, res) => {
    const { username } = req.params;
    try{
        const [results, metadata] = await sequelize.query(`SELECT * FROM get_multas_by_username('${username}')`)
        if(results.length === 0){
            return res.status(404).send({message: "Multas not found"});
        }
        return res.status(200).json(results);
    
    }catch(error){
        console.log(error);
        return res.status(500).send({message: error})
    }
});

module.exports = router; 