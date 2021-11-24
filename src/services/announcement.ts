import { AnnouncementStatusEnum } from 'enums';
import api from './base/petinder-api';

export function getOpennedAnnouncements() {
  return api.get('announcement', {
    params: {
      status: AnnouncementStatusEnum.ABERTO,
    },
  });
}
