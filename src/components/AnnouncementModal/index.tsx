import { Modal, StepOneCreateAnnouncement, StepTwoCreateAnnouncement } from "@components";
import { useCreateAnnouncementModal } from "@contexts/createAnnouncementContext";
import { FormRegisterEnum } from "@enums";
import { IAnnouncementForm } from "@types";
import { useState } from "react";

interface IFormProps {
    form: FormRegisterEnum;
    setFormProperties?(values: IAnnouncementForm): void;
    goToStepOne(): void;
    goToStepTwo(): void;
    formProperties?: IAnnouncementForm;
  }


function Form({ form, setFormProperties, goToStepOne, goToStepTwo, formProperties }: IFormProps) {
  if (form === FormRegisterEnum.STEP_ONE) {
    return (
      <StepOneCreateAnnouncement
        onChangeFormProperties={setFormProperties}
        goToStepTwo={goToStepTwo}
        formProperties={formProperties}
      />
    );
  }
    
  return (
    <StepTwoCreateAnnouncement
      formProperties={formProperties}
      goToStepOne={goToStepOne}
    />
  );
}

export function AnnouncementModal() {
  const { onClose, isVisible } = useCreateAnnouncementModal();
  const [form, setForm] = useState(FormRegisterEnum.STEP_ONE);

  function goToStepTwo() {
    setForm(FormRegisterEnum.STEP_TWO);
  }

  function goToStepOne() {
    setForm(FormRegisterEnum.STEP_ONE);
  }

  return (
    <Modal isOpen={isVisible} onClose={onClose} title="Criar anúncio">
      <Form goToStepTwo={goToStepTwo} goToStepOne={goToStepOne} form={form} />
    </Modal>
  );
}