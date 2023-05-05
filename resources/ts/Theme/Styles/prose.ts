import { round, em, rem } from '../utils/convert';
export const textStyles = {
  'prose-pa': {
    fontWeight: '400',
    lineHeight: round(28 / 16),
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
    fontSize: [rem(14), rem(16), rem(18)],
  },
};
