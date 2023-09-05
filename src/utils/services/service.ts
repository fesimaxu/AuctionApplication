export const excludeProperty = (obj: any , keysToExclude: any) =>{
    const newObj = { ...obj };
    for (const key of keysToExclude) {
      if (newObj.hasOwnProperty(key)) {
        delete newObj[key];
      }
    }
    return newObj;
}