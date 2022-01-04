import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useToast,
  Select,
} from "@chakra-ui/react";
import { Header, Modal } from "@components";
import { getAnnouncementInterests, declineInterest, acceptInterest } from "@services/petinder/interest";
import { FiCheck, FiX } from "react-icons/fi";
import { ToastrEnum } from "@enums";
import { InterestStatusEnum } from "enums/InterestStatusEnum";
import { useRouter } from "next/router";
import { useLoader } from "@contexts";

function MyAnnouncements() {
  const toastr = useToast();
  const { setIsLoading } = useLoader();
  const { query: { announcementId } } = useRouter();

  const [interests, setInterests] = useState([]);
  const [detailInterest, setDetailInterest] = useState(null);
  const [selectFilter, setSelectFilter] = useState("");

  const handleSelectFilter = (event) => {
    setSelectFilter(event.target.value);
  };

  const fetchInterests = useCallback(async () => {
    try {
      if (!announcementId) return;
      setIsLoading(true);

      const { data: newInterests } = await getAnnouncementInterests(announcementId);

      setInterests(newInterests);
    } catch (err) {
      toastr({
        description: err.response.data.message || ToastrEnum.UNEXPECTED_ERROR,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [announcementId, setIsLoading, toastr]);

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  const handleCloseModal = () => setDetailInterest(null);

  function handleApprovalSuccess() {
    fetchInterests();

    handleCloseModal();    
  }

  async function handleDeclineInterest() {
    try {
      await declineInterest(detailInterest.id);

      handleApprovalSuccess();
    } catch(err) {
      toastr({
        description: err.response.data.message || ToastrEnum.UNEXPECTED_ERROR,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  }
  
  async function handleAcceptInterest() {
    try {
      await acceptInterest(detailInterest.id);

      handleApprovalSuccess();
    } catch(err) {
      toastr({
        description: err.response.data.message || ToastrEnum.UNEXPECTED_ERROR,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  }
  
  const justifyContentHeader = useBreakpointValue({
    base: "center",
    lg: "space-between",
  });

  const justifyContentTable = useBreakpointValue({
    base: undefined,
    lg: "center",
  });

  const filteredInterests = interests.filter((interest) => !selectFilter || interest.status === selectFilter);

  return (
    <Box>
      <Header />
      <Flex
        padding={10}
        gridGap={10}
        alignItems="center"
        justifyContent={justifyContentHeader}
        flexWrap="wrap"
      >
        <Box>
          <Text fontSize="3xl" fontWeight={700}>
            Interessados no anúncio {announcementId}
            {detailInterest && detailInterest.id}
          </Text>
        </Box>
        <Flex maxW={300} alignItems="center">
          <Select placeholder="Selecione um status" onChange={handleSelectFilter} value={selectFilter}>
            <option value={InterestStatusEnum.OPEN}>{InterestStatusEnum.OPEN}</option>
            <option value={InterestStatusEnum.ACCEPTED}>{InterestStatusEnum.ACCEPTED}</option>
            <option value={InterestStatusEnum.DECLINED}>{InterestStatusEnum.DECLINED}</option>
          </Select>
        </Flex>
      </Flex>
      {filteredInterests.length ? (
        <Flex justifyContent={justifyContentTable} overflow="scroll">
          <Table variant='simple' width="100vh">
            <Thead>
              <Tr>
                <Th>Status</Th>
                <Th>Interessado</Th>
                <Th>Descrição</Th>
                <Th>Avaliar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredInterests.map((interest) => (
                <Tr key={interest.id}>
                  <Td>{interest.status}</Td>
                  <Td isTruncated>{interest.interested.name}</Td>
                  <Td maxWidth={300} maxH={100} isTruncated>{interest.interested.description}</Td>
                  <Td>
                    {interest.status === InterestStatusEnum.OPEN ? (
                      <Button
                        width="100%"
                        size="sm"
                        colorScheme="orange"
                        variant="outline"
                        onClick={() => setDetailInterest(interest)}
                      >
                        Avaliar interesse
                      </Button>
                    ) : (
                      <>AVALIADO</>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Status</Th>
                <Th>Interessado</Th>
                <Th>Descrição</Th>
                <Th>Avaliar</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Flex>
      ) : (
        <Flex justifyContent="center">
          <Text fontSize="xl" fontWeight={700}>
            Nenhum interessado disponível
          </Text>
        </Flex>
      )}
      <Modal isOpen={!!detailInterest} onClose={handleCloseModal} title="Avaliar interesse">
        <Box paddingBottom={5}>
          <Flex alignItems="flex-end">
            <Text fontSize="lg" fontWeight={600}>
              Interessado:
            </Text>
            <Text marginLeft={1} marginBottom={1} fontSize="md" lineHeight={4}>
              {detailInterest?.interested.name}
            </Text>
          </Flex>
          <Text fontSize="lg" fontWeight={600} marginTop={3}>
            Descrição:
          </Text>
          <Text fontSize="md">
            {detailInterest?.interested.description}
          </Text>
          <Flex marginTop={10} width="100%" justifyContent="space-evenly">
            <IconButton
              onClick={handleDeclineInterest}
              colorScheme="red"
              width={50}
              height={50}
              rounded={50}
              variant="outline"
              icon={<Icon as={FiX} w={25} h={25} />}
              aria-label="Decline interest"
            />
            <IconButton
              onClick={handleAcceptInterest}
              colorScheme="green"
              width={50}
              height={50}
              rounded={50}
              variant="outline"
              icon={<Icon as={FiCheck} w={25} h={25} />}
              aria-label="Accept interest"
            />
          </Flex>
        </Box>
      </Modal>
    </Box>
  );
}

export default MyAnnouncements;
