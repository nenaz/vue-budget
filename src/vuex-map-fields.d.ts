declare module 'vuex-map-fields' {
  export function updateField(state: any, { path, value }: { path: any; value: any }): any;

  export function getField(state: any): any;
}
