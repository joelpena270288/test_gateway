import { ReadGatewayDto } from "../../dto"
import { Status } from "../../estatus"

export const gatewayStub = (): ReadGatewayDto => {
    return {
        id: "03n4345nm45",
        IPv4: '192.168.40.154',       
        name: 'Gateway 1',
        serial_number: 'EC-2A-3B-5S',
        peripherals_devices: [{
            UID: 122,
            status: Status.OFFLINE,
            vendor: '1cga',
            date_created: new Date()
           

        }]
        
    }
}