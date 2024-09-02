import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Users } from './user.schema';

@Entity()
export class Posts {

    @PrimaryGeneratedColumn('uuid')  // Otomatik olarak UUID olarak birincil anahtar oluşturur
    id: string;

    @Column({ type: 'text', nullable: false })  // İçerik metni için sütun tanımı
    content: string;

    @CreateDateColumn()  // Otomatik olarak oluşturulma tarihini belirler
    createdAt: Date;

    @ManyToOne(() => Users, (user) => user.posts)  // Bir kullanıcıya ait olan postlar
    createdBy: Users;
}