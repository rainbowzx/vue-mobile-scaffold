import axios from 'axios';
import qs from 'qs';
import { desCode as app } from '../static/encryption.js';
import store from '../store';

let commonUrl = '/app/htmlGateway.do';
let commonHeader = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

function toEncrypted (data) {
    if (process.env.NODE_ENV != "prod") {
        // 不加密
        return JSON.stringify(data);
    } else {
        // 加密
        return app.encrypted(data);
    }
}

// 补充资料基本接口
export const update = {
    fileList: (data) => {
        store.dispatch('setSource', axios.CancelToken.source());
        return axios({
            headers: commonHeader,
            method: 'post',
            cancelToken: store.state.app.source.token,
            url: commonUrl,
            data: qs.stringify({
                at: 'attachment.list',
                v: '1.0.0',
                rd: toEncrypted(data)
            })
        });
    },
};
