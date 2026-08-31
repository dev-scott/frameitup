import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { FinanceService } from './finance.service';
import {
  FinancialKpiModel,
  MonthlyTrendModel,
  ExpenseModel,
  SupplierModel,
  InvoiceModel,
  VatReportModel,
  UnitEconomicsModel,
  ArtistPayoutModel,
} from './finance.model';

@Resolver()
export class FinanceResolver {
  constructor(private financeService: FinanceService) {}

  @Query(() => FinancialKpiModel, { description: 'Résumé des KPIs financiers exécutifs' })
  async financialOverview(
    @Args('period', { nullable: true }) period?: string
  ): Promise<FinancialKpiModel> {
    return this.financeService.getOverview(period);
  }

  @Query(() => [MonthlyTrendModel], { description: 'Tendances financières mensuelles' })
  async monthlyFinancialTrends(): Promise<MonthlyTrendModel[]> {
    return this.financeService.getMonthlyTrends();
  }

  @Query(() => [ExpenseModel], { description: 'Liste des dépenses' })
  async expensesList(
    @Args('period', { nullable: true }) period?: string,
    @Args('category', { nullable: true }) category?: string
  ): Promise<ExpenseModel[]> {
    return this.financeService.getExpenses(period, category) as any;
  }

  @Query(() => [SupplierModel], { description: 'Liste des fournisseurs' })
  async suppliersList(): Promise<SupplierModel[]> {
    return this.financeService.getSuppliers() as any;
  }

  @Query(() => [InvoiceModel], { description: 'Liste des factures émises' })
  async invoicesList(): Promise<InvoiceModel[]> {
    return this.financeService.getInvoices() as any;
  }

  @Query(() => VatReportModel, { description: 'Déclaration et rapport de TVA' })
  async vatReport(
    @Args('period', { nullable: true }) period?: string
  ): Promise<VatReportModel> {
    return this.financeService.getVatReport(period);
  }

  @Query(() => [UnitEconomicsModel], { description: 'Analyse unitaire de rentabilité par commande' })
  async unitEconomicsList(): Promise<UnitEconomicsModel[]> {
    return this.financeService.getUnitEconomics() as any;
  }

  @Query(() => [ArtistPayoutModel], { description: 'Reversements artistes marketplace' })
  async artistPayoutsList(): Promise<ArtistPayoutModel[]> {
    return this.financeService.getArtistPayouts() as any;
  }

  @Mutation(() => ExpenseModel, { description: 'Créer une nouvelle dépense' })
  async createExpense(
    @Args('category') category: string,
    @Args('description') description: string,
    @Args('amountUsd', { type: () => Float }) amountUsd: number,
    @Args('paymentMethod') paymentMethod: string,
    @Args('supplierName', { nullable: true }) supplierName?: string,
    @Args('taxRatePercent', { type: () => Float, nullable: true }) taxRatePercent?: number
  ): Promise<ExpenseModel> {
    return this.financeService.createExpense({
      category: category as any,
      description,
      amountUsd,
      paymentMethod: paymentMethod as any,
      supplierName,
      taxRatePercent,
    }) as any;
  }
}
