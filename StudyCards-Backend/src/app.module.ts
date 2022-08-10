import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DecksModule } from './decks/decks.module';
import { UserModule } from './user/user.module';

const getConnectionString = () =>
  `mongodb+srv://${process.env.SC_MONGODB_USER}:${process.env.SC_MONGODB_PASS}@studycards-odlzj.gcp.mongodb.net/${process.env.SC_MONGODB_DBNAME}?retryWrites=true&w=majority`;

const mongooseConfig = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getConnectionString(), mongooseConfig),
    AuthModule,
    UserModule,
    DecksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
