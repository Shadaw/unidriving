import User from '../models/User';

export default {
  render(user: User) {
    return {
      name: user.name,
      cellphone: user.cellphone,
    };
  },
};
