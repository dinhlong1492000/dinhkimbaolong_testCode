import Company from '@n-models/Company';

import IRepository from '../IRepository';

export interface ICompanyRepository extends IRepository<typeof Company> {
  getCompany(id: number): Promise<typeof Company['prototype']>
}
