import { getAnnouncements } from "@services/next/announcement";
import { GetStaticProps } from "next";
import { IAnnouncement } from "@types";
import { Announcements, Header } from "@components";
import { Box } from "@chakra-ui/react";
import { useAnnouncement } from "@contexts";
import { useEffect } from "react";

interface IProps {
  announcements: IAnnouncement[];
}

export default function Home({ announcements }: IProps) {
  const { announcements: globalAnnouncements, setAnnouncements } =
    useAnnouncement();

  useEffect(() => {
    setAnnouncements(announcements);
  }, [announcements, setAnnouncements]);

  return (
    <Box>
      <Header />
      <Announcements announcements={globalAnnouncements} />
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: announcements } = await getAnnouncements();

  return {
    props: {
      announcements,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
