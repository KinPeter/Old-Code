import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DeckDocument } from './deck.model';
import { DeckDto } from './decks.dto';

@Injectable()
export class DecksRepository {
  constructor(@InjectModel('Deck') private readonly deckModel: Model<DeckDocument>) {}

  async getOne(id: string): Promise<DeckDocument> {
    return await this.deckModel.findById(id).exec();
  }

  async getAll(userId: string): Promise<DeckDocument[]> {
    return await this.deckModel.find({ userId }).exec();
  }

  async save(deckDto: DeckDto): Promise<DeckDocument> {
    const deck = new this.deckModel({
      name: deckDto.name,
      link: deckDto.link,
      progress: deckDto.progress,
      userId: deckDto.userId,
    });
    return await deck.save();
  }

  async update(deckId: string, deckDto: DeckDto): Promise<DeckDocument> {
    return await this.deckModel
      .findByIdAndUpdate(deckId, {
        name: deckDto.name,
        link: deckDto.link,
        progress: deckDto.progress,
      })
      .exec();
  }

  async delete(deckId: string): Promise<DeckDocument> {
    return await this.deckModel.findByIdAndDelete(deckId).exec();
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.deckModel.deleteMany({ userId }).exec();
  }
}
