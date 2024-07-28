import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from 'src/dto';
import { Purchase } from 'src/entities/purchase.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async purchaseOrder(purchaseOrderData: PurchaseOrder) {
    const user = await this.userRepository.findOne({
      where: {
        id: purchaseOrderData.user.id,
      },
    });

    if (!user) {
      await this.userRepository.insert({
        id: purchaseOrderData.user.id,
        firstName: purchaseOrderData.user.firstName,
        lastName: purchaseOrderData.user.lastName,
      });
    }

    const purchaseOrder = this.purchasesRepository.create({
      id: purchaseOrderData.id,
      userId: purchaseOrderData.user.id,
      value: purchaseOrderData.value,
    });

    await this.purchasesRepository.insert(purchaseOrder);

    return {
      status: 'success',
    };
  }
}
