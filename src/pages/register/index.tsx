import { BaseFormScreen } from "@components";
import { FormRegisterEnum } from "@enums";
import { useState } from "react";

import StepOne from "./_step-one";
import StepTwo from "./_step-two";

function Form({ form, setFormProperties, changeToStepOne, changeToStepTwo,}) {
  if (form === FormRegisterEnum.STEP_ONE) {
    return (
      <StepOne
        onChangeFormProperties={setFormProperties}
        onChangeForm={changeToStepTwo}
      />
    );
  }

  return <StepTwo onChangeForm={changeToStepOne} />;
}

export default function Register() {
  const [form, setForm,] = useState(FormRegisterEnum.STEP_ONE);
  const [formProperties, setFormProperties,] = useState();


  function changeToStepTwo() {
    setForm(FormRegisterEnum.STEP_TWO);
  }

  function changeToStepOne() {
    setForm(FormRegisterEnum.STEP_ONE);
  }


  return (
    <BaseFormScreen>
      <Form
        form={form}
        changeToStepOne={changeToStepOne}
        changeToStepTwo={changeToStepTwo}
        setFormProperties={setFormProperties}
      />
    </BaseFormScreen>
  );
}