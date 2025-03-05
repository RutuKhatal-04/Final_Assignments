"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterDTOImpl = void 0;
class FilterDTOImpl {
    constructor(init) {
        this.filter = {};
        this.columns = ["id", "bookCode", "title", "description", "publishedDate", "price", "authors", "version", "active", "archive", "uId"];
        this.size = 10;
        this.page = 1;
        this.sort = "asc";
        if (init) {
            this.filter = init.filter || this.filter;
            this.columns = init.columns || this.columns;
            this.size = init.size || this.size;
            this.page = init.page || this.page;
            this.sort = init.sort || this.sort;
        }
    }
}
exports.FilterDTOImpl = FilterDTOImpl;
//# sourceMappingURL=filterDtos.js.map