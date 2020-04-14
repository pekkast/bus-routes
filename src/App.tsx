import { AppBar, Box, Container, CssBaseline, Grid, Hidden, MenuItem, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import BusStopSelect from './components/BusStopSelect';
import RouteItem from './components/RouteItem';
import { getFastest, getEasiest, IRoute, getBusStops } from './data';

export enum OrderType {
    Fastest,
    Easiest,
}

const toKey = (route: IRoute) => route.legs.reduce((res: string, leg) => `${res},${leg.stops}`, '');

export default function App() {
    const [startPlace, setStartPlace] = React.useState<string | null>(null);
    const [stopPlace, setStopPlace] = React.useState<string | null>(null);
    const [routes, setRoutes] = React.useState<Array<IRoute>>([]);
    const [order, setOrder] = React.useState<OrderType>(OrderType.Fastest);
    const [busStops, setBusStops] = React.useState<Array<string>>([]);

    const onOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrder(+e.target.value);
    };

    React.useEffect(() => {
        if (startPlace && stopPlace && startPlace !== stopPlace) {
            const method = order === OrderType.Easiest ? getEasiest : getFastest;
            setRoutes(method(startPlace, stopPlace, 3));
        }
    }, [startPlace, stopPlace, order])

    React.useEffect(() => {
        setBusStops(getBusStops());
    }, [])

    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Reittiopas
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Box mx={-2} mt={1}>
                    <Paper elevation={3}>
                        <Box padding={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <BusStopSelect
                                        label="Alkupysäkki"
                                        options={busStops}
                                        selected={startPlace}
                                        onSelect={setStartPlace}
                                        autofocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <BusStopSelect
                                        label="Loppupysäkki"
                                        options={busStops}
                                        selected={stopPlace}
                                        onSelect={setStopPlace}
                                    />
                                </Grid>
                                <Hidden xsDown>
                                    <Grid item sm={4}>
                                        <TextField select fullWidth
                                            variant="outlined"
                                            value={order}
                                            onChange={onOrderChange}
                                        >
                                            <MenuItem value={OrderType.Fastest}>Nopein</MenuItem>
                                            <MenuItem value={OrderType.Easiest}>Vähiten vaihtoja</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Hidden>
                            </Grid>
                        </Box>
                        <Box padding={2}>
                            {routes.map(r => (
                                <RouteItem
                                    key={toKey(r)}
                                    duration={r.duration}
                                    legs={r.legs}
                                />
                            ))}
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}
