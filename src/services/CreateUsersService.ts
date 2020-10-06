import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cellphone: string;
  cnh: string;
}

export default class CreateUsersService {
  public async execute({
    name,
    email,
    password,
    cpf,
    cellphone,
    cnh,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      cellphone,
      cnh,
    });

    await usersRepository.save(user);

    return user;
  }
}
