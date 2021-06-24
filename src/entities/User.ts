import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("users") //entidade referenciando a tabela users
class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    if(!this.id) { //para acessar atributos de uma classe, é necessário usar o this
      this.id = uuid(); //se id do usuário for null/undefined, cria um novo id pelo uuid
    }
  }
}

export { User };
