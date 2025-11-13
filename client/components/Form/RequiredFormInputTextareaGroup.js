import React from "react";
import RequiredFormInputGroup from "../Form/RequiredFormInputGroup";
import TextArea from "./TextArea";
import styled from "styled-components";

const SmallLabel = styled.label`
  display: inline-block;
  min-width: 66%;
  text-align: center;
  font-size: 10px;
`;

const RequiredFormInputTextareaGroup = ({
  smallText,
  value,
  handleChange,
  name,
  placeholder,
  maxLength,
  ...remainingProps
}) => {
  return (
    <RequiredFormInputGroup name={name} {...remainingProps}>
      {smallText ? <SmallLabel>{smallText}</SmallLabel> : null}
      <TextArea
        name={name}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </RequiredFormInputGroup>
  );
};

export default RequiredFormInputTextareaGroup;
