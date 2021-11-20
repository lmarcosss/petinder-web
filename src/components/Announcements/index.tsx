import { Grid } from '@chakra-ui/react';
import { Announcement } from './Announcement';

interface IProps {
  announcements: any[];
}

export function Announcements({ announcements }: IProps) {
  return (
    <Grid pt="24" pl="4" pr="4" templateColumns="repeat(5, 1fr)" gap={6}>
      {announcements.map((data, index) => (
        <Announcement key={index} data={data} />
      ))}
    </Grid>
  );
}
