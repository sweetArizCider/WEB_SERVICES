const {
    ApiError,
    Client,
    Environment,
    LogLevel,
    OrdersController,
} = require("@paypal/paypal-server-sdk");

const {
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
    BASE_URL
} = process.env;

frontendURL = "http://localhost:5173";

const client = new Client({
    clientCredentialsAuthCredentials:{
        oAuthClientId: PAYPAL_CLIENT_ID,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
    },
}); 

const ordersController = new OrdersController(client);

const createOrder = async (username) => {
    let collect;

    try {
        const fineResponse = await fetch(`${BASE_URL}/multas/${username}`);
        if (!fineResponse.ok) {
            throw new Error(`Failed to fetch fine: ${fineResponse.statusText}`);
        }
        const fineData = await fineResponse.json();
        const userFine = fineData[0]?.total;

        if (!userFine) {
            throw new Error("User fine not found or invalid response.");
        }

        collect = {
            body: {
                intent: "CAPTURE",
                application_context: {
                    return_url: `${frontendURL}/multas`,
                    cancel_url: `${frontendURL}/multas`,
                    user_action: "PAY_NOW",
                    brand_name: "Library Fine System",
                },
                purchaseUnits: [
                    {
                        amount: {
                            currencyCode: "MXN",
                            value: userFine.toString(),
                            breakdown: {
                                itemTotal: {
                                    currencyCode: "MXN",
                                    value: userFine.toString(),
                                },
                            },
                        },
                        items: [
                            {
                                name: "Library Fine Payment",
                                unitAmount: {
                                    currencyCode: "MXN",
                                    value: userFine.toString(),
                                },
                                quantity: "1",
                                description: `Fine payment for user: ${username}`,
                                sku: "sku01",
                            },
                        ],
                        custom_id: username,
                    },
                ],
            },
            prefer: "return=representation",
        };
    } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }

    try {
        const { body, ...httpResponse } = await ordersController.createOrder(collect);
        return {
            jsonResponse: JSON.parse(body),
            httpStatusCode: httpResponse.statusCode,
        };
    } catch (error) {
        if (error instanceof ApiError) {
            throw new Error(error.message);
        } else {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }
};

const captureOrder = async (orderID) => {
    const collect = {
        id: orderID,
        prefer: "return=representation",
    };

    try {
        const { body,...httpResponse } = await ordersController.captureOrder(collect);
        return {
            jsonResponse: JSON.parse(body),
            httpStatusCode: httpResponse.statusCode,
        };
    } catch (error) {
        if (error instanceof ApiError) {
            throw new Error(error.message);
        }
    }
};

module.exports = {createOrder, captureOrder};