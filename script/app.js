import {initStorage, reduceStorage} from "./localStorage";
import {initMain} from "./scheduleInit";
import applyCssans from "./cssansInit";

//initialize localStorage with new generated values
initStorage();

//remove too old sessions from localStorage
reduceStorage();

//initialize <main>
initMain();

//apply cssans font
applyCssans();
