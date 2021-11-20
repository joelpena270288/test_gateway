import { gatewayStub } from "../tests/stubs/gateway.stub";

export const GatewayService = jest.fn().mockReturnValue({
    getById: jest.fn().mockResolvedValue(gatewayStub),
    getAll: jest.fn().mockResolvedValue([gatewayStub]),
    create: jest.fn().mockResolvedValue(gatewayStub),
    update: jest.fn().mockResolvedValue(gatewayStub),
    delete: jest.fn().mockResolvedValue(gatewayStub),
    deletePeripheralDevice: jest.fn().mockResolvedValue(gatewayStub)


})