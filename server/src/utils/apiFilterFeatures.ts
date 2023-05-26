import type { FilterQuery, Query } from 'mongoose';
import { omit } from 'lodash';

export class APIFilterFeatures<T> {
    public query: Query<T[], T, unknown>;
    private readonly queryString: FilterQuery<T>;

    constructor(query: Query<T[], T, unknown>, queryString: FilterQuery<T>) {
        this.query = query;
        this.queryString = queryString;
    }

    filter(): APIFilterFeatures<T> {
        let queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        queryObj = omit(queryObj, excludedFields) as FilterQuery<T>;

        let queryStr: string | FilterQuery<T> = JSON.stringify(queryObj);
        queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`));

        this.query = this.query.find(queryStr as FilterQuery<T>);

        return this;
    }

    sort(): APIFilterFeatures<T> {
        if (this.queryString.sort !== undefined) {
            const sortBy = (this.queryString.sort as string).split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields(): APIFilterFeatures<T> {
        if (this.queryString.fields !== undefined) {
            const fields = (this.queryString.fields as string).split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate(): APIFilterFeatures<T> {
        const page = this.queryString.page * 1 ?? 1;
        const limit = this.queryString.limit * 1 ?? 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}
