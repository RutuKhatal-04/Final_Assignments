"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertdata = exports.handleFilterdata = void 0;
const postgres_1 = __importDefault(require("./postgres/postgres"));
// export const handleFilterdata = (items: Items[]): string[] => {
//     const orderIds: string[] = [];
//     items.forEach(item => {
//         const lineNos: number[] = [];
//         item.OrderBlocks.forEach(orderBlock => {
//             if (Array.isArray(orderBlock.lineNo)) {
//                 lineNos.push(...orderBlock.lineNo);
//             } else {
//                 lineNos.push(orderBlock.lineNo);
//             }
//         });
//         for (let i = 0; i < lineNos.length; i++) {
//             if (lineNos[i] % 3 === 0) {
//                 orderIds.push(item.orderID);
//                 break; // Exit the loop once a multiple of 3 is found
//             }
//         }
//     });
//     return orderIds;
// };
//Using filter function
const handleFilterdata = (items) => {
    return items.filter(item => item.OrderBlocks.some(orderBlock => (Array.isArray(orderBlock.lineNo) ? orderBlock.lineNo : [orderBlock.lineNo])
        .some(lineNo => lineNo % 3 === 0))).map(item => item.orderID);
};
exports.handleFilterdata = handleFilterdata;
const insertdata = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Inserting Order ID:', orderId);
    const client = yield postgres_1.default.connect();
    try {
        const query = 'INSERT INTO orders (orderID) VALUES ($1) RETURNING *';
        const values = [orderId];
        const res = yield client.query(query, values);
        console.log('Inserted Order ID:', res.rows[0]);
    }
    catch (error) {
        console.error('Error inserting data:', error);
    }
    finally {
        client.release();
    }
});
exports.insertdata = insertdata;
