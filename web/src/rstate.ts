import { reactive, toRefs } from 'vue';
import { readState } from './state';

const rState = readState();
const reqState = reactive(rState as object);
export const requestState = reqState; // { ...toRefs(reqState) };


