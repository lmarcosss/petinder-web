import { BaseFormScreen, StepOne, StepTwo } from "@components";
import { FormRegisterEnum } from "@enums";
import { useState } from "react";

interface IFormProps {
  form: FormRegisterEnum;
  setFormProperties(values: unknown): void;
  goToStepTwo(): void;
  formProperties: unknown;
}
function Form({ form, setFormProperties, goToStepTwo, formProperties }: IFormProps) {
  if (form === FormRegisterEnum.STEP_ONE) {
    return (
      <StepOne
        onChangeFormProperties={setFormProperties}
        goToStepTwo={goToStepTwo}
      />
    );
  }

  return <StepTwo formProperties={formProperties} />;
}

export default function Register() {
  const [form, setForm] = useState(FormRegisterEnum.STEP_ONE);
  const [formProperties, setFormProperties] = useState();

  function goToStepTwo() {
    setForm(FormRegisterEnum.STEP_TWO);
  }

  function goToStepOne() {
    setForm(FormRegisterEnum.STEP_ONE);
  }

  const goBack = form === FormRegisterEnum.STEP_TWO ? goToStepOne : null;

  return (
    <BaseFormScreen goBack={goBack}>
      <Form
        form={form}
        goToStepTwo={goToStepTwo}
        setFormProperties={setFormProperties}
        formProperties={formProperties}
      />
    </BaseFormScreen>
  );
}