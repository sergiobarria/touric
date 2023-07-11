import type { Query, FilterQuery } from 'mongoose';
import { omit } from 'lodash';

export class APIQueryFeatures<T> {
    public query: Query<T[], T, unknown>;
    private readonly queryString: FilterQuery<T>;

    constructor(query: Query<T[], T, unknown>, queryString: FilterQuery<T>) {
        this.query = query;
        this.queryString = queryString;
    }

    filter(): APIQueryFeatures<T> {
        let queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        queryObj = omit(queryObj, excludedFields) as FilterQuery<T>;

        let queryStr: string | FilterQuery<T> = JSON.stringify(queryObj);
        queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`));

        this.query = this.query.find(queryStr as FilterQuery<T>);

        return this;
    }

    sort(): APIQueryFeatures<T> {
        const sortBy =
            this.queryString.sort !== undefined ? (this.queryString.sort as string).split(',').join(' ') : '-createdAt';
        this.query = this.query.sort(sortBy);

        return this;
    }

    limitFields(): APIQueryFeatures<T> {
        const fields =
            this.queryString.fields !== undefined ? (this.queryString.fields as string).split(',').join(' ') : '-__v';
        this.query = this.query.select(fields);

        return this;
    }

    paginate(): APIQueryFeatures<T> {
        const page = this.queryString.page * 1 ?? 1;
        const limit = this.queryString.limit * 1 ?? 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}
