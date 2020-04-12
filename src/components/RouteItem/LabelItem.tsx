import { Typography } from '@material-ui/core';
import React from 'react';

const LabelItem: React.FC = (props) => (
    <Typography variant="h4" component="span" align="center">
        {props.children}
    </Typography>
);

export default LabelItem;