import { Box, Button, Flex, Icon, IconButton, Image, Link, useToast } from "@chakra-ui/react";
import { IAnnouncement } from "@types";
import { AnnouncementStatusEnum, ToastrEnum } from "@enums";
import { FiEdit } from "react-icons/fi";
import { useAnnouncement } from "@contexts";
import { InterestStatusEnum } from "enums/InterestStatusEnum";
import { createInterest } from "@services/petinder/interest";
import { useToken } from "@hooks/useToken";
import { useRouter } from "next/router";

const cursor = {
  [AnnouncementStatusEnum.ABERTO]: "pointer",
};

interface IProps {
  data: IAnnouncement;
  isMyAnnouncement?: boolean;
}

function MyAnnouncementFooter({ data }) {
  const router = useRouter();
  const { onOpen } = useAnnouncement();

  function onOpenModal() {
    onOpen({ initialData: data, title: "Editar anúncio" });
  }

  function redirectToInteresteds() {
    setTimeout(() => router.push(`interests/${data.id}`), 200);
  }

  return (
    <Flex paddingTop={5} justifyContent="space-between">
      <Button
        onClick={redirectToInteresteds}
        colorScheme="orange"
      >
        Ver Interessados
      </Button>
      <IconButton
        onClick={onOpenModal}
        icon={<Icon as={FiEdit} />}
        aria-label="Abrir modal de editar anúncio"
        colorScheme="orange"
      />
    </Flex>
  );
}

function AnnouncementFooter({ data }) {
  const router = useRouter();
  const toastr = useToast();
  const { hasAuth } = useToken();

  const status = data.interestStatus;
  const hasInterest = !!status;
  const isInterestOpen = status === InterestStatusEnum.OPEN;
  const isInterestApproved = status === InterestStatusEnum.ACCEPTED;
  const isInterestRefused = status === InterestStatusEnum.DECLINED;

  async function showInterest() {
    try {
      await createInterest(data.id);
      
      toastr({
        description: "Intereste enviado com sucesso",
        status: "success",
        position: "top-right",
        isClosable: true
      });

      router.reload();
    } catch (err) {
      toastr({
        description: err.response.data.message || ToastrEnum.UNEXPECTED_ERROR,
        status: "error",
        position: "top-right",
        isClosable: true
      });
    }
  }

  if (!hasAuth || isInterestRefused) return null;

  return (
    <Flex justifyContent="flex-end" paddingTop={5}>
      {!hasInterest && (
        <Button
          onClick={showInterest}
          colorScheme="orange"
        >
          Tenho interesse
        </Button>
      )}
      {isInterestOpen && (
        <Button
          colorScheme="orange"
          disabled
        >
          Interesse solicitado
        </Button>
      )}
      {isInterestApproved && (
        <Link
          isExternal
          href={`https://api.whatsapp.com/send?phone=55${data.owner.phone}&text=Tenho%20interesse%20em%20adotar%20seu%20pet!`}
        >
          <Button
            colorScheme="orange"
            variant="outline"
          >
            Chamar para conversar
          </Button>
        </Link>
      )}
    </Flex>
  );
}

export function Announcement({ data, isMyAnnouncement }: IProps) {
  return (
    <Box
      cursor={cursor[data.status]}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={data.pictures[0].url} alt={String(data.id)} />

      <Box position="relative" p="6">
        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {data.title}
        </Box>
        <Box mt="1" as="h2" fontWeight="500" lineHeight="tight" isTruncated>
          {data.description}
        </Box>

        <Box>{data.city}</Box>
        {(data.isMyAnnouncement || isMyAnnouncement)
          ? (
            <MyAnnouncementFooter data={data} />
          ) : (
            <AnnouncementFooter data={data} />
          )}
      </Box>
    </Box>
  );
}
