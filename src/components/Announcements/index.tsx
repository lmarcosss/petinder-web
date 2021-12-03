import { Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import { IAnnouncement } from "@types";
import { Announcement } from "./Announcement";

interface IProps {
  announcements: IAnnouncement[];
}

function List({ announcements }: IProps) {
  if (!announcements.length) {
    return (
      <Text align="center" p="8" fontSize={["14px", "16px"]}>
        Nenhum anúncio encontrado
      </Text>
    );
  }

  return (
    <>
      {announcements.map((data, index) => (
        <Announcement key={index} data={data} />
      ))}
    </>
  );
}

export function Announcements({ announcements }: IProps) {
  const isSmallerDevices = useBreakpointValue({
    base: true,
    lg: false
  });


  const minSize = isSmallerDevices ? "250px" : "300px";

  return (
    <Grid
      width="100%"
      padding="4"
      templateColumns={`repeat(auto-fit, minmax(${minSize}, 1fr))`}
      gap="4"
      justifyItems="center"
    >
      <List announcements={announcements} />
    </Grid>
  );
}
