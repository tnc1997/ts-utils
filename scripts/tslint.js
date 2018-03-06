module.exports = {
  extends: ['tslint-eslint-rules'],
  rules: {
    // The rules below are listed in the order they appear on the eslint
    // rules page. All rules are listed to make it easier to keep in sync
    // as new eslint rules are added.
    //
    // https://github.com/buzinas/tslint-eslint-rules
    //
    // - Rules in the `eslint:recommended` and `tslint:recommended` ruleset
    //   that aren't specifically mentioned by the google styleguide are
    //   listed but commented out.
    //
    // - Rules in the `tslint:recommended` ruleset but not in the
    //   `eslint:recommended` ruleset that aren't specifically mentioned
    //   by the google styleguide are listed but commented out.
    //
    // - Rules in the `eslint:recommended` ruleset but not in the
    //   `tslint:recommended` ruleset that aren't specifically mentioned
    //   by the google styleguide are set to the `eslint:recommended` value.
    //
    // - Rules in the `eslint:recommended` ruleset that offer stronger
    //   linting than the equivalent in the `tslint:recommended` ruleset
    //   are set to the `eslint:recommended` value.
    //
    // - Rules in the `tslint:recommended` ruleset that offer stronger
    //   linting than the equivalent in the `eslint:recommended` ruleset
    //   are listed but commented out.
    //
    // - Rules that are recommended by either the `tslint:recommended` ruleset
    //   or the `eslint:recommended` ruleset or both but contradict the
    //   google styleguide are set to the google styleguide value.
    //
    // - Rules that are double commented are recommended, however they are
    //   currently unavailable in both tslint and tslint-eslint-rules. They
    //   should be uncommented completely whenever they become available.

    // Possible Errors
    // https://github.com/buzinas/tslint-eslint-rules#possible-errors
    // --------------------------------------------------------------
    // 'for-direction': 0, // unavailable
    // 'no-await-in-loop': 0, // unavailable
    // 'no-compare-neg-zero': 2, // eslint:recommended // unavailable
    'no-conditional-assignment': false, // eslint:recommended // tslint:recommended
    // 'no-console': true, // eslint:recommended // tslint:recommended
    'no-constant-condition': true, // eslint:recommended
    'no-control-regex': true, // eslint:recommended
    // 'no-debugger': true, // eslint:recommended // tslint:recommended
    // 'no-dupe-args': 2, // eslint:recommended // not-applicable
    // 'no-dupe-keys': 2, // eslint:recommended // not-applicable
    'no-duplicate-case': true, // eslint:recommended
    // 'no-empty': true, // eslint:recommended // tslint:recommended
    'no-empty-character-class': true, // eslint:recommended
    'no-ex-assign': true, // eslint:recommended
    'no-extra-boolean-cast': true, // eslint:recommended
    // 'no-extra-parens': 0, // unavailable
    'no-extra-semi': true, // eslint:recommended
    // 'no-func-assign': 2, // eslint:recommended // not-applicable
    'no-inner-declarations': true, // eslint:recommended
    'no-invalid-regexp': true, // eslint:recommended
    'ter-no-irregular-whitespace': true, // eslint:recommended
    // 'no-obj-calls': 2, // eslint:recommended // not-applicable
    // 'no-prototype-builtins': 0, // unavailable
    'no-regex-spaces': true, // eslint:recommended
    'ter-no-sparse-arrays': true, // eslint:recommended
    // 'no-template-curly-in-string': 0, // unavailable
    'no-unexpected-multiline': true, // eslint:recommended
    // 'no-unreachable': 2, // eslint:recommended // not-applicable
    // 'no-unsafe-finally': true, // eslint:recommended // tslint:recommended
    // 'no-unsafe-negation': 0, // unavailable
    // 'use-isnan': true // eslint:recommended // tslint:recommended
    'valid-jsdoc': [true, {
      'prefer': {
        'returns': 'return'
      },
      'requireParamDescription': false,
      'requireParamType': true,
      'requireReturn': false,
      'requireReturnDescription': false,
      'requireReturnType': true,
    }],
    'valid-typeof': true, // eslint:recommended

    // Best Practices
    // https://github.com/buzinas/tslint-eslint-rules#best-practices
    // -------------------------------------------------------------
    // 'accessor-pairs': 0, // unavailable
    // 'array-callback-return': 0, // unavailable
    // 'block-scoped-var': 0, // unavailable
    // 'class-methods-use-this': 0, // unavailable
    // 'cyclomatic-complexity': false, // tslint:recommended
    // 'consistent-return': 0, // unavailable
    'curly': [true, 'ignore-same-line'], // tslint:recommended
    // 'switch-default': false,
    // 'dot-location': 0, // unavailable
    // 'dot-notation': 0, // unavailable
    // 'triple-equals': [true, 'allow-null-check'], // tslint:recommended
    // 'forin': true, // tslint:recommended
    // 'ban': false,
    // 'no-arg': true, // tslint:recommended
    // 'no-case-declarations': 2, // eslint:recommended // unavailable
    // 'no-div-regex': 0, // unavailable
    // 'no-else-return': 0, // unavailable
    // 'no-empty': true, // tslint:recommended
    // 'no-empty-pattern': 2, // eslint:recommended // unavailable
    // 'no-eq-null': 0, // unavailable
    // 'no-eval': true, // tslint:recommended
    // // 'no-extend-native': 2, // unavailable
    // // 'no-extra-bind': 2, // unavailable
    // 'no-extra-label': 0, // unavailable
    'no-switch-case-fall-through': true, // eslint:recommended // tslint:recommended
    // 'no-floating-decimal': 0, // unavailable
    // 'no-global-assign': 0, // unavailable
    // 'no-implicit-coercion': 0, // unavailable
    // 'no-implicit-globals': 0, // unavailable
    // 'no-implied-eval': 0, // unavailable
    'no-invalid-this': true, // tslint:recommended
    // 'no-iterator': 0, // unavailable
    // 'label-position': true, // tslint:recommended
    // 'no-lone-blocks': 0, // unavailable
    // 'no-loop-func': 0, // unavailable
    // 'no-magic-numbers': false,
    'no-multi-spaces': true,
    // // 'no-multi-str': 2, // unavailable
    // 'no-unused-new': false,
    // 'no-new-func': 0, // unavailable
    // 'no-construct': true, // tslint:recommended
    // 'no-octal': 2, // eslint:recommended // not-applicable
    // 'no-octal-escape': 0, // unavailable
    // 'no-param-reassign': 0, // unavailable
    // 'no-proto': 0, // unavailable
    'no-duplicate-variable': true, // eslint:recommended
    // 'no-restricted-properties': 0, // unavailable
    // 'no-return-assign': 0, // unavailable
    // 'no-script-url': 0, // unavailable
    // 'no-self-assign': 2, // eslint:recommended // unavailable
    // 'no-self-compare': 0, // unavailable
    // 'no-sequences': 0, // unavailable
    // 'no-string-throw': true, // tslint:recommended
    // 'no-unmodified-loop-condition': 0, // unavailable
    // 'no-unused-expression': true, // tslint:recommended
    // 'no-unused-labels': 2, // eslint:recommended // unavailable
    // 'no-useless-call': 0, // unavailable
    // 'no-useless-concat': 0, // unavailable
    // 'no-useless-escape': 0, // unavailable
    // 'no-void': 0, // unavailable
    // 'no-warning-comments': 0, // unavailable
    // // 'no-with': 2, // unavailable
    // 'prefer-promise-reject-errors': 0, // unavailable
    // 'radix': true, // tslint:recommended
    // 'require-await': 0, // unavailable
    // 'vars-on-top': 0, // unavailable
    // 'wrap-iife': 0, // unavailable
    // 'yoda': 0, // unavailable

    // Strict Mode
    // https://github.com/buzinas/tslint-eslint-rules#strict-mode
    // ----------------------------------------------------------
    // 'strict': 0, // not-applicable

    // Variables
    // https://github.com/buzinas/tslint-eslint-rules#variables
    // --------------------------------------------------------
    // 'init-declarations': 0, // unavailable
    // 'no-catch-shadow': 0, // unavailable
    // 'no-delete-var': 2, // eslint:recommended // not-applicable
    // 'no-label-var': 0, // unavailable
    // 'no-restricted-globals': 0, // unavailable
    // 'no-shadowed-variable': true, // tslint:recommended
    // 'no-shadow-restricted-names': 0, // unavailable
    // 'no-undef': 2, // eslint:recommended // not-applicable
    // 'no-undef-init': 0, // unavailable
    // 'no-undefined': 0, // unavailable
    'no-unused-variable': true, // eslint:recommended
    // 'no-use-before-declare': false, // tslint:recommended

    // Node.js and CommonJS
    // https://github.com/buzinas/tslint-eslint-rules#nodejs-and-commonjs
    // ------------------------------------------------------------------
    // 'callback-return': 0, // unavailable
    // 'global-require': 0, // unavailable
    // 'handle-callback-err': false,
    // 'no-buffer-constructor': 0, // unavailable
    // 'no-mixed-requires': 0, // unavailable
    // 'no-new-require': 0, // unavailable
    // 'no-path-concat': 0, // unavailable
    // 'no-process-env': 0, // unavailable
    // 'no-process-exit': 0, // unavailable
    // 'no-restricted-modules': 0, // unavailable
    // 'no-sync': 0, // unavailable

    // Stylistic Issues
    // https://github.com/buzinas/tslint-eslint-rules#stylistic-issues
    // ---------------------------------------------------------------
    // // 'array-bracket-newline': 0, // eslint:recommended // unavailable
    'array-bracket-spacing': [true, 'never'],
    // // 'array-element-newline': 0, // eslint:recommended // unavailable
    'block-spacing': [true, 'never'],
    'brace-style': [true, '1tbs'],
    'variable-name': [true, 'allow-trailing-underscore', 'ban-keywords', 'check-format'], // tslint:recommended
    // 'capitalized-comments': 0, // unavailable
    'trailing-comma': [true, {'multiline': 'always'}],
    // // 'comma-spacing': 2, // unavailable
    // // 'comma-style': 2, // unavailable
    // // 'computed-property-spacing': 2, // unavailable
    // 'consistent-this': 0, // unavailable
    // 'eofline': true, // tslint:recommended
    'ter-func-call-spacing': [true, 'never'],
    // 'func-name-matching': 0, // unavailable
    // 'func-names': 0, // unavailable
    // 'func-style': 0, // unavailable
    // 'id-blacklist': 0, // unavailable
    // 'id-length': 0, // unavailable
    // 'id-match': 0, // unavailable
    // 'ter-indent': false, // not-compatible
    // 'jsx-quotes': 0, // unavailable
    // // 'key-spacing': 2, // unavailable
    // // 'keyword-spacing': 2, // unavailable
    // 'line-comment-position': 0, // unavailable
    'linebreak-style': [true, 'lf'],
    // 'lines-around-comment': 0, // unavailable
    // 'max-depth': 0, // unavailable
    'ter-max-len': [true, {
      'code': 80,
      'tabWidth': 2,
      'ignoreUrls': true,
      'ignorePattern': '^goog\.(module|require)',
    }],
    // 'max-file-line-count': 0,
    // 'max-nested-callbacks': 0, // unavailable
    // 'max-params': 0, // unavailable
    // 'max-statements': 0, // unavailable
    // 'max-statements-per-line': 0, // unavailable
    // 'multiline-ternary': 0, // not-compatible // unavailable
    // 'new-cap': 2, // not-applicable
    // 'new-parens': true, // tslint:recommended
    // 'newline-per-chained-call': 0, // unavailable
    // // 'no-array-constructor': 2, // unavailable
    // 'no-bitwise': true, // tslint:recommended
    // 'no-continue': 0, // unavailable
    // 'no-inline-comments': 0, // unavailable
    // 'no-lonely-if': 0, // unavailable
    // 'no-mixed-operators': 0, // unavailable
    // 'indent': [true, 'spaces'], // eslint:recommended // tslint:recommended
    // 'no-multi-assign': 0, // unavailable
    // 'no-consecutive-blank-lines': true, // tslint:recommended
    // 'no-negated-condition': 0, // unavailable
    // 'no-nested-ternary': 0, // unavailable
    // // 'no-new-object': 2, // unavailable
    // 'no-plusplus': 0, // unavailable
    // 'no-restricted-syntax': 0, // unavailable
    // // 'no-tabs': 2, // unavailable
    // 'no-ternary': 0, // unavailable
    // 'no-trailing-whitespace': true, // tslint:recommended
    // 'no-underscore-dangle': 0, // unavailable
    // 'no-unneeded-ternary': 0, // unavailable
    // 'no-whitespace-before-property': 0, // unavailable
    // 'nonblock-statement-body-position': 0, // unavailable
    // 'object-curly-newline': 0, // unavailable
    'object-curly-spacing': [true, 'never'],
    // 'object-property-newline': 0, // unavailable
    // 'one-variable-per-declaration': [true, 'ignore-for-loop'], // tslint:recommended
    // 'one-var-declaration-per-line': 0, // unavailable
    // 'operator-assignment': 0, // unavailable
    // 'operator-linebreak': 0, // unavailable
    // // 'padded-blocks': [2, 'never'], // unavailable
    // 'padding-line-between-statements': 0, // unavailable
    'object-literal-key-quotes': [true, 'consistent'], // tslint:recommended
    'quotemark': [true, 'single'], // tslint:recommended
    'require-jsdoc': [2, {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
      },
    }], // unavailable
    // 'semicolon': [true, 'always'], // tslint:recommended
    // // 'semi-spacing': 2, // unavailable
    // 'semi-style': 0, // unavailable
    // 'sort-keys': 0, // unavailable
    // 'sort-vars': 0, // unavailable
    // // 'space-before-blocks': 2, // unavailable
    // // 'space-before-function-paren': [2, {
    // //   asyncArrow: 'always',
    // //   anonymous: 'never',
    // //   named: 'never',
    // // }], // unavailable
    // 'space-in-parens': 0,
    // 'space-infix-ops': 0, // unavailable
    // 'space-unary-ops': 0, // unavailable
    // 'comment-format': [true, 'check-space'], // tslint:recommended
    // // 'switch-colon-spacing': 2, // unavailable
    // 'template-tag-spacing': 0, // unavailable
    // 'unicode-bom': 0, // unavailable
    // 'wrap-regex': 0, // unavailable

    // ECMAScript 6
    // https://github.com/buzinas/tslint-eslint-rules#ecmascript-6
    // -----------------------------------------------------------
    // 'ter-arrow-body-style': 0,
    'ter-arrow-parens': [true, 'always'],
    // 'ter-arrow-spacing': 0,
    // 'constructor-super': 2, // eslint:recommended // not-applicable
    // // 'generator-star-spacing': [2, 'after'], // unavailable
    // 'no-class-assign': 0, // unavailable
    // 'no-confusing-arrow': 0, // unavailable
    // 'no-const-assign': 0, // eslint:recommended // not-applicable
    // 'no-dupe-class-members': 0, // eslint:recommended // not-applicable
    // 'no-duplicate-imports': 0, // unavailable
    // 'no-new-symbol': 2, // eslint:recommended // unavailable
    // 'no-restricted-imports': 0, // unavailable
    // 'no-this-before-super': 2, // eslint:recommended // unavailable
    // 'no-useless-computed-key': 0, // unavailable
    // 'no-useless-constructor': 0, // unavailable
    // 'no-useless-rename': 0, // unavailable
    // 'no-var-keyword': true, // tslint:recommended
    // 'object-literal-shorthand': true, // tslint:recommended
    // 'ter-prefer-arrow-callback': false,
    // 'prefer-const': true, // tslint:recommended
    // 'prefer-destructuring': 0, // unavailable
    // 'prefer-numeric-literals': 0, // unavailable
    // // 'prefer-rest-params': 2, // unavailable
    // // 'prefer-spread': 2, // unavailable
    // 'prefer-template': 0, // unavailable
    // 'require-yield': 2, // eslint:recommended // unavailable
    // // 'rest-spread-spacing': 2, // unavailable
    // 'sort-imports': 0, // unavailable
    // 'symbol-description': 0, // unavailable
    // 'template-curly-spacing': 0, // unavailable
    // // 'yield-star-spacing': [2, 'after'], // unavailable

    // Override TSLint Recommended Conflicts
    // -------------------------------------
    'max-line-length': false,
    'one-line': false,
  }
};
