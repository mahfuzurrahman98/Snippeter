// crate a mongo db connection and export to use in entire next js app, make sure it is typescript

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
