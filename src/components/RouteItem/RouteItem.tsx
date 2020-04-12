import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { IRouteLeg } from '../../utils/routes';
import LabelItem from './LabelItem';
import RouteLeg from './RouteLeg';
import { useRouteItemStyles } from './styles';

export type RouteItemProps = {
    duration: number,
    legs: Array<IRouteLeg>,
};

export default function RouteItem(props: RouteItemProps) {
    const classes = useRouteItemStyles();
    const { legs, duration } = props;
    const legWidth = Math.floor(12 / legs.length) as 1 | 6 | 4 | 3 | 10 | 2 | 5 | 7 | 8 | 9 | 11 | 12;

    return (
        <Box color="primary.main">
            <Grid container spacing={1} className={classes.legsRoot}>
                <Grid item xs={10}>
                    <div className={classes.legGraph}>
                        <div className={classes.legStart}>
                            <LabelItem>{legs[0].stops[0]}</LabelItem>
                        </div>
                        <Grid container>
                            {legs.map((r: IRouteLeg) => (
                                <Grid key={r.stops} item xs={legWidth}>
                                    <RouteLeg {...r} />
                                </Grid>
                            ))}
                        </Grid>
                        <div className={classes.legEnd}>
                            <LabelItem>{legs[legs.length - 1].stops.slice(-1)}</LabelItem>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className={classes.lineLabel}>Kesto</div>
                    <LabelItem>{duration}</LabelItem>
                </Grid>
            </Grid>
        </Box>
    );
}
