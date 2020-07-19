import {checkUserInput} from './checkInput.js';

describe('RegExp: input', function (){
    it(' should be a string', function (){
        const urlRGEX = /^[a-zA-Z\s]{0,255}$/;
        const urlTest = 'L0ond0n';
        expect(urlRGEX.test(urlTest)).toBe(false);
    });
});