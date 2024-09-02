/*import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Posts } from "./posts.schema";
import mongoose from "mongoose";*/
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    ManyToMany,
    JoinTable,
    ManyToOne,
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