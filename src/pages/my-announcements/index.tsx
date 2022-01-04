import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { IAnnouncement } from "@types";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Announcements, Header } from "@components";
import { getMyAnnouncements } from "@services/petinder/announcement";
import { useAnnouncement } from "@contexts";

interface IProps {
  announcements: IAnnouncement[];
}

function MyAnnouncements({ announcements }: IProps) {
  const { onOpen, setMyAnnouncements, myAnnouncements } = useAnnouncement();
  const [filter, setFilter] = useState("");
  const [filteredAnnouncements, setFilteredAnnouncements] =
    useState(announcements);

  useEffect(() => {
    setMyAnnouncements(announcements);
  }, [setMyAnnouncements, announcements]);

  useEffect(() => {
    const newFilteredAnnouncements = myAnnouncements.filter((announcement) =>
      announcement.description.includes(filter)
    );
    setFilteredAnnouncements(newFilteredAnnouncements);
  }, [myAnnouncements, filter]);

  const handleFilterChange = (event) => setFilter(event.target.value);

  function onOpenModal() {
    onOpen({ isMyAnnouncement: true });
  }

  return (
    <Box>
      <Header />
      <Flex
        padding={10}
        gridGap={10}
        flexWrap="wrap"
        width="100%"
        justifyContent="center"
      >
        <Box>
          <Text fontSize="3xl" fontWeight={700}>
            Meus Anúncios
          </Text>
        </Box>
        <Flex flexGrow={1} justifyContent="center">
          <Box width="100%" maxWidth={500} minWidth={275}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiSearch} fontSize="20" mt="2" />}
              />
              <Input
                type="tel"
                placeholder="Pesquisar anúncio"
                size="lg"
                variant="filled"
                focusBorderColor="teal.500"
                value={filter}
                onChange={handleFilterChange}
              />
            </InputGroup>
          </Box>
        </Flex>
        <Box width={216} />
      </Flex>
      <Announcements isMyAnnouncements announcements={filteredAnnouncements} />
      <IconButton
        aria-label="Abrir modal de criar anúncio"
        icon={<Icon as={FiPlus} />}
        colorScheme="orange"
        onClick={onOpenModal}
        position="fixed"
        right={["5", "10"]}
        bottom={["5", "10"]}
      />
    </Box>
  );
}

MyAnnouncements.getInitialProps = async function (ctx) {
  const { data: announcements } = await getMyAnnouncements(ctx.req);

  return { announcements };
};

export default MyAnnouncements;
