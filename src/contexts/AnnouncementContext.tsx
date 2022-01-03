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
  onOpen: (props?: IOpenProps) => void;
  initialData?: IAnnouncement;
  titleModal: string;
  announcements: IAnnouncement[];
  myAnnouncements: IAnnouncement[];
  setAnnouncements: (annoucements: IAnnouncement[]) => void;
  setMyAnnouncements: (annoucements: IAnnouncement[]) => void;
  isMyAnnouncement: boolean;
}

const AnnouncementContext = createContext({} as IContextProps);

interface IProps {
  children: ReactNode;
}

interface IOpenProps {
  initialData?: IAnnouncement;
  title?: string;
  isMyAnnouncement?: boolean;
}

export function AnnouncementProvider({ children }: IProps) {
  const [isVisible, setVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [myAnnouncements, setMyAnnouncements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [titleModal, setTitleModal] = useState("");
  const [isMyAnnouncement, setIsMyAnnouncement] = useState(false);
  const router = useRouter();

  function onClose() {
    setInitialData(null);
    setVisible(false);
  }

  function onOpen(props: IOpenProps) {
    if (props?.initialData) {
      setInitialData(props.initialData);
    }

    const title = props?.title || "Criar anúncio";

    setTitleModal(title);

    setVisible(true);

    setIsMyAnnouncement(!!props?.isMyAnnouncement);
  }

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <AnnouncementContext.Provider
      value={{
        onOpen,
        onClose,
        isVisible,
        initialData,
        titleModal,
        announcements,
        myAnnouncements,
        isMyAnnouncement,
        setMyAnnouncements,
        setAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
}

export const useAnnouncement = () => useContext(AnnouncementContext);
