export const splitString=(input:string):{revisedString:string}=>{
    const revisedString=input.split('_').join(" ");
    return {revisedString};
};