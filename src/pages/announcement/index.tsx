import { BaseFormScreen, StepOneCreateAnnouncement, StepTwoCreateAnnouncement } from "@components";
import { FormRegisterEnum } from "@enums";
import { IAnnouncementForm } from "@types";
import { useState } from "react";

interface IFormProps {
    form: FormRegisterEnum;
    setFormProperties?(values: IAnnouncementForm): void;
    goToStepTwo(): void;
    formProperties?: IAnnouncementForm;
  }

function Form({ form, setFormProperties, goToStepTwo, formProperties }: IFormProps) {
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
    />
  );
}

export default function CreateAnnouncement() {
  const [form, setForm] = useState(FormRegisterEnum.STEP_ONE);

  function goToStepTwo() {
    setForm(FormRegisterEnum.STEP_TWO);
  }

  return (
    <BaseFormScreen image="createAnnouncement.jpeg">
      <Form goToStepTwo={goToStepTwo} form={form} />
    </BaseFormScreen>
  );
}