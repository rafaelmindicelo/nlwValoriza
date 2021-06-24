import {EntityRepository, Repository} from "typeorm";
import {User} from "../entities/User";

@EntityRepository(User)
class UsersRepositories extends Repository<User> { //quando faz o extend, a classe UsersRepositories terá acesso a todos os métodos da classe Repository 

}

export { UsersRepositories }