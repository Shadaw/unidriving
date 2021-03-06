import { Router } from 'express';
import { getRepository } from 'typeorm';
import announcementsView from '../views/announcements_view';

import Announcement from '../models/Announcement';

import CreateAnnouncementsService from '../services/CreateAnnouncementsService';
import UpdateAnnouncementsService from '../services/UpdateAnnouncementsService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const announcementsRouter = Router();

announcementsRouter.use(ensureAuthenticated);

announcementsRouter.get('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { filter } = request.query;
    const announcementsRepository = getRepository(Announcement);

    if (filter) {
      const announcements = await announcementsRepository.find({
        relations: ['user'],
      });

      return response.json(announcementsView.renderMany(announcements));
    }

    const announcements = await announcementsRepository.find({
      where: { user_id: id },
      relations: ['user'],
    });
    return response.json(announcementsView.renderMany(announcements));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

announcementsRouter.post('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { title, description, destiny } = request.body;

    const createAnnouncement = new CreateAnnouncementsService();

    const announcement = await createAnnouncement.execute({
      user: id,
      title,
      description,
      destiny,
    });

    return response.json(announcement);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

announcementsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const announcementsRepository = getRepository(Announcement);

    await announcementsRepository.delete({ id });

    return response.status(204).json();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

announcementsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description, destiny } = request.body;

    const updateAnnouncement = new UpdateAnnouncementsService();

    const announcement = await updateAnnouncement.execute({
      id,
      title,
      description,
      destiny,
    });

    return response.json(announcement);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default announcementsRouter;
