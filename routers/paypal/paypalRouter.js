const express = require('express');
const router = express.Router();
const PrestamosMultas = require('../../models/prestamos_multas')
const  { createOrder, captureOrder }  = require('../../controller/paypal/paypal');
const { BASE_URL } = process.env;
const Ordenes = require('../../models/ordenes')


// pagar multa
router.post("/pay/:username", async (req, res) => {
    const { username } = req.params
    try {
        const { jsonResponse } = await createOrder(username)
        const approvalLink = jsonResponse.links.find((link) => link.rel === "approve")?.href
        if (!approvalLink) {
        return res.status(500).json({ message: "Failed to retrieve approval link from PayPal." })
        }
        const orden = await Ordenes.create({approvallink: approvalLink, orderid: jsonResponse.id, username})
        res.status(200).json({
        approvalLink,
        orderID: jsonResponse.id,
        order: orden
        })
    }catch(error){
        console.error(error)
        res.status(500).json({ message: "Error creating PayPal order", error: error.message })
    }
})

// obtener ultima orden de un usuario
router.get("/:username/orders", async (req, res) => {

    const { username } = req.params
    try {
        const orden = await Ordenes.findOne({where: {username}, order: [['created_at', 'DESC']]})
        if (!orden) {
            return res.status(404).json({ message: "No orders found for this user" })
        }
        return res.status(200).json(orden)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error fetching orders", error: error.message })
    }

})

// confirmar pago de multa
router.post("/:orderID/capture/:username", async (req, res) => {
    try {
        const { orderID, username } = req.params
        const { jsonResponse, httpStatusCode } = await captureOrder(orderID)

        if (jsonResponse.status === "COMPLETED"){
            try {
                const multasResponse = await fetch(`${BASE_URL}/multas/${username}/all`)

                if (!multasResponse.ok) {
                    throw new Error(`Failed to fetch multas: ${multasResponse.statusText}`)
                }

                const multas = await multasResponse.json()
                await Promise.all(multas.map(async (multa) => {
                    await PrestamosMultas.update(
                        { pagado: true },
                        { where: { id_prestamos_multas: multa.id_prestamos_multas}}
                    )}),
                )
                console.log(`Successfully updated payment status for ${multas.length} fines`)
                return res.status(httpStatusCode).json(jsonResponse)

            }catch(error){
                console.error("Error updating database:", error)
                return res.status(httpStatusCode).json({...jsonResponse, dbUpdate: "failed", error: error.message,})
            }
        }

        return res.status(httpStatusCode).json(jsonResponse)
    }catch(error){
        console.error("Failed to capture order:", error)
        return res.status(500).json({ error: "Failed to capture order." })
    }
})

// Success route - PayPal will redirect here after approval
router.get("/success", async (req, res) => {
    const { token, username } = req.query
    try {
        const { jsonResponse, httpStatusCode } = await captureOrder(token)

        if (httpStatusCode === 201 || httpStatusCode === 200) {

        res.status(200).send(`
                    <html>
                        <head><title>Payment Successful</title></head>
                        <body>
                            <h1>Payment Successful!</h1>
                            <p>Your payment has been processed successfully.</p>
                            <p>Order ID: ${token}</p>
                            <p>User: ${username}</p>
                            <script>
                                // You can add JavaScript to redirect to your app's success page
                                // window.location.href = '/payment-success';
                            </script>
                        </body>
                    </html>
                `)
        } else {
        res.status(httpStatusCode).json(jsonResponse)
        }
    } catch (error) {
        console.error("Failed to capture order:", error)
        res.status(500).send(`
                <html>
                    <head><title>Payment Failed</title></head>
                    <body>
                        <h1>Payment Failed</h1>
                        <p>There was an error processing your payment: ${error.message}</p>
                    </body>
                </html>
            `)
}
})
  
  // Cancel route - PayPal will redirect here if user cancels
router.get("/cancel", (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Payment Cancelled</title></head>
            <body>
                <h1>Payment Cancelled</h1>
                <p>You have cancelled the payment process.</p>
                <script>
                    // You can add JavaScript to redirect to your app's cancel page
                    // window.location.href = '/payment-cancelled';
                </script>
            </body>
        </html>
    `)
})

module.exports = router; 