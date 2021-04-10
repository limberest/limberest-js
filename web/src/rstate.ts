import { reactive, toRefs } from 'vue';
import { readState } from './state';

const rState = readState();
console.log("R STATE: " + JSON.stringify(rState, null, 2));
const reqState = reactive(rState as object);
export const requestState = reqState; // { ...toRefs(reqState) };


