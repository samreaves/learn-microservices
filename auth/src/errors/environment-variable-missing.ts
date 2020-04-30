export class EnvironmentVariableMissing extends Error {

    constructor(environmentVariable: string) {
        super(`Environment variable missing: ${environmentVariable}`);
        Object.setPrototypeOf(this, EnvironmentVariableMissing.prototype);
    }
}