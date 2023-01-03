import { LintRuleOutcome } from '@commitlint/types';
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export interface CommitlintPluginConfig {
  severity?: 'fail' | 'warn' | 'message' | 'disable';
  messageReplacer?: (
    errors: LintRuleOutcome[],
    commitMessage: string
  ) => string;
}
interface Rules {
  'body-leading-blank': Array<number | string>;
  'footer-leading-blank': Array<number | string>;
  'header-max-length': Array<number | string>;
  'scope-case': Array<number | string>;
  'subject-case': Array<string[] | number | string>;
  'subject-empty': Array<number | string>;
  'subject-full-stop': Array<number | string>;
  'type-case': Array<number | string>;
  'type-empty': Array<number | string>;
  'type-enum': Array<string[] | number | string>;
}
export default function commitlint(
  rules: Rules,
  userConfig?: CommitlintPluginConfig
): Promise<void>;
export {};
