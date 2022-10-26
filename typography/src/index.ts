
const arrRange = (n) => [...Array(n).keys()];
import "./typography.scss"
export const typography = {
    fontFamily: {
        code: ['Menlo', 'ui-monospace', 'SFMono-Regular', 'Monaco', 'monospace'],
    },
    fontWeight: {
        custom: '600',
    },
    letterSpacing: {
        'really-tight': '-0.001rem',
    },
    lineHeight: {
        looser: '4',
    },
    fontSize: Object.fromEntries(
        // from 8px to 48px with rem values (based on 16px = 1rem)
        arrRange(42).map((elem) => {
            return [`${elem + 8}px`, `${(elem + 8) / 16}rem`];
        })
    ),
};
