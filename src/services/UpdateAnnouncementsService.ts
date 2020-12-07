import { getRepository } from 'typeorm';

import Announcement from '../models/Announcement';

interface Request {
  id: string;
  title: string;
  description: string;
  destiny: string;
}

class CreateAnnouncementsService {
  public async execute({
    id,
    title,
    description,
    destiny,
  }: Request): Promise<Announcement> {
    const announcementsRepository = getRepository(Announcement);

    const announcement = await announcementsRepository.findOne(id);

    if (!announcement) {
      throw new Error('only existing ads can be changed');
    }

    if (title) {
      announcement.title = title;
    }
    if (description) {
      announcement.description = description;
    }
    if (destiny) {
      announcement.destiny = destiny;
    }

    await announcementsRepository.save(announcement);

    return announcement;
  }
}

export default CreateAnnouncementsService;
