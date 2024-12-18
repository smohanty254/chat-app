import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessageDto } from './dto/get-message.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  getMessages(getMessagesDto: GetMessageDto) {
    return this.messageRepository.findBy({
      room: { id: getMessagesDto.roomId },
    });
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create(createMessageDto);
    await this.messageRepository.save(message);
    return message;
  }
}
