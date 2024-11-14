import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MaxLength } from "class-validator";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @MaxLength(20, { message: "Maximum de 20 caractères" })
  title: string;

  @ManyToMany(() => Ad, (ads) => ads.tag)
  ads: Ad[];
}
