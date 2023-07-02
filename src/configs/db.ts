import mongoose, { Mongoose } from 'mongoose';

class Database {
  private static instance: Mongoose | null = null;

  static getInstance(): Mongoose {
    if (!Database.instance) {
      mongoose.set('strictQuery', true);
      mongoose
        .connect(process.env.MONGO_URI!, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as any)
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
