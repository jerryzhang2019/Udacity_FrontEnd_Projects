import {checkUserInput} from './checkInput';

describe('RegExp: input', function (){
    it(' should be a string', function (){
        const urlRGEX = /^[a-zA-Z\s]{0,255}$/;
        const urlTest = 'Seattl0';
        expect(urlRGEX.test(urlTest)).toBe(false);
    });
});