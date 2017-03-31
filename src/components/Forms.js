import React from 'react';

export const DisabledLoadingOption = _ => (
  <option value="" key="__loading__" disabled>Loading...</option>
);

export const Field = ({ label, children }) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">{label}</label>
    </div>
    <div className="field-body">
      <p className="control">
        {children}
      </p>
    </div>
  </div>
);
