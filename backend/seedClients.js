const { pool } = require('./config/db');
const clientsData = require('./data.json');

const seedClients = () => {
    console.log('Starting to seed clients data...');
    
    // First, let's create the clients table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS clients (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            phone VARCHAR(20),
            address TEXT,
            secret_key VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    
    pool.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating clients table:', err);
            return;
        }
        
        console.log('Clients table ready');
        
        // Clear existing data
        pool.query('DELETE FROM clients', (err) => {
            if (err) {
                console.error('Error clearing clients table:', err);
                return;
            }
            
            console.log('Cleared existing clients data');
            
            // Insert new data
            const insertPromises = clientsData.map(client => {
                return new Promise((resolve, reject) => {
                    const query = 'INSERT INTO clients (name, phone, address, secret_key) VALUES (?, ?, ?, ?)';
                    const values = [
                        client.ClientName,
                        client.MobileNumber,
                        client.Address,
                        client.SecretKey
                    ];
                    
                    pool.query(query, values, (err, result) => {
                        if (err) {
                            console.error(`Error inserting client ${client.ClientName}:`, err);
                            reject(err);
                        } else {
                            console.log(`✓ Inserted client: ${client.ClientName}`);
                            resolve(result);
                        }
                    });
                });
            });
            
            Promise.all(insertPromises)
                .then(() => {
                    console.log('✅ All clients seeded successfully!');
                    process.exit(0);
                })
                .catch((err) => {
                    console.error('❌ Error seeding clients:', err);
                    process.exit(1);
                });
        });
    });
};

// Run the seeding
seedClients();