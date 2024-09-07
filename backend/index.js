const express = require('express');
const axios = require('axios');
const cors = require('cors');
axios.defaults.baseURL = 'https://climbcredit.com/api/v1';
require('dotenv').config({
    path: './.env'
});

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Climb Credit API

// Loan API
// Get the pre-fill application link
/**
 * Body parameters:
 * - schoolId: string
 * - firstName: string
 * - lastName: string
 * - dob: string
 * - annualIncome: number
 * - studentId: string
 * - email: string
 * - phone: string
 * - financeAmt_tuition: number
 * - isExistingStudent: boolean
 * - programDate: string
 * - addressStreet: string
 * - addressApt: string
 * - addressCity: string
 * - addressState: string
 * - addressZip: string
 * - note: string
 */
app.post('/pre-fill-application', async (req, res) => {
    const reqBody = req.body;
    try {
        const response = await axios.post('/pre-populate', {
            "schoolId": process.env.CLIMB_CREDIT_SCHOOL_ID,
            ...reqBody
        });
        return res.send(response.data);
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Get all the applications
/**
 * Query parameters:
 * - program_name: string
 * - product_name: string
 * - portal_status: string
 * - application_status: string
 * - repayment_status: string
 * - limit: number
 * - ref: string
 * - sort_by: string
 * - sort_direction: string
 */
app.get('/applications', async (req, res) => {
    const query = req.query;
    console.log(query);
    
    try {
        const response = await axios.get('/applications', {
            headers: {
                'API-KEY': process.env.CLIMB_CREDIT_API_KEY
            },
            params: query
        });
        console.log(response.data);
        return res.send(response.data);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Something went wrong");
    }
});

// Ready to verify the application
app.get('/enrollments/ready-to-verify', async (req, res) => {
    try {
        const response = await axios.get('/enrollments/ready-to-verify', {
            headers: {
                'API-KEY': process.env.CLIMB_CREDIT_API_KEY
            }
        });

        return res.send(response.data);
    } catch (error) {
        if (error.response.status === 400) {
            return res.send(error.response.data);
        }
        return res.status(400).send(error);
    }
});

// Verify the application by ref
app.put('/enrollments/verify', async (req, res) => {
    const ref = req.query.ref;
    try {
        const response = await axios.put(`/enrollments/verify/${ref}`, {}, {
            headers: {
                'API-KEY': process.env.CLIMB_CREDIT_API_KEY
            }
        });

        return res.send(response.data);
    } catch (error) {
        if (error.response.status === 400) {
            return res.send(error.response.data);
        }
        return res.status(400).send(error);
    }
});

// Webhook for Climb Credit
/**
 * Reponse body parameters:
"data": [
    {
      "_id": string,
      "application": {
        "ref": string,
        "status": string,
        "hasCoBorrower": boolean,
        "lastUpdatedDate": date,
        "applicationSubmissionDate": date
      },
      "customer": {
        "_id": string,
        "firstName": string,
        "lastName": string,
        "email": string,
        "phone": string,
        "studentId": string,
      },
      "school": {
        "id": string,
        "name": string
      },
      "program": {
        "name": string,
        "startDate": date,
      },
      "campus": {
        "id": string,
        "name": string
      },
      "product": {
        "name": string,
        "financeAmt": number,
        "financeAmtTuition": number,
        "financeAmtLivingExp": number,
        "productType": string
      },
      "funding": {
        "advanceAmount": number | null,
        "estimatedFundingDate": date
      }
    }
  ]
 */
app.post('/climb-credit/loans/webhook', (req, res) => {
    console.log(req.body);
    res.send('Webhook received');
});

// Payment API
// Get all the transactions
/**
 * Query parameters:
 * - page: number
 * - limit: number
 */
app.get('/transactions', async (req, res) => {
    const query = req.query;
    try {
        const response = await axios.get('/transactions', {
            headers: {
                'API-KEY': process.env.CLIMB_CREDIT_API_KEY
            },
            params: query
        });

        return res.send(response.data);
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Get latest transactions
/**
 * Query parameters:
 * - page: number
 * - limit: number
 */
app.get('/transactions/latest', async (req, res) => {
    const query = req.query;
    try {
        const response = await axios.get('/transactions/latest', {
            headers: {
                'API-KEY': process.env.CLIMB_CREDIT_API_KEY
            },
            params: query
        });

        return res.send(response.data);
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Webhook for Payment API
/**
 * Response body parameters:
 * {
    "data": [
        {
            "id": string,
            "paymentAmount": number,
            "paymentType": string,
            "paymentStatus": string,
            "paymentMethod": string,
            "paymentDate": date,
            "previousStatuses": [],
            "customer": {
                "name": string,
                "email": string,
                "phone": string | null,
                "accountHolderName": string,
                "accountHolderEmail": string,
                "studentId": string | null
            },
            "invoice": {
                "id": string,
                "title": string,
                "description": string,
                "customerId": string,
                "merchantId": string,
                "date": string
            }
        }
    ]
 */
app.post('/climb-credit/payment/webhook', (req, res) => {
    console.log(req.body);
    res.send('Payments Webhook received');
});

// Generate checkout link
/**
 * Body parameters:
 * {
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "studentId": string,
    "courseProductId": string,
    "frequency": number,
    "frequencyType": string,
    "numberInstallments": number,
    "totalTuition": number
 * }
 */
app.get('/generate-checkout-link', async (req, res) => {
    const reqBody = req.body;
    try {
        const response = await axios.post(`/schools/${process.env.CLIMB_CREDIT_SCHOOL_ID}/checkout`, reqBody, {
            headers: {
                'API-KEY': process.env.CLIMB_CREDIT_API_KEY
            }
        });
        return res.send(response.data);
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});