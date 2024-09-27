import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength } from "class-validator";
import { Ads } from "./Ads";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(20, { message: "Maximum de 20 caractères"})
  title: string;

  @OneToMany(() => Ads, ads => ads.category)
  ads: Ads[];
}