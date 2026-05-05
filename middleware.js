import { withPassfort } from '@tommyvez/passfort';

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};

export default withPassfort();