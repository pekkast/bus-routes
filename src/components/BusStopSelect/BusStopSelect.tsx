import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import data from '../../data/reittiopas.json';

export type BusStopSelectProps = {
    label: string,
    selected: string|null,
    autofocus?: boolean,
    onSelect: (selected: string|null) => void,
}
export default function BusStopSelect(props: BusStopSelectProps) {
    const options: Array<string> = data.pysakit;
    const onChange = (event: object, value: string|null) => props.onSelect(value);

    return (
        <Autocomplete
          autoComplete
          autoSelect
          autoHighlight
          options={options}
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

