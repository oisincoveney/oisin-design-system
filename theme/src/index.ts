import { typography } from '~/typography/src';
import { colors } from '~/colors/src';
import { shadows } from '~/shadows/src';
import { spacing } from '~/spacing/src';
import { zIndex } from '~/z-index/src';
import { width } from '~/width/src';
import { minWidth } from '~/min-width/src';

export const theme = {
  extend: {
    ...typography,
    ...colors,
    ...shadows,
    ...spacing,
    ...zIndex,
    ...width,
    ...minWidth,
  },
};
