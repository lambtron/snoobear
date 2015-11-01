# conceal

Obfuscates a string or a part of it. I've needed this functionality several
times now and I've decided to make a micro-module for it. It is useful to
conceal sensitive strings such as passwords, or parts of a string, e.g. a
credit card to show the user.

``` js
var conceal = require('conceal');

var str = 'Big Secret';

conceal(str);
// '**********'

conceal(str, { ch: '^' });
// '^^^^^^^^^^'

conceal(str, { start: 4, end: 6 });
// 'Big ***ret'

```

## License

MIT
