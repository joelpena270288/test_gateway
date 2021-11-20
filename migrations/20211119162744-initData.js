
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
        await db.collection('gateways').insertMany([
            {
               IPv4 : "192.168.40.1",
                name: "GATEWAY 1",
                serial_number: "1E-2C-4A",
                peripherals_devices: [ 
                    {
                        UID: 101,
                        vendor: "1cab4",
                        status : "offline",
                        date_created: "2021-11-18T00:00:00.000Z"
                    }, 
                    {
                        UID: 102,
                        vendor: "er4d",
                        status: "offline",
                        date_created: "2021-11-18T00:00:00.000Z"
                      
                    }, 
                    {
                        UID: 103,
                        vendor: "4a5b",
                        status: "offline",
                        date_created: "2021-11-18T00:00:00.000Z"
                       
                    }, 
                    {
                        UID : 104,
                        vendor : "67ca",
                        status: "online",
                        date_created: "2021-11-18T00:00:00.000Z"
                      
                    }, 
                    {
                        UID: 105,
                        vendor: "34fe",
                        status: "online",
                        date_created : "2021-11-18T00:00:00.000Z"
                       
                    }
                ],
                created_at: "2021-11-19T18:24:27.372Z"  
            },
            {              
                IPv4: "192.168.60.1",
                name : "GATEWAY 2",
                serial_number: "1A-BC-5F",
                peripherals_devices: [ 
                    {
                        UID: 109,
                        vendor: "re5",
                        status: "online",
                        date_created: "2021-11-18T00:00:00.000Z"
                        
                    }, 
                    {
                        UID : 108,
                        vendor: "3erc",
                        status: "online",
                        date_created : "2021-11-18T00:00:00.000Z"
                       
                    }
                ],
               
            }
        
        
        
        ]
    );
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
   // await db.collection('albums').updateOne({}, {$set: {blacklisted: false}});
  }
};
