import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { MinLength } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  @MinLength(10, { message: "Minimun de 10 caractères" })
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  @Column()
  picture: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tag: Tag[];
}
