import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";


export enum StudentGrade {
    BAD = "неудовлетворительно",
    SATISFACTORILY = "удовлетворительно",
    GOOD = "хорошо",
    EXCELLENT="отлично"
}
@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fio: string;

    @Column()
    @CreateDateColumn()
    birthday: Date;

    @Column({
        type: "enum",
        enum: StudentGrade
    })
    grade: StudentGrade;
}
