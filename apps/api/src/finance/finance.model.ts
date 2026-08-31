import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class FinancialKpiModel {
  @Field(() => Float) totalRevenue!: number;
  @Field(() => Float) revenueGrowthPercent!: number;
  @Field(() => Float) totalCogs!: number;
  @Field(() => Float) grossProfit!: number;
  @Field(() => Float) grossMarginPercent!: number;
  @Field(() => Float) totalOpex!: number;
  @Field(() => Float) ebitda!: number;
  @Field(() => Float) netProfit!: number;
  @Field(() => Float) netMarginPercent!: number;
  @Field(() => Float) cashRunwayMonths!: number;
  @Field(() => Float) currentCashReserve!: number;
  @Field(() => Float) netCashFlow!: number;
  @Field(() => Float) averageOrderValue!: number;
  @Field(() => Float) totalOrdersCount!: number;
  @Field(() => Float) unpaidInvoicesAmount!: number;
  @Field(() => Float) pendingExpensesAmount!: number;
  @Field(() => Float) artistPayoutsPending!: number;
}

@ObjectType()
export class MonthlyTrendModel {
  @Field() period!: string;
  @Field(() => Float) revenue!: number;
  @Field(() => Float) cogs!: number;
  @Field(() => Float) opex!: number;
  @Field(() => Float) grossProfit!: number;
  @Field(() => Float) netProfit!: number;
  @Field(() => Float) cashFlow!: number;
}

@ObjectType()
export class ExpenseModel {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) supplierId?: string;
  @Field({ nullable: true }) supplierName?: string;
  @Field() category!: string;
  @Field() description!: string;
  @Field(() => Float) amountUsd!: number;
  @Field(() => Float) taxRatePercent!: number;
  @Field(() => Float) taxAmountUsd!: number;
  @Field(() => Float) totalWithTaxUsd!: number;
  @Field() status!: string;
  @Field() paymentMethod!: string;
  @Field() date!: Date;
  @Field({ nullable: true }) dueDate?: Date;
  @Field() period!: string;
  @Field() isRecurring!: boolean;
}

@ObjectType()
export class SupplierModel {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field() category!: string;
  @Field({ nullable: true }) contactEmail?: string;
  @Field({ nullable: true }) contactPhone?: string;
  @Field({ nullable: true }) taxId?: string;
  @Field() paymentTerms!: string;
  @Field(() => Float) balanceDueUsd!: number;
}

@ObjectType()
export class InvoiceModel {
  @Field(() => ID) id!: string;
  @Field() invoiceNumber!: string;
  @Field() clientName!: string;
  @Field() clientEmail!: string;
  @Field({ nullable: true }) clientAddress?: string;
  @Field() issueDate!: Date;
  @Field() dueDate!: Date;
  @Field(() => Float) subtotalUsd!: number;
  @Field(() => Float) taxRatePercent!: number;
  @Field(() => Float) taxAmountUsd!: number;
  @Field(() => Float) totalUsd!: number;
  @Field() status!: string;
  @Field({ nullable: true }) paidAt?: Date;
}

@ObjectType()
export class VatReportModel {
  @Field() period!: string;
  @Field(() => Float) collectedVat!: number;
  @Field(() => Float) deductibleVat!: number;
  @Field(() => Float) netVatPayable!: number;
  @Field(() => Float) totalTaxableSales!: number;
  @Field(() => Float) totalTaxablePurchases!: number;
}

@ObjectType()
export class UnitEconomicsModel {
  @Field(() => ID) orderId!: string;
  @Field() orderNumber!: string;
  @Field() clientName!: string;
  @Field() date!: Date;
  @Field() productName!: string;
  @Field() frameMaterial!: string;
  @Field() glasingType!: string;
  @Field(() => Float) sellingPrice!: number;
  @Field(() => Float) costMaterial!: number;
  @Field(() => Float) costGlass!: number;
  @Field(() => Float) costPackaging!: number;
  @Field(() => Float) costShipping!: number;
  @Field(() => Float) stripeFee!: number;
  @Field(() => Float) totalCost!: number;
  @Field(() => Float) netMargin!: number;
  @Field(() => Float) netMarginPercent!: number;
}

@ObjectType()
export class ArtistPayoutModel {
  @Field(() => ID) id!: string;
  @Field() artistId!: string;
  @Field(() => Float) amountUsd!: number;
  @Field() period!: string;
  @Field() status!: string;
  @Field({ nullable: true }) stripeTransferId?: string;
  @Field(() => Float) artworksCount!: number;
  @Field() createdAt!: Date;
}
