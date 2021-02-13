import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';

const getConnectionString = () =>
  `mongodb+srv://${process.env.TP_MONGODB_USER}:${process.env.TP_MONGODB_PASS}@tripplanner-iwrj6.gcp.mongodb.net/${process.env.TP_MONGODB_DBNAME}?retryWrites=true&w=majority`;

const mongooseConfig = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getConnectionString(), mongooseConfig),
    UsersModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
