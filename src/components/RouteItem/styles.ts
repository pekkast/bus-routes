import { makeStyles, Theme } from '@material-ui/core/styles';

export type ColorPalette = 'primary' | 'error' | 'success' | 'warning';

export type StyleProps = {
    color: ColorPalette,
};

export const useRouteItemStyles = makeStyles((theme: Theme) => ({
    legsRoot: {
        minHeight: 100,
        padding: '1em .7em .5em',
        overflow: 'hidden',
        borderTop: '1px solid #ddd',
        display: 'flex',
        whiteSpace: 'nowrap',
        position: 'relative',
    },
    lineLabel: {
        textTransform: 'uppercase',
        color: theme.palette.grey[600],
    },
    legStart: {
        position: 'absolute',
        top: 20,
        left: -8,
    },
    legEnd: {
        position: 'absolute',
        top: 20,
        right: 12,
    },
    legGraph: {
        position: 'relative',
        padding: '2px 40px 0 20px',
    },
}));

export const useRouteLegStyles = makeStyles((theme: Theme) => ({
    legRoot: {
        margin: 1,
    },
    legLine: (props: StyleProps) => ({
        position: 'relative',
        height: 20,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette[props.color].main,
    }),
    legIcon: (props: StyleProps) => ({
        position: 'absolute',
        fontSize: '2em',
        left: 6,
        top: -4,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette[props.color].main,
        borderRadius: 3,
    }),
    lineLabel: {
        textTransform: 'uppercase',
        color: theme.palette.grey[600],
    },
}));