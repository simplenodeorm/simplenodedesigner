document.designData = {
    models: '',
    modelHierarchy: '',
    selectedObjectKeys: '',
    selnodes: '',
    whereComparisons: '',
    queryResults: '',
    currentDocument: ''
};

var popupMenuClick = function(e) { 
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; 
    let y = e.clientY - rect.top; 
    if ((x < 0) || (y < 0) || (x >= rect.right) || (y >= rect.top)) {
        clearContextMenu();
    }
};

export function clearDocumentDesignData() {
    document.designData.modelHierarchy = '';
    document.designData.selectedObjectKeys = '';
    document.designData.selnodes = '';
    document.designData.whereComparisons = '';
    document.designData.queryResult = '';
    document.designData.currentDocument = '';
}
    
export function getFieldType(dbType) {
    let retval;
    let check = dbType.toLowerCase();
    if (check.startsWith('number')) {
        check = 'number';
        
    }
    switch (check) {
        case 'date':
        case 'timestamp':
            retval = 'date';
            break;
        case 'number':
            if (dbType.includes(',')) {
                retval = 'float';
            } else {
                retval = 'number';
            }
            break;
        case 'float':
        case 'double':
            retval = 'float';
            break;
        case 'integer':
        case 'long':
            retval = 'number';
            break;
        default:
            retval = 'string';
            break;
    }

    return retval;
}

export function clearContextMenu() {
    document.removeEventListener('click', popupMenuClick, true);
    document.body.removeChild(document.getElementById('ctxmenu'));
}

export function getContextMenu(info) {
    const retval = document.createElement('div');
    retval.className = 'popupMenu';
    retval.id = 'ctxmenu';
    document.body.appendChild(retval);
    document.addEventListener('click', popupMenuClick, true);
    retval.style.position = 'absolute';
    retval.style.top = info.event.pageY + 'px';
    retval.style.left = info.event.pageX + 'px';
    retval.style.visibility = 'visible';
    return retval;
}

export function getModalContainer(rc) {
    const retval = document.createElement('div');
    retval.className = 'modalContainer';
    retval.id = 'modalcontainer';
    document.body.appendChild(retval);
    retval.style.position = 'absolute';
    retval.style.top = rc.top + 'px';
    retval.style.left = rc.left + 'px';
    retval.style.width = rc.width + 'px';
    retval.style.height = rc.height + 'px';
    retval.style.visibility = 'visible';
    return retval;
}

export function clearModalContainer(mc) {
    document.removeEventListener('click', mc.clickFunction, true);
    document.body.removeChild(document.getElementById('modalcontainer'));
}

export function getWaitMessage() {
    const retval = document.createElement('div');
    retval.className = 'modalContainer';
    retval.id = 'waitmsg';
    document.body.appendChild(retval);
    retval.style.position = 'absolute';
    retval.style.top = '100px';
    retval.style.left = '200px';
    retval.style.width = '250px';
    retval.style.height = '30px';
    retval.style.border = 'none';
    retval.style.visibility = 'visible';
    return retval;
}

export function removeWaitMessage() {
    let e = document.getElementById('waitmsg');
    if (e) {
        document.removeEventListener('click', e.waitMessageClick, true);
        document.body.removeChild(document.getElementById('waitmsg'));
    }
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

export function isUnaryOperator(op) {
    return (op && ((op === 'is null') || (op === 'is not null')));
}
