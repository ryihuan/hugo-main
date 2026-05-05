// middleware.js - 正确版本
import { withPasswordProtect } from '@tommyvez/passfort/next';

export default withPasswordProtect({
  protectAll: true,  // 保护全站
});

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};