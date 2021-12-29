import { IAnnouncement } from "@types";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IContextProps {
  isVisible: boolean;
  onClose: () => void;
  onOpen: (initialData?: IAnnouncement) => void;
  initialData?: IAnnouncement;
}

const AnnouncementModalContext = createContext({} as IContextProps);

interface IProps {
  children: ReactNode;
}

export function AnnouncementModalProvider({ children }: IProps) {
  const [isVisible, setVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const router = useRouter();

  function onClose() {
    setInitialData(null);
    setVisible(false);
  }

  function onOpen(initialData: IAnnouncement) {
    setInitialData(initialData);
    setVisible(true);
  }

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <AnnouncementModalContext.Provider
      value={{
        onOpen,
        onClose,
        isVisible,
        initialData,
      }}
    >
      {children}
    </AnnouncementModalContext.Provider>
  );
}

export const useAnnouncementModal = () => useContext(AnnouncementModalContext);
