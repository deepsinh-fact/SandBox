const sql = require('mssql/msnodesqlv8');

const config = {
    server: 'FACT-LAP-07',
    database: 'master', // Start with master database
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    }
};

console.log('Testing SQL Server connection with msnodesqlv8...');

sql.connect(config).then(pool => {
    console.log('✅ Connected successfully!');
    return pool.request().query('SELECT @@VERSION as version, DB_NAME() as currentDB');
}).then(result => {
    console.log('✅ Query executed successfully!');
    console.log('Current Database:', result.recordset[0].currentDB);
    console.log('SQL Server Version:', result.recordset[0].version.substring(0, 100) + '...');
    
    // List available databases
    return sql.query('SELECT name FROM sys.databases WHERE database_id > 4'); // Skip system DBs
}).then(result => {
    console.log('\n📋 Available user databases:');
    result.recordset.forEach(db => {
        console.log(`  - ${db.name}`);
    });
    
    sql.close();
    console.log('\n🎉 Connection test completed successfully!');
}).catch(err => {
    console.error('❌ Connection failed:', err.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure SQL Server is running');
    console.error('2. Check Windows Authentication is enabled');
    console.error('3. Verify your Windows user has SQL Server access');
});