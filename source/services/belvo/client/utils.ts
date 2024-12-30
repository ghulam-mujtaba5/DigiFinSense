export type Environment = 'sandbox' | 'development' | 'production';


export const urlResolver = (environment: Environment) => {
  return EnvironmentUrl[environment];
};
