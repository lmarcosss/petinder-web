import { Modal } from "@components";
import { useAnnouncementModal } from "@contexts";
import { CreateAnnouncement } from "./form";

export function AnnouncementModal() {
  const { onClose, isVisible } = useAnnouncementModal();

  return (
    <Modal isOpen={isVisible} onClose={onClose} title="Criar anúncio">
      <CreateAnnouncement />
    </Modal>
  );
}
