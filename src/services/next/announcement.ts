import api from '../petinder/petinder-api';

export function getAnnouncements() {
  return api.get('announcement');
}
