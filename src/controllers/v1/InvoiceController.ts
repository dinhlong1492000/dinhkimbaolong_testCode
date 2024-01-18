import { lazyInject } from "@n-configs/container";
import { CResponse } from '../types';
import { SERVICES } from "@n-types/injections/services";
import { injectable } from "inversify";
import { Controller, Get, Path, Res, Route, Tags, TsoaResponse } from "tsoa";
import { IInvoiceServices } from "@n-services/interfaces/IInvoiceServices";

@injectable()
@Tags("Receipts")
@Route("api/v1")
export class InvoiceController extends Controller {
  @lazyInject(SERVICES.InvoiceServices)
  private invoiceServices: IInvoiceServices;

  @Get('invoice/:id')
  public async getInvoice(
      @Res() res: TsoaResponse<200, CResponse>,
      @Path() id: number
  ): Promise<void> {
    try {
      const invoice = await this.invoiceServices.getInvoice(id);
      return res(200, {
        message: 'invoice get successfully',
        status: 'success',
        data: invoice,
      });
    } catch (error: any) {
      return res(error.code || 500, {
        message: error.message,
        status: 'error',
      });
    }
  }
}
