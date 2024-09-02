import {
    Entity,
    Column,
    Unique,
    ManyToMany,
    JoinTable,
    ObjectIdColumn
} from "typeorm";
import { Posts } from "./posts.schema";

@Entity()
@Unique(['username'])
export class Users {
    @ObjectIdColumn()
    id: string;
  
    @Column()
    username: string;
  
    @Column()
    password: string;

    @ManyToMany(() => Posts)
    @JoinTable()  // Bu tablo için bir ilişkisel tablo oluşturur
    posts: Posts[];

    @ManyToMany(() => Users)
    @JoinTable({ name: 'follows' })  // Many-to-Many ilişki için tablo adı belirleyebilirsiniz
    follows: Users[];
  }