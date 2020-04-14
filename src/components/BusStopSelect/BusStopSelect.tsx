import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

export type BusStopSelectProps = {
    label: string,
    selected: string|null,
    options: Array<string>,
    autofocus?: boolean,
    onSelect: (selected: string|null) => void,
}
export default function BusStopSelect(props: BusStopSelectProps) {
    const onChange = (event: object, value: string|null) => props.onSelect(value);

    return (
        <Autocomplete
          autoComplete
          autoSelect
          autoHighlight
          options={props.options}
          value={props.selected}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus={props.autofocus}
              label={props.label}
              variant="outlined"
            />
          )}
        />
    );
}

