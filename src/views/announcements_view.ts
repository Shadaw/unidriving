import Announcement from '../models/Announcement';
import usersView from './users_view';

export default {
  render(announcement: Announcement) {
    return {
      id: announcement.id,
      title: announcement.title,
      description: announcement.description,
      destiny: announcement.destiny,
      created_at: announcement.created_at,
      updated_at: announcement.updated_at,
      user: usersView.render(announcement.user),
    };
  },

  renderMany(announcements: Announcement[]) {
    return announcements.map(announcement => this.render(announcement));
  },
};
