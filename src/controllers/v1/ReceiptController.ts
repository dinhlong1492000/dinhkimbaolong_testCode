import { lazyInject } from "@n-configs/container";
import { CResponse, CReceiptCreate } from "../types";
import { SERVICES } from "@n-types/injections/services";
import { injectable } from "inversify";
import {
  Body,
  Controller,
  OperationId,
  Post,
  Res,
  Route,
  Tags,
  TsoaResponse,
} from "tsoa";
import { IReceiptServices } from "@n-services/interfaces";

@injectable()
@Tags("Receipts")
@Route("api/v1")
export class ReceiptController extends Controller {
  @lazyInject(SERVICES.ReceiptServices)
  private receiptServices: IReceiptServices;

  @Post("receipt")
  @OperationId("createReceipt")
  public async createReceipt(
    @Body() body: CReceiptCreate,
    @Res() res: TsoaResponse<200, CResponse>
  ): Promise<void> {
    try {
      const receipt = await this.receiptServices.createReceipt(body);
      return res(200, {
        message: "receipt get successfully",
        status: "success",
        data: receipt,
      });
    } catch (error: any) {
      return res(error.code || 500, {
        message: error.message,
        status: "error",
      });
    }
  }
}
