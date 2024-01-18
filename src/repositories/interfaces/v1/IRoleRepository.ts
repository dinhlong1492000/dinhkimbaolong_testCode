import Role from '@n-models/Role';

import IRepository from '../IRepository';

export interface IRoleRepository extends IRepository<typeof Role> {
}
