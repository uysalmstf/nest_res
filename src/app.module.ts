import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FeedModule } from './feed/feed.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Users } from './schemas/user.schema';
import { Posts } from './schemas/posts.schema';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule'ün global olmasını sağlar, böylece diğer modüller de erişebilir.
    }),
    JwtModule.register({global: true,
      secret: process.env.SECRET_KEY
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGO_URI'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        useUnifiedTopology: true,
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
