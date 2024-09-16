// export const compareJSONObjects = (objA, objB, endEffDate) => {
//     const changes = {};
//     const currentDate = new Date();

//     const compare = (a, b, path) => {
//             const keys = Object.keys(a);
//             for (let i = 0; i < keys.length; i++) {
//             const key = keys[i];
//             const currentPath = path ? `${path}.${key}` : key;
//             if (b[key] === undefined) {
//                 continue;
//             }
//             if (typeof a[key] === 'object' && a[key] !== null) {
//                 if (Array.isArray(a[key])) {
//                 const aArray = a[key];
//                 const bArray = b[key];
//                 if (aArray.length !== bArray.length) {
//                     changes[currentPath] = { values: [{
//                     oldValue: aArray,
//                     newValue: bArray,
//                     time: currentDate,
//                     effDate: endEffDate
//                     }]};
//                     continue;
//                 }
//                 for (let j = 0; j < aArray.length; j++) {
//                     if (typeof aArray[j] === 'object' && aArray[j] !== null) {
//                     compare(aArray[j], bArray[j], currentPath + `[${j}]`);
//                     } else {
//                     if (aArray[j] !== bArray[j]) {
//                         if (changes[currentPath] === undefined) {
//                         changes[currentPath] = { values: [{
//                             oldValue: aArray[j],
//                             newValue: bArray[j],
//                             time: currentDate,
//                             effDate: endEffDate
//                         }]};
//                         } else {
//                         changes[currentPath].values.push({
//                             oldValue: aArray[j],
//                             newValue: bArray[j],
//                             time: currentDate,
//                             effDate: endEffDate
//                         });
//                         }
//                     }
//                     }
//                 }
//                 } else if (a[key].vin !== undefined || (a[key].driverFirstName !== undefined && a[key].driverLastName !== undefined)) {
//                 const aArray = a[key].values;
//                 const bArray = b[key].values;
//                 const aArrayLength = aArray.length;
//                 const bArrayLength = bArray.length;
//                 for (let j = 0; j < aArrayLength; j++) {
//                     const aObj = aArray[j];
//                     for (let k = 0; k < bArrayLength; k++) {
//                     const bObj = bArray[k];
//                     if ((aObj.vin && aObj.vin === bObj.vin) || (aObj.driverFirstName === bObj.driverFirstName && aObj.driverLastName === bObj.driverLastName)) {
//                         compare(aObj, bObj, currentPath + `[${j}]`);
//                         break;
//                     }
//                     }
//                 }
//                 } else {
//                 compare(a[key], b[key], currentPath);
//                 }
//             } else {
//                 if (a[key] !== b[key]) {
//                 if (changes[currentPath] === undefined) {
//                     changes[currentPath] = { values: [{
//                     oldValue: a[key],
//                     newValue: b[key],
//                     time: currentDate,
//                     effDate: endEffDate
//                 }]}
//             }
//             }
//             }
//         }}

//         compare(objA, objB, '');
//         return changes;
// }




export const compareJSONObjects = (objA, objB, endEffDate) => {
    const changes = {};
    const currentDate = new Date();

    const compare = (a, b, path) => {
        const keys = Object.keys(a);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const currentPath = path ? `${path}.${key}` : key;
            if (b[key] === undefined) {
                continue;
            }
            if (typeof a[key] === 'object' && a[key] !== null) {
                if (Array.isArray(a[key])) {
                    const aArray = a[key];
                    const bArray = b[key];
                    const uniqueObjects = bArray.filter(objB => !aArray.some(objA => JSON.stringify(objA) === JSON.stringify(objB)));
                    if (aArray.length !== bArray.length) {
                        changes[currentPath] = {
                            values: [{
                                oldValue: aArray.length, // Store length of aArray as the old value
                                newValue: uniqueObjects, // Store values in bArray that are not in aArray as the new value
                                time: currentDate,
                                effDate: endEffDate
                            }]
                        };
                        continue;
                    }
                    for (let j = 0; j < aArray.length; j++) {
                        if (typeof aArray[j] === 'object' && aArray[j] !== null) {
                            compare(aArray[j], bArray[j], currentPath + `[${j}]`);
                        } else {
                            if (aArray[j] !== bArray[j]) {
                                if (changes[currentPath] === undefined) {
                                    changes[currentPath] = {
                                        values: [{
                                            oldValue: aArray[j],
                                            newValue: bArray[j],
                                            time: currentDate,
                                            effDate: endEffDate
                                        }]
                                    };
                                } else {
                                    changes[currentPath].values.push({
                                        oldValue: aArray[j],
                                        newValue: bArray[j],
                                        time: currentDate,
                                        effDate: endEffDate
                                    });
                                }
                            }
                        }
                    }
                } else if (a[key].vin !== undefined || (a[key].driverFirstName !== undefined && a[key].driverLastName !== undefined)) {
                    const aArray = a[key].values;
                    const bArray = b[key].values;
                    const aArrayLength = aArray.length;
                    const bArrayLength = bArray.length;
                    for (let j = 0; j < aArrayLength; j++) {
                        const aObj = aArray[j];
                        for (let k = 0; k < bArrayLength; k++) {
                            const bObj = bArray[k];
                            if ((aObj.vin && aObj.vin === bObj.vin) || (aObj.driverFirstName === bObj.driverFirstName && aObj.driverLastName === bObj.driverLastName)) {
                                compare(aObj, bObj, currentPath + `[${j}]`);
                                break;
                            }
                        }
                    }
                } else {
                    compare(a[key], b[key], currentPath);
                }
            } else {
                if (a[key] !== b[key]) {
                    if (changes[currentPath] === undefined) {
                        changes[currentPath] = {
                            values: [{
                                oldValue: a[key],
                                newValue: b[key],
                                time: currentDate,
                                effDate: endEffDate
                            }]
                        };
                    }
                }
            }
        }
    };

    compare(objA, objB, '');
    return changes;
};