import { getAnnouncements } from "@services/petinder/announcement";
import { IAnnouncement } from "@types";
import { Announcements, Header } from "@components";
import { Box } from "@chakra-ui/react";
import { useAnnouncement } from "@contexts";
import { useEffect } from "react";

interface IProps {
  announcements: IAnnouncement[];
}

function Home({ announcements }: IProps) {
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

Home.getInitialProps = async (ctx) => {
  const { data: announcements } = await getAnnouncements(ctx.req);

  return {
    announcements,
  };
};

export default Home;