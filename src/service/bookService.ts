import type {BookModel} from '@/model/bookModel';
import axios from 'axios';

export class BookService {
    private static apiPath = 'http://localhost:3000/';
    static async getBooks(): Promise<[BookModel]> {
        const response = await axios.get(this.apiPath + "books");
        return await response.data
    }

    static async searchBooks(term: string): Promise<[BookModel]> {
        const response = await axios.get(this.apiPath + "books/search", {params: {
                q: term
            }});
        return await response.data
    }
}
