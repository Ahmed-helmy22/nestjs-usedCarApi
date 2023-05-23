import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private Repo: Repository<User>) {}

  CreateUser(email: string, password: string) {
    const user = this.Repo.create({ email, password });
    return this.Repo.save(user);
  }

  async findone(id: number) {
    if (!id) throw new NotFoundException("user not found555");
    const user = await this.Repo.findOneBy({ id });
    if (!user) throw new NotFoundException("user not found");
    return user;
  }
  find(email: string) {
    return this.Repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.Repo.findOneBy({ id });
    if (!user) throw new NotFoundException("user nott found");
    Object.assign(user, attrs);
    return this.Repo.save(user);
  }
  async remove(id: number) {
    const user = await this.Repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("user not found");
    }

    return this.Repo.remove(user);
  }
}
