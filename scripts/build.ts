import { ngPackagr } from 'ng-packagr';

ngPackagr()
.forProject('./ng-package.js')
.withTsConfig('../../tsconfig.build.json')
.build()
.catch((error: any) => {
  console.error(error);
  process.exit(1);
});
