import { Modal } from "@components";
import { useAnnouncement } from "@contexts";
import { CreateAnnouncement } from "./form";

export function AnnouncementModal() {
  const { onClose, isVisible, titleModal } = useAnnouncement();

  return (
    <Modal isOpen={isVisible} onClose={onClose} title={titleModal}>
      <CreateAnnouncement />
    </Modal>
  );
}
