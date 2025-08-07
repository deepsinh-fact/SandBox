// Test script for mock mode
const axios = require('axios');

const testMockLogin = async () => {
    try {
        console.log('Testing mock login with correct credentials...');

        const response = await axios.post('http://localhost:3000/api/login', {
            email: 'test@gmail.com',
            password: 'password123',
            devicePlateform: 'web'
        });

        console.log('Mock login successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        if (error.response) {
            console.log('Mock login failed:', error.response.data);
        } else {
            console.log('Network error:', error.message);
        }
    }
};


const runMockTests = async () => {
    await testMockLogin();
};

runMockTests();