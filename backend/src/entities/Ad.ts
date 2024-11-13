import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { MinLength } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Picture } from "./Picture";
import {
  Field,
  ObjectType,
} from "type-graphql";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  @MinLength(10, { message: "Minimun de 10 caractères" })
  description: string

  @Field()
  @Column()
  owner: string;

  @Field()
  @Column()
  price: number;

  @OneToMany(() => Picture, (picture) => picture.ad, {
    cascade: true,
    eager: true,
  })
  pictures: Picture[];

  @Field()
  @Column()
  location: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Category, {nullable: true})
  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tag: Tag[];
}
