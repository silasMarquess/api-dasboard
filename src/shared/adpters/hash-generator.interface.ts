export default interface HashServiceGeneratorInterface {
  hashGenerator: (passwordText: string) => Promise<string>;
  compareHash: (passwordText: string, hash: string) => Promise<boolean>;
}
