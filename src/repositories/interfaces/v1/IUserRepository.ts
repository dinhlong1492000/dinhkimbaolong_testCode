import User from '@n-models/User';

import IRepository from '../IRepository';

export interface IUserRepository extends IRepository<typeof User> {
}
