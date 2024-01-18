import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { SERVICES } from '@n-types/injections/services';
import { REPOSITORIES } from '@n-types/injections/repositories';

import {
  IUserRepository,
  IReceiptRepository,
  IInvoiceRepository,
  ICompanyRepository,
  IRoleRepository,
  IWarehouseRepository,
  IProductRepository
} from '@n-repositories/interfaces/v1';
import {
  UserRepository,
  ReceiptRepository,
  InvoiceRepository,
  CompanyRepository,
  RoleRepository,
  WarehouseRepository,
  ProductRepository,
} from '@n-repositories';

import {
  IReceiptServices,
  IInvoiceServices,
} from '@n-services/interfaces';
import {
  ReceiptServices,
  InvoiceServices,
} from '@n-services';

const container = new Container({ defaultScope: 'Singleton' });
//repositories
container.bind<IUserRepository>(REPOSITORIES.UserRepository).to(UserRepository);
container.bind<IReceiptRepository>(REPOSITORIES.ReceiptRepository).to(ReceiptRepository);
container.bind<IInvoiceRepository>(REPOSITORIES.InvoiceRepository).to(InvoiceRepository);
container.bind<ICompanyRepository>(REPOSITORIES.CompanyRepository).to(CompanyRepository);
container.bind<IRoleRepository>(REPOSITORIES.RoleRepository).to(RoleRepository);
container.bind<IWarehouseRepository>(REPOSITORIES.WarehouseRepository).to(WarehouseRepository);
container.bind<IProductRepository>(REPOSITORIES.ProductRepository).to(ProductRepository);

//services
container.bind<IReceiptServices>(SERVICES.ReceiptServices).to(ReceiptServices);
container.bind<IInvoiceServices>(SERVICES.InvoiceServices).to(InvoiceServices);

const { lazyInject } = getDecorators(container);

export { lazyInject };

export default container;
