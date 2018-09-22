import * as Constants from '../service/constants';
import dayjs from 'dayjs';

/**
 * Created by zhangweiwei on 2017/4/13.
 */

let separator = '/';
if (process.platform !== 'darwin') {
    separator = '\\';
}

/**
 * 获取图片名
 * @param path
 * @returns {*}
 */
export function getName(path) {
    path = decodeURIComponent(path);
    if (path.lastIndexOf(separator) !== -1) {
        path = path.substring(path.lastIndexOf(separator) + 1, path.length);
    }
    return path;
}

/**
 * 是否为空对象
 * @param e
 * @returns {boolean}
 */
export function isEmptyObject(e) {
    let t;
    for (t in e)
        return !1;
    return !0;
}

export function getClipboardText(type, url) {
    switch (type) {
        case Constants.CopyType.URL:
            return url;
        case Constants.CopyType.MARKDOWN:
            return `![${getName(url)}](${url})`;
        default:
            return url;
    }
}

export function getPrefix(key) {
    if (key.indexOf('/') !== -1) {
        return key.substring(0, key.indexOf('/') + 1);
    } else {
        return '';
    }
}

export function getPostfix(path) {
    if (path.lastIndexOf(separator) !== -1) {
        return path.substring(path.lastIndexOf(separator) + 1, path.length);
    } else {
        return path;
    }
}

export function quickSort(arr, key) {
    function getValue(item, key) {
        return key ? item[key] : item;
    }

    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    let pivotItem = arr.splice(pivotIndex, 1)[0];
    let pivot = getValue(pivotItem, key);
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
        let temp = getValue(arr[i], key);
        if (temp < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left, key).concat(pivotItem, quickSort(right, key));
}

export function formatFileSize(size) {
    if (size >= 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB';
    } else if (size >= 1024 && size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + ' KB';
    } else {
        return (size) + ' B';
    }
}

export function formatDate(time) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 文件排序
 * @param file1
 * @param file2
 * @returns {*}
 */
export function sequence(file1, file2) {
    if (file1._directory && file2._directory) {
        return file1.key > file2.key;
    } else if (file1._directory && !file2._directory) {
        return -1;
    } else if (!file1._directory && file2._directory) {
        return 1;
    } else if (!file1._directory && !file2._directory) {
        return file1.key > file2.key;
    } else {
        return 0;
    }
}


export function wrapperFile(item, type) {
    return {
        key: item.Key,
        fsize: item.Size,
        putTime: new Date(item.LastModified).getTime(),
        mimeType: ''
    };
}