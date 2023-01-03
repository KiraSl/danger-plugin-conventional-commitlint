'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
// Provides dev-time type structures for  `danger` - doesn't affect runtime.
const lint_1 = require('@commitlint/lint');
const defaultConfig = {
  severity: 'fail',
  messageReplacer: (errors, commitMessage) => {
    let failureMessage = `There is a problem with the commit message\n> ${commitMessage}`;
    errors.forEach((error) => {
      failureMessage = `${failureMessage}\n- ${error.message}`;
    });
    return failureMessage;
  },
};
function commitlint(rules, userConfig) {
  return __awaiter(this, void 0, void 0, function* () {
    const config = Object.assign(Object.assign({}, defaultConfig), userConfig);
    for (const commit of danger.git.commits) {
      yield lintCommitMessage(commit.message, rules, config);
    }
  });
}
exports.default = commitlint;
function lintCommitMessage(commitMessage, rules, config) {
  return __awaiter(this, void 0, void 0, function* () {
    return (0, lint_1.default)(commitMessage, rules).then((report) => {
      if (!report.valid) {
        const failureMessage = config.messageReplacer(
          report.errors,
          commitMessage
        );
        switch (config.severity) {
          case 'fail':
            fail(failureMessage);
            break;
          case 'warn':
            warn(failureMessage);
            break;
          case 'message':
            message(failureMessage);
            break;
          case 'disable':
            break;
        }
      }
    });
  });
}
