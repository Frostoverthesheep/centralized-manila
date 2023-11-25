import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

// router.get('/getfullname/:user_id', (req, res) => {
//   const user_id = req.params.user_id;
//   conn2.query(
//     'SELECT concat (l_name, ", ", f_name, " ", m_name ) AS Fullname from clientdatabase.user_personal where user_id = ?',
//     [user_id],
//     (error, results, fields) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.status(200).json(results);
//       }
//     }
//   );
// });

// router.get('/rptaxpayment/', async (req, res) => {
//   const query = "SELECT * FROM rp_tax";
//   const query1 = "SELECT * FROM transaction_info";

//   try {
//   const result = await queryDatabase(query);
//   const result1 = await queryDatabase(query1);

  
//   res.json({ user_reg: result, user_auth: result1 });
//   } catch (err) {
//   console.error(err);
//   res.status(500).send('Error retrieving data');
//   }
// });
// //     acc_name,
// //     rp_tdn,
// //     rp_pin,
// //     rp_year,
// //     period,
// //     transaction_id,

// router.post('/rptaxpayment/', async (req, res) => {
//   const primaryKey = generatePrimaryKey(req.body.rp_tdn, req.body.rp_pin);

//   // const query = "INSERT INTO rp_tax (`acc_name`, `rp_tdn`, `rp_pin`, `rp_year`, `period`, `transaction_id`) VALUES (?, ?, ?, ?, ?)";
//   // const values = [req.body.f_name, req.body.l_name, req.body.mobile_no, primaryKey];

//   // const query1 = "INSERT INTO transaction_infor (`amount`, `user_pass`, `transaction_id`) VALUES (?, ?)";
//   // const values1 = [req.body.amount, primaryKey];

//   try {
//   const result = await queryDatabase(query, values);
//   const result1 = await queryDatabase(query1, values1);


//   res.json({
//       message: "Successfully executed",
//       rp_tax_result: result,
//       transaction_id_result: result1,

//   });
//   } catch (err) {
//   console.error(err);
//   res.status(500).json({ error: "Error executing queries" });
//   }
// });


// function queryDatabase(query, values) {
//   return new Promise((resolve, reject) => {
//   conn2.query(query, values, (err, data) => {
//       if (err) {
//       reject(err);
//       } else {
//       resolve(data);
//       }
//   });
//   });
// }

// function generatePrimaryKey(rp_tdn, rp_pin) {

//   // Extract the last 4 digits of the mobile number
//   const last4DigitsTdn = rp_tdn.slice(-4);

//   const last4DigitsPin = rp_pin.slice(-4);

//   // Concatenate the components to create the primary key
//   const primaryKey = `${last4DigitsTdn}${last4DigitsPin}`;

//   console.log(primaryKey)
//   return primaryKey;
// }




// router.post('/rptaxpayment/', async (req, res) => {
//   const {
//     acc_name,
//     rp_tdn,
//     rp_pin,
//     rp_year,
//     period,
//     transaction_id,
//   } = req.body;
//   console.log(req.body);

//   if (transaction_id) {
//     // If transaction_id is provided, update the existing record
//     const updateQuery = `
//       UPDATE rp_tax
//       SET acc_name = ?, rp_tdn = ?, rp_pin = ?, year = ?, period = ?
//       WHERE transaction_id = ?`;
//     const updateValues = [acc_name, rp_tdn, rp_pin, rp_year, period, transaction_id];

//     try {
//       const updateResult = await queryDatabase(updateQuery, updateValues);
//       res.status(200).json({ message: 'Update successful', updateResult });
//     } catch (updateErr) {
//       console.error(updateErr);
//       res.status(500).json({ error: 'Error updating record' });
//     }
//   } else {
//     // If transaction_id is not provided, insert a new record
//     const primaryKey = generateTransactionId(rp_pin, rp_tdn);

//     const insertQuery = `
//       INSERT INTO rp_tax (acc_name, rp_tdn, rp_pin, year, period, transaction_id)
//       VALUES (?, ?, ?, ?, ?, ?)`;
//     const insertValues = [acc_name, rp_tdn, rp_pin, rp_year, period, primaryKey];

//     try {
//       const insertResult = await queryDatabase(insertQuery, insertValues);
//       res.status(200).json({ message: 'Insert successful', insertResult });
//     } catch (insertErr) {
//       console.error(insertErr);
//       res.status(500).json({ error: 'Error inserting record' });
//     }
//   }
// });

// router.get("/rptaxpayment/", async (req, res) => {
//   const query = "SELECT * FROM rp_tax";

//   try {
//     const result = await queryDatabase(query);
//     res.json({ rp_tax: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving data');
//   }
// });

// function queryDatabase(query, values) {
//   return new Promise((resolve, reject) => {
//     conn2.query(query, values, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

// function generateTransactionId(rp_pin, rp_tdn) {
//   const lastTwoDigitsRpPin = rp_pin.slice(-2);
//   const lastDigitRpTdn = rp_tdn.slice(-2);
  
//   // Appending a timestamp to ensure uniqueness
  
//   return `${lastTwoDigitsRpPin}${lastDigitRpTdn}`;
// }

router.get('/payment/', async (req, res) => {
    const query = "SELECT * FROM rp_tax";
    const query1 = "SELECT * FROM transaction_info";
  
    try {
    const result = await queryDatabase(query);
    const result1 = await queryDatabase(query1);
  
    
    res.json({ user_reg: result, user_auth: result1 });
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
  });
  
  
  router.post('/payment/', async (req, res) => {
    const primaryKey = generatePrimaryKey(req.body.rp_tdn, req.body.rp_pin);
  
    const query = "INSERT INTO rp_tax (`acc_name`, `rp_tdn`, `rp_pin`, `year`, `period_id`, `transaction_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.acc_name, req.body.rp_tdn, req.body.rp_pin, req.body.rp_year, req.body.period, primaryKey];
  
    const query1 = "INSERT INTO transaction_info (`amount`, `transaction_id`) VALUES (?, ?)";
    const values1 = [req.body.amount, primaryKey];
  
    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
  
  
    res.json({
        message: "Successfully executed",
        rp_tax_result: result,
        transaction_info_result: result1,
  
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error executing queries" });
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

  function generatePrimaryKey(rp_tdn, rp_pin) {

    // Extract the last 4 digits of the mobile number
    const last4DigitsTdn = rp_tdn.slice(-4);
  
    const last4DigitsPin = rp_pin.slice(-4);
  
    // Concatenate the components to create the primary key
    const primaryKey = `${last4DigitsTdn}${last4DigitsPin}`;
  
    console.log(primaryKey)
    return primaryKey;
  }

  export default router;