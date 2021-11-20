import api from './base/petinder-api';

export function getOpennedAnnouncements() {
  const status = 'ABERTO';

  return api.get('announcement', {
    params: {
      status,
    },
  });
}
