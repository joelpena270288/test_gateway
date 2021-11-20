import { Test } from "@nestjs/testing";
import { CreateGatewayDto, CreatePeripheralDeviceDto, ReadGatewayDto } from "../dto";
import { Status } from "../estatus";
import { GatewayController } from "../gateway.controller";
import { GatewayService } from "../gateway.service";
import { gatewayStub } from "./stubs/gateway.stub";
jest.mock('../gateway.service.ts');
/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/
describe('GatewayController', () => {
  let gatewayController: GatewayController;
  let gatewayService: GatewayService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [GatewayController],
      providers: [GatewayService]
    }).compile();
    gatewayController = moduleRef.get<GatewayController>(GatewayController);
    gatewayService = moduleRef.get<GatewayService>(GatewayService);
    jest.clearAllMocks();

  })
  describe('getById', () => {
    describe('when getById is called', () => {
      let gateway: ReadGatewayDto;
      beforeEach(async () => {
        gateway = await gatewayController.getById(gatewayStub().id)
      })
      test('then it should call gatewayService', () => {
        expect(gatewayService.getById).toBeCalledWith(gatewayStub().id);
      })
    })
  })
  describe('getAll', () => {
    describe('when getAll is called', () => {
      let gateways: ReadGatewayDto[];
      beforeEach(async () => {
        gateways = await gatewayController.getAll()
      })
      test('then is should call gatewayService', () => {
        expect(gatewayService.getAll).toHaveBeenCalled();
      })
     
    })
  })
  describe('create', () => {
    describe('when create is called', () => {
      let readGateway:ReadGatewayDto;
      let createGateway: CreateGatewayDto;
      beforeEach(async () => {
        createGateway = {
          IPv4: gatewayStub().IPv4,
          name: gatewayStub().name,
          serial_number: gatewayStub().serial_number,
          peripherals_devices: gatewayStub().peripherals_devices
        }
        readGateway = await gatewayController.create(createGateway);
      })
      test('then it should call gatewayService', () => {
        expect(gatewayService.create).toHaveBeenCalledWith(createGateway)
      })
     
    })
  })

  describe('delete', () => {
    describe('when delete is called', () => {
      let readGateway:ReadGatewayDto;
      
      beforeEach(async () => {
       
        readGateway = await gatewayController.delete(gatewayStub().id);
      })
      test('then it should call gatewayService', () => {
        expect(gatewayService.delete).toHaveBeenCalledWith(gatewayStub().id)
      })
     
    })
  })
  describe('update', () => {
    describe('when update is called', () => {
      let readGateway:ReadGatewayDto;
      let createPeripheralDeviceDto: CreatePeripheralDeviceDto;
      beforeEach(async () => {
        createPeripheralDeviceDto = {
          UID: 1221,
          status: Status.OFFLINE,
          vendor: 'c1a4',
          date_created: new Date()
        }
       
        readGateway = await gatewayController.deletePeripheralDevice(gatewayStub().id, createPeripheralDeviceDto);
      })
      test('then it should deletePeripheralDevice gatewayService', () => {
        expect(gatewayService.deletePeripheralDevice).toHaveBeenCalledWith(gatewayStub().id, createPeripheralDeviceDto)
      })
     
    })
  })
})