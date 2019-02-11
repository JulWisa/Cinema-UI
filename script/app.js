import {initStorage, reduceStorage} from "./localStorage";
import {initMain} from "./scheduleInit";

//initialize localStorage with new generated values
initStorage();

//remove too old sessions from localStorage
reduceStorage();

//initialize <main>
initMain();