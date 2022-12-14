// TODO IPアドレス等をもとにIDを付与し、QRコードを読み込むたびにスタンプラリーの記録を自動でつけるようにする。
// TODO IDにはUUIDのライブラリを用いる。
// TODO 契約するデータベースを考えておく。
// TODO 企画名と企画名のハッシュ値を対応させるテーブルを用意しておく。

/* NOTE データベースの基本構造
[
    {
        id: 1ds3321s,
        stamps:
        {
                (企画名のハッシュ値): true, // NOTE スタンプ取得済み
                (企画名のハッシュ値): false, // NOTE スタンプ未取得,
                ・
                ・
                ・
        },
    }
]
*/

/* NOTE メソッドの一覧
    resister: 引数(ユーザーID), 新規ユーザーの登録

    // NOTE 以下ユーザーIDを使用する前提
    collectStamp: 引数(企画名のハッシュ値), スタンプの取得
    getStampCount: 引数なし, 取得したスタンプ数の取得
    isCompleted: 引数なし, スタンプラリーをコンプリートしたか否かの判定
*/

// const data = {
//     "uuid": {
//         "hash": false,
//     }
// }

const DEFAULT_TABLE = {
    "test1": false,
    "test2": false,
    "test3": false,
    "test4": false,
    "test5": false,
    "test6": false,
    "test7": false,
    "test8": false,
    "test9": false,
    "test10": false,
}

interface StampRallyData {
    [index: string]: {
        [index: string]: boolean;
    }
}

export class Database {
    #data: StampRallyData;
    #targetValue: number;
    constructor(targetValue: number, data?: StampRallyData) {
        this.#data = data || {};
        this.#targetValue = targetValue;
    }

    resister(userID: string) {
        this.#data[userID] = DEFAULT_TABLE;
        console.log(this.#data[userID]);
    }

    collectStamp(userID: string, projectHash: string) {
        if (this.#data[userID].hasOwnProperty(projectHash)) {
            this.#data[userID][projectHash] = true;
        }
    }

    getStampCount(userID: string) {
        const stampTable = this.#data[userID];
        let count = 0;
        for (const property in stampTable) {
            if (stampTable[property]) {
                count++;
            }
        }
        return count;
    }

    getData() {
        return this.#data;
    }

    isCompleted(userID: string) {
        return this.#targetValue <= this.getStampCount(userID);
    }
}