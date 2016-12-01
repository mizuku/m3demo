import * as Const from "../constants"
import { Promise } from "es6-promise"
import * as superagent from "superagent";

/**
 * Action の基本形のInterface
 */
export interface Action {
    type: Const.Action.Type;
}

/**
 * Web API を呼び出し、結果をPromiseで返す
 */
export const callApi = (url: string,
    method: string,
    params?: {[key:string]: any}): Promise<superagent.Response> => {

    return new Promise((resolve, reject) => {
    let saMethod : superagent.SuperAgentRequest;
        switch (method.toLowerCase()) {
            case "get":
                saMethod = superagent.get(url);
                break;
            case "post":
                saMethod = superagent.post(url);
                break;
            case "put":
                saMethod = superagent.put(url);
                break;
            case "delete":
                saMethod = superagent.delete(url);
                break;
        }
        saMethod.query(params)
            .end((err: any, res: superagent.Response) => {
                if (err) {
                    console.log(err);
                    reject(res);
                } else {
                    resolve(res);
                }
            })
    });
}
