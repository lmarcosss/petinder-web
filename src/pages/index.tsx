import { getAnnouncements } from "@services/next/announcement";
import { GetStaticProps } from "next";
import { IAnnouncement } from "@types";
import { Announcements, Header } from "../components";

interface IProps {
  announcements: IAnnouncement[];
}

export default function Home({ announcements, }: IProps) {
  return (
    <div>
      <Header />
      <Announcements announcements={announcements} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: announcements, } = await getAnnouncements();

  return {
    props: {
      announcements,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
