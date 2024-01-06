import express from 'express';
import conn2 from './connection.js';

const router = express.Router();

router.post("/create-checkout-session/:transaction_id", async (req, res) => {
    try {
        const taxPaymentTransaction = req.body.taxPaymentTransaction;
        const { transaction_id } = req.params;

        if (typeof taxPaymentTransaction !== 'object' || !taxPaymentTransaction.amount) {
            console.error('Invalid taxPaymentTransaction');
            return res.status(400).json({ error: 'Invalid taxPaymentTransaction' });
        }

        const amount = parseInt(taxPaymentTransaction.amount); // Convert amount to an integer
        const adjustedAmount = amount * 100;

        if (isNaN(adjustedAmount)) {
            console.error('Invalid amount - should be an integer');
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const user_id = taxPaymentTransaction.user_id; // Replace this with your actual logic
        const trans_type = taxPaymentTransaction.trans_type;

        const success_url = `http://localhost:5173/transachistory/${user_id}`;

        

        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        send_email_receipt: true,
                        show_description: true,
                        show_line_items: true,
                        description: 'PAYMENT CENTRALIZATION',
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: adjustedAmount,
                                description: 'PAYMENT CENTRALIZATION',
                                name: trans_type,
                                quantity: 1
                            }
                        ],
                        payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'dob_ubp', 'dob', 'card', 'billease'],
                        success_url: success_url,
                        paid_signal: 'Paid',
                        
                    }
                }
            })
        };

        const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
        const responseData = await response.json();

        if (responseData.data && responseData.data.attributes && responseData.data.attributes.checkout_url) {
            const checkoutSessionUrl = responseData.data.attributes.checkout_url;
        
            try {
        
                if (success_url && JSON.parse(options.body).data.attributes.paid_signal === 'Paid') {
    
                    const updateQuery = `
                        UPDATE user_transaction
                        SET status_type = 'Paid'
                        WHERE transaction_id = ?;
                    `;
        
                    await queryDatabase(updateQuery, [transaction_id]);
                }
        
                res.json({ checkoutSessionUrl });
            } catch (error) {
                console.error('Error updating status_type in the database:', error);
                res.status(500).json({ error: 'Error updating status_type in the database' });
            }
        } else {
            console.error('Invalid checkout session - Response structure is unexpected:', responseData);
            res.status(500).json({ error: 'Error creating checkout session' });
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
});

function queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
        conn2.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


// const webhookOptions = {
//     method: 'POST',
//     headers: {
//         accept: 'application/json',
//         'content-type': 'application/json',
//         authorization: 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
//     },
//     body: JSON.stringify({
//         data: {
//             attributes: {
//                 events: ['checkout_session.payment.paid'],
//                 url: 'http://localhost:5173/transachistory/'
//             }
//         }
//     })
// };

// fetch('https://api.paymongo.com/v1/webhooks', webhookOptions)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export default router;