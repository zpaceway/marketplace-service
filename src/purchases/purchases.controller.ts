import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PurchaseOrder } from 'src/dto';
import { PurchasesService } from './purchases.service';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Controller('api/orders')
export class PurchasesController {
  constructor(
    private purchasesService: PurchasesService,
    @Inject('CASHBACK') private client: ClientProxy,
  ) {}

  @Post('purchase')
  async purchase(@Body() purcharseOrderData: PurchaseOrder) {
    const operationResult =
      await this.purchasesService.purchaseOrder(purcharseOrderData);

    const message = JSON.stringify(purcharseOrderData);
    const record = new RmqRecordBuilder(message)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 3,
      })
      .build();
    const result = this.client.emit('process_order', record);
    result.subscribe((e) => e);

    return operationResult;
  }
}
