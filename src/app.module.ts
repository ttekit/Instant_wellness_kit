import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { TaxRatesModule } from './tax_rates/tax_rates.module';
import { JurisdictionsModule } from './jurisdictions/jurisdictions.module';
import { OrdersModule } from './orders/orders.module';
import { BillingsModule } from './billings/billings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RolesModule,
    TaxRatesModule,
    JurisdictionsModule,
    OrdersModule,
    BillingsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }