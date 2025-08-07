const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Testing Node.js backend integration...');
        
        const response = await axios.post('http://localhost:3000/api/login', {
            email: 'test@gmail.com',
            password: 'password123',
            devicePlateform: 'web'
        });
        
        console.log('Success! Response:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('API Error:', error.response.data);
        } else {
            console.log('Network Error:', error.message);
        }
    }
};


const testHealth = async () => {
    try {
        const response = await axios.get('http://localhost:3000/');
        console.log('Backend health check:', response.data);
        return true;
    } catch (error) {
        console.log('Backend not running:', error.message);
        return false;
    }
};

const runTests = async () => {
    const isHealthy = await testHealth();
    if (isHealthy) {
        await testLogin();
    }
};

runTests();