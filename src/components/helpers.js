export function clearDocumentDesignData() {
    document.designData.modelHierarchy = '';
    document.designData.selectedObjectKeys = '';
    document.designData.selnodes = '';
    document.designData.whereComparisons = '';
    document.designData.queryResult = '';
    document.designData.currentDocument = '';
}
    
export function getFieldType(dbType) {
    let retval = 'string';
    switch (dbType) {
        case 'DATE':
            retval = 'date';
            break;
        case 'NUMBER':
            if (retval.includes(',')) {
                retval = 'float';
            } else {
                retval = 'number';
            }
            break;
    }

    return retval;
}

export function clearContextMenu() {
    let cm = document.getElementById('ctxmenu');
    cm.style.top = '-100px';
    cm.style.left = '-100px';
    cm.style.visibility = 'hidden';
}

export function getContextMenu(info) {
    const retval = document.getElementById('ctxmenu');
    retval.style.top = info.event.pageY + 'px';
    retval.style.left = info.event.pageX + 'px';
    retval.style.visibility = 'visible';
    return retval;
}

export function getModalContainer(rc) {
    const retval = document.getElementById('modalcontainer');
    retval.style.top = rc.top + 'px';
    retval.style.left = rc.left + 'px';
    retval.style.width = rc.width + 'px';
    retval.style.height = rc.height + 'px';
    retval.style.visibility = 'visible';
    return retval;
}

export function clearModalContainer(func) {
    let mc = document.getElementById('modalcontainer');
    mc.style.top = '-100px';
    mc.style.left = '-100px';
    mc.style.visibility = 'hidden';
    document.removeEventListener('click', func, true);
}

export function getUniqueKey() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
