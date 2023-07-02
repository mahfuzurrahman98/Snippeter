import mongoose, { Mongoose } from 'mongoose';

class Database {
  private static instance: Mongoose | null = null;

  static getInstance(): Mongoose {
    if (!Database.instance) {
      mongoose.set('strictQuery', true);
      mongoose
        .connect(process.env.DB_URL!, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as any) // Type assertion here
        .then(() => {
          console.log('Connected to MongoDB');
        })
        .catch((err) => {
          console.log(err);
        });

      Database.instance = mongoose;
    }

    return Database.instance;
  }
}

export default Database;
