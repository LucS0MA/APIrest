import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MaxLength } from "class-validator";
import { Ad } from "./Ad";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(20, { message: "Maximum de 20 caractères"})
  title: string;

  
  @ManyToMany(() => Ad, ads => ads.tag)
  ads: Ad[];
}