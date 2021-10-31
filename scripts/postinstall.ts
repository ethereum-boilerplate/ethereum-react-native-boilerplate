import 'dotenv/config';
import * as child_process from 'child_process';
import {macos} from 'platform-detect';

if (macos) {
  child_process.execSync('npx pod-install', { stdio: 'inherit' });
}