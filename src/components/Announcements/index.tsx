import { Grid } from '@chakra-ui/react';
import { Announcement } from './Announcement';

interface IProps {
  announcements: any[];
}

export function Announcements({ announcements }: IProps) {
  return (
    <Grid
      width="100%"
      mt="18"
      pl={['4']}
      pr={['4']}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap="4"
    >
      {announcements.map((data, index) => (
        <Announcement key={index} data={data} />
      ))}
    </Grid>
  );
}
