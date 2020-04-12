import { Box, Grid } from '@material-ui/core';
import BusIcon from '@material-ui/icons/DirectionsBus';
import React from 'react';
import { IRouteLeg } from '../../utils/routes';
import { ColorPalette, useRouteLegStyles } from './styles';

const lineToColor = (line: string): ColorPalette => {
    switch (line) {
        case 'vihreä':
            return 'success';
        case 'punainen':
            return 'error';
        case 'keltainen':
            return 'warning';
        case 'sininen':
        default:
            return 'primary';
    }
}

export default function RouteLeg(props: IRouteLeg) {
    const color = lineToColor(props.line);
    const classes = useRouteLegStyles({ color });

    return (
        <Grid container direction="column">
            <Grid item container className={classes.lineLabel}>
                {`${props.stops}: ${props.duration}`}
            </Grid>
            <Grid className={classes.legRoot} item>
                <Box color={`${color}.main`}>
                    <div className={classes.legLine}>
                        <BusIcon className={classes.legIcon} />
                    </div>
                </Box>
            </Grid>
            <Grid className={classes.lineLabel} item>{props.line}</Grid>
        </Grid>
    )
}
