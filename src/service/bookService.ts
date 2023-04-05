import axios from 'axios';
import type BookModel from '@/model/bookModel';

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
        return response.data
    }

    static async getBookById(id: number) {
        const response = await axios.get(this.apiPath + "books/" + id);
        return response.data;
    }
}
