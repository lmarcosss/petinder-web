import { Modal } from "@components";
import { useAnnouncementModal } from "@contexts/AnnouncementContext";
import { IAnnouncementEdit } from "@types";
import { CreateAnnouncement } from "./form";

interface IProps {
  initialData?: IAnnouncementEdit;
}

export function AnnouncementModal({ initialData }: IProps) {
  const { onClose, isVisible } = useAnnouncementModal();

  return (
    <Modal isOpen={isVisible} onClose={onClose} title="Criar anúncio">
      <CreateAnnouncement initialData={initialData} />
    </Modal>
  );
}
