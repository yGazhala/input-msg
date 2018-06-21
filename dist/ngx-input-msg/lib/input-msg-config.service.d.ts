import { inputMsg } from './types';
/**
 * Provides configuration for displaying messages.
 */
export declare class InputMsgConfigService {
    private defaultConfig;
    get(): inputMsg.Config;
    set(config: inputMsg.Config): void;
}
