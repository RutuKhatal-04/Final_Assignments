export const concatenateString =(param1:string,param2:string):{revisedString:string}=>{
    const revisedString=param1+param2;
    return {revisedString};
};



export const isLeapYear = (year: number): { isLeap: boolean } => {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    return { isLeap };
};


export const getSecretHandshake = (number: number): string[] => {
    const actions: string[] = [];
    const binary = number.toString(2).padStart(5, '0');

    if (binary[4] === '1') actions.push('wink');
    if (binary[3] === '1') actions.push('double blink');
    if (binary[2] === '1') actions.push('close your eyes');
    if (binary[1] === '1') actions.push('jump');
    if (binary[0] === '1') actions.reverse();

    return actions;
};