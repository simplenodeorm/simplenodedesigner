import React from 'react';
import ReactDOM from 'react-dom';
import config from '../config/appconfig.json';

document.designData = {
    models: '',
    modelHierarchy: '',
    selectedObjectKeys: '',
    selnodes: '',
    whereComparisons: '',
    queryResults: '',
    currentDocument: ''
};

const popupMenuClick = function(e) {
    let cm = document.getElementById('ctxmenu');
    if (!isPointInRect(e.pageX, e.pageY, cm.getBoundingClientRect())) {
        clearContextMenu();
    }
};

export function isPointInRect(x, y, rc) {
    return ((x > rc.left && (x < (rc.left + rc.width))
        && (y > rc.top) && ( y < (rc.top + rc.height))));
}

export function clearDocumentDesignData() {
    document.designData = {
        models: '',
        modelHierarchy: '',
        selectedObjectKeys: '',
        selnodes: '',
        whereComparisons: '',
        queryResults: '',
        currentDocument: ''
    };
}
    
export function getFieldType(dbType) {
    let retval;
    dbType = dbType.toUpperCase();

    if (dbType.includes('VARCHAR')
        || dbType.includes('TEXT')
        || dbType.includes('CHAR')
        || dbType.includes('CLOB')
        || dbType.includes('ENUM')
        || dbType.includes('SET')
        || dbType.includes('GEOMETRY')
        || dbType.includes('BLOB')) {
        retval = "string";
    } else if (dbType.includes('DATE')
        || dbType.includes('TIME')) {
        retval = 'date';
    } else if (dbType.includes('NUMBER')
        || dbType.includes('INT')
        || dbType.includes('YEAR')
        || dbType.includes('DECIMAL')) {
        if (!dbType.includes('(') || dbType.endsWith(", 0)")) {
            retval = 'int';
        } else {
            retval = 'float';
        }
    } else if (dbType.includes('FLOAT') ||  dbType.includes('DOUBLE'))     {
        retval = 'float';
    } else if (dbType.includes('BOOL')) {
        retval = 'boolean';
    }

    return retval;
}

export function clearContextMenu() {
    let cm = document.getElementById('ctxmenu');
    
    if (cm) {
        unmountComponent(cm);
        cm.parentNode.removeChild(cm);
        document.removeEventListener('click', popupMenuClick, true);
    }
}

export function getContextMenu(info) {
    clearContextMenu();
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
    const mcdom = document.getElementById('modalcontainer');
    if (mcdom) {
        unmountComponent(mcdom);
        mcdom.parentNode.removeChild(mcdom);
        document.removeEventListener('click', mc.clickFunction, true);
    }
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
    let wm = document.getElementById('waitmsg');
    if (wm) {
        wm.parentNode.removeChild(wm);
        unmountComponent(wm);
        document.removeEventListener('click', wm.waitMessageClick, true);
    }
}

export function getUniqueKey() {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function isUnaryOperator(op) {
    return (op && ((op === 'is null') || (op === 'is not null')));
}

export function clearSelectedText() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        }
        else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    }
    else if (document.selection) {  // IE?
        document.selection.empty();
    }
}

export function copyToClipboard(className) {
    let e = document.getElementsByClassName(className)[0];
    try {
        if (e) {
            let range;
            if (document.selection) { // IE
                range = document.body.createTextRange();
                range.moveToElementText(e);
                range.select();
            } else if (window.getSelection) {
                range = document.createRange();
                range.selectNode(e);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }

            document.execCommand('copy');
            clearSelectedText();

        }
    } 
        
    catch (err) {}
}

export function getOrmUrl(inurl) {
    let retval = inurl;
    let winurl = window.location.href;

    // in demo mode will assume everything is running in 1 docker server
    if (config.demoMode) {
        let pos1 = winurl.indexOf('//');
        if (pos1 > -1) {
            let pos2 = winurl.indexOf('/', pos1+2);
            
            if (pos2 > pos1) {
                let server = winurl.substring(pos1+2, pos2);
                let pos2 = server.indexOf(':');
                if (pos2 > 0) {
                    server = server.substring(0, pos2);
                }
                retval = inurl.replace('localhost', server);
            }
        }
    }
    
    return retval;
}

export function isRootColumnSelected() {
    let retval = false;
    for (let i = 0; i < document.designData.selnodes.length; ++i) {
        if (!document.designData.selnodes[i].__path__.includes('.')) {
            retval = true;
            break;
        }
    }
    
    return retval;
}

export function isWhereValid() {
    return (document.designData.whereComparisons && document.designData.whereComparisons.length > 0);
}



function unmountComponent(comp) {
    if (comp) {
        try {
            ReactDOM.unmountComponentAtNode(comp);
        } catch(e) {}
    }
}
