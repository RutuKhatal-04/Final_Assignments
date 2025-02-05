import pool from './postgres/postgres';

export interface OrderBlock {
    lineNo: number | number[];
    ProductCode: string;
}

export interface Items {
    orderID: string;
    orderInvoiceNo: string;
    OrderBlocks: OrderBlock[];
}

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


export const handleFilterdata = (items: Items[]): string[] => {
    return items.filter(item => 
        item.OrderBlocks.some(orderBlock => 
            (Array.isArray(orderBlock.lineNo) ? orderBlock.lineNo : [orderBlock.lineNo])
            .some(lineNo => lineNo % 3 === 0)
        )
    ).map(item => item.orderID);
};
export const insertdata = async (orderId: string) => {
    console.log('Inserting Order ID:', orderId);
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO orders (orderID) VALUES ($1) RETURNING *';
        const values = [orderId];
        const res = await client.query(query, values);
        console.log('Inserted Order ID:', res.rows[0]);
    } catch (error) {
        console.error('Error inserting data:',error);
    } finally {
        client.release();
    }
};