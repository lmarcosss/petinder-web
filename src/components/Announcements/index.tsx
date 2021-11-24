import { Grid, Text, useBreakpointValue } from '@chakra-ui/react';
import { Announcement } from './Announcement';

interface IProps {
  announcements: any[];
}

function List({ items }) {
  if (!items.length) {
    return (
      <Text align="center" p="8" fontSize={['14px', '16px']}>
        Nenhum anúncio encontrado
      </Text>
    );
  }

  return (
    <>
      {items.map((data, index) => (
        <Announcement key={index} data={data} />
      ))}
    </>
  );
}

export function Announcements({ announcements }: IProps) {
  const isSmallerDevices = useBreakpointValue({
    base: true,
    lg: false,
  });

  const minSize = isSmallerDevices ? '250px' : '300px';

  return (
    <Grid
      width="100%"
      height="100%"
      padding="4"
      templateColumns={`repeat(auto-fit, minmax(${minSize}, 1fr))`}
      gap="4"
      justifyItems="center"
    >
      <List items={announcements} />
    </Grid>
  );
}
