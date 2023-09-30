import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 1 })
    easeOfPrep: number;

    @Column('int', { array: true })
    category: Array<number>;

    @Column('int', { array: true })
    ingredients: Array<number>;

    @Column({ default: 0 })
    prepTime: number;

    @Column({ default: '' })
    methodOfPreparing: string;

    @Column({ default: false })
    withoutMeat: boolean;
}
