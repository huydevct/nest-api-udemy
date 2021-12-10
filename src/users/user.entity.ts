import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user witd id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove user with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update user with id ', this.id);
  }
}
