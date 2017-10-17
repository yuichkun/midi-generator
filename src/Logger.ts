import * as _ from 'lodash';
import { Display } from './Display';
import { IDisplayNote } from './MidiGenerator';
import { midiState } from './constants/MIDI';

const display = new Display();
export class Logger {
    static notes: IDisplayNote[] = [];
    static status = midiState.WAIT;
    static start(){
        setInterval(()=>{
            console.log('\x1Bc'); //clear screen
            display.system("NODE MIDI GENERATOR");
            display.log(Logger.notes);
        }, 100);
    }
    static pushNotes(note: IDisplayNote){
        if(Logger.notes.length >= 7){
            Logger.notes.splice(0,1);
        }
        Logger.notes.push(note);
    }
    static deleteNote(note: IDisplayNote){
        const index = _.findIndex(Logger.notes, note);
        Logger.notes.splice(index, 1);
    }
    static midiInfo(note:IDisplayNote, state:midiState){
        Logger.status = state;
        switch(state){
            case midiState.ON:
                Logger.pushNotes(note);
                break;
            case midiState.OFF:
                Logger.deleteNote(note); 
        }
    }
    static end(){
        display.system("Flush all MIDI notes");
    }
}