import React from 'react';
import RequiredFormInputGroup from '../Form/RequiredFormInputGroup';
import Input from './Input';

const RequiredFormInputTextGroup = ({handleChange, innerRef, name, placeholder, value, readonly, ...remainingProps}) => {
  return (
    <RequiredFormInputGroup name={name} {...remainingProps}>
      <Input innerRef={innerRef} name={name} onChange={handleChange} placeholder={placeholder} value={value} readonly={readonly}/>
    </RequiredFormInputGroup>
  );
};

export default RequiredFormInputTextGroup;
