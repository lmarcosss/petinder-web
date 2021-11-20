import { getOpennedAnnouncements } from '@services/announcement';

export default async function announcement(req, res) {
  const { data } = await getOpennedAnnouncements();

  res.status(200).json(data);
}