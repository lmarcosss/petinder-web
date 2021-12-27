import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface IContextProps {
  isVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const CreateAnnouncementModalContext = createContext({} as IContextProps);

interface IProps {
  children: ReactNode;
}

export function CreateAnnouncementModalProvider({ children }: IProps) {
  const [isVisible, setVisible] = useState(false);
  const router = useRouter();

  function onClose() {
    setVisible(false);
  }

  function onOpen() {
    setVisible(true);
  }

  useEffect(() => {
    onClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <CreateAnnouncementModalContext.Provider
      value={{
        onOpen,
        onClose,
        isVisible
      }}
    >
      {children}
    </CreateAnnouncementModalContext.Provider>
  );
}

export const useCreateAnnouncementModal = () => useContext(CreateAnnouncementModalContext);
