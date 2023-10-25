// remove Special Characters And Replace Spaces
export function sanitizedString(text: string) {
    // Use a regular expression to match special characters and spaces
    const regex = /[^a-zA-Z0-9\s]/g;
  
    // Replace special characters with an empty string and spaces with hyphens
    const sanitizedString = text.replace(regex, '').replace(/\s+/g, '-');
  
    return sanitizedString;
}

export function sendOrderMail(orderData: any) {
    // return this.http.post<any>(`${environment.apiEndPoint}/sendOrderMail`, orderData, this.httpOptions).pipe(
    //   first(),
    //   catchError(this.handleError<any>("sendOrderMail"))
    // );
}


// THE FOLLOWING FUNCTIONS ARE USED FOR LOCAL STORAGE
export async function setLocalStorage(storageKey: string, value: any) {
    const encryptedvalue = btoa(escape(JSON.stringify(value)))
    return await localStorage.setItem(storageKey, encryptedvalue);
}

export async function getLocalStorage(storageKey:string) {
    return new Promise((resolve)=>{
        const localData = localStorage.getItem(storageKey);
        if (localData) {
            resolve(JSON.parse(unescape(atob(localData))));
        } else {
            resolve(false);
        }
    })
}

export async function removeLocalStorageItem(storageKey:string) {
    await localStorage.removeItem(storageKey);
}
  
export async function clearLocalStorage() {
    await localStorage.clear();
}


// THE FOLLOWING FUNCTIONS ARE USED FOR SESSION STORAGE
export async function setSessionStorage(storageKey: string, value: any) {
    const encryptedvalue = btoa(escape(JSON.stringify(value)))
    return await sessionStorage.setItem(storageKey, encryptedvalue);
}

export function getSessionStorage(storageKey: string) {
    return new Promise((resolve)=>{
        const localData = sessionStorage.getItem(storageKey);
        if (localData) {
            resolve(JSON.parse(unescape(atob(localData))));
        } else {
            resolve(false);
        }
    })
}

export async function removeSessionStorageItem(storageKey:string) {
    await sessionStorage.removeItem(storageKey);
}
 
export async function clearSessionStorage() {
    await sessionStorage.clear();
}
