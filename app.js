// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3001;
// const SAP_API_URL = 'https://my419577-api.s4hana.cloud.sap/sap/opu/odata4/sap/zcustomer_svcbnd/srvd_a2x/sap/zcustomer_svcdef/0001/customer';
// const SAP_AUTH = {
//   username: process.env.SAP_USERNAME,
//   password: process.env.SAP_PASSWORD,
// };


// app.get('/', (req, res) => {
//   res.send(`http://localhost:5050/`);
// });
// app.get('/api/customers', async (req, res) => {
//   try {
//     const response = await axios.get(SAP_API_URL, {
//       auth: SAP_AUTH,
//       headers: {
//         Accept: 'application/json',
//         'sap-client': '100',
//       },
//  });

//     res.json(response.data.value);
//   } catch (error) {
//     console.error('SAP API error:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Environment variables and constants
const PORT = process.env.PORT || 3001;
const SAP_API_URL = 'https://my419577-api.s4hana.cloud.sap/sap/opu/odata4/sap/zcustomer_svcbnd/srvd_a2x/sap/zcustomer_svcdef/0001/customer';
const SAP_AUTH = {
  username: process.env.SAP_USERNAME,
  password: process.env.SAP_PASSWORD,
};

// Serve index.html at root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// SAP customer data route
app.get('/api/customers', async (req, res) => {
  try {
    const response = await axios.get(SAP_API_URL, {
      auth: SAP_AUTH,
      headers: {
        Accept: 'application/json',
        'sap-client': '100',
      },
    });
        
    res.json(response.data.value); // Send only the customer array
  } catch (error) {
    console.error('SAP API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch SAP customer data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
