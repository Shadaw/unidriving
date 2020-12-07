import { getRepository } from 'typeorm';

import Announcement from '../models/Announcement';

interface Request {
  user: string;
  title: string;
  description: string;
  destiny: string;
}

class CreateAnnouncementsService {
  public async execute({
    user,
    title,
    description,
    destiny,
  }: Request): Promise<Announcement> {
    const announcementsRepository = getRepository(Announcement);

    const announcement = announcementsRepository.create({
      user_id: user,
      title,
      description,
      destiny,
    });

    await announcementsRepository.save(announcement);

    return announcement;
  }
}

export default CreateAnnouncementsService;
