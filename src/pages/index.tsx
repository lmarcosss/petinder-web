import { getAnnouncements } from "@services/next/announcement";
import { GetStaticProps } from "next";
import { IAnnouncement } from "@types";
import { Announcements, Header } from "../components";
import { Box } from "@chakra-ui/react";
interface IProps {
  announcements: IAnnouncement[];
}

export default function Home({ announcements }: IProps) {
  return (
    <Box>
      <Header />
      <Announcements announcements={announcements} />
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: announcements } = await getAnnouncements();

  return {
    props: {
      announcements
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
};
