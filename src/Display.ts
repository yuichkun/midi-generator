import * as util from 'util';
import { COLORS } from "./constants/COLORS";

export class Display {
    log(content: any) {
        const option = {
            colors: true,
            showHidden: false,
        };
        const output = util.inspect(content, option);
        console.log(output);
    }
    system(text:string){
        this.line();
        console.log(COLORS.CYAN, text, COLORS.RESET);
        this.line();
    }
    line() {
        console.log(COLORS.YELLOW + '–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––' + COLORS.RESET);
    }
}