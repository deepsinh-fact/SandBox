// Test both SQL Server connection methods

console.log('Testing SQL Server connections...\n');

// Test Method 1: Standard mssql package
async function testStandardMssql() {
    console.log('=== Testing Standard mssql package ===');
    try {
        const { connectDB, getPool, sql } = require('./config/db');
        await connectDB();
        const pool = getPool();
        const result = await pool.request().query('SELECT @@VERSION as version');
        console.log('✅ Standard mssql: SUCCESS');
        console.log('Version:', result.recordset[0].version.substring(0, 50) + '...');
        return true;
    } catch (error) {
        console.log('❌ Standard mssql: FAILED');
        console.log('Error:', error.message);
        return false;
    }
}

// Test Method 2: msnodesqlv8 package
async function testMsnodesqlv8() {
    console.log('\n=== Testing msnodesqlv8 package ===');
    try {
        const { testConnection } = require('./config/db');
        const success = await testConnection();
        if (success) {
            console.log('✅ msnodesqlv8: SUCCESS');
        } else {
            console.log('❌ msnodesqlv8: FAILED');
        }
        return success;
    } catch (error) {
        console.log('❌ msnodesqlv8: FAILED');
        console.log('Error:', error.message);
        return false;
    }
}

// Run tests
async function runTests() {
    const test1 = await testStandardMssql();
    const test2 = await testMsnodesqlv8();
    
    console.log('\n=== Test Results ===');
    console.log(`Standard mssql: ${test1 ? 'PASSED' : 'FAILED'}`);
    console.log(`msnodesqlv8: ${test2 ? 'PASSED' : 'FAILED'}`);
    
    if (test1 || test2) {
        console.log('\n✅ At least one connection method works!');
        if (test2) {
            console.log('💡 Recommendation: Use msnodesqlv8 for better Windows Authentication support');
        } else if (test1) {
            console.log('💡 Recommendation: Use standard mssql package');
        }
    } else {
        console.log('\n❌ Both connection methods failed. Check your SQL Server configuration.');
        console.log('\nTroubleshooting tips:');
        console.log('1. Make sure SQL Server is running');
        console.log('2. Check if Windows Authentication is enabled');
        console.log('3. Verify your server name in .env file');
        console.log('4. Make sure your Windows user has access to SQL Server');
    }
    
    process.exit(0);
}

runTests();