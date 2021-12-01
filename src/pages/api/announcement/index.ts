import { getOpennedAnnouncements } from "@services/petinder/announcement";

export default async function announcement(req, res) {
  const { data, } = await getOpennedAnnouncements();

  res.status(200).json(data);
}
