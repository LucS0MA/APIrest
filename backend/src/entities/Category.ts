import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MaxLength } from "class-validator";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  @MaxLength(20, { message: "Maximum de 20 caractères" })
  title: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}
