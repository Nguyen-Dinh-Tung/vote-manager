import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CandidateService } from './services/candidate.service';
import { CandidateController } from './controller/candidate.controller';
import { CandidateEntity } from './entities/candidate.entity';
import { TicketEntity } from 'src/ticket/entities/ticket.entity';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { candidateRecomendEntity } from './entities/candidate-recomend.entity';

@Module({
  imports : [TypeOrmModule.forFeature([CandidateEntity , TicketEntity , candidateRecomendEntity]) , forwardRef(() => UsersModule) , MulterModule.register({
    dest : '/files/images'
  })] ,
  controllers: [CandidateController],
  providers: [CandidateService  ],
  exports : [CandidateService]
})
export class CandidateModule {}